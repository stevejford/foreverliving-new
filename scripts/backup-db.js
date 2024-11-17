const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const BACKUP_DIR = path.join(__dirname, '../backups');
const DB_URL = process.env.DATABASE_URL;

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Create timestamp for backup file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.sql`);

// Create the backup command
const command = `pg_dump "${DB_URL}" --clean --if-exists --no-owner --no-privileges > "${backupFile}"`;

// Execute the backup
console.log('Starting database backup...');
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('Error creating backup:', error);
    return;
  }
  if (stderr) {
    console.error('Stderr:', stderr);
    return;
  }
  console.log(`Backup created successfully: ${backupFile}`);
  
  // Clean up old backups (keep last 5)
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.startsWith('backup-'))
    .map(file => path.join(BACKUP_DIR, file));
  
  if (files.length > 5) {
    files
      .sort((a, b) => fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime())
      .slice(5)
      .forEach(file => {
        fs.unlinkSync(file);
        console.log(`Deleted old backup: ${file}`);
      });
  }
});
