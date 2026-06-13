import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../utils/api";
import { useLanguage } from "../i18n/LanguageContext";

interface EligibilityResult {
  schemeId: string;
  name: string;
  priorityScore: number;
  reasons: string[];
  requiredDocuments: string[];
  potentialAnnualBenefit: number;
}

const initialForm = {
  age: 30,
  gender: "male",
  state: "UP",
  occupation: "farmer",
  annualIncome: 200000,
  isFarmer: true,
  isDisabled: false,
  isStudent: false,
  maritalStatus: "married",
  familySize: 4
};

const EligibilityPage: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/eligibility/check", {
        ...form,
        annualIncome: Number(form.annualIncome),
        age: Number(form.age),
        familySize: Number(form.familySize)
      });
      return res.data as {
        eligibleSchemes: EligibilityResult[];
        summary: { totalPotentialAnnualBenefit: number; responseId: string };
      };
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = "checked" in e.target ? e.target.checked : false;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const totalBenefit = mutation.data?.summary.totalPotentialAnnualBenefit || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-5">
        <div className="text-xs uppercase text-slate-500">{t("eligibilityEyebrow")}</div>
        <h1 className="text-2xl font-semibold">{t("eligibilityTitle")}</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <section className="rounded border border-white/80 bg-white/90 p-4 shadow-xl shadow-teal-900/5 h-fit backdrop-blur">
          <div className="grid gap-3">
            <Input label={t("eligibilityAge")} name="age" type="number" value={form.age} onChange={handleChange} />
            <Select
              label={t("eligibilityGender")}
              name="gender"
              value={form.gender}
              options={[
                { value: "male", label: t("eligibilityMale") },
                { value: "female", label: t("eligibilityFemale") },
                { value: "other", label: t("eligibilityOther") }
              ]}
              onChange={handleChange}
            />
            <Select
              label={t("eligibilityState")}
              name="state"
              value={form.state}
              options={["UP", "MH", "WB", "DL", "KA", "TN"].map((item) => ({
                value: item,
                label: item
              }))}
              onChange={handleChange}
            />
            <Input label={t("eligibilityOccupation")} name="occupation" value={form.occupation} onChange={handleChange} />
            <Input
              label={t("eligibilityIncome")}
              name="annualIncome"
              type="number"
              value={form.annualIncome}
              onChange={handleChange}
            />
            <Input
              label={t("eligibilityFamilySize")}
              name="familySize"
              type="number"
              value={form.familySize}
              onChange={handleChange}
            />
            <Input
              label={t("eligibilityMaritalStatus")}
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4 grid gap-2">
            <Checkbox label={t("eligibilityFarmer")} name="isFarmer" checked={form.isFarmer} onChange={handleChange} />
            <Checkbox label={t("eligibilityStudent")} name="isStudent" checked={form.isStudent} onChange={handleChange} />
            <Checkbox label={t("eligibilityDisability")} name="isDisabled" checked={form.isDisabled} onChange={handleChange} />
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="flex-1 rounded bg-primary px-4 py-2 text-sm font-medium text-white disabled:bg-slate-300"
            >
              {mutation.isPending ? t("eligibilityChecking") : t("eligibilityCheck")}
            </button>
            <button
              onClick={() => setForm(initialForm)}
              className="rounded border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {t("eligibilityReset")}
            </button>
          </div>
        </section>

        <section className="space-y-4">
          {mutation.isError && (
            <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {t("eligibilityError")}
            </div>
          )}

          {!mutation.data && !mutation.isPending && (
            <div className="rounded border border-slate-200 bg-white p-6 text-sm text-slate-600">
              {t("eligibilityEmpty")}
            </div>
          )}

          {mutation.data && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <Metric label={t("eligibilityMatches")} value={String(mutation.data.eligibleSchemes.length)} />
                <Metric label={t("eligibilityPotential")} value={`${t("commonRs")} ${totalBenefit.toLocaleString("en-IN")}`} />
                <Metric label={t("eligibilityResponse")} value={mutation.data.summary.responseId || "saved"} />
              </div>

              <div className="space-y-3">
                {mutation.data.eligibleSchemes.map((scheme) => (
                  <article key={scheme.schemeId} className="rounded border border-white/80 bg-white/90 p-4 shadow-lg shadow-slate-900/5 backdrop-blur">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="font-semibold text-slate-950">{scheme.name}</h2>
                        <div className="mt-1 text-xs text-slate-500">
                          {t("eligibilityPriority")} {scheme.priorityScore}
                        </div>
                      </div>
                      <div className="rounded bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1 text-sm font-semibold text-amber-800">
                        {t("commonRs")} {scheme.potentialAnnualBenefit.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-slate-700">
                      {scheme.reasons.map((reason) => (
                        <li key={reason}>- {reason}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {scheme.requiredDocuments.map((doc) => (
                        <span key={doc} className="rounded border border-teal-100 bg-teal-50 px-2 py-1 text-xs text-teal-800">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

const Input: React.FC<{
  label: string;
  name: string;
  value: string | number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, type = "text", onChange }) => (
  <label className="text-sm">
    <span className="text-slate-600">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded border border-teal-200 bg-teal-50/50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
    />
  </label>
);

const Select: React.FC<{
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, name, value, options, onChange }) => (
  <label className="text-sm">
    <span className="text-slate-600">{label}</span>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded border border-teal-200 bg-teal-50/50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

const Checkbox: React.FC<{
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-2 rounded border border-teal-100 bg-gradient-to-r from-teal-50 to-sky-50 px-3 py-2 text-sm text-slate-700">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-white/80 bg-gradient-to-br from-white to-teal-50 p-4 shadow-lg shadow-teal-900/5">
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-semibold text-slate-950">{value}</div>
    </div>
  );
}

export default EligibilityPage;
