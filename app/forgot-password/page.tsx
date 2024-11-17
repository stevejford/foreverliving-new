'use client';

import { useState } from 'react';
import { useSignIn } from "@clerk/nextjs";
import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      setError('');
      setSuccess(false);
      
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset Your Password" 
      subtitle="We'll send you instructions to reset your password"
    >
      <div className="space-y-6">
        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-700">
                Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
              </p>
            </div>
            <Link
              href="/sign-in"
              className="block text-blue-600 hover:text-blue-700"
            >
              Return to sign in
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-sm text-red-600 bg-red-50 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Sending instructions...' : 'Send reset instructions'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/sign-in" className="text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
