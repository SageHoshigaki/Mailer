"use client";

import { useStripeCustomer } from "../hooks/useStripeCustomer";
import IndexSection from "@/components/UserDash/IndexSectionPageExamples1";
import { useUser } from "@clerk/nextjs";

export default function DashboardView() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "guest@example.com";
  const { stripeCustomerId, loading } = useStripeCustomer(email);

  return (
    <div>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p>🚀 Welcome, {user?.fullName || "Guest"}!</p>

      <div className="mt-4">
        <p><strong>Stripe Customer ID:</strong> {loading ? "Fetching..." : stripeCustomerId || "Not Found"}</p>
      </div>

      {/* Dashboard Content */}
      <IndexSection />
    </div>
  );
}
