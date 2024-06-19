"use client";
import React from "react";
import CardForm from '@components/Card/CardForm';
import useRequireAuth from '@hooks/useRequireAuth';

function AddCardPage () {

const { session, status } = useRequireAuth();

  if (status === 'loading') {
    return <p>Loading...</p>; // Show loading while checking auth
  }

  if (!session) {
    return null; // Render nothing if not authenticated (redirect will happen)
  }


  <div>
    <h1>Add Card</h1>
    <CardForm />
  </div>
};
export default AddCardPage;
