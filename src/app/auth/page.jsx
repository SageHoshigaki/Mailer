import { redirect } from "next/navigation";

export default function AuthDefaultPage() {
  // Redirect to /auth/signup
  redirect("/auth/signup");

  // Return null since this page only handles redirection
  return null;
}
