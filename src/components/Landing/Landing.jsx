'use client';

import React, { useEffect } from 'react';
import './landing.css';
import { useSession } from 'next-auth/react';

function Landing() {
  const { data: session, status } = useSession();

  console.log('Session', session);
  console.log('Session status', status);
  console.log("Session status", status);

  useEffect(() => {
    if (status !== 'loading') {
      console.log('Session Data:', session);
    }
  }, [session, status]);

  return (
    <div className="body">
      <div className="container">
        <p className="glitch">
          <span aria-hidden="true">Penn Mail</span>
          Penn Mail
          <span aria-hidden="true">Penn Mail</span>
        </p>
      </div>
      <div>
        <h4>Penn Mail is designed to automate and simplify the process of sending physical mail. This application caters to both businesses and individuals, providing a streamlined way to manage and execute mailing tasks with ease.</h4>
      </div>
    </div>
  );
}

export default Landing;
