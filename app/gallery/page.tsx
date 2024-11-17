'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUser } from '@/utils/supabase-auth';
import { FaHeart, FaImage, FaShare } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Memorial {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
  additional_photos: string[];
}

export default function Gallery() {
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function loadMemorials() {
      try {
        const { user: currentUser, error: userError } = await getUser();
        if (userError) throw userError;
        if (!currentUser) {
          router.push('/sign-in');
          return;
        }

        const { data: memorialsData, error } = await supabase
          .from('memorials')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMemorials(memorialsData || []);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMemorials();
  }, [router, supabase]);

  const handleMemorialClick = (id: string) => {
    router.push(`/memorial/${id}`);
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
        {/* Header */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Memory Gallery
          </motion.h1>
          <p className="text-lg text-gray-600">
            View and manage all your memorial photos and memories in one place.
          </p>
        </div>

        {/* Gallery Grid */}
        {memorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memorials.map((memorial) => (
              <motion.div
                key={memorial.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleMemorialClick(memorial.id)}
              >
                {/* Memorial Image */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {memorial.image_url ? (
                    <img
                      src={memorial.image_url}
                      alt={memorial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaImage className="text-4xl" />
                    </div>
                  )}
                </div>

                {/* Memorial Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{memorial.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Created {new Date(memorial.created_at).toLocaleDateString()}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FaImage className="text-rose-500" />
                        <span>{(memorial.additional_photos?.length || 0) + 1}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-rose-500" />
                        <span>0</span>
                      </div>
                      <FaShare className="text-rose-500 cursor-pointer hover:text-rose-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-xl shadow-sm"
          >
            <FaImage className="mx-auto text-5xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Memories Yet</h3>
            <p className="text-gray-500 mb-6">
              Start by creating a memorial to add photos and memories.
            </p>
            <button
              onClick={() => router.push('/create-memorial')}
              className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Create Memorial
            </button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
