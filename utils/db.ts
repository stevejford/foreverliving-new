import { Pool } from 'pg';

const pool = new Pool({
  user: 'admin',
  host: 'supabasekong-dgcw80wsgosg044ko4s0s40o.localservice.com.au', // Replace with your actual host
  database: 'postgres',
  password: 'lL5ayD153hr7n9uR7eBRwLTiXXMrmaKE',
  port: 5432, // Default PostgreSQL port
});

export default pool;
