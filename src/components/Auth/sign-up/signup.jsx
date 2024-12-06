
'use client';

import React, { useState, useEffect } from 'react';
import handleSignUp from '@common/handleSignUp';
import { signIn, useSession } from 'next-auth/react';

const SignUp = () => {
  const { data: session, status } = useSession();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/dashboard';
    }
  }, [status]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      // Call your sign-up handler function
      await handleSignUp(fullName, email, password, confirmPassword);

      // After successful sign-up, redirect to the dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('SignUp error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section is-relative is-clipped">
      {/* ... your existing JSX code ... */}
      <div className="container mx-auto is-relative">
        <div className="is-vcentered columns is-multiline">
          <div className="column is-6 is-5-desktop mb-5">
            {/* ... left-side content ... */}
          </div>
          <div className="column is-6 is-4-desktop mx-auto">
            <div className="box has-background-light has-text-centered">
              {status === 'loading' ? (
                <p>Loading...</p>
              ) : session ? (
                <p>Already signed in as {session.user.email}</p>
              ) : (
                <>
                  <form onSubmit={handleFormSubmit}>
                    <span className="has-text-grey-dark">Sign Up</span>
                    <h3 className="mb-5 is-size-4 has-text-weight-bold">Create new account</h3>
                    {/* ... form fields ... */}
                    {error && <p className="has-text-danger">{error}</p>}
                    <button className="button is-primary py-2 is-fullwidth" disabled={loading}>
                      {loading ? 'Loading...' : 'Get Started'}
                    </button>
                  </form>
                  <hr />
                  <button onClick={() => signIn('google')} className="button is-danger py-2 is-fullwidth mt-2">
                    Sign in with Google
                  </button>
                  <button onClick={() => signIn('apple')} className="button is-info py-2 is-fullwidth mt-2">
                    Sign in with Apple
                  </button>
                  <button onClick={() => signIn('microsoft')} className="button is-primary py-2 is-fullwidth mt-2">
                    Sign in with Microsoft
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;