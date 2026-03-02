import { PreflightRequest, PreflightResponse } from "../types";
import { currentPolicyPack } from "../data/policyPacks";

// Simulates the ethics preflight API
export async function runEthicsPreflight(request: PreflightRequest): Promise<PreflightResponse> {
  // Generate unique receipt ID
  const receiptId = `RCPT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  // Analyze risk based on action type and context
  const riskAnalysis = analyzeRisk(request);
  
  // Check rules against the request
  const ruleEvaluations = evaluateRules(request, riskAnalysis);
  
  // Determine final decision
  const decision = determineDecision(ruleEvaluations);
  
  // Build response
  const response: PreflightResponse = {
    decision: decision.decision,
    principlesApplied: ruleEvaluations.principlesApplied,
    constraintsTriggered: ruleEvaluations.constraintsTriggered,
    requiredMitigations: ruleEvaluations.requiredMitigations,
    policyVersion: currentPolicyPack.version,
    receiptId,
    reason: decision.reason,
    evidence: riskAnalysis.evidence,
    riskLevel: riskAnalysis.riskLevel,
    escalationPath: decision.escalationPath,
    alternatives: decision.alternatives,
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Store decision record (in real system, this would go to database)
  storeDecisionRecord(request, response);
  
  return response;
}

interface RiskAnalysis {
  riskLevel: "low" | "medium" | "high" | "critical";
  riskScore: number;
  evidence: string[];
  sensitivityFlags: string[];
}

function analyzeRisk(request: PreflightRequest): RiskAnalysis {
  const { actionType, context } = request;
  const evidence: string[] = [];
  const sensitivityFlags: string[] = [];
  let riskScore = 0;
  
  // Analyze based on action type
  switch (actionType) {
    case "data_share":
      if (context.sensitiveData) {
        riskScore += 3;
        sensitivityFlags.push("SENSITIVE_DATA");
        evidence.push("Dataset contains sensitive information");
      }
      if (context.piiExposure === "high") {
        riskScore += 4;
        sensitivityFlags.push("HIGH_PII_EXPOSURE");
        evidence.push("High PII exposure detected");
      }
      if (context.externalPartner) {
        riskScore += 2;
        evidence.push("External data sharing increases risk profile");
      }
      if (context.healthData) {
        riskScore += 3;
        sensitivityFlags.push("HEALTH_DATA");
        evidence.push("Health data requires special protections");
      }
      if (!context.consent) {
        riskScore += 3;
        sensitivityFlags.push("NO_CONSENT");
        evidence.push("Missing user consent documentation");
      }
      break;
      
    case "model_deployment":
      if (context.criticalSystem) {
        riskScore += 5;
        sensitivityFlags.push("CRITICAL_SYSTEM");
        evidence.push("Deployment to life-critical system");
      }
      if (!context.biasAuditComplete) {
        riskScore += 3;
        sensitivityFlags.push("NO_BIAS_AUDIT");
        evidence.push("Bias audit not completed");
      }
      if (context.medicalUse) {
        riskScore += 4;
        sensitivityFlags.push("MEDICAL_USE");
        evidence.push("Medical AI requires enhanced validation");
      }
      break;
      
    case "fund_allocation":
      const amount = context.amount || 0;
      if (amount > 50000) {
        riskScore += 3;
        evidence.push(`Large allocation: $${amount.toLocaleString()}`);
      }
      if (context.conflictOfInterest) {
        riskScore += 4;
        sensitivityFlags.push("CONFLICT_OF_INTEREST");
        evidence.push("Potential conflict of interest detected");
      }
      break;
      
    case "content_removal":
      if (context.politicalSpeech) {
        riskScore += 2;
        evidence.push("Political speech requires careful review");
      }
      if (!context.clearViolation) {
        riskScore -= 1;
        evidence.push("No clear policy violation detected");
      }
      break;
      
    case "access_approval":
      if (context.sensitiveScope === "high") {
        riskScore += 3;
        evidence.push("Access to highly sensitive data requested");
      }
      if (!context.businessJustification) {
        riskScore += 2;
        evidence.push("Missing business justification");
      }
      break;
  }
  
  // Additional context analysis
  if (context.emergencyOverride) {
    riskScore += 2;
    evidence.push("Emergency override flag enabled");
  }
  
  if (context.vulnerablePopulation) {
    riskScore += 2;
    sensitivityFlags.push("VULNERABLE_POPULATION");
    evidence.push("Affects vulnerable population");
  }
  
  // Determine risk level
  let riskLevel: "low" | "medium" | "high" | "critical";
  if (riskScore <= 3) riskLevel = "low";
  else if (riskScore <= 6) riskLevel = "medium";
  else if (riskScore <= 9) riskLevel = "high";
  else riskLevel = "critical";
  
  if (evidence.length === 0) {
    evidence.push("Standard risk assessment completed");
  }
  
  return {
    riskLevel,
    riskScore,
    evidence,
    sensitivityFlags,
  };
}

interface RuleEvaluations {
  principlesApplied: string[];
  constraintsTriggered: string[];
  requiredMitigations: string[];
  triggeredRules: typeof currentPolicyPack.rules;
}

function evaluateRules(request: PreflightRequest, riskAnalysis: RiskAnalysis): RuleEvaluations {
  const principlesApplied: string[] = [];
  const constraintsTriggered: string[] = [];
  const requiredMitigations: string[] = [];
  const triggeredRules: typeof currentPolicyPack.rules = [];
  
  const { actionType, context } = request;
  const { riskScore, sensitivityFlags } = riskAnalysis;
  
  // Evaluate each rule
  for (const rule of currentPolicyPack.rules) {
    let triggered = false;
    
    // Check rule conditions
    switch (rule.id) {
      case "RULE-001": // Sensitive data
        triggered = sensitivityFlags.includes("SENSITIVE_DATA") || 
                   sensitivityFlags.includes("HEALTH_DATA");
        break;
      case "RULE-002": // High harm risk
        triggered = riskScore > 7;
        break;
      case "RULE-003": // Vulnerable group
        triggered = sensitivityFlags.includes("VULNERABLE_POPULATION");
        break;
      case "RULE-004": // Emergency override
        triggered = context.emergencyOverride === true;
        break;
      case "RULE-005": // PII threshold
        triggered = sensitivityFlags.includes("HIGH_PII_EXPOSURE");
        break;
      case "RULE-006": // Critical system
        triggered = sensitivityFlags.includes("CRITICAL_SYSTEM");
        break;
      case "RULE-007": // Health data consent
        triggered = sensitivityFlags.includes("HEALTH_DATA") && 
                   sensitivityFlags.includes("NO_CONSENT");
        break;
      case "RULE-008": // Large fund allocation
        triggered = actionType === "fund_allocation" && 
                   (context.amount || 0) > 50000;
        break;
      case "RULE-009": // Bias audit
        triggered = actionType === "model_deployment" && 
                   sensitivityFlags.includes("NO_BIAS_AUDIT");
        break;
      case "RULE-010": // Explainability
        triggered = context.blackBox === true;
        break;
    }
    
    if (triggered) {
      triggeredRules.push(rule);
      const principle = currentPolicyPack.principles.find(p => p.id === rule.principleId);
      if (principle && !principlesApplied.includes(principle.name)) {
        principlesApplied.push(principle.name);
      }
      constraintsTriggered.push(rule.id);
      if (rule.mitigations) {
        requiredMitigations.push(...rule.mitigations);
      }
    }
  }
  
  // Always apply transparency and accountability principles
  if (!principlesApplied.includes("Transparency")) {
    principlesApplied.push("Transparency");
  }
  if (!principlesApplied.includes("Accountability / Recourse")) {
    principlesApplied.push("Accountability / Recourse");
  }
  
  return {
    principlesApplied,
    constraintsTriggered,
    requiredMitigations: [...new Set(requiredMitigations)],
    triggeredRules,
  };
}

interface Decision {
  decision: "allow" | "deny" | "escalate";
  reason: string;
  escalationPath?: string;
  alternatives?: string[];
}

function determineDecision(evaluations: RuleEvaluations): Decision {
  const { triggeredRules } = evaluations;
  
  // Check for any DENY rules
  const denyRules = triggeredRules.filter(r => r.action === "deny");
  if (denyRules.length > 0) {
    const rule = denyRules[0];
    return {
      decision: "deny",
      reason: rule.message,
      alternatives: [
        "Address the constraint violations listed above",
        "Request exception through Ethics Review Board",
        "Modify approach to comply with policy requirements",
      ],
    };
  }
  
  // Check for ESCALATE rules
  const escalateRules = triggeredRules.filter(r => r.action === "escalate");
  if (escalateRules.length > 0) {
    const rule = escalateRules[0];
    return {
      decision: "escalate",
      reason: rule.message,
      escalationPath: getEscalationPath(rule.principleId),
      alternatives: [
        "Provide additional documentation for review",
        "Reduce scope to lower-risk parameters",
        "Request expedited review for time-sensitive cases",
      ],
    };
  }
  
  // Check for REQUIRE_MITIGATION rules
  const mitigationRules = triggeredRules.filter(r => r.action === "require_mitigation");
  if (mitigationRules.length > 0) {
    return {
      decision: "allow",
      reason: "Action permitted with required mitigations applied. Ensure all listed mitigations are implemented.",
    };
  }
  
  // Default: allow with monitoring
  return {
    decision: "allow",
    reason: "Action approved. Standard monitoring and audit logging applied.",
  };
}

function getEscalationPath(principleId: string): string {
  const paths: Record<string, string> = {
    "preservation-life": "Medical Ethics Board (48-72 hours)",
    "do-no-harm": "Safety Review Committee (24-48 hours)",
    "stewardship": "Treasury Council (3-5 business days)",
    "fairness": "Fairness & Equity Board (2-4 business days)",
    "transparency": "Transparency Council (1-2 business days)",
    "privacy": "Privacy Review Board (2-3 business days)",
    "accountability": "Ethics Governance Committee (3-5 business days)",
  };
  
  return paths[principleId] || "General Ethics Review Board (3-5 business days)";
}

// Store decision in local storage (simulating database)
function storeDecisionRecord(request: PreflightRequest, response: PreflightResponse) {
  try {
    const stored = localStorage.getItem("ethicsDecisions");
    const decisions = stored ? JSON.parse(stored) : [];
    
    const record = {
      receiptId: response.receiptId,
      timestamp: new Date().toISOString(),
      actor: request.actor,
      actionType: request.actionType,
      decision: response.decision,
      policyVersion: response.policyVersion,
      principlesApplied: response.principlesApplied,
      constraintsTriggered: response.constraintsTriggered,
      riskLevel: response.riskLevel,
      reason: response.reason,
      evidence: response.evidence,
      context: request.context,
      payloadSummary: request.payloadSummary,
    };
    
    decisions.unshift(record);
    
    // Keep only last 100 decisions
    if (decisions.length > 100) {
      decisions.length = 100;
    }
    
    localStorage.setItem("ethicsDecisions", JSON.stringify(decisions));
  } catch (error) {
    console.error("Failed to store decision record:", error);
  }
}

export function getStoredDecisions() {
  try {
    const stored = localStorage.getItem("ethicsDecisions");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to retrieve decisions:", error);
    return [];
  }
}
