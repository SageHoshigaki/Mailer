"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the signup form
const SignUpComponent = dynamic(() => import("@/components/Auth/sign-up/signup"), {
  ssr: false, // Ensures it's client-side only
});

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for an active session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "include", // Include cookies in the request
        });
        const session = await res.json();

        if (session && !session.error) {
          // Redirect to dashboard if the session exists
          router.push("/dashboard");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <SignUpComponent />;
}
