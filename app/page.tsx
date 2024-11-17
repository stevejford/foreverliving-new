'use client';

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Logo from './components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSession } from '@/utils/supabase-auth';
import SignOutButton from '@/components/SignOutButton';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { session, error } = await getSession();
      if (error) {
        console.error('Auth error:', error);
        setIsSignedIn(false);
      } else {
        setIsSignedIn(!!session);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsSignedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
        src="/videos/9218233-hd_1920_1080_30fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/poster.jpg"
      />

      {/* Multiple Overlay Layers for better text contrast */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo variant="light" />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link 
              href="/about" 
              className="text-white hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/explore" 
              className="text-white hover:text-gray-300 transition-colors"
            >
              Explore
            </Link>
            {!isSignedIn && (
              <Link
                href="/sign-in"
                className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
            )}
            {isSignedIn && (
              <>
                <Link
                  href="/dashboard"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Dashboard
                </Link>
                <SignOutButton />
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg"
          >
            Forever Living Memorial
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 text-gray-200 drop-shadow-md font-light"
          >
            A sacred space to honor, remember, and celebrate the lives that touched our hearts
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <Link 
                href="/explore"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all shadow-lg w-64"
              >
                Explore Memorials
              </Link>
              <Link 
                href="/sign-up"
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg w-64"
              >
                Create a Memorial
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full z-20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center items-center space-x-6 text-sm text-white/70">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
