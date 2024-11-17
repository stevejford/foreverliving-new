'use client';

import Logo from "./Logo";
import Link from "next/link";
import { FaHome, FaPlus, FaImages, FaUser } from "react-icons/fa";
import SignOutButton from '@/components/SignOutButton';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Logo href="/dashboard" variant="dark" />
            <div className="flex items-center gap-4">
              <Link 
                href="/profile" 
                className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <FaUser className="text-xl" />
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Side Navigation and Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-[calc(100vh-4rem)] border-r border-gray-200 fixed">
          <nav className="p-4 space-y-2">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 p-3 rounded-lg hover:bg-gray-50 transition-all"
            >
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>
            <Link 
              href="/create-memorial" 
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 p-3 rounded-lg hover:bg-gray-50 transition-all"
            >
              <FaPlus className="text-xl" />
              <span>Create Memorial</span>
            </Link>
            <Link 
              href="/gallery" 
              className="flex items-center gap-3 text-gray-600 hover:text-gray-900 p-3 rounded-lg hover:bg-gray-50 transition-all"
            >
              <FaImages className="text-xl" />
              <span>Memory Gallery</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
