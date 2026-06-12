import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppRoutes from "./routes";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              SS
            </span>
            <span className="font-semibold text-lg">SchemeSathi</span>
          </Link>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/" current={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/chat" current={location.pathname === "/chat"}>
              Chat
            </NavLink>
            <NavLink
              to="/eligibility"
              current={location.pathname === "/eligibility"}
            >
              Eligibility
            </NavLink>
            <NavLink to="/schemes" current={location.pathname === "/schemes"}>
              Schemes
            </NavLink>
            <NavLink to="/impact" current={location.pathname === "/impact"}>
              Impact
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <AppRoutes />
      </main>

      <footer className="bg-gray-100 border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-600 flex justify-between">
          <span>© {new Date().getFullYear()} SchemeSathi</span>
          <span>Built for NSS Open Projects 2026</span>
        </div>
      </footer>
    </div>
  );
};

const NavLink: React.FC<{
  to: string;
  current: boolean;
  children: React.ReactNode;
}> = ({ to, current, children }) => (
  <Link
    to={to}
    className={`px-2 py-1 rounded ${
      current ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"
    }`}
  >
    {children}
  </Link>
);

export default App;
