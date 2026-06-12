import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

const AdminDashboardPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await api.get("/admin/analytics");
      return res.data as {
        totalUsers: number;
        eligibilityChecks: number;
        totalConversations: number;
        languageUsage: { language: string; _count: { _all: number } }[];
      };
    },
    retry: false
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>
      {isLoading && <div className="text-sm">Loading analytics...</div>}
      {error && (
        <div className="bg-white border rounded p-4 text-sm text-gray-700">
          Sign in as an admin and set the auth token before viewing analytics.
        </div>
      )}
      {data && (
        <div className="grid md:grid-cols-3 gap-4">
          <Metric label="Users" value={data.totalUsers} />
          <Metric label="Eligibility checks" value={data.eligibilityChecks} />
          <Metric label="Conversations" value={data.totalConversations} />
        </div>
      )}
    </div>
  );
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded p-4">
      <div className="text-xs uppercase text-gray-500">{label}</div>
      <div className="text-2xl font-semibold text-primary">{value}</div>
    </div>
  );
}

export default AdminDashboardPage;
