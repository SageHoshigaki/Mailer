"use client";

import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import IndexSection from "@/components/UserDash/IndexSectionPageExamples1";
import useRequireAuth from "@/Hooks/useRequireAuth";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const meta = {
  title: "Dashboard",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function Dashboard() {
  const { session, status } = useRequireAuth();
  const [stripeCustomerId, setStripeCustomerId] = useState(null);

  console.log(session);


  // Verify or create Stripe customer
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const checkOrCreateCustomer = async () => {
        try {
          console.log("Session user ID:", session.user.id);
          console.log("Session user email:", session.user.email);

          const response = await fetch(
            "http://localhost:3000/api/wallet/checkCreateStripeCustomer",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: session.user.email }),
            }
          );

          const data = await response.json();
          console.log("Stripe API Response:", data);
          if (data.stripeCustomerId) {
            setStripeCustomerId(data.stripeCustomerId);
          } else {
            console.error("Error: No Stripe customer ID returned");
          }
        } catch (error) {
          console.error("Error checking or creating Stripe customer:", error);
        }
      };

      checkOrCreateCustomer();
      console.log(session);
    }
  }, [session, status]);

  useEffect(() => {
    if (window.updateCharts) {
      window.updateCharts();
    }
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // Render nothing if not authenticated
  }

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta} />
      </HelmetProvider>
      <Elements stripe={stripePromise}>
        <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>Stripe Customer ID: {stripeCustomerId || "Fetching..."}</p>
          <IndexSection />
        </div>
      </Elements>
    </React.Fragment>
  );
}
