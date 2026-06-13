import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
        <div className="rounded border border-white/80 bg-white/85 p-6 sm:p-8 shadow-xl shadow-teal-900/5 backdrop-blur">
          <div className="text-sm font-semibold text-primary mb-3">{t("homeEyebrow")}</div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-normal text-slate-950 mb-4">
            {t("homeTitle")}
          </h1>
          <p className="text-slate-600 leading-7 max-w-2xl">
            {t("homeBody")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/chat"
              className="rounded bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700"
            >
              {t("homeStartChat")}
            </Link>
            <Link
              to="/eligibility"
              className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {t("homeCheckEligibility")}
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          <Metric label={t("homeMetricSchemes")} value={t("homeMetricSchemesValue")} />
          <Metric label={t("homeMetricFlows")} value={t("homeMetricFlowsValue")} />
          <Metric label={t("homeMetricFallback")} value={t("homeMetricFallbackValue")} />
        </div>
      </section>

      <section className="mt-6 grid md:grid-cols-3 gap-4">
        <Feature title={t("homeFeatureDiscovery")} body={t("homeFeatureDiscoveryBody")} />
        <Feature title={t("homeFeatureEligibility")} body={t("homeFeatureEligibilityBody")} />
        <Feature title={t("homeFeatureChat")} body={t("homeFeatureChatBody")} />
      </section>
    </div>
  );
};

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-white/80 bg-gradient-to-br from-white to-teal-50 p-4 shadow-lg shadow-teal-900/5">
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="mt-2 text-xl font-semibold text-slate-950">{value}</div>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{body}</div>
    </div>
  );
}

export default LandingPage;
