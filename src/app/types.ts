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
}
