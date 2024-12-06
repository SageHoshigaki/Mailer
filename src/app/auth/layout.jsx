import React from "react";
import AuthLayout from "@components/AuthLayout"; // Ensure this path is correct

export default function Layout({ signin, signup }) {
  return <AuthLayout signin={signin} signup={signup} />;
}