export interface DecisionRecord {
  decisionId: string;
  timestamp: string;
  actor: string;
  actionType: string;
  status: "approved" | "denied" | "needs_review" | "escalated";
  policyVersion: string;
  principlesApplied: string[];
  constraintsTriggered: string[];
  riskScore: number;
  harmEstimate: string;
  evidenceRefs: string[];
  counterfactuals: string[];
  appealRoute: string;
  description: string;
  receiptId?: string;
  requiredMitigations?: string[];
}

export interface Proposal {
  id: string;
  title: string;
  summary: string;
  proposer: string;
  created: string;
  status: "active" | "passed" | "rejected" | "pending";
  votesFor: number;
  votesAgainst: number;
  quorum: number;
  riskFlags: string[];
  impactAreas: string[];
  policyDiff?: {
    before: string;
    after: string;
  };
}

export interface EthicsCheckResult {
  allowed: boolean;
  decision: "allow" | "deny" | "escalate";
  principlesTriggered: string[];
  constraintsTriggered: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
  alternatives?: string[];
  escalationPath?: string;
  reason: string;
  evidence: string[];
  receiptId?: string;
  policyVersion?: string;
  requiredMitigations?: string[];
}

export interface PolicyPack {
  version: string;
  activatedAt: string;
  activatedBy: string;
  principles: EthicsPrinciple[];
  rules: PolicyRule[];
  changelog?: string;
}

export interface EthicsPrinciple {
  id: string;
  name: string;
  description: string;
  priority: number;
}

export interface PolicyRule {
  id: string;
  principleId: string;
  condition: string;
  action: "deny" | "escalate" | "require_mitigation" | "log";
  message: string;
  mitigations?: string[];
}

export interface PreflightRequest {
  actionType: string;
  actor: string;
  context: Record<string, any>;
  payloadSummary: string;
}

export interface PreflightResponse {
  decision: "allow" | "deny" | "escalate";
  principlesApplied: string[];
  constraintsTriggered: string[];
  requiredMitigations: string[];
  policyVersion: string;
  receiptId: string;
  reason: string;
  evidence: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
  escalationPath?: string;
  alternatives?: string[];
}

export interface Appeal {
  id: string;
  receiptId: string;
  submittedBy: string;
  submittedAt: string;
  reason: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  reviewedBy?: string;
  reviewedAt?: string;
  resolution?: string;
}