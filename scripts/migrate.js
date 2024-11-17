const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const MIGRATIONS_DIR = path.join(__dirname, '../supabase/migrations');

// Get list of migration files
const migrations = fs.readdirSync(MIGRATIONS_DIR)
  .filter(file => file.endsWith('.sql'))
  .sort();

console.log('Available migrations:');
migrations.forEach(migration => {
  console.log(`- ${migration}`);
});

// Function to run a single migration
async function runMigration(client, migrationFile) {
  const filePath = path.join(MIGRATIONS_DIR, migrationFile);
  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    console.log(`\nRunning migration: ${migrationFile}`);
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log(`Migration ${migrationFile} completed successfully`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Error running migration ${migrationFile}:`, error);
    throw error;
  }
}

// Run all migrations in sequence
async function runMigrations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    
    for (const migration of migrations) {
      await runMigration(client, migration);
    }
    
    console.log('\nAll migrations completed successfully');
  } catch (error) {
    console.error('\nMigration process failed');
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Start the migration process
runMigrations();
