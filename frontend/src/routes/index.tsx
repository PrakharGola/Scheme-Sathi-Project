import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ChatPage from "../pages/ChatPage";
import EligibilityPage from "../pages/EligibilityPage";
import SchemesPage from "../pages/SchemesPage";
import ImpactPage from "../pages/ImpactPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/chat" element={<ChatPage />} />
    <Route path="/eligibility" element={<EligibilityPage />} />
    <Route path="/schemes" element={<SchemesPage />} />
    <Route path="/impact" element={<ImpactPage />} />
    <Route path="/admin" element={<AdminDashboardPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
  </Routes>
);

export default AppRoutes;
