'use client';

import { useEffect, useState } from 'react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const { signOut } = useClerk();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError('Sign out is taking longer than expected. Click here to go back home.');
    }, 5000);

    signOut()
      .then(() => {
        clearTimeout(timeout);
        router.push('/');
      })
      .catch((err) => {
        clearTimeout(timeout);
        console.error('Sign out error:', err);
        setError('Failed to sign out. Click here to go back home.');
      });

    return () => clearTimeout(timeout);
  }, [signOut, router]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
        <p className="text-xl mb-4">Signing out...</p>
        {error && (
          <button 
            onClick={() => router.push('/')}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {error}
          </button>
        )}
      </div>
    </div>
  );
}
