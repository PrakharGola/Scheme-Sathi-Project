import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../utils/api";

interface EligibilityResult {
  schemeId: string;
  name: string;
  priorityScore: number;
  reasons: string[];
  requiredDocuments: string[];
  potentialAnnualBenefit: number;
}

const EligibilityPage: React.FC = () => {
  const [form, setForm] = useState({
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
  });

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
        summary: { totalPotentialAnnualBenefit: number };
      };
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Eligibility Checker</h1>
      <div className="grid md:grid-cols-2 gap-4 bg-white border rounded-lg p-4 mb-6">
        <Input label="Age" name="age" value={form.age} onChange={handleChange} />
        <Select
          label="Gender"
          name="gender"
          value={form.gender}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" }
          ]}
          onChange={handleChange}
        />
        <Input
          label="State (e.g., UP, MH)"
          name="state"
          value={form.state}
          onChange={handleChange}
        />
        <Input
          label="Occupation"
          name="occupation"
          value={form.occupation}
          onChange={handleChange}
        />
        <Input
          label="Annual Income (₹)"
          name="annualIncome"
          value={form.annualIncome}
          onChange={handleChange}
        />
        <Input
          label="Family Size"
          name="familySize"
          value={form.familySize}
          onChange={handleChange}
        />

        <Checkbox
          label="I am a farmer"
          name="isFarmer"
          checked={form.isFarmer}
          onChange={handleChange}
        />
        <Checkbox
          label="I am a student"
          name="isStudent"
          checked={form.isStudent}
          onChange={handleChange}
        />
        <Checkbox
          label="I have a disability"
          name="isDisabled"
          checked={form.isDisabled}
          onChange={handleChange}
        />
        <Input
          label="Marital Status"
          name="maritalStatus"
          value={form.maritalStatus}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={() => mutation.mutate()}
        className="px-4 py-2 bg-primary text-white rounded text-sm"
      >
        Check Eligibility
      </button>

      {mutation.isPending && (
        <div className="mt-4 text-sm text-gray-600">Checking…</div>
      )}

      {mutation.data && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">
            Eligible Schemes ({mutation.data.eligibleSchemes.length})
          </h2>
          <div className="space-y-3">
            {mutation.data.eligibleSchemes.map((s) => (
              <div
                key={s.schemeId}
                className="bg-white border rounded p-3 text-sm"
              >
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-gray-500">
                  Priority score: {s.priorityScore}
                </div>
                <ul className="mt-1 text-xs text-gray-700 list-disc list-inside">
                  {s.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <div className="mt-1 text-xs">
                  Required documents: {s.requiredDocuments.join(", ")}
                </div>
                <div className="mt-1 text-xs">
                  Potential annual benefit: ₹{s.potentialAnnualBenefit}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm font-semibold">
            Total potential annual benefit: ₹
            {mutation.data.summary.totalPotentialAnnualBenefit}
          </div>
        </div>
      )}
    </div>
  );
};

const Input: React.FC<{
  label: string;
  name: string;
  value: any;
  onChange: any;
}> = ({ label, name, value, onChange }) => (
  <label className="text-sm flex flex-col gap-1">
    <span>{label}</span>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded px-2 py-1 text-sm"
    />
  </label>
);

const Select: React.FC<{
  label: string;
  name: string;
  value: any;
  options: { value: string; label: string }[];
  onChange: any;
}> = ({ label, name, value, options, onChange }) => (
  <label className="text-sm flex flex-col gap-1">
    <span>{label}</span>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded px-2 py-1 text-sm"
    >
      {options.map((o) => (
        <option value={o.value} key={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

const Checkbox: React.FC<{
  label: string;
  name: string;
  checked: boolean;
  onChange: any;
}> = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="rounded border-gray-300"
    />
    <span>{label}</span>
  </label>
);

export default EligibilityPage;
