import { useState } from "react";
import { PreflightRequest, PreflightResponse } from "../types";
import { runEthicsPreflight } from "../services/ethicsEngine";
import { Shield, Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface EthicsPreflightGateProps {
  actionType: string;
  actor: string;
  context: Record<string, any>;
  payloadSummary: string;
  onApproved: (receipt: PreflightResponse) => void;
  onDenied: (receipt: PreflightResponse) => void;
  onEscalated: (receipt: PreflightResponse) => void;
  children: React.ReactNode;
}

export function EthicsPreflightGate({
  actionType,
  actor,
  context,
  payloadSummary,
  onApproved,
  onDenied,
  onEscalated,
  children,
}: EthicsPreflightGateProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PreflightResponse | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleConfirm = async () => {
    setIsChecking(true);
    setShowResult(false);

    const request: PreflightRequest = {
      actionType,
      actor,
      context,
      payloadSummary,
    };

    try {
      const response = await runEthicsPreflight(request);
      setResult(response);
      setShowResult(true);

      // Route based on decision
      if (response.decision === "allow") {
        setTimeout(() => onApproved(response), 1500);
      } else if (response.decision === "deny") {
        onDenied(response);
      } else if (response.decision === "escalate") {
        onEscalated(response);
      }
    } catch (error) {
      console.error("Ethics check failed:", error);
    } finally {
      setIsChecking(false);
    }
  };

  if (showResult && result) {
    return (
      <div className="space-y-4">
        <div
          className={`p-4 rounded-lg border-2 ${
            result.decision === "allow"
              ? "bg-green-50 border-green-300"
              : result.decision === "deny"
              ? "bg-red-50 border-red-300"
              : "bg-amber-50 border-amber-300"
          }`}
        >
          <div className="flex items-start space-x-3">
            {result.decision === "allow" ? (
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : result.decision === "deny" ? (
              <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-slate-900 mb-1">
                {result.decision === "allow"
                  ? "Action Approved"
                  : result.decision === "deny"
                  ? "Action Denied"
                  : "Review Required"}
              </p>
              <p className="text-sm text-slate-700">{result.reason}</p>
              {result.requiredMitigations.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Required Mitigations:</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    {result.requiredMitigations.map((mitigation, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-amber-600">•</span>
                        <span>{mitigation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {result.decision !== "allow" && (
          <div className="text-sm text-slate-600">
            <p className="font-semibold mb-1">Receipt ID: {result.receiptId}</p>
            <p>This decision has been logged for audit purposes.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-cyan-900">Ethics Preflight Check</p>
            <p className="text-sm text-cyan-700 mt-1">
              This action will be evaluated against ethical principles before execution.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold text-slate-700">Action:</span>{" "}
            <span className="text-slate-600">{payloadSummary}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-700">Actor:</span>{" "}
            <span className="text-slate-600">{actor}</span>
          </div>
        </div>
      </div>

      {children}

      <button
        onClick={handleConfirm}
        disabled={isChecking}
        className="w-full px-4 py-3 bg-cyan-600 text-white font-medium rounded-md hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isChecking ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Running Ethics Check...</span>
          </>
        ) : (
          <>
            <Shield className="h-5 w-5" />
            <span>Confirm & Run Ethics Check</span>
          </>
        )}
      </button>
    </div>
  );
}
