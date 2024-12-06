import React from "react";

export default function AuthLayout({ signin, signup }) {
  return (
    <div className="flex h-screen bg-white">
      {/* Left Section (Static Sidebar) */}
      <div className="flex-1 bg-blueGray-100 flex flex-col justify-center items-center p-8">
        <img
          className="mb-6"
          src="flaro-assets/logos/flaro-logo-black-xl.svg"
          alt="Logo"
        />
        <h1 className="mb-4 text-4xl font-bold font-heading tracking-wide">
          Welcome to Our App
        </h1>
        <p className="text-gray-600 text-lg text-center">
          {signin ? "Sign in and start saving time today." : "Join us now!"}
        </p>
      </div>

      {/* Right Section (Parallel Routes) */}
      <div className="flex-1 bg-white flex flex-col justify-center p-8">
        {signin || signup} {/* Dynamically render SignIn or SignUp */}
      </div>
    </div>
  );
}