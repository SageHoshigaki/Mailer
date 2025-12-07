"use client";
import React from "react";
import { UserProfile } from "@clerk/clerk-react";

function Account() {
  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <UserProfile />
    </div>
  );
}

export default Account;
