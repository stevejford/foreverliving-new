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
        const user = await getUser();
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
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Memorials</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
