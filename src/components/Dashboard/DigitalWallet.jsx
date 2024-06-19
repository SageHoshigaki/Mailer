"use client";
import { useState } from 'react';
import Link from 'next/link'; // Use Next.js Link component

const DigitalWallet = () => {
  const [currentFunds, setCurrentFunds] = useState("16,055.00");

  return (
    <div>
      <h1>Digital Wallet</h1>
      <p>Current Funds: ${currentFunds}</p>
      <Link href="/cardform" legacyBehavior>
        <a class="button is-link">add a card</a>
      </Link>
    </div>
  );
};

export default DigitalWallet;
