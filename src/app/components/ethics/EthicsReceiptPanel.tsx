import { PreflightResponse } from "../../types";
import { Shield, FileText, AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react";

interface EthicsReceiptPanelProps {
  receipt: PreflightResponse;
  showActions?: boolean;
  onAppeal?: () => void;
}

export function EthicsReceiptPanel({ receipt, showActions = true, onAppeal }: EthicsReceiptPanelProps) {
  const decisionColor =
    receipt.decision === "allow"
      ? "bg-green-50 border-green-200 text-green-800"
      : receipt.decision === "deny"
      ? "bg-red-50 border-red-200 text-red-800"
      : "bg-amber-50 border-amber-200 text-amber-800";

  const DecisionIcon =
    receipt.decision === "allow" ? CheckCircle : receipt.decision === "deny" ? XCircle : AlertTriangle;

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-slate-600" />
            <h3 className="font-semibold text-slate-900">Ethics Decision Receipt</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">{receipt.receiptId}</span>
        </div>
      </div>

      {/* Decision */}
      <div className="p-4 border-b border-slate-200">
        <div className={`flex items-start space-x-3 p-3 rounded-lg border ${decisionColor}`}>
          <DecisionIcon className="h-6 w-6 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-sm uppercase tracking-wide mb-1">
              {receipt.decision === "allow" ? "APPROVED" : receipt.decision === "deny" ? "DENIED" : "ESCALATED"}
            </p>
            <p className="text-sm">{receipt.reason}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-4">
        {/* Policy Version */}
        <div>
          <p className="text-xs font-semibold text-slate-700 mb-1">Policy Version</p>
          <p className="text-sm text-slate-600 font-mono">{receipt.policyVersion}</p>
        </div>

        {/* Risk Level */}
        <div>
          <p className="text-xs font-semibold text-slate-700 mb-2">Risk Assessment</p>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-slate-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  receipt.riskLevel === "low"
                    ? "bg-green-500 w-1/4"
                    : receipt.riskLevel === "medium"
                    ? "bg-amber-500 w-1/2"
                    : receipt.riskLevel === "high"
                    ? "bg-orange-500 w-3/4"
                    : "bg-red-500 w-full"
                }`}
              ></div>
            </div>
            <span className="text-sm font-medium text-slate-700 capitalize">{receipt.riskLevel}</span>
          </div>
        </div>

        {/* Principles Applied */}
        <div>
          <p className="text-xs font-semibold text-slate-700 mb-2">Principles Applied</p>
          <div className="flex flex-wrap gap-2">
            {receipt.principlesApplied.map((principle, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full"
              >
                {principle}
              </span>
            ))}
          </div>
        </div>

        {/* Constraints */}
        {receipt.constraintsTriggered.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2">Constraints Triggered</p>
            <div className="space-y-1">
              {receipt.constraintsTriggered.map((constraint, idx) => (
                <div key={idx} className="text-xs px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded font-mono">
                  {constraint}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Required Mitigations */}
        {receipt.requiredMitigations.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2">Required Mitigations</p>
            <ul className="space-y-1">
              {receipt.requiredMitigations.map((mitigation, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex items-start space-x-2">
                  <span className="text-amber-600">•</span>
                  <span>{mitigation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Evidence */}
        {receipt.evidence.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2">Evidence References</p>
            <ul className="space-y-1">
              {receipt.evidence.map((evidence, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start space-x-2">
                  <Shield className="h-3 w-3 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>{evidence}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Escalation Path */}
        {receipt.escalationPath && (
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-1">Escalation Path</p>
            <p className="text-sm text-slate-600">{receipt.escalationPath}</p>
          </div>
        )}

        {/* Alternatives */}
        {receipt.alternatives && receipt.alternatives.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2">Alternative Approaches</p>
            <div className="space-y-2">
              {receipt.alternatives.map((alt, idx) => (
                <div key={idx} className="text-sm text-slate-700 bg-amber-50 border border-amber-200 rounded p-2">
                  {idx + 1}. {alt}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          {onAppeal && receipt.decision !== "allow" && (
            <button
              onClick={onAppeal}
              className="w-full px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>File an Appeal</span>
            </button>
          )}
          <button className="w-full px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-300 flex items-center justify-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span>Export Receipt</span>
          </button>
        </div>
      )}
    </div>
  );
}
