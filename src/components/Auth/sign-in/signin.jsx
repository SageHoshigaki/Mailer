import React from 'react';

const SignIn = () => {
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
                                <span className="has-text-grey-dark">Sign In</span>
                                <h3 className="mb-5 is-size-4 has-text-weight-bold">Join our community</h3>
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
                                <button className="button is-primary mb-4 is-fullwidth">Get Started</button>
                                <a className="mb-4 is-inline-block" href="#"><small>Forgot password?</small></a>
                                <a className="button is-white mb-2 is-flex is-justify-content-center is-align-items-center is-fullwidth" href="#">
                                    <img className="image mr-2" style={{ height: 24 }} src="bulma-plain-assets/socials/facebook.svg" alt="" />
                                    <span className="has-text-grey-dark">Sign in with Facebook</span>
                                </a>
                                <a className="button is-white mb-2 is-flex is-justify-content-center is-align-items-center is-fullwidth" href="#">
                                    <img className="image mr-2" style={{ height: 24 }} src="bulma-plain-assets/socials/twitter.svg" alt="" />
                                    <span className="has-text-grey-dark">Sign in with Twitter</span>
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignIn;
