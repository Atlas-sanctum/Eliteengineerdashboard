import { useState } from "react";
import { mockDecisions, ethicsPrinciples } from "../data/mockData";
import { DecisionRecord } from "../types";
import { FileSearch, Download, Filter, Calendar, User, Shield, ExternalLink } from "lucide-react";

export function AuditExplorer() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPrinciple, setFilterPrinciple] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedForExport, setSelectedForExport] = useState<string[]>([]);

  const filteredDecisions = mockDecisions.filter((decision) => {
    const matchesStatus = filterStatus === "all" || decision.status === filterStatus;
    const matchesPrinciple =
      filterPrinciple === "all" ||
      decision.principlesApplied.some((p) => p.toLowerCase().includes(filterPrinciple.toLowerCase()));
    const matchesSearch =
      searchQuery === "" ||
      decision.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      decision.decisionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      decision.actor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPrinciple && matchesSearch;
  });

  const toggleExport = (id: string) => {
    setSelectedForExport((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const exportSelected = () => {
    const dataToExport = mockDecisions.filter((d) => selectedForExport.includes(d.decisionId));
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ethics-audit-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Audit Explorer</h1>
        <p className="mt-2 text-slate-600">
          Searchable timeline of all ethical decisions with exportable receipts for regulators and partners.
        </p>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Total Decisions</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{mockDecisions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {mockDecisions.filter((d) => d.status === "approved").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Escalated</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {mockDecisions.filter((d) => d.status === "escalated").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Under Review</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {mockDecisions.filter((d) => d.status === "needs_review").length}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Filters & Search</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Decision ID, actor, or description..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
              <option value="needs_review">Needs Review</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>

          {/* Principle Filter */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Principle</label>
            <select
              value={filterPrinciple}
              onChange={(e) => setFilterPrinciple(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Principles</option>
              {ethicsPrinciples.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Export Actions */}
        {selectedForExport.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">{selectedForExport.length}</span> decisions selected for export
              </p>
              <button
                onClick={exportSelected}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export as JSON</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Audit Trail ({filteredDecisions.length} records)
            </h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>Export All</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {filteredDecisions.map((decision) => (
            <div key={decision.decisionId} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedForExport.includes(decision.decisionId)}
                  onChange={() => toggleExport(decision.decisionId)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-semibold text-slate-900">{decision.description}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                            decision.status === "approved"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : decision.status === "denied"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : decision.status === "needs_review"
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-orange-100 text-orange-800 border-orange-200"
                          }`}
                        >
                          {decision.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 font-mono">{decision.decisionId}</p>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div className="flex items-start space-x-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500">Timestamp</p>
                        <p className="text-xs text-slate-900">
                          {new Date(decision.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <User className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500">Actor</p>
                        <p className="text-xs text-slate-900">{decision.actor.split("(")[0].trim()}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Shield className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500">Risk Score</p>
                        <p className="text-xs text-slate-900">{decision.riskScore}/10</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <FileSearch className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500">Policy Version</p>
                        <p className="text-xs text-slate-900">{decision.policyVersion}</p>
                      </div>
                    </div>
                  </div>

                  {/* Principles */}
                  <div className="mb-2">
                    <p className="text-xs text-slate-600 mb-1">Principles Applied:</p>
                    <div className="flex flex-wrap gap-1">
                      {decision.principlesApplied.map((principle) => {
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
                  </div>

                  {/* Constraints */}
                  {decision.constraintsTriggered.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-slate-600 mb-1">Constraints Triggered:</p>
                      <div className="flex flex-wrap gap-1">
                        {decision.constraintsTriggered.map((constraint) => (
                          <span
                            key={constraint}
                            className="text-xs px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded font-mono"
                          >
                            {constraint}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-3 mt-3">
                    <button className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center space-x-1">
                      <ExternalLink className="h-3 w-3" />
                      <span>View Full Receipt</span>
                    </button>
                    <button className="text-xs text-slate-600 hover:text-slate-700">Export</button>
                    <button className="text-xs text-slate-600 hover:text-slate-700">View Appeal History</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDecisions.length === 0 && (
          <div className="p-12 text-center">
            <FileSearch className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No decisions match your filters</p>
          </div>
        )}
      </div>

      {/* Compliance Summary */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Compliance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Overall Compliance</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "98.4%" }}></div>
              </div>
              <span className="text-sm font-bold text-green-700">98.4%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Appeals Resolved</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
              <span className="text-sm font-bold text-green-700">100%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Avg. Review Time</p>
            <p className="text-2xl font-bold text-slate-900">2.3 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
