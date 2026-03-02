import { DecisionRecord, Proposal } from "../types";

export const mockDecisions: DecisionRecord[] = [
  {
    decisionId: "DEC-2026-001",
    timestamp: "2026-03-02T10:30:00Z",
    actor: "Sarah Chen (Data Science Team)",
    actionType: "data_share",
    status: "escalated",
    policyVersion: "1.8.2",
    principlesApplied: ["Stewardship", "Privacy", "Fairness"],
    constraintsTriggered: ["DATA.PII_THRESHOLD_EXCEEDED", "LIFE.RISK_REVIEW_REQUIRED"],
    riskScore: 7.8,
    harmEstimate: "Medium - potential for re-identification",
    evidenceRefs: [
      "Privacy Impact Assessment #442",
      "Dataset Sensitivity Analysis",
      "Historical Breach Analysis",
    ],
    counterfactuals: [
      "If anonymization level = k5 → approved",
      "If aggregate-only access → approved",
      "If time-limited access (30d) → needs_review",
    ],
    appealRoute: "Community Safety Council Review (3-5 days)",
    description: "Request to share user health data with external research partner",
  },
  {
    decisionId: "DEC-2026-002",
    timestamp: "2026-03-02T09:15:00Z",
    actor: "Marcus Rodriguez (Finance)",
    actionType: "allocate_funds",
    status: "approved",
    policyVersion: "1.8.2",
    principlesApplied: ["Stewardship", "Transparency", "Justice"],
    constraintsTriggered: [],
    riskScore: 2.1,
    harmEstimate: "Low - standard community grant",
    evidenceRefs: [
      "Budget Allocation Rules v1.8",
      "Historical Grant Outcomes",
      "Community Impact Score",
    ],
    counterfactuals: [
      "If amount > $50k → needs DAO vote",
      "If recipient = conflict → denied",
    ],
    appealRoute: "Standard appeal to Treasury Council",
    description: "Community grant allocation for climate education initiative",
  },
  {
    decisionId: "DEC-2026-003",
    timestamp: "2026-03-01T16:45:00Z",
    actor: "AI Agent (Content Moderator)",
    actionType: "content_removal",
    status: "denied",
    policyVersion: "1.8.1",
    principlesApplied: ["Expression", "Harm Prevention", "Context Awareness"],
    constraintsTriggered: ["EXPR.FREE_SPEECH_PROTECTED"],
    riskScore: 4.2,
    harmEstimate: "Low - expression falls under protected speech",
    evidenceRefs: [
      "Content Policy Guidelines",
      "Context Analysis Report",
      "Similar Case Precedents",
    ],
    counterfactuals: [
      "If direct threat detected → approved",
      "If coordinated harassment → approved",
      "If regulated content (spam) → approved",
    ],
    appealRoute: "Content Review Board (expedited 24h)",
    description: "Automated content removal flag for political criticism",
  },
  {
    decisionId: "DEC-2026-004",
    timestamp: "2026-03-01T14:20:00Z",
    actor: "Dr. Amara Okafor (Medical AI Team)",
    actionType: "deploy_model",
    status: "needs_review",
    policyVersion: "1.8.2",
    principlesApplied: ["Preservation of Life", "Safety", "Transparency"],
    constraintsTriggered: ["LIFE.CRITICAL_SYSTEM_DEPLOYMENT"],
    riskScore: 8.9,
    harmEstimate: "High - impacts medical diagnosis decisions",
    evidenceRefs: [
      "Clinical Trial Results",
      "Bias Audit Report",
      "Safety Validation Tests",
      "Regulatory Compliance Check",
    ],
    counterfactuals: [
      "If oversight mode only → approved",
      "If non-critical use case → approved",
      "If additional validation → needs_review",
    ],
    appealRoute: "Medical Ethics Board + DAO Technical Committee",
    description: "Deployment of diagnostic AI model for emergency triage",
  },
];

export const mockProposals: Proposal[] = [
  {
    id: "PROP-2026-015",
    title: "Update Data Retention Policy for Health Records",
    summary:
      "Reduce health data retention from 7 years to 5 years to minimize long-term privacy risks while maintaining medical necessity.",
    proposer: "Community Member @privacyfirst",
    created: "2026-02-28T12:00:00Z",
    status: "active",
    votesFor: 1247,
    votesAgainst: 89,
    quorum: 2000,
    riskFlags: ["May impact longitudinal health studies", "Regulatory compliance check needed"],
    impactAreas: ["Healthcare", "Privacy", "Research"],
    policyDiff: {
      before: "Health records SHALL be retained for 7 years from last access",
      after: "Health records SHALL be retained for 5 years from last access",
    },
  },
  {
    id: "PROP-2026-014",
    title: "Emergency Climate Response Fund",
    summary:
      "Allocate $2M from treasury for immediate climate disaster response, with transparent tracking and impact reporting.",
    proposer: "Climate Action Committee",
    created: "2026-02-27T09:30:00Z",
    status: "passed",
    votesFor: 3421,
    votesAgainst: 234,
    quorum: 2000,
    riskFlags: [],
    impactAreas: ["Treasury", "Climate", "Emergency Response"],
  },
  {
    id: "PROP-2026-013",
    title: "AI Model Transparency Requirements v2.0",
    summary:
      "Mandate disclosure of training data sources, bias testing results, and uncertainty estimates for all production AI models.",
    proposer: "Technical Ethics Council",
    created: "2026-02-25T15:00:00Z",
    status: "active",
    votesFor: 1823,
    votesAgainst: 456,
    quorum: 2000,
    riskFlags: [
      "May slow deployment timelines",
      "Increased documentation burden",
      "Competitive sensitivity concerns",
    ],
    impactAreas: ["AI Development", "Transparency", "Compliance"],
    policyDiff: {
      before: "AI models SHOULD document training data and performance metrics",
      after:
        "AI models MUST document training data sources, bias audit results, performance metrics by demographic, and uncertainty quantification",
    },
  },
  {
    id: "PROP-2026-012",
    title: "Delegation Concentration Limit",
    summary:
      "Cap voting power delegation at 5% of total voting power to prevent governance capture by whales.",
    proposer: "Governance Reform Working Group",
    created: "2026-02-24T11:00:00Z",
    status: "pending",
    votesFor: 892,
    votesAgainst: 1123,
    quorum: 2000,
    riskFlags: [
      "May reduce participation efficiency",
      "Complex implementation",
      "Potential workarounds via multiple wallets",
    ],
    impactAreas: ["Governance", "Decentralization", "Participation"],
  },
];

export const ethicsPrinciples = [
  {
    id: "preservation-life",
    name: "Preservation of Life",
    description:
      "Actions must minimize harm to human life and wellbeing. High-risk decisions require human oversight.",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: "stewardship",
    name: "Stewardship",
    description:
      "Responsible management of resources, data, and environmental impact. Prevent extractive patterns.",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "fairness",
    name: "Fairness",
    description: "Equitable treatment across demographics. Systems must be tested for bias and discrimination.",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "transparency",
    name: "Transparency",
    description: "Decisions must be explainable, auditable, and contestable. No black boxes in critical systems.",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "privacy",
    name: "Privacy",
    description: "Data minimization and protection of personal information. Purpose limitation strictly enforced.",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  {
    id: "justice",
    name: "Justice",
    description:
      "Fair distribution of benefits and burdens. Special attention to marginalized and vulnerable populations.",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
];
