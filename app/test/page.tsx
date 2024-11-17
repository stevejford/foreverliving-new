'use client';

import { createClient } from '@supabase/supabase-js';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      headers: {
        'x-my-custom-header': 'forever-living-memorial'
      }
    }
  }
);

export default function TestPage() {
  const { user, isSignedIn } = useUser();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Set up Supabase auth with Clerk token
  useEffect(() => {
    const setupSupabase = async () => {
      if (!user) return;
      
      try {
        const token = await user.getToken('supabase');
        await supabase.auth.setSession({
          access_token: token,
          refresh_token: '',
        });
      } catch (err: any) {
        console.error('Error setting up Supabase auth:', err);
        setError('Failed to authenticate with Supabase');
      }
    };

    setupSupabase();
  }, [user]);

  if (!isSignedIn) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <p>You need to be signed in to access this page.</p>
      </div>
    );
  }

  // Test memorial creation
  const createMemorial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data, error } = await supabase
        .from('memorials')
        .insert({
          user_id: user?.id,
          full_name: formData.get('full_name'),
          date_of_birth: formData.get('date_of_birth'),
          date_of_passing: formData.get('date_of_passing'),
          biography: formData.get('biography'),
          privacy: formData.get('privacy')
        })
        .select();

      if (error) throw error;
      setResult({ operation: 'Create Memorial', data });
      setError(null);
      e.currentTarget.reset();
    } catch (err: any) {
      setError(`Create Memorial Error: ${err.message}`);
      setResult(null);
    }
  };

  // Test memory creation
  const createMemory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data, error } = await supabase
        .from('memories')
        .insert({
          user_id: user?.id,
          memorial_id: formData.get('memorial_id'),
          title: formData.get('title'),
          content: formData.get('content')
        })
        .select();

      if (error) throw error;
      setResult({ operation: 'Create Memory', data });
      setError(null);
      e.currentTarget.reset();
    } catch (err: any) {
      setError(`Create Memory Error: ${err.message}`);
      setResult(null);
    }
  };

  // Test fetching memorials
  const fetchMemorials = async () => {
    try {
      const { data, error } = await supabase
        .from('memorials')
        .select('*');

      if (error) throw error;
      setResult({ operation: 'Fetch Memorials', data });
      setError(null);
    } catch (err: any) {
      setError(`Fetch Memorials Error: ${err.message}`);
      setResult(null);
    }
  };

  // Test file upload to storage
  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;
    const memorialId = formData.get('memorial_id') as string;
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    try {
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${memorialId}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file with progress tracking
      const { data, error } = await supabase.storage
        .from('memorials')
        .upload(filePath, file, {
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(Math.round(percent));
          },
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memorials')
        .getPublicUrl(filePath);

      setResult({ 
        operation: 'File Upload', 
        data: { 
          path: filePath,
          publicUrl,
          size: file.size,
          type: file.type
        } 
      });
      setError(null);
      setUploadProgress(0);
      e.currentTarget.reset();
    } catch (err: any) {
      setError(`File Upload Error: ${err.message}`);
      setResult(null);
      setUploadProgress(0);
    }
  };

  // Test listing files in storage
  const listFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const memorialId = formData.get('memorial_id') as string;
    
    try {
      const { data, error } = await supabase.storage
        .from('memorials')
        .list(memorialId);

      if (error) throw error;
      setResult({ operation: 'List Files', data });
      setError(null);
    } catch (err: any) {
      setError(`List Files Error: ${err.message}`);
      setResult(null);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Database Operations Test Page</h1>
      
      {/* Create Memorial Form */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Memorial</h2>
        <form onSubmit={createMemorial} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Date of Passing</label>
            <input
              type="date"
              name="date_of_passing"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Biography</label>
            <textarea
              name="biography"
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-1">Privacy</label>
            <select name="privacy" className="w-full p-2 border rounded">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Memorial
          </button>
        </form>
      </div>

      {/* Create Memory Form */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Memory</h2>
        <form onSubmit={createMemory} className="space-y-4">
          <div>
            <label className="block mb-1">Memorial ID</label>
            <input
              type="text"
              name="memorial_id"
              required
              className="w-full p-2 border rounded"
              placeholder="UUID of the memorial"
            />
          </div>
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Content</label>
            <textarea
              name="content"
              required
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Memory
          </button>
        </form>
      </div>

      {/* File Upload Form */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upload File to Storage</h2>
        <form onSubmit={uploadFile} className="space-y-4">
          <div>
            <label className="block mb-1">Memorial ID</label>
            <input
              type="text"
              name="memorial_id"
              required
              className="w-full p-2 border rounded"
              placeholder="UUID of the memorial"
            />
          </div>
          <div>
            <label className="block mb-1">File</label>
            <input
              type="file"
              name="file"
              required
              className="w-full p-2 border rounded"
              accept="image/*,video/*"
            />
          </div>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Upload File
          </button>
        </form>
      </div>

      {/* List Files Form */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">List Files in Storage</h2>
        <form onSubmit={listFiles} className="space-y-4">
          <div>
            <label className="block mb-1">Memorial ID</label>
            <input
              type="text"
              name="memorial_id"
              required
              className="w-full p-2 border rounded"
              placeholder="UUID of the memorial"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            List Files
          </button>
        </form>
      </div>

      {/* Fetch Memorials Button */}
      <div className="mb-8">
        <button
          onClick={fetchMemorials}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Fetch All Memorials
        </button>
      </div>

      {/* Results Display */}
      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {result && (
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">{result.operation} Result:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
