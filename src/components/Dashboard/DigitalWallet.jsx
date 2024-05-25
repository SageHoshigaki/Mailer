// src/components/DigitalWallet.js
import React from 'react';

const DigitalWallet = () => {
  return (
    <div className="box">
      <p className="has-background-primary has-text-white p-2">Wallet</p>
      <div className="content">
        <p>Balance: $16,055.00</p>
        <button className="button is-primary">Add new Card</button>
      </div>
    </div>
  );
};

export default DigitalWallet;
