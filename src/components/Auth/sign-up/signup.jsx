"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('https://localhost:3000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to sign up');
            }

            const { user, stripeAccount } = await res.json();
            // Handle success (e.g., redirect to onboarding, show message)
        } catch (err) {
            setError(err.message);
            setLoading(false);
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
                            <h2 className="has-text-white mb-4 is-size-1 is-size-3-mobile has-text-weight-bold">Lorem ipsum dolor sit amet consectutar domor at elis</h2>
                            <p className="has-text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci.</p>
                        </div>
                    </div>
                    <div className="column is-6 is-4-desktop mx-auto">
                        <div className="box has-background-light has-text-centered">
                            <form onSubmit={handleSignUp}>
                                <span className="has-text-grey-dark">Sign Up</span>
                                <h3 className="mb-5 is-size-4 has-text-weight-bold">Create new account</h3>
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
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
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Repeat password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="checkbox mb-4">
                                        <input className="checkbox mr-2" type="checkbox" name="terms" defaultValue={1} required />
                                        <small className="has-text-grey-dark">By signing up, you agree to our <a href="#">Terms, Data Policy</a> and <a href="#">Cookies Policy</a>.</small>
                                    </label>
                                </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
