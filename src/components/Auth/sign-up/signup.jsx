import React from 'react';

const SignUp = () => {
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
                            <form action="#">
                                <span className="has-text-grey-dark">Sign Up</span>
                                <h3 className="mb-5 is-size-4 has-text-weight-bold">Create new account</h3>
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="email" placeholder="E-mail address" />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input className="input" type="password" placeholder="Repeat password" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="checkbox mb-4">
                                        <input className="checkbox mr-2" type="checkbox" name="terms" defaultValue={1} />
                                        <small className="has-text-grey-dark">By signing up, you agree to our <a href="#">Terms, Data Policy</a> and <a href="#">Cookies Policy</a>.</small>
                                    </label>
                                </div>
                                <button className="button is-primary py-2 is-fullwidth">Get Started</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
