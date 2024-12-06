'use client';

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

const SignIn = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  console.log("Session:", session);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError(result.error || 'An unexpected error occurred');
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('SignIn error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleOAuthSignIn = async (provider) => {
    const result = await signIn(provider, { callbackUrl: '/dashboard', redirect: false });

    if (result.error) {
      setError(result.error || 'An unexpected error occurred during OAuth sign-in');
    } else {
      window.location.href = result.url || '/dashboard';
    }
  };

  return (
    <section className="section is-relative is-clipped">
      <div className="is-hidden-touch has-background-primary" style={{ position: 'absolute', top: 0, left: 0, width: '70%', height: '100%' }} />
      <div className="is-hidden-desktop has-background-primary is-fullwidth" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div className="container mx-auto is-relative">
        <div className="is-vcentered columns is-multiline">
          <div className="column is-6 is-5-desktop mb-5">
            <div>
              <h2 className="has-text-white mb-4 is-size-1 is-size-3-mobile has-text-weight-bold">Lorem ipsum dolor sit amet consectetur</h2>
              <p className="has-text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci.</p>
            </div>
          </div>
          <div className="column is-6 is-4-desktop mx-auto">
            <div className="box has-background-light has-text-centered">
              <span className="has-text-grey-dark">Sign In</span>
              <h3 className="mb-5 is-size-4 has-text-weight-bold">Join our community</h3>
              {status === 'loading' ? (
                <p>Loading...</p>
              ) : session ? (
                <p>Already signed in as {session.user.email}</p>
              ) : (
                <>
                  {error && <p className="has-text-danger">{error}</p>}
                  <form onSubmit={handleSignIn}>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          placeholder="E-mail address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <button className="button is-primary mb-4 is-fullwidth" type="submit">
                      Get Started
                    </button>
                  </form>
                  <a className="mb-4 is-inline-block" href="#"><small>Forgot password?</small></a>
                  <button
                    className="button is-white mb-2 is-flex is-justify-content-center is-align-items-center is-fullwidth"
                    onClick={() => handleOAuthSignIn('google')}
                  >
                    <img className="image mr-2" style={{ height: 24 }} src="bulma-plain-assets/socials/google.svg" alt="Google" />
                    <span className="has-text-grey-dark">Sign in with Google</span>
                  </button>
                  <button
                    className="button is-white mb-2 is-flex is-justify-content-center is-align-items-center is-fullwidth"
                    onClick={() => handleOAuthSignIn('apple')}
                  >
                    <img className="image mr-2" style={{ height: 24 }} src="bulma-plain-assets/socials/apple.svg" alt="Apple" />
                    <span className="has-text-grey-dark">Sign in with Apple</span>
                  </button>
                  <button
                    className="button is-white mb-2 is-flex is-justify-content-center is-align-items-center is-fullwidth"
                    onClick={() => handleOAuthSignIn('azure-ad')}
                  >
                    <img className="image mr-2" style={{ height: 24 }} src="bulma-plain-assets/socials/microsoft.svg" alt="Microsoft" />
                    <span className="has-text-grey-dark">Sign in with Microsoft</span>
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

export default SignIn;
