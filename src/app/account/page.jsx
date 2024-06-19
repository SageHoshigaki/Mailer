"use client";
import React from 'react';
import useRequireAuth from '@hooks/useRequireAuth';

function Account(){

const { session, status } = useRequireAuth();

  if (status === 'loading') {
    return <p>Loading...</p>; // Show loading while checking auth
  }

  if (!session) {
    return null; // Render nothing if not authenticated (redirect will happen)
  }



    return(
        <div class="section is-large is-fullheight">
            <h1>Hola Mami </h1>


        </div>
       
    )
}

export default Account;