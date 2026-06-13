import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";
import { useLanguage } from "../i18n/LanguageContext";

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  documents: string[];
  officialLink: string;
  stateAvailability: string[];
  category: string;
}

const SchemesPage: React.FC = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [state, setState] = useState("all");

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["schemes"],
    queryFn: async () => {
      const res = await api.get("/schemes");
      return res.data as Scheme[];
    }
  });

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(data.map((scheme) => scheme.category)))],
    [data]
  );
  const states = useMemo(
    () => [
      "all",
      ...Array.from(new Set(data.flatMap((scheme) => scheme.stateAvailability || [])))
    ],
    [data]
  );

  const filtered = data.filter((scheme) => {
    const text = `${scheme.name} ${scheme.description} ${scheme.eligibility}`.toLowerCase();
    const matchesSearch = !search || text.includes(search.toLowerCase());
    const matchesCategory = category === "all" || scheme.category === category;
    const matchesState =
      state === "all" || (scheme.stateAvailability || []).includes(state);
    return matchesSearch && matchesCategory && matchesState;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs uppercase text-slate-500">{t("schemesEyebrow")}</div>
          <h1 className="text-2xl font-semibold">{t("schemesTitle")}</h1>
        </div>
        <div className="text-sm text-slate-500">{filtered.length} {t("schemesVisible")}</div>
      </div>

      <div className="mb-5 grid gap-3 rounded border border-white/80 bg-white/85 p-4 shadow-lg shadow-teal-900/5 backdrop-blur sm:grid-cols-3">
        <input
          className="rounded border border-teal-200 bg-teal-50/50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("schemesSearch")}
        />
        <select
          className="rounded border border-teal-200 bg-teal-50/50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? t("schemesAllCategories") : item}
            </option>
          ))}
        </select>
        <select
          className="rounded border border-teal-200 bg-teal-50/50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          {states.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? t("schemesAllStates") : item}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <div className="rounded border bg-white p-4 text-sm">{t("schemesLoading")}</div>}
      {isError && (
        <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {t("schemesError")}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((scheme) => (
          <article key={scheme.id} className="rounded border border-white/80 bg-white/90 p-4 shadow-lg shadow-slate-900/5 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-950">{scheme.name}</h2>
                <div className="mt-1 text-xs text-slate-500">{scheme.category}</div>
              </div>
              <span className="rounded bg-gradient-to-r from-teal-50 to-sky-50 px-2 py-1 text-xs font-medium text-primary">
                {(scheme.stateAvailability || []).slice(0, 2).join(", ")}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{scheme.description}</p>
            <div className="mt-3 rounded bg-gradient-to-r from-amber-50 to-orange-50 p-3 text-xs text-slate-700">
              <div className="font-medium text-slate-800">{t("schemesBenefit")}</div>
              <div>{scheme.benefits}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(scheme.documents || []).map((doc) => (
                <span key={doc} className="rounded border border-teal-100 bg-teal-50 px-2 py-1 text-xs text-teal-800">
                  {doc}
                </span>
              ))}
            </div>
            {scheme.officialLink && (
              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-secondary hover:underline"
              >
                {t("schemesOfficialLink")}
              </a>
            )}
          </article>
        ))}
      </div>

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="rounded border bg-white p-4 text-sm text-slate-600">
          {t("schemesNoMatch")}
        </div>
      )}
    </div>
  );
};

export default SchemesPage;
