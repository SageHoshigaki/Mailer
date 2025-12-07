"use client";



import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import React from "react";
import { Elements } from "@stripe/react-stripe-js"; // Stripe Elements
import { loadStripe } from "@stripe/stripe-js"; // Stripe Initialization
import { usePathname } from "next/navigation";
import "./globals.css";
// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Define pages that should be public
  const publicPages = ["/", "/about", "/pricing", "/contact"]; // Add your public pages here
  const isPublicPage = publicPages.includes(pathname);

  return (
    <html lang="en" className="h-full bg-gray-900 text-white">
      <body className="h-full">
        <ClerkProvider>
          <Elements stripe={stripePromise}>
            {/* Allow access to public pages without signing in */}
            {isPublicPage ? (
              children
            ) : (
              <>
                {/* Protected pages (Dashboard, etc.) only visible when signed in */}
                <SignedIn>{children}</SignedIn>

                {/* Redirect to Clerk Sign-In when signed out */}
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            )}
          </Elements>
        </ClerkProvider>
      </body>
    </html>
  );
}
