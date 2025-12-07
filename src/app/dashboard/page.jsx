"use client";

import { useState } from "react";
import DashboardView from "./components/DashboardView";
import AccountView from "./components/AccountView";
import DashboardNav from "./components/DashboardNav";

export default function DashboardPage() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Toggle Navigation */}
      <DashboardNav view={view} setView={setView} />

      {/* Render Dashboard or Account View */}
      <div className="mt-6">
        {view === "dashboard" ? <DashboardView /> : <AccountView />}
      </div>
    </div>
  );
}
