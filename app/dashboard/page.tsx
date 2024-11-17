'use client';

import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";
import { FaPlus, FaHeart, FaShare } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUser } from '@/utils/supabase-auth';
import { toast } from 'react-hot-toast';

interface Memorial {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
  user_id: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [recentMemorials, setRecentMemorials] = useState<Memorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getUser();
        if (!currentUser) {
          router.push('/sign-in');
          return;
        }
        setUser(currentUser);
        
        // Load recent memorials
        const { data: memorials, error } = await supabase
          .from('memorials')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error loading memorials:', error);
          toast.error('Failed to load memorials');
          return;
        }
        
        setRecentMemorials(memorials as Memorial[]);
      } catch (error: any) {
        console.error('Error in loadUser:', error);
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [router]);

  const handleCreateMemorial = () => {
    router.push('/create-memorial');
  };

  const handleViewGallery = () => {
    router.push('/gallery');
  };

  const handleInvites = () => {
    router.push('/invites');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Welcome, {user?.user_metadata?.firstName || 'Friend'}
          </motion.h1>
          <p className="text-lg text-gray-600">
            Create and manage your memorial pages, share memories, and connect with loved ones.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={handleCreateMemorial}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-100 rounded-lg">
                <FaPlus className="text-xl text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold">Create Memorial</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Honor and celebrate the life of your loved one by creating a memorial page.
            </p>
            <span className="text-rose-600 font-medium hover:text-rose-700">
              Get Started →
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={handleViewGallery}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-100 rounded-lg">
                <FaHeart className="text-xl text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold">Share Memories</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Add photos, stories, and cherished moments to existing memorial pages.
            </p>
            <span className="text-rose-600 font-medium hover:text-rose-700">
              View Gallery →
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={handleInvites}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-100 rounded-lg">
                <FaShare className="text-xl text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold">Invite Others</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Connect with family and friends to collaborate on memorial pages.
            </p>
            <span className="text-rose-600 font-medium hover:text-rose-700">
              Send Invites →
            </span>
          </motion.div>
        </div>

        {/* Recent Memorials */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Recent Memorials</h2>
          {recentMemorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentMemorials.map((memorial: Memorial) => (
                <motion.div
                  key={memorial.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => router.push(`/memorial/${memorial.id}`)}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    {memorial.image_url ? (
                      <img 
                        src={memorial.image_url} 
                        alt={memorial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FaHeart className="text-2xl" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{memorial.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Created {new Date(memorial.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No memorials yet. Create your first one!</p>
              <button
                onClick={handleCreateMemorial}
                className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                <FaPlus className="mr-2" />
                Create Memorial
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
