"use client";

import { useSession } from "next-auth/react";
import Landing from "@/components/Landing/Landing.jsx";
import "bulma/css/bulma.css";
const HomePage = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div>
      <Landing />
    </div>
  );
};

export default HomePage;
