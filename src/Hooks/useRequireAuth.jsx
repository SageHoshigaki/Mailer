/*"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Change this import
import { useEffect } from 'react';

const useRequireAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session) {
      router.push('http://localhost:3000/signup'); // Redirect to the sign-in page if not authenticated
    }
  }, [session, status, router]);

  return { session, status };
};

export default useRequireAuth;*/
