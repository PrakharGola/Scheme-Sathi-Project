import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const ImpactPage: React.FC = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState({
    households: 10000,
    currentAwareness: 40,
    postAwareness: 60,
    avgBenefit: 6000
  });

  const additionalBeneficiaries = Math.max(
    0,
    inputs.households * ((inputs.postAwareness - inputs.currentAwareness) / 100)
  );
  const estimatedEconomicImpact = additionalBeneficiaries * inputs.avgBenefit;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-5">
        <div className="text-xs uppercase text-slate-500">{t("impactEyebrow")}</div>
        <h1 className="text-2xl font-semibold">{t("impactTitle")}</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <section className="rounded border border-white/80 bg-white/90 p-4 shadow-xl shadow-teal-900/5 backdrop-blur">
          <div className="grid gap-3">
            <LabelInput label={t("impactHouseholds")} name="households" value={inputs.households} onChange={handleChange} />
            <LabelInput label={t("impactCurrentAwareness")} name="currentAwareness" value={inputs.currentAwareness} onChange={handleChange} />
            <LabelInput label={t("impactPostAwareness")} name="postAwareness" value={inputs.postAwareness} onChange={handleChange} />
            <LabelInput label={t("impactAverageBenefit")} name="avgBenefit" value={inputs.avgBenefit} onChange={handleChange} />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 h-fit">
          <ImpactCard
            label={t("impactAdditionalBeneficiaries")}
            value={additionalBeneficiaries.toLocaleString("en-IN", {
              maximumFractionDigits: 0
            })}
          />
          <ImpactCard
            label={t("impactEstimatedImpact")}
            value={`${t("commonRs")} ${estimatedEconomicImpact.toLocaleString("en-IN", {
              maximumFractionDigits: 0
            })}`}
          />
        </section>
      </div>
    </div>
  );
};

const LabelInput: React.FC<{
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <label className="text-sm">
    <span className="text-slate-600">{label}</span>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded border border-teal-200 bg-teal-50/50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
    />
  </label>
);

const ImpactCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded border border-white/80 bg-gradient-to-br from-white to-orange-50 p-4 shadow-lg shadow-orange-900/5">
    <div className="text-xs uppercase text-slate-500">{label}</div>
    <div className="mt-2 text-2xl font-semibold text-slate-950">{value}</div>
  </div>
);

export default ImpactPage;
