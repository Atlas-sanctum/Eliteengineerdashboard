import { useState } from "react";
import { X, AlertTriangle, Send } from "lucide-react";

interface AppealModalProps {
  receiptId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, evidence: string) => void;
}

export function AppealModal({ receiptId, isOpen, onClose, onSubmit }: AppealModalProps) {
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit(reason, evidence);
    setIsSubmitting(false);
    setReason("");
    setEvidence("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-slate-900">File an Appeal</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Receipt ID:</strong> {receiptId}
            </p>
            <p className="text-sm text-amber-700 mt-2">
              Your appeal will be reviewed by the appropriate ethics board. You will be notified of the
              decision typically within 3-5 business days. Appeals are logged publicly for transparency.
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Reason for Appeal <span className="text-red-600">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={4}
              placeholder="Explain why you believe this decision should be reconsidered..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Supporting Evidence */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Supporting Evidence <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              rows={4}
              placeholder="Provide any additional context, documentation, or evidence supporting your appeal..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Appeal Routes Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-900 mb-2">Appeal Review Process</p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• <strong>Human Review:</strong> Ethics board member conducts initial assessment</li>
              <li>• <strong>DAO Review:</strong> Complex cases may be escalated to community vote</li>
              <li>• <strong>Public Record:</strong> Final decisions are added to the public audit log</li>
              <li>• <strong>Precedent:</strong> Appeal outcomes inform future policy updates</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !reason.trim()}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Appeal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
