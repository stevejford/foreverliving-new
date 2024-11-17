import pool from './utils/db';

async function testConnection() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('Database connection successful:', res.rows);
  } catch (err: any) {
    console.error('Database connection error:', err.stack);
  } finally {
    client.release();
  }
}

// Run the test connection function
testConnection();
