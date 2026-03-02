import { Outlet, Link, useLocation } from "react-router";
import { Shield, FileSearch, Vote, Cpu, Activity, PlayCircle, FileText } from "lucide-react";

export function Root() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Activity },
    { path: "/demo", label: "Live Demo", icon: PlayCircle },
    { path: "/decisions", label: "Decision Center", icon: Shield },
    { path: "/governance", label: "Governance", icon: Vote },
    { path: "/values-engine", label: "Values Engine", icon: Cpu },
    { path: "/audit", label: "Audit Explorer", icon: FileSearch },
    { path: "/policy-registry", label: "Policy Registry", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-slate-900">
                  Ethical AI Platform
                </span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/" && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm ${
                        isActive
                          ? "border-indigo-600 text-slate-900"
                          : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}