'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import { getUser } from '@/utils/supabase-auth';
import { toast } from 'react-hot-toast';

export default function TestAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [testResult, setTestResult] = useState<string>('');
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const { user, error } = await getUser();
      if (error || !user) {
        router.push('/sign-in');
        return;
      }
      setUserData(user);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/sign-in');
    } finally {
      setIsLoading(false);
    }
  };

  const testProtectedApi = async () => {
    try {
      const response = await fetch('/api/test-auth');
      const data = await response.json();
      
      if (response.ok) {
        setTestResult('API test successful: ' + JSON.stringify(data, null, 2));
        toast.success('Protected API route test passed!');
      } else {
        throw new Error(data.error || 'API test failed');
      }
    } catch (error: any) {
      setTestResult('API test failed: ' + error.message);
      toast.error('Protected API route test failed');
    }
  };

  useEffect(() => {
    checkAuth();
    testProtectedApi();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Authentication Test Page
            </h1>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  User Data
                </h2>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(userData, null, 2)}
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Protected API Test Result
                </h2>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {testResult || 'Running test...'}
                </pre>
              </div>

              <div className="flex justify-end">
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
