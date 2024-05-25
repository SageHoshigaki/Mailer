// src/components/AccountSummary.js
import React from 'react';

const AccountSummary = () => {
  return (
    <div class="columns">
      <div class="column">
        <div class="box has-background-link has-text-white">
          <p>Main account</p>
          <p>$16,045.00</p>
        </div>
      </div>
      <div class="column">
        <div class="box has-background-link has-text-white">
          <p>Taxes</p>
          <p>$5,025.00</p>
        </div>
      </div>
      <div className="column">
        <div className="box has-background-link has-text-white">
          <p>Savings</p>
          <p>$2,525.00</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
