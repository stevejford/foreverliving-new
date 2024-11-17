import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import styles from '@/styles/TestButton.module.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const TestButton = () => {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      // Get the JWT token from Clerk
      const token = await getToken({ template: 'supabase' });
      
      // Create Supabase client with Clerk token
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        },
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      });

      // Test the connection by attempting to read from a table
      const { data, error: supabaseError } = await supabase
        .from('memorials')
        .select('count(*)')
        .limit(1);

      if (supabaseError) throw supabaseError;

      setResponse('Connection successful! ');
      console.log('Connection test result:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Connection test error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={testConnection}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? 'Testing...' : 'Test Supabase Connection'}
      </button>
      
      {response && <div className={styles.success}>{response}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TestButton;
