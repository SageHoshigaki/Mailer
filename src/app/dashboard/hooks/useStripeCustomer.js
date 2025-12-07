"use client";

import { useEffect, useState } from "react";

export function useStripeCustomer(email) {
  const [stripeCustomerId, setStripeCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOrCreateCustomer = async () => {
      try {
        const response = await fetch("/api/wallet/checkCreateStripeCustomer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error(`Stripe API error! status: ${response.status}`);
        }

        const data = await response.json();
        setStripeCustomerId(data.stripeCustomerId || null);
      } catch (err) {
        console.error("Error checking or creating Stripe customer:", err);
      } finally {
        setLoading(false);
      }
    };

    checkOrCreateCustomer();
  }, [email]);

  return { stripeCustomerId, loading };
}
