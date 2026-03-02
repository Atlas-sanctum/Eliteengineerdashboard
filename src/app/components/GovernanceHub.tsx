import { useState } from "react";
import { mockProposals } from "../data/mockData";
import { Proposal } from "../types";
import {
  Vote,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  GitCompare,
  Target,
  Shield,
} from "lucide-react";

export function GovernanceHub() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const statusColors = {
    active: "bg-blue-100 text-blue-800 border-blue-200",
    passed: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    pending: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const statusIcons = {
    active: <Clock className="h-5 w-5 text-blue-600" />,
    passed: <CheckCircle className="h-5 w-5 text-green-600" />,
    rejected: <AlertTriangle className="h-5 w-5 text-red-600" />,
    pending: <Clock className="h-5 w-5 text-slate-500" />,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">DAO Governance Hub</h1>
        <p className="mt-2 text-slate-600">
          Community-driven policy creation with transparent voting, impact simulation, and anti-capture safeguards.
        </p>
      </div>

      {/* Governance Principles */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Vote className="h-5 w-5 text-purple-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-purple-900">Governance Principles</p>
            <p className="text-sm text-purple-700 mt-1">
              All policy changes must be proposed, debated, simulated for impact, voted on, and publicly audited.
              No dark patterns, no capture by whales.
            </p>
          </div>
        </div>
      </div>

      {/* Participation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Voters</p>
              <p className="text-2xl font-bold text-slate-900">2,847</p>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 15% this week</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Quorum Rate</p>
              <p className="text-2xl font-bold text-slate-900">94%</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-slate-600 mt-2">Last 10 proposals</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Delegation Spread</p>
              <p className="text-2xl font-bold text-slate-900">Safe</p>
            </div>
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-slate-600 mt-2">No whale &gt; 5% power</p>
        </div>
      </div>

      {/* Proposals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proposals List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Active Proposals</h2>
            <button className="px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700">
              New Proposal
            </button>
          </div>

          {mockProposals.map((proposal) => (
            <div
              key={proposal.id}
              onClick={() => setSelectedProposal(proposal)}
              className={`bg-white rounded-lg shadow-sm border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow ${
                selectedProposal?.id === proposal.id ? "ring-2 ring-purple-500" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-3 flex-1">
                  {statusIcons[proposal.status]}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900">{proposal.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{proposal.id}</p>
                  </div>
                </div>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${
                    statusColors[proposal.status]
                  }`}
                >
                  {proposal.status}
                </span>
              </div>

              <p className="text-sm text-slate-700 mt-2">{proposal.summary}</p>

              {/* Voting Progress */}
              {(proposal.status === "active" || proposal.status === "pending") && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span>
                      {proposal.votesFor + proposal.votesAgainst} / {proposal.quorum} votes
                    </span>
                    <span>
                      {Math.round(((proposal.votesFor + proposal.votesAgainst) / proposal.quorum) * 100)}% to
                      quorum
                    </span>
                  </div>
                  <div className="bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${((proposal.votesFor + proposal.votesAgainst) / proposal.quorum) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between mt-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-green-500 rounded"></div>
                      <span className="text-slate-700">For: {proposal.votesFor}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 bg-red-500 rounded"></div>
                      <span className="text-slate-700">Against: {proposal.votesAgainst}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Risk Flags */}
              {proposal.riskFlags.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center space-x-1 text-xs text-amber-700 mb-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span className="font-medium">Risk Flags</span>
                  </div>
                  {proposal.riskFlags.slice(0, 2).map((flag, idx) => (
                    <p key={idx} className="text-xs text-slate-600">
                      • {flag}
                    </p>
                  ))}
                </div>
              )}

              {/* Impact Areas */}
              <div className="mt-3 flex flex-wrap gap-1">
                {proposal.impactAreas.map((area) => (
                  <span
                    key={area}
                    className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proposal Detail */}
        <div>
          {selectedProposal ? (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">{selectedProposal.title}</h2>

              {/* Metadata */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Proposal ID</span>
                  <span className="font-mono text-slate-900">{selectedProposal.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Proposer</span>
                  <span className="text-slate-900">{selectedProposal.proposer}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Created</span>
                  <span className="text-slate-900">{new Date(selectedProposal.created).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Status</span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                      statusColors[selectedProposal.status]
                    }`}
                  >
                    {selectedProposal.status}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Summary</h3>
                <p className="text-sm text-slate-700">{selectedProposal.summary}</p>
              </div>

              {/* Policy Diff */}
              {selectedProposal.policyDiff && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <GitCompare className="h-4 w-4 text-slate-600" />
                    <h3 className="text-sm font-semibold text-slate-900">Policy Changes</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-red-50 border border-red-200 rounded p-2">
                      <p className="text-xs font-medium text-red-800 mb-1">Before</p>
                      <p className="text-xs text-red-700">{selectedProposal.policyDiff.before}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded p-2">
                      <p className="text-xs font-medium text-green-800 mb-1">After</p>
                      <p className="text-xs text-green-700">{selectedProposal.policyDiff.after}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Impact Simulation */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Impact Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProposal.impactAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Risk Flags */}
              {selectedProposal.riskFlags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <h3 className="text-sm font-semibold text-slate-900">Risk Assessment</h3>
                  </div>
                  <div className="space-y-1">
                    {selectedProposal.riskFlags.map((flag, idx) => (
                      <p key={idx} className="text-xs text-slate-700 bg-amber-50 border border-amber-200 rounded p-2">
                        • {flag}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Voting Interface */}
              {selectedProposal.status === "active" && (
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Cast Your Vote</h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 flex items-center justify-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Vote For</span>
                    </button>
                    <button className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 flex items-center justify-center space-x-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Vote Against</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 text-center">
                    Your vote is recorded on-chain and cannot be changed
                  </p>
                </div>
              )}

              {/* View Discussion */}
              <div className="mt-4">
                <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50">
                  View Discussion & Comments
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <Vote className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Select a proposal to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Governance Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">What Changed This Week</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-slate-700">
              <strong>Emergency Climate Response Fund</strong> passed with 93.6% approval
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-slate-700">
              <strong>Data Retention Policy</strong> active - 62% toward quorum
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-slate-700">Policy version 1.8.2 activated with 3 new constraints</span>
          </div>
        </div>
      </div>
    </div>
  );
}