import { PolicyPack } from "../types";

export const currentPolicyPack: PolicyPack = {
  version: "1.8.2",
  activatedAt: "2026-02-15T08:00:00Z",
  activatedBy: "DAO Proposal PROP-2026-008",
  principles: [
    {
      id: "preservation-life",
      name: "Preservation of Life",
      description: "Actions must minimize harm to human life and wellbeing. High-risk decisions require human oversight.",
      priority: 1,
    },
    {
      id: "do-no-harm",
      name: "Do No Harm",
      description: "Prevent foreseeable harm. When uncertain, escalate rather than risk damage.",
      priority: 2,
    },
    {
      id: "stewardship",
      name: "Stewardship",
      description: "Responsible management of resources, data, and environmental impact.",
      priority: 3,
    },
    {
      id: "fairness",
      name: "Fairness / Non-discrimination",
      description: "Equitable treatment across demographics. Systems must be tested for bias.",
      priority: 4,
    },
    {
      id: "transparency",
      name: "Transparency",
      description: "Decisions must be explainable, auditable, and contestable.",
      priority: 5,
    },
    {
      id: "privacy",
      name: "Privacy / Data Minimization",
      description: "Data minimization and protection of personal information. Purpose limitation enforced.",
      priority: 6,
    },
    {
      id: "accountability",
      name: "Accountability / Recourse",
      description: "Clear responsibility and appeal mechanisms for all decisions.",
      priority: 7,
    },
  ],
  rules: [
    {
      id: "RULE-001",
      principleId: "privacy",
      condition: "action touches sensitive data",
      action: "require_mitigation",
      message: "Sensitive data requires minimization + purpose binding",
      mitigations: [
        "Apply k-anonymization (minimum k=10)",
        "Implement purpose limitation",
        "Set automatic retention expiry",
      ],
    },
    {
      id: "RULE-002",
      principleId: "do-no-harm",
      condition: "harm risk > 7.0",
      action: "escalate",
      message: "High harm risk requires human review or DAO approval",
    },
    {
      id: "RULE-003",
      principleId: "fairness",
      condition: "decision affects vulnerable group",
      action: "require_mitigation",
      message: "Vulnerable populations require fairness check + justification",
      mitigations: [
        "Complete demographic bias audit",
        "Provide explicit justification",
        "Enable expedited appeal path",
      ],
    },
    {
      id: "RULE-004",
      principleId: "accountability",
      condition: "emergency override used",
      action: "log",
      message: "Emergency overrides must auto-expire + create public audit entry",
    },
    {
      id: "RULE-005",
      principleId: "privacy",
      condition: "PII threshold exceeded",
      action: "deny",
      message: "Cannot process request with excessive PII exposure",
    },
    {
      id: "RULE-006",
      principleId: "preservation-life",
      condition: "critical system deployment",
      action: "escalate",
      message: "Life-critical systems require Medical Ethics Board approval",
    },
    {
      id: "RULE-007",
      principleId: "privacy",
      condition: "health data without consent",
      action: "deny",
      message: "Health data requires explicit informed consent",
    },
    {
      id: "RULE-008",
      principleId: "stewardship",
      condition: "fund allocation > $50k",
      action: "escalate",
      message: "Large allocations require DAO vote",
    },
    {
      id: "RULE-009",
      principleId: "fairness",
      condition: "bias audit not completed",
      action: "escalate",
      message: "AI models must complete bias audit before deployment",
    },
    {
      id: "RULE-010",
      principleId: "transparency",
      condition: "decision lacks explainability",
      action: "deny",
      message: "All consequential decisions must be explainable",
    },
  ],
  changelog: "Added health data consent requirements (RULE-007). Updated bias audit thresholds.",
};

export const policyPackHistory: PolicyPack[] = [
  currentPolicyPack,
  {
    version: "1.8.1",
    activatedAt: "2026-01-20T10:00:00Z",
    activatedBy: "DAO Proposal PROP-2026-004",
    principles: currentPolicyPack.principles,
    rules: currentPolicyPack.rules.slice(0, 9), // One fewer rule
    changelog: "Enhanced emergency override logging. Added fairness check automation.",
  },
  {
    version: "1.8.0",
    activatedAt: "2026-01-05T14:30:00Z",
    activatedBy: "Ethics Council v1.8 Release",
    principles: currentPolicyPack.principles,
    rules: currentPolicyPack.rules.slice(0, 8),
    changelog: "Major update: Added Accountability principle. Restructured escalation paths.",
  },
  {
    version: "1.7.5",
    activatedAt: "2025-12-10T09:00:00Z",
    activatedBy: "DAO Proposal PROP-2025-112",
    principles: currentPolicyPack.principles.slice(0, 6),
    rules: currentPolicyPack.rules.slice(0, 7),
    changelog: "Privacy threshold adjustments based on Q4 audit findings.",
  },
];

export function getPolicyPackByVersion(version: string): PolicyPack | undefined {
  return policyPackHistory.find((pack) => pack.version === version);
}

export function getLatestPolicyPack(): PolicyPack {
  return currentPolicyPack;
}
