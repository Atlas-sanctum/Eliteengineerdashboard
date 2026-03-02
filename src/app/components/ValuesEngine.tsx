import { useState } from "react";
import { ethicsPrinciples } from "../data/mockData";
import { EthicsCheckResult } from "../types";
import {
  Cpu,
  Shield,
  Play,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Code,
  FileText,
  Lightbulb,
} from "lucide-react";

export function ValuesEngine() {
  const [actionType, setActionType] = useState("data_share");
  const [riskLevel, setRiskLevel] = useState("medium");
  const [checkResult, setCheckResult] = useState<EthicsCheckResult | null>(null);

  const actionTypes = [
    { value: "data_share", label: "Data Sharing" },
    { value: "content_publish", label: "Content Publication" },
    { value: "fund_allocation", label: "Fund Allocation" },
    { value: "model_deployment", label: "AI Model Deployment" },
    { value: "user_suspension", label: "User Suspension" },
  ];

  const simulateEthicsCheck = () => {
    const results: Record<string, EthicsCheckResult> = {
      low_data_share: {
        allowed: true,
        decision: "allow",
        principlesTriggered: ["Privacy", "Transparency"],
        constraintsTriggered: [],
        riskLevel: "low",
        reason: "Anonymized data sharing within approved parameters. Privacy constraints satisfied.",
        evidence: ["Data anonymization k=10 verified", "Purpose limitation compliant", "Retention policy applied"],
      },
      medium_data_share: {
        allowed: false,
        decision: "escalate",
        principlesTriggered: ["Privacy", "Stewardship", "Fairness"],
        constraintsTriggered: ["DATA.PII_THRESHOLD_EXCEEDED", "PRIVACY.CONSENT_REQUIRED"],
        riskLevel: "medium",
        alternatives: [
          "Use aggregated data instead of individual records",
          "Increase anonymization level to k=20",
          "Limit data scope to essential fields only",
        ],
        escalationPath: "Privacy Review Board (2-3 business days)",
        reason: "Moderate privacy risk detected. Personal identifiable information threshold exceeded.",
        evidence: ["PII Sensitivity Analysis", "Third-party risk assessment", "Historical breach patterns"],
      },
      high_data_share: {
        allowed: false,
        decision: "deny",
        principlesTriggered: ["Privacy", "Preservation of Life", "Stewardship"],
        constraintsTriggered: [
          "DATA.SENSITIVE_HEALTH_DATA",
          "LIFE.HARM_RISK_HIGH",
          "PRIVACY.CONSENT_MISSING",
        ],
        riskLevel: "critical",
        alternatives: [
          "Obtain explicit consent from all affected individuals",
          "Use synthetic data generated from aggregates",
          "Conduct formal Privacy Impact Assessment first",
        ],
        escalationPath: "Immediate escalation to Ethics Board + Legal Review",
        reason:
          "Critical risk: Sensitive health data without proper consent. Potential for re-identification and harm.",
        evidence: [
          "Health data sensitivity classification: HIGH",
          "Consent audit: 0% coverage",
          "Re-identification risk: 87%",
        ],
      },
      medium_model_deployment: {
        allowed: false,
        decision: "escalate",
        principlesTriggered: ["Preservation of Life", "Fairness", "Transparency"],
        constraintsTriggered: ["LIFE.CRITICAL_SYSTEM_DEPLOYMENT", "FAIR.BIAS_AUDIT_REQUIRED"],
        riskLevel: "high",
        alternatives: [
          "Deploy in oversight-only mode with human final decision",
          "Complete bias audit across all demographic groups",
          "Add uncertainty quantification to all predictions",
        ],
        escalationPath: "Medical Ethics Board + Technical Safety Committee",
        reason: "High-stakes medical AI deployment requires comprehensive safety validation and bias testing.",
        evidence: [
          "Impact classification: Life-critical",
          "Bias audit status: In progress",
          "Safety validation: 78% complete",
        ],
      },
      low_fund_allocation: {
        allowed: true,
        decision: "allow",
        principlesTriggered: ["Stewardship", "Transparency", "Justice"],
        constraintsTriggered: [],
        riskLevel: "low",
        reason: "Standard community grant within approved parameters. All transparency requirements met.",
        evidence: [
          "Amount within delegation limit",
          "Public proposal with rationale",
          "Impact assessment completed",
        ],
      },
    };

    const key = `${riskLevel}_${actionType}`;
    const result =
      results[key] ||
      results[`medium_${actionType}`] ||
      results.medium_data_share;

    setCheckResult(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Values Engine</h1>
        <p className="mt-2 text-slate-600">
          Real-time ethics filtering for every platform action. Test how different actions are evaluated against
          ethical constraints.
        </p>
      </div>

      {/* Core Concept */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Cpu className="h-5 w-5 text-cyan-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-cyan-900">Ethics as Authorization</p>
            <p className="text-sm text-cyan-700 mt-1">
              Just like you check if someone is authorized, you check if an action is ethical. Every impactful
              action runs through the Values Engine before execution.
            </p>
          </div>
        </div>
      </div>

      {/* Ethics Principles Reference */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Universal Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ethicsPrinciples.map((principle) => (
            <div key={principle.id} className={`p-3 rounded border ${principle.color}`}>
              <p className="text-sm font-semibold">{principle.name}</p>
              <p className="text-xs mt-1 opacity-90">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Ethics Check Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Simulate Ethics Check</h2>

          <div className="space-y-4">
            {/* Action Type */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Action Type</label>
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {actionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Risk Level */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Scenario Risk Level</label>
              <div className="space-y-2">
                {["low", "medium", "high"].map((level) => (
                  <label key={level} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="risk"
                      value={level}
                      checked={riskLevel === level}
                      onChange={(e) => setRiskLevel(e.target.value)}
                      className="text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-slate-700 capitalize">{level} Risk</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Simulate Button */}
            <button
              onClick={simulateEthicsCheck}
              className="w-full px-4 py-3 bg-cyan-600 text-white font-medium rounded-md hover:bg-cyan-700 flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Run Ethics Check</span>
            </button>
          </div>

          {/* Integration Example */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="h-4 w-4 text-slate-600" />
              <h3 className="text-sm font-semibold text-slate-900">Integration Example</h3>
            </div>
            <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto">
              {`// Preflight check before action
const check = await valuesEngine.evaluate({
  action: "${actionType}",
  context: { user, data, risk }
});

if (check.decision === "deny") {
  showError(check.reason);
  suggestAlternatives(check.alternatives);
} else if (check.decision === "escalate") {
  routeToReview(check.escalationPath);
}

// Generate ethics receipt
createReceipt(check);`}
            </pre>
          </div>
        </div>

        {/* Result Panel */}
        <div>
          {checkResult ? (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Ethics Check Result</h2>
                <FileText className="h-5 w-5 text-slate-400" />
              </div>

              {/* Decision */}
              <div className="mb-6">
                <div
                  className={`flex items-center space-x-3 p-4 rounded-lg border ${
                    checkResult.decision === "allow"
                      ? "bg-green-50 border-green-200"
                      : checkResult.decision === "deny"
                      ? "bg-red-50 border-red-200"
                      : "bg-amber-50 border-amber-200"
                  }`}
                >
                  {checkResult.decision === "allow" ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : checkResult.decision === "deny" ? (
                    <XCircle className="h-6 w-6 text-red-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">
                      {checkResult.decision === "allow"
                        ? "ALLOWED"
                        : checkResult.decision === "deny"
                        ? "DENIED"
                        : "ESCALATED"}
                    </p>
                    <p className="text-sm text-slate-700 mt-1">{checkResult.reason}</p>
                  </div>
                </div>
              </div>

              {/* Risk Level */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Risk Assessment</h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 flex-1 rounded-full ${
                      checkResult.riskLevel === "low"
                        ? "bg-green-500"
                        : checkResult.riskLevel === "medium"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-slate-700 capitalize">
                    {checkResult.riskLevel} Risk
                  </span>
                </div>
              </div>

              {/* Principles Triggered */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Principles Evaluated</h3>
                <div className="flex flex-wrap gap-2">
                  {checkResult.principlesTriggered.map((principle) => {
                    const principleData = ethicsPrinciples.find((p) =>
                      p.name.toLowerCase().includes(principle.toLowerCase())
                    );
                    return (
                      <span
                        key={principle}
                        className={`text-xs px-2 py-1 rounded-full border ${
                          principleData?.color || "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {principle}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Constraints */}
              {checkResult.constraintsTriggered && checkResult.constraintsTriggered.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Constraints Triggered</h3>
                  <div className="space-y-1">
                    {checkResult.constraintsTriggered.map((constraint, idx) => (
                      <div
                        key={idx}
                        className="text-xs px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded font-mono"
                      >
                        {constraint}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Evidence Used</h3>
                <ul className="space-y-1">
                  {checkResult.evidence.map((evidence, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start space-x-2">
                      <Shield className="h-3 w-3 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Alternatives */}
              {checkResult.alternatives && checkResult.alternatives.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-amber-600" />
                    <h3 className="text-sm font-semibold text-slate-900">Suggested Alternatives</h3>
                  </div>
                  <div className="space-y-2">
                    {checkResult.alternatives.map((alt, idx) => (
                      <div key={idx} className="text-sm text-slate-700 bg-amber-50 border border-amber-200 rounded p-2">
                        {idx + 1}. {alt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Escalation Path */}
              {checkResult.escalationPath && (
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Escalation Path</h3>
                  <p className="text-sm text-slate-700 mb-3">{checkResult.escalationPath}</p>
                  <button className="w-full px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700">
                    Request Review
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <Cpu className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Run an ethics check to see results</p>
            </div>
          )}
        </div>
      </div>

      {/* Developer Resources */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Developer Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-cyan-200">
            <Code className="h-6 w-6 text-cyan-600 mb-2" />
            <h4 className="text-sm font-semibold text-slate-900">SDK Available</h4>
            <p className="text-xs text-slate-600 mt-1">Frontend & backend libraries with type safety</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-cyan-200">
            <Shield className="h-6 w-6 text-cyan-600 mb-2" />
            <h4 className="text-sm font-semibold text-slate-900">UI Components</h4>
            <p className="text-xs text-slate-600 mt-1">Pre-built receipt panels, badges, and modals</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-cyan-200">
            <Play className="h-6 w-6 text-cyan-600 mb-2" />
            <h4 className="text-sm font-semibold text-slate-900">Local Simulator</h4>
            <p className="text-xs text-slate-600 mt-1">Test ethics checks during development</p>
          </div>
        </div>
      </div>
    </div>
  );
}
