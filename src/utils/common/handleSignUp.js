import { signIn } from "next-auth/react";

const handleSignUp = async (
  e,
  fullName,
  email,
  password,
  confirmPassword,
  setLoading,
  setError
) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    setLoading(false); // Reset loading state if passwords don't match
    return;
  }

  setLoading(true);
  setError("");

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to sign up");
    }

    const { user } = await res.json();

    // Ensure the user is successfully created before trying to sign in
    if (!user || !user.id) {
      throw new Error("User creation failed. Please try again.");
    }

    // Automatically sign in the user after successful sign-up
    const signInResult = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      email,
      password,
    });

    if (signInResult.error) {
      throw new Error(signInResult.error || "Failed to sign in after sign up");
    }

    // Optionally handle post-signup success actions here
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false); // Ensure loading state is cleared in all cases
  }
};

export default handleSignUp;
