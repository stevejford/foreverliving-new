const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
require('dotenv').config({ path: '.env.local' });

const BACKUP_DIR = path.join(__dirname, '../backups');
const DB_URL = process.env.DATABASE_URL;

// Get list of available backups
const backups = fs.readdirSync(BACKUP_DIR)
  .filter(file => file.startsWith('backup-'))
  .sort()
  .reverse();

if (backups.length === 0) {
  console.log('No backups found');
  process.exit(1);
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// List available backups
console.log('\nAvailable backups:');
backups.forEach((backup, index) => {
  console.log(`${index + 1}. ${backup}`);
});

// Ask which backup to restore
rl.question('\nEnter the number of the backup to restore: ', (answer) => {
  const index = parseInt(answer) - 1;
  if (isNaN(index) || index < 0 || index >= backups.length) {
    console.log('Invalid selection');
    rl.close();
    process.exit(1);
  }

  const backupFile = path.join(BACKUP_DIR, backups[index]);
  
  // Confirm restoration
  rl.question(`\nAre you sure you want to restore ${backups[index]}? This will overwrite the current database. (y/N): `, (confirm) => {
    if (confirm.toLowerCase() !== 'y') {
      console.log('Restoration cancelled');
      rl.close();
      process.exit(0);
    }

    // Execute the restore
    console.log('Starting database restoration...');
    const command = `psql "${DB_URL}" < "${backupFile}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error restoring backup:', error);
        rl.close();
        return;
      }
      if (stderr) {
        console.error('Stderr:', stderr);
      }
      console.log('Database restored successfully');
      rl.close();
    });
  });
});
