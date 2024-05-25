// src/components/RecentActivity.js
import React from 'react';

const RecentActivity = () => {
  return (
    <div className="box">
      <p className="has-background-primary has-text-white p-2">Recent Activity</p>
      <div className="content">
        <ul>
          <li>Stripe Deposit +$523.10</li>
          <li>Facebook Advertising +$523.10</li>
          <li>Twitter Advertising -$1,243.00</li>
          {/* Add more items here */}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
