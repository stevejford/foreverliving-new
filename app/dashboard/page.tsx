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
        const { user: currentUser, error: userError } = await getUser();
        if (userError) throw userError;
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
      } catch (err: any) {
        console.error('Error:', err);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const handleCreateMemorial = () => {
    router.push('/create-memorial');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.user_metadata?.firstName || 'Friend'}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your memorial pages and recent activity.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-blue-600 text-white rounded-lg shadow-md flex items-center justify-center space-x-2"
            onClick={handleCreateMemorial}
          >
            <FaPlus />
            <span>Create New Memorial</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-pink-600 text-white rounded-lg shadow-md flex items-center justify-center space-x-2"
          >
            <FaHeart />
            <span>View Tributes</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-green-600 text-white rounded-lg shadow-md flex items-center justify-center space-x-2"
          >
            <FaShare />
            <span>Share Memorial</span>
          </motion.button>
        </div>

        {/* Recent Memorials */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Memorials</h2>
          {recentMemorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentMemorials.map((memorial) => (
                <motion.div
                  key={memorial.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200">
                    {memorial.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={memorial.image_url}
                        alt={memorial.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {memorial.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Created on {new Date(memorial.created_at).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => router.push(`/memorial/${memorial.id}`)}
                      className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Memorial →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                You haven't created any memorials yet.
              </p>
              <button
                onClick={handleCreateMemorial}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Create your first memorial →
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
