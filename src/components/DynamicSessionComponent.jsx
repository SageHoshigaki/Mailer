"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const DynamicSessionComponent = () => {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  console.log(session.user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p>Loading...</p>;
  }

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (status === "unauthenticated" || !session) {
    return <p>No session available. Please log in.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name || "User"}</h1>
      <p>Your email is: {session?.user?.email || "N/A"}</p>
    </div>
  );
};

export default DynamicSessionComponent;
