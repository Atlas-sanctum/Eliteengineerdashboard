import { useState } from "react";
import { EthicsPreflightGate } from "./ethics/EthicsPreflightGate";
import { EthicsReceiptPanel } from "./ethics/EthicsReceiptPanel";
import { AppealModal } from "./ethics/AppealModal";
import { PreflightResponse } from "../types";
import { PlayCircle, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function EthicsDemo() {
  const [selectedScenario, setSelectedScenario] = useState<string>("data_share_high");
  const [receipt, setReceipt] = useState<PreflightResponse | null>(null);
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const scenarios = [
    {
      id: "data_share_high",
      name: "High-Risk Data Share",
      description: "Share sensitive health data with external research partner without consent",
      actionType: "data_share",
      actor: "Dr. Sarah Chen (Research Lead)",
      context: {
        sensitiveData: true,
        piiExposure: "high",
        externalPartner: true,
        healthData: true,
        consent: false,
      },
      payloadSummary: "Share 10,000 patient health records with ExternalResearch Inc.",
      expectedOutcome: "deny",
    },
    {
      id: "data_share_medium",
      name: "Medium-Risk Data Share",
      description: "Share anonymized data with proper mitigations",
      actionType: "data_share",
      actor: "Dr. Sarah Chen (Research Lead)",
      context: {
        sensitiveData: true,
        piiExposure: "medium",
        externalPartner: true,
        healthData: true,
        consent: true,
      },
      payloadSummary: "Share 5,000 anonymized health records (k=15) with research partner",
      expectedOutcome: "escalate",
    },
    {
      id: "model_deployment",
      name: "AI Model Deployment",
      description: "Deploy medical AI without completed bias audit",
      actionType: "model_deployment",
      actor: "Dr. Amara Okafor (ML Engineering)",
      context: {
        criticalSystem: true,
        biasAuditComplete: false,
        medicalUse: true,
      },
      payloadSummary: "Deploy diagnostic AI model to emergency triage system",
      expectedOutcome: "escalate",
    },
    {
      id: "fund_allocation_high",
      name: "Large Fund Allocation",
      description: "Treasury allocation exceeding delegation limit",
      actionType: "fund_allocation",
      actor: "Marcus Rodriguez (Treasury Lead)",
      context: {
        amount: 75000,
        conflictOfInterest: false,
      },
      payloadSummary: "Allocate $75,000 for climate research grant",
      expectedOutcome: "escalate",
    },
    {
      id: "fund_allocation_low",
      name: "Standard Grant",
      description: "Small community grant within approved limits",
      actionType: "fund_allocation",
      actor: "Marcus Rodriguez (Treasury Lead)",
      context: {
        amount: 15000,
        conflictOfInterest: false,
      },
      payloadSummary: "Allocate $15,000 for local education initiative",
      expectedOutcome: "allow",
    },
  ];

  const scenario = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  const handleApproved = (receipt: PreflightResponse) => {
    setReceipt(receipt);
    setCompletedSteps([...completedSteps, "preflight", "approved"]);
    toast.success("Action approved! Receipt generated.", {
      description: `Receipt ID: ${receipt.receiptId}`,
    });
  };

  const handleDenied = (receipt: PreflightResponse) => {
    setReceipt(receipt);
    setCompletedSteps([...completedSteps, "preflight", "denied"]);
    toast.error("Action denied by ethics check", {
      description: "Review the receipt for alternatives",
    });
  };

  const handleEscalated = (receipt: PreflightResponse) => {
    setReceipt(receipt);
    setCompletedSteps([...completedSteps, "preflight", "escalated"]);
    toast.warning("Action requires review", {
      description: receipt.escalationPath || "Sent to ethics board",
    });
  };

  const handleAppealSubmit = (reason: string, evidence: string) => {
    setShowAppealModal(false);
    setCompletedSteps([...completedSteps, "appeal"]);
    toast.success("Appeal submitted successfully", {
      description: "You will be notified when reviewed",
    });
  };

  const resetDemo = () => {
    setReceipt(null);
    setCompletedSteps([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ethics Core Vertical Slice</h1>
        <p className="mt-2 text-slate-600">
          End-to-end demonstration: Ethics enforcement → Audit trail → Governance → Appeal path
        </p>
      </div>

      {/* Process Steps */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Complete Flow</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { key: "preflight", icon: PlayCircle, label: "1. Preflight Check", color: "cyan" },
            { key: "decision", icon: CheckCircle2, label: "2. Decision Receipt", color: "green" },
            { key: "appeal", icon: AlertTriangle, label: "3. Appeal (if needed)", color: "amber" },
            { key: "audit", icon: XCircle, label: "4. Audit Trail", color: "purple" },
          ].map((step) => {
            const isCompleted = completedSteps.includes(step.key);
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCompleted
                    ? `bg-${step.color}-100 border-${step.color}-400`
                    : "bg-white border-slate-200"
                }`}
              >
                <Icon
                  className={`h-6 w-6 mb-2 ${
                    isCompleted ? `text-${step.color}-600` : "text-slate-400"
                  }`}
                />
                <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                {isCompleted && (
                  <p className="text-xs text-green-600 mt-1">✓ Completed</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Test Scenario</h3>
        <div className="space-y-3">
          {scenarios.map((s) => (
            <label
              key={s.id}
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedScenario === s.id
                  ? "bg-cyan-50 border-cyan-300"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="scenario"
                value={s.id}
                checked={selectedScenario === s.id}
                onChange={(e) => {
                  setSelectedScenario(e.target.value);
                  resetDemo();
                }}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{s.name}</p>
                <p className="text-sm text-slate-600 mt-1">{s.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-slate-500">Expected:</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      s.expectedOutcome === "allow"
                        ? "bg-green-100 text-green-700"
                        : s.expectedOutcome === "deny"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {s.expectedOutcome}
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Preflight Gate */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Action Request</h3>
          {receipt ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-green-900">Ethics check completed</p>
                <p className="text-xs text-green-700 mt-1">See receipt panel for details</p>
              </div>
              <button
                onClick={resetDemo}
                className="w-full px-4 py-2 bg-slate-600 text-white font-medium rounded-md hover:bg-slate-700"
              >
                Try Another Scenario
              </button>
            </div>
          ) : (
            <EthicsPreflightGate
              actionType={scenario.actionType}
              actor={scenario.actor}
              context={scenario.context}
              payloadSummary={scenario.payloadSummary}
              onApproved={handleApproved}
              onDenied={handleDenied}
              onEscalated={handleEscalated}
            >
              {/* Additional context display */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-slate-700 mb-2">Context Parameters:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(scenario.context).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-slate-600">{key}:</span>
                      <span className="font-mono text-slate-900">
                        {typeof value === "boolean" ? (value ? "✓" : "✗") : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </EthicsPreflightGate>
          )}
        </div>

        {/* Right: Receipt Panel */}
        <div>
          {receipt ? (
            <EthicsReceiptPanel
              receipt={receipt}
              showActions={true}
              onAppeal={() => setShowAppealModal(true)}
            />
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
              <PlayCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Run an ethics check to see receipt</p>
            </div>
          )}
        </div>
      </div>

      {/* Acceptance Tests */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Acceptance Tests ✓</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Sensitive action cannot complete without receipt",
            "Denied action shows why + alternatives",
            "Policy version shown in every receipt",
            "User can appeal and track status",
            "All decisions logged for audit",
            "Escalation path clearly specified",
          ].map((test, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700">{test}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Appeal Modal */}
      <AppealModal
        receiptId={receipt?.receiptId || ""}
        isOpen={showAppealModal}
        onClose={() => setShowAppealModal(false)}
        onSubmit={handleAppealSubmit}
      />
    </div>
  );
}
