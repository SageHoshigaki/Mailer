"use client";

import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import AddressForm from "./AddressForm";

const NewCardForm = ({ onCardSaved, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState({
    fullName: "Sage Hoshigaki", // Default name for testing
    email: "sagehoshigaki@gmail.com", // Default email for testing
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // Fetch client secret
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/wallet/setupIntent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch client secret.");
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [formData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.fullName,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.postalCode,
            },
          },
        },
      });

      if (error) throw new Error(error.message);

      onCardSaved(setupIntent.payment_method);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        placeholder="Full Name"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
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
        className="p-2 border border-gray-300 rounded"
      />
      <AddressForm
        formData={formData}
        onInputChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
      />
      <button
        type="submit"
        disabled={loading}
        className={`p-2 rounded text-white ${loading ? "bg-gray-500" : "bg-blue-500"}`}
      >
        {loading ? "Saving..." : "Save Card"}
      </button>
      <button
        onClick={onCancel}
        type="button"
        className="bg-gray-500 text-white p-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default NewCardForm;
