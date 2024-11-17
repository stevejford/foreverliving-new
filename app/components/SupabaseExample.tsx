'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUser } from '@/utils/supabase-auth';

export default function SupabaseExample() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const { user, error: userError } = await getUser();
        if (userError) throw userError;
        if (!user) return;

        // Example query - replace 'your_table' with your actual table name
        const { data, error } = await supabase
          .from('memorials')
          .select('*')
          .eq('user_id', user.id)
          .limit(5);

        if (error) throw error;
        setData(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchData();
  }, [supabase]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Recent Memorials</h2>
      {data ? (
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
