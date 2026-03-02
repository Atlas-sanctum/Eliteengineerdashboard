import { useState } from "react";
import { mockDecisions, ethicsPrinciples } from "../data/mockData";
import { DecisionRecord } from "../types";
import { Shield, AlertCircle, CheckCircle, Clock, ExternalLink, FileText, AlertTriangle } from "lucide-react";

export function DecisionCenter() {
  const [selectedDecision, setSelectedDecision] = useState<DecisionRecord | null>(null);
  const [explanationMode, setExplanationMode] = useState<"citizen" | "auditor" | "engineer">("citizen");

  const statusIcons = {
    approved: <CheckCircle className="h-5 w-5 text-green-600" />,
    denied: <AlertCircle className="h-5 w-5 text-red-600" />,
    needs_review: <Clock className="h-5 w-5 text-amber-600" />,
    escalated: <AlertTriangle className="h-5 w-5 text-orange-600" />,
  };

  const statusColors = {
    approved: "bg-green-100 text-green-800 border-green-200",
    denied: "bg-red-100 text-red-800 border-red-200",
    needs_review: "bg-amber-100 text-amber-800 border-amber-200",
    escalated: "bg-orange-100 text-orange-800 border-orange-200",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Decision Center</h1>
        <p className="mt-2 text-slate-600">
          AI-assisted decisions with full ethical accountability. Every decision produces a verifiable receipt.
        </p>
      </div>

      {/* Key Principle: AI is advisory, Policy is binding */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-indigo-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-indigo-900">Core Principle</p>
            <p className="text-sm text-indigo-700 mt-1">
              AI is <span className="font-semibold">advisory</span>; Policy is{" "}
              <span className="font-semibold">binding</span>. All decisions follow ethical constraints and are
              fully contestable.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Decision List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Recent Decisions</h2>
          {mockDecisions.map((decision) => (
            <div
              key={decision.decisionId}
              onClick={() => setSelectedDecision(decision)}
              className={`bg-white rounded-lg shadow-sm border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow ${
                selectedDecision?.decisionId === decision.decisionId ? "ring-2 ring-indigo-500" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {statusIcons[decision.status]}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{decision.description}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      {decision.actor} • {decision.decisionId}
                    </p>
                  </div>
                </div>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${
                    statusColors[decision.status]
                  }`}
                >
                  {decision.status.replace("_", " ")}
                </span>
              </div>

              <div className="mt-3 flex items-center space-x-2">
                <span className="text-xs text-slate-600">Risk Score:</span>
                <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-xs">
                  <div
                    className={`h-2 rounded-full ${
                      decision.riskScore < 3
                        ? "bg-green-500"
                        : decision.riskScore < 6
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${decision.riskScore * 10}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-slate-700">{decision.riskScore}/10</span>
              </div>

              {decision.principlesApplied.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {decision.principlesApplied.slice(0, 3).map((principle) => {
                    const principleData = ethicsPrinciples.find((p) =>
                      p.name.toLowerCase().includes(principle.toLowerCase())
                    );
                    return (
                      <span
                        key={principle}
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          principleData?.color || "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {principle}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Decision Receipt Panel */}
        <div>
          {selectedDecision ? (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900">Decision Receipt</h2>
                <FileText className="h-5 w-5 text-slate-400" />
              </div>

              {/* Explanation Mode Toggle */}
              <div className="mb-6">
                <label className="text-xs font-medium text-slate-600 mb-2 block">Explanation Mode</label>
                <div className="flex space-x-2">
                  {(["citizen", "auditor", "engineer"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setExplanationMode(mode)}
                      className={`px-3 py-1 text-xs font-medium rounded-md ${
                        explanationMode === mode
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* What Happened */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">What Happened?</h3>
                  <p className="text-sm text-slate-700">{selectedDecision.description}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    {statusIcons[selectedDecision.status]}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        statusColors[selectedDecision.status]
                      }`}
                    >
                      {selectedDecision.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Why */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">Why Did It Happen?</h3>
                  {explanationMode === "citizen" && (
                    <p className="text-sm text-slate-700">
                      This decision was evaluated against our ethical policies (version{" "}
                      {selectedDecision.policyVersion}). The system considered principles like{" "}
                      {selectedDecision.principlesApplied.join(", ")} and determined a risk score of{" "}
                      {selectedDecision.riskScore}/10.
                    </p>
                  )}
                  {explanationMode === "auditor" && (
                    <div className="text-sm text-slate-700">
                      <p>
                        <strong>Policy Version:</strong> {selectedDecision.policyVersion}
                      </p>
                      <p>
                        <strong>Risk Assessment:</strong> {selectedDecision.riskScore}/10 (
                        {selectedDecision.harmEstimate})
                      </p>
                      <p>
                        <strong>Decision Timestamp:</strong> {new Date(selectedDecision.timestamp).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {explanationMode === "engineer" && (
                    <div className="text-xs font-mono text-slate-700 bg-slate-50 p-2 rounded">
                      <pre>
                        {JSON.stringify(
                          {
                            decision_id: selectedDecision.decisionId,
                            policy_version: selectedDecision.policyVersion,
                            status: selectedDecision.status,
                            risk_score: selectedDecision.riskScore,
                            constraints: selectedDecision.constraintsTriggered,
                          },
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Principles Applied */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Which Principles Were Invoked?</h3>
                  <div className="space-y-2">
                    {selectedDecision.principlesApplied.map((principle) => {
                      const principleData = ethicsPrinciples.find((p) =>
                        p.name.toLowerCase().includes(principle.toLowerCase())
                      );
                      return (
                        <div
                          key={principle}
                          className={`p-2 rounded border ${
                            principleData?.color || "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          <p className="text-xs font-medium">{principle}</p>
                          {principleData && <p className="text-xs mt-1 opacity-90">{principleData.description}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Constraints Triggered */}
                {selectedDecision.constraintsTriggered.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">Constraints Triggered</h3>
                    <div className="space-y-1">
                      {selectedDecision.constraintsTriggered.map((constraint) => (
                        <div
                          key={constraint}
                          className="text-xs px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded"
                        >
                          {constraint}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evidence Used */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">What Evidence Was Used?</h3>
                  <ul className="space-y-1">
                    {selectedDecision.evidenceRefs.map((evidence, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-center space-x-1">
                        <ExternalLink className="h-3 w-3 text-indigo-600" />
                        <span>{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Counterfactuals */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">What Would Change the Outcome?</h3>
                  <ul className="space-y-1">
                    {selectedDecision.counterfactuals.map((cf, idx) => (
                      <li key={idx} className="text-xs text-slate-700">
                        • {cf}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Appeal Path */}
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">Who Can Challenge It?</h3>
                  <p className="text-sm text-slate-700 mb-3">{selectedDecision.appealRoute}</p>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                    File Appeal
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <Shield className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Select a decision to view its receipt</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
