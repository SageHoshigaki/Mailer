"use client";

import { useSession } from "next-auth/react";

export default function TestPaymentPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading session data...</p>;
  if (!session) return <p>No session available. Please log in.</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Test Payment Page</h1>
      <p className="text-lg">Name: {session.user?.name}</p>
      <p className="text-lg">Email: {session.user?.email}</p>
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="User profile"
          className="w-24 h-24 rounded-full mt-4"
        />
      )}
      <p className="text-sm text-gray-400 mt-4">
        Session Expires: {session.expires}
      </p>
    </div>
  );
}
