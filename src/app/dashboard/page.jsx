'use client';

import React from 'react';
import Layout from '../layout';
import AccountSummary from '@components/Dashboard/AccountSummary';
import MoneyFlow from '@components/Dashboard/MoneyFlow';
import DigitalWallet from '@components/Dashboard/DigitalWallet';
import RecentActivity from '@components/Dashboard/RecentActivity';
import useRequireAuth from '../../hooks/useRequireAuth';

function Dashboard() {
  const { session, status } = useRequireAuth();

  if (status === 'loading') {
    return <p>Loading...</p>; // Show loading while checking auth
  }

  if (!session) {
    return null; // Render nothing if not authenticated (redirect will happen)
  }

  return (
    <div>
      <AccountSummary />
      <MoneyFlow />
      <DigitalWallet />
      <RecentActivity />
    </div>
  );
}

export default Dashboard;
