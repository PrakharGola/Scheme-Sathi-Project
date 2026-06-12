import React, { useState } from "react";

const ImpactPage: React.FC = () => {
  const [inputs, setInputs] = useState({
    households: 10000,
    currentAwareness: 40,
    postAwareness: 60,
    avgBenefit: 6000
  });

  const additionalBeneficiaries =
    inputs.households *
    ((inputs.postAwareness - inputs.currentAwareness) / 100);
  const estimatedEconomicImpact = additionalBeneficiaries * inputs.avgBenefit;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Impact Calculator</h1>
      <div className="bg-white border rounded p-4 grid md:grid-cols-2 gap-4 text-sm">
        <LabelInput
          label="District households"
          name="households"
          value={inputs.households}
          onChange={handleChange}
        />
        <LabelInput
          label="Current awareness (%)"
          name="currentAwareness"
          value={inputs.currentAwareness}
          onChange={handleChange}
        />
        <LabelInput
          label="Awareness after SchemeSathi (%)"
          name="postAwareness"
          value={inputs.postAwareness}
          onChange={handleChange}
        />
        <LabelInput
          label="Average benefit per beneficiary (₹/year)"
          name="avgBenefit"
          value={inputs.avgBenefit}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <ImpactCard
          label="Additional beneficiaries"
          value={additionalBeneficiaries.toLocaleString("en-IN", {
            maximumFractionDigits: 0
          })}
        />
        <ImpactCard
          label="Estimated economic impact (per year)"
          value={
            "₹" +
            estimatedEconomicImpact.toLocaleString("en-IN", {
              maximumFractionDigits: 0
            })
          }
        />
      </div>
    </div>
  );
};

const LabelInput: React.FC<{
  label: string;
  name: string;
  value: number;
  onChange: any;
}> = ({ label, name, value, onChange }) => (
  <label className="flex flex-col gap-1">
    <span>{label}</span>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded px-2 py-1"
    />
  </label>
);

const ImpactCard: React.FC<{ label: string; value: string }> = ({
  label,
  value
}) => (
  <div className="bg-white border rounded p-4">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="text-xl font-semibold mt-1">{value}</div>
  </div>
);

export default ImpactPage;
