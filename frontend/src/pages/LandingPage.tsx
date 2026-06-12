import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SchemeSathi – Your Multilingual Welfare Scheme Assistant
          </h1>
          <p className="text-gray-700 mb-4">
            Answer a few simple questions in your own language and discover the
            government schemes you are eligible for – with clear benefits,
            required documents, and official links.
          </p>
          <div className="flex gap-3">
            <Link
              to="/chat"
              className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-teal-700 text-sm"
            >
              Start Chat
            </Link>
            <Link
              to="/eligibility"
              className="px-4 py-2 bg-secondary text-white rounded shadow hover:bg-blue-700 text-sm"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-gray-100">
          <h2 className="font-semibold mb-2">Why SchemeSathi?</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Multilingual support (English, Hindi, Marathi, Bengali)</li>
            <li>• Simple questions for complex eligibility rules</li>
            <li>• Built for low-bandwidth, mobile-first users</li>
            <li>• Transparent document checklists and official links</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-3 gap-6">
        <StatCard label="Users Reached" value="1,200+" />
        <StatCard label="Eligibility Checks" value="800+" />
        <StatCard label="Potential Annual Benefits" value="₹72,00,000+" />
      </section>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({
  label,
  value
}) => (
  <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="text-xl font-semibold mt-1">{value}</div>
  </div>
);

export default LandingPage;
