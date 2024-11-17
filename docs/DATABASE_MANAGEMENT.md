# Database Management Guide for Forever Living Memorial Platform

This guide explains how to manage your database during development and production. Don't worry if you're new to this - we've made it super simple! 🚀

## Table of Contents
- [When to Use Each Command](#when-to-use-each-command)
- [Backing Up Your Database](#backing-up-your-database)
- [Restoring Your Database](#restoring-your-database)
- [Running Migrations](#running-migrations)
- [Development Workflow](#development-workflow)

## When to Use Each Command

### Use Backup (npm run db:backup) when:
- Before making big changes to your database
- Before running migrations
- At the end of each development day
- Before deploying to production
- Regularly in production (recommended: daily)

### Use Restore (npm run db:restore) when:
- Something went wrong and you need to go back to a working version
- You want to reset your development database to a previous state
- You're setting up the project on a new computer
- You need to sync your local database with a backup from production

### Use Migrations (npm run db:migrate) when:
- You first set up the project
- After pulling new code that includes database changes
- After adding your own new migration file

## Backing Up Your Database

This creates a snapshot of your entire database that you can return to later.

```bash
npm run db:backup
```

That's it! The backup will be saved in the `backups` folder with today's date.

## Restoring Your Database

This lets you go back to a previous backup.

1. Run the restore command:
```bash
npm run db:restore
```

2. You'll see a list of available backups with numbers
3. Type the number of the backup you want to restore
4. Type 'y' to confirm

Example:
```
Available backups:
1. backup-2024-01-20-12-30-45.sql
2. backup-2024-01-19-15-20-30.sql

Enter the number of the backup to restore: 1
Are you sure? (y/N): y
```

## Running Migrations

Migrations are files that make changes to your database structure. Run them when:
- Setting up a new database
- After pulling new code that has database changes

```bash
npm run db:migrate
```

## Development Workflow

Here's what to do when making database changes during development:

1. **Before Making Changes**
   ```bash
   npm run db:backup
   ```
   This creates a safety backup in case something goes wrong.

2. **When Creating New Database Changes**
   - Go to `supabase/migrations` folder
   - Create a new file named like: `00004_add_new_feature.sql`
   - Write your SQL changes in this file
   - Note: Always number your migration files in sequence!

3. **Testing Your Changes**
   ```bash
   npm run db:migrate
   ```
   This applies your new changes to the database.

4. **If Something Goes Wrong**
   ```bash
   npm run db:restore
   ```
   This takes you back to your backup from step 1.

## Example Development Scenario

Let's say you want to add a new column to store user preferences:

1. First, backup your current database:
   ```bash
   npm run db:backup
   ```

2. Create a new migration file: `supabase/migrations/00004_add_user_preferences.sql`
   ```sql
   ALTER TABLE profiles ADD COLUMN preferences JSONB DEFAULT '{}';
   ```

3. Run the migration:
   ```bash
   npm run db:migrate
   ```

4. If it works: Great! Commit your changes.
   If it doesn't: Use `npm run db:restore` to go back and try again.

## Common Questions

### Q: How often should I backup?
A: In development, backup before making any database changes. In production, daily backups are recommended.

### Q: I pulled new code and things aren't working?
A: Run `npm run db:migrate` to apply any new database changes.

### Q: I messed up my database. What do I do?
A: Use `npm run db:restore` to go back to your last backup.

### Q: Do I need to backup before every migration?
A: Yes! It's always better to be safe than sorry.

### Q: What if I need to add new database changes?
A: Create a new numbered migration file in `supabase/migrations` and run `npm run db:migrate`.

## Need Help?

If you're ever unsure:
1. Make a backup first
2. Then try your changes
3. If something goes wrong, you can always restore

Remember: It's impossible to break anything permanently as long as you have backups! 😊
