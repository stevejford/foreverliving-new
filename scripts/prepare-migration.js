const fs = require('fs');
const path = require('path');

// Read migration file
const migrationPath = path.join(__dirname, '..', 'supabase', 'consolidated_migration.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

// Output instructions
console.log('To run the migration:');
console.log('1. Go to https://supabase.com/dashboard');
console.log('2. Select your project');
console.log('3. Go to SQL Editor');
console.log('4. Create a new query');
console.log('5. Copy and paste the following SQL:');
console.log('\n----------------------------------------\n');
console.log(migrationSQL);
console.log('\n----------------------------------------\n');
console.log('6. Click "Run" to execute the migration');
