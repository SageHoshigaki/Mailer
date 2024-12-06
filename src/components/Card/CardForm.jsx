"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form submitted. Email:", email);

    setFormError(null);
    setIsLoading(true);

    if (!stripe || !elements) {
      setFormError("Stripe.js has not loaded yet. Please try again later.");
      console.error("Stripe.js is not ready.");
      setIsLoading(false);
      return;
    }

    if (!email) {
      setFormError("Email is required.");
      console.error("Email is missing.");
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setFormError(error.message);
      console.error("Error creating payment method:", error);
      setIsLoading(false);
      return;
    }

    console.log("Payment Method created:", paymentMethod);

    try {
      const response = await fetch("/api/wallet/addCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || "Failed to add card. Please try again.");
        console.error("API error:", data.error);
      } else {
        setSuccessMessage("Card added successfully!");
        console.log("Card added successfully:", data);
      }
    } catch (apiError) {
      setFormError("Network error. Please try again.");
      console.error("Network error:", apiError);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
      />

      <label>Card Details:</label>
      <CardElement />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Add Card"}
      </button>

      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
};

const WrappedCardForm = () => (
  <Elements stripe={stripePromise}>
    <CardForm />
  </Elements>
);

export default WrappedCardForm;
