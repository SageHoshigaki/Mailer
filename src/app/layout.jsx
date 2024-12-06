"use client";

//global css needs to be fixed
import "../styles/globals.css";
import "../styles/tailwind.css"; // Tailwind CSS
import React from "react";
import { SessionProvider } from "next-auth/react"; // Session Management
import { Elements } from "@stripe/react-stripe-js"; // Stripe Elements
import { loadStripe } from "@stripe/stripe-js"; // Stripe Initialization

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Root Layout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-900 text-white">
      <body className="h-full">
        {/* Wrap with SessionProvider to manage user session */}
        <SessionProvider>
          {/* Wrap with Stripe Elements for payment flows */}
          <Elements stripe={stripePromise}>
            {children}
          </Elements>
        </SessionProvider>
      </body>
    </html>
  );
}
