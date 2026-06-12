import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";

interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
}

const SchemesPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["schemes"],
    queryFn: async () => {
      const res = await api.get("/schemes");
      return res.data as Scheme[];
    }
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Supported Schemes</h1>
      {isLoading && <div>Loading schemes…</div>}
      <div className="grid md:grid-cols-2 gap-4">
        {data?.map((s) => (
          <div key={s.id} className="bg-white border rounded p-3 text-sm">
            <div className="font-semibold mb-1">{s.name}</div>
            <div className="text-xs text-gray-500 mb-1">
              Category: {s.category}
            </div>
            <div className="text-xs text-gray-700 line-clamp-4">
              {s.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemesPage;
