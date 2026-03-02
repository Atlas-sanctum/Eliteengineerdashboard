import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { DecisionCenter } from "./components/DecisionCenter";
import { GovernanceHub } from "./components/GovernanceHub";
import { ValuesEngine } from "./components/ValuesEngine";
import { AuditExplorer } from "./components/AuditExplorer";
import { EthicsDemo } from "./components/EthicsDemo";
import { PolicyRegistry } from "./components/PolicyRegistry";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "decisions", Component: DecisionCenter },
      { path: "governance", Component: GovernanceHub },
      { path: "values-engine", Component: ValuesEngine },
      { path: "audit", Component: AuditExplorer },
      { path: "demo", Component: EthicsDemo },
      { path: "policy-registry", Component: PolicyRegistry },
    ],
  },
]);