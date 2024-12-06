"use client";

import { useSession } from "next-auth/react";

export default function TestSessionPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>No active session. Please log in.</p>;

  return (
    <div>
      <h1>Session Test</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
