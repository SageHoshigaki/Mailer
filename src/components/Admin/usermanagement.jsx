// components/UserManagement.js

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [stripeOnlyUsers, setStripeOnlyUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [prismaUsersResponse, stripeUsersResponse] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/admin/stripe-users'),
        ]);
        setUsers(prismaUsersResponse.data);
        setStripeOnlyUsers(stripeUsersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId, stripeAccountId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`, { data: { stripeAccountId } });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleStripeDelete = async (stripeAccountId) => {
    try {
      await axios.delete(`/api/admin/stripe-users/${stripeAccountId}`);
      setStripeOnlyUsers(stripeOnlyUsers.filter((account) => account.id !== stripeAccountId));
    } catch (error) {
      console.error('Error deleting Stripe user:', error);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h2>Prisma Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.name} - Stripe ID: {user.stripeAccountId}
            <button onClick={() => handleDelete(user.id, user.stripeAccountId)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Stripe-Only Users</h2>
      <ul>
        {stripeOnlyUsers.map((account) => (
          <li key={account.id}>
            {account.email} - {account.business_type} - Stripe ID: {account.id}
            <button onClick={() => handleStripeDelete(account.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
