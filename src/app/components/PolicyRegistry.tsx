import { useState } from "react";
import { policyPackHistory, currentPolicyPack } from "../../data/policyPacks";
import { FileText, CheckCircle, Clock, ChevronDown, ChevronUp, Shield } from "lucide-react";

export function PolicyRegistry() {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(currentPolicyPack.version);

  const toggleVersion = (version: string) => {
    setExpandedVersion(expandedVersion === version ? null : version);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Policy Registry</h2>
        <p className="mt-2 text-slate-600">
          Complete history of ethics policy packs with version control and change tracking.
        </p>
      </div>

      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-cyan-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-cyan-900">Active Policy Version</p>
            <p className="text-sm text-cyan-700 mt-1">
              Current: <strong className="font-mono">{currentPolicyPack.version}</strong> • Activated{" "}
              {new Date(currentPolicyPack.activatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {policyPackHistory.map((pack) => {
          const isActive = pack.version === currentPolicyPack.version;
          const isExpanded = expandedVersion === pack.version;

          return (
            <div
              key={pack.version}
              className={`bg-white border rounded-lg overflow-hidden transition-all ${
                isActive ? "border-cyan-300 shadow-md" : "border-slate-200"
              }`}
            >
              {/* Header */}
              <div
                className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                  isActive ? "bg-cyan-50" : ""
                }`}
                onClick={() => toggleVersion(pack.version)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isActive ? (
                      <CheckCircle className="h-5 w-5 text-cyan-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-slate-400" />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-slate-900 font-mono">
                          Version {pack.version}
                        </p>
                        {isActive && (
                          <span className="text-xs px-2 py-0.5 bg-cyan-600 text-white rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-0.5">
                        {new Date(pack.activatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        • {pack.activatedBy}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-4 pt-0 space-y-4">
                  {/* Changelog */}
                  {pack.changelog && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-3">
                      <p className="text-xs font-semibold text-amber-900 mb-1">What Changed</p>
                      <p className="text-sm text-amber-800">{pack.changelog}</p>
                    </div>
                  )}

                  {/* Principles */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      Principles ({pack.principles.length})
                    </p>
                    <div className="space-y-2">
                      {pack.principles.map((principle) => (
                        <div
                          key={principle.id}
                          className="bg-slate-50 border border-slate-200 rounded p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-900">{principle.name}</p>
                              <p className="text-xs text-slate-600 mt-1">{principle.description}</p>
                            </div>
                            <span className="text-xs font-mono text-slate-500 ml-2">
                              P{principle.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      Rules ({pack.rules.length})
                    </p>
                    <div className="space-y-2">
                      {pack.rules.map((rule) => {
                        const principle = pack.principles.find((p) => p.id === rule.principleId);
                        return (
                          <div
                            key={rule.id}
                            className="bg-slate-50 border border-slate-200 rounded p-3"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-mono text-slate-600">{rule.id}</span>
                                {principle && (
                                  <span className="text-xs px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded">
                                    {principle.name}
                                  </span>
                                )}
                              </div>
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  rule.action === "deny"
                                    ? "bg-red-100 text-red-700"
                                    : rule.action === "escalate"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {rule.action}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 mb-1">
                              <strong>If:</strong> {rule.condition}
                            </p>
                            <p className="text-sm text-slate-700">
                              <strong>Then:</strong> {rule.message}
                            </p>
                            {rule.mitigations && rule.mitigations.length > 0 && (
                              <div className="mt-2 pl-3 border-l-2 border-amber-300">
                                <p className="text-xs font-semibold text-slate-700 mb-1">
                                  Required Mitigations:
                                </p>
                                {rule.mitigations.map((mitigation, idx) => (
                                  <p key={idx} className="text-xs text-slate-600">
                                    • {mitigation}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-2">
                    <button className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded hover:bg-slate-200 flex items-center justify-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Export Policy Pack</span>
                    </button>
                    {!isActive && (
                      <button className="flex-1 px-3 py-2 bg-cyan-600 text-white text-sm font-medium rounded hover:bg-cyan-700 flex items-center justify-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Compare with Current</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-sm text-slate-600">Total Versions</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{policyPackHistory.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-sm text-slate-600">Active Principles</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{currentPolicyPack.principles.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <p className="text-sm text-slate-600">Active Rules</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{currentPolicyPack.rules.length}</p>
        </div>
      </div>
    </div>
  );
}
