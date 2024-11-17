'use client';

import Logo from "./Logo";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

const VideoBackground = dynamic(() => import('./VideoBackground'), {
  ssr: false,
  loading: () => (
    <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50" />
    </div>
  )
});

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Video Background */}
      <VideoBackground />

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12 bg-gray-50">
        <div className="lg:hidden mb-8">
          <Logo />
        </div>
        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </motion.div>
          {children}
        </div>
      </div>
    </div>
  );
}
