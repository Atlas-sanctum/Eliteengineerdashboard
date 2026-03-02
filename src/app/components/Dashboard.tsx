import { Link } from "react-router";
import { Shield, Vote, Cpu, TrendingUp, AlertTriangle, CheckCircle, Clock, PlayCircle, Zap } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ethical AI Platform Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Real-time monitoring of ethical AI governance, policy enforcement, and community participation.
        </p>
      </div>

      {/* NEW: Live Demo Highlight */}
      <Link
        to="/demo"
        className="block bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-4">
            <div className="bg-white rounded-lg p-3">
              <PlayCircle className="h-8 w-8 text-cyan-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">✨ Ethics Core Vertical Slice Demo</h2>
              <p className="text-cyan-50 text-sm mb-3">
                Live demonstration of the complete ethics enforcement flow: Preflight checks → Decision receipts → Appeal paths → Audit trail
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center text-white">
                  <Zap className="h-4 w-4 mr-1" />
                  Real-time validation
                </span>
                <span className="flex items-center text-white">
                  <Shield className="h-4 w-4 mr-1" />
                  Policy Pack v1.8.2
                </span>
                <span className="flex items-center text-white">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Full audit trail
                </span>
              </div>
            </div>
          </div>
          <div className="text-white text-4xl">→</div>
        </div>
      </Link>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-600">Decisions Today</p>
              <p className="text-2xl font-bold text-slate-900">127</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Vote className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-600">Active Proposals</p>
              <p className="text-2xl font-bold text-slate-900">4</p>
              <p className="text-xs text-slate-600 mt-1">2 reaching quorum</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Cpu className="h-8 w-8 text-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-600">Ethics Checks</p>
              <p className="text-2xl font-bold text-slate-900">1,847</p>
              <p className="text-xs text-slate-600 mt-1">Last 24 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-slate-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-slate-900">98.4%</p>
              <p className="text-xs text-green-600 mt-1">Above target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Components Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Link
          to="/decisions"
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-indigo-600" />
            <h3 className="ml-2 text-lg font-semibold text-slate-900">Moral AI Protocols</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            AI-assisted decisions with ethical constraints, full auditability, and structured justifications.
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-slate-700">Decision receipts with proof trails</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-slate-700">Principle-based constraints</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-slate-700">Contestable with recourse paths</span>
            </div>
          </div>
        </Link>

        <Link
          to="/governance"
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Vote className="h-6 w-6 text-purple-600" />
            <h3 className="ml-2 text-lg font-semibold text-slate-900">DAO Governance</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Transparent policy creation, community voting, and collective decision-making with anti-capture
            safeguards.
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-slate-700">Public proposal & voting system</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-slate-700">Impact simulation before votes</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-slate-700">Delegation transparency</span>
            </div>
          </div>
        </Link>

        <Link
          to="/values-engine"
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Cpu className="h-6 w-6 text-cyan-600" />
            <h3 className="ml-2 text-lg font-semibold text-slate-900">Values Engine</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Real-time ethics filtering for every platform action with consistent evaluation and compliance
            artifacts.
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-cyan-600 mr-2" />
              <span className="text-slate-700">Preflight ethics checks</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-cyan-600 mr-2" />
              <span className="text-slate-700">Alternative suggestions</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-cyan-600 mr-2" />
              <span className="text-slate-700">Ethics receipts for all actions</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-slate-900">
                <span className="font-medium">High-risk decision escalated</span> - Medical AI deployment
                requires ethics board review
              </p>
              <p className="text-xs text-slate-500 mt-1">2 hours ago • DEC-2026-004</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-slate-900">
                <span className="font-medium">Proposal passed</span> - Emergency Climate Response Fund
                approved
              </p>
              <p className="text-xs text-slate-500 mt-1">5 hours ago • PROP-2026-014</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-slate-900">
                <span className="font-medium">New proposal active</span> - Data Retention Policy update open
                for voting
              </p>
              <p className="text-xs text-slate-500 mt-1">1 day ago • PROP-2026-015</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">System Status</h3>
            <p className="text-sm text-slate-600 mt-1">
              All ethical governance systems operational • Policy Version 1.8.2
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-900">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}