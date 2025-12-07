"use client";

import { useState } from "react";

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error("Failed to create Stripe session");

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      setLoading(false);
    }
  };

  return { redirectToCheckout, loading };
}
