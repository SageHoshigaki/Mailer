"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Default email for testing
  const defaultEmail = "sagehoshigaki@gmail.com";

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form submitted. Email:", email || defaultEmail);

    setFormError(null);
    setIsLoading(true);

    // Ensure Stripe and Elements are loaded
    if (!stripe || !elements) {
      setFormError("Stripe.js has not loaded yet. Please try again later.");
      setIsLoading(false);
      return;
    }

    // Use default email if none is provided
    const userEmail = email || defaultEmail;

    const cardElement = elements.getElement(CardElement);

    // Create payment method
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

    // Call your API to add the card
    try {
      const response = await fetch("/api/wallet/addCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
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
        placeholder={`Enter your email (${defaultEmail} used if empty)`}
        className="p-2 border border-gray-300 rounded mb-4"
      />

      <label>Card Details:</label>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#fa755a",
            },
          },
        }}
        className="p-2 border border-gray-300 rounded mb-4"
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`p-2 rounded text-white ${
          isLoading ? "bg-gray-500" : "bg-blue-500"
        }`}
      >
        {isLoading ? "Processing..." : "Add Card"}
      </button>

      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
  );
};

export default CardForm;
