import React from "react";
import { Link, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import { AppLanguage, languageOptions, useLanguage } from "./i18n/LanguageContext";

const navItems = [
  { to: "/", labelKey: "navHome" as const },
  { to: "/chat", labelKey: "navChat" as const },
  { to: "/eligibility", labelKey: "navEligibility" as const },
  { to: "/schemes", labelKey: "navSchemes" as const },
  { to: "/impact", labelKey: "navImpact" as const }
];

const App: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col text-slate-950">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/85 shadow-sm backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="h-10 w-10 rounded bg-gradient-to-br from-primary via-secondary to-saffron text-white flex items-center justify-center font-bold shadow-md">
              SS
            </span>
            <span>
              <span className="block font-semibold leading-tight">SchemeSathi</span>
              <span className="block text-xs text-slate-500">{t("brandTagline")}</span>
            </span>
          </Link>
          <div className="flex flex-col gap-2 sm:items-end">
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <span>{t("language")}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as AppLanguage)}
                className="rounded border border-teal-200 bg-teal-50 px-2 py-1 text-xs font-medium text-slate-900 shadow-sm"
              >
                {languageOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.nativeName}
                  </option>
                ))}
              </select>
            </label>
            <nav className="flex gap-1 overflow-x-auto text-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  current={location.pathname === item.to}
                >
                  {t(item.labelKey)}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <AppRoutes />
      </main>

      <footer className="border-t border-white/70 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footerCopyright")} {new Date().getFullYear()} SchemeSathi</span>
          <span>{t("footerBuilt")}</span>
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
    className={`whitespace-nowrap rounded px-3 py-2 transition ${
      current
        ? "bg-gradient-to-r from-teal-50 to-sky-50 text-primary font-semibold shadow-sm"
        : "text-slate-600 hover:bg-white hover:text-slate-950"
    }`}
  >
    {children}
  </Link>
);

export default App;
