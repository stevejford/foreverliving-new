# Forever Living Memorial - Database Setup

This document outlines the database schema and setup for the Forever Living Memorial platform using Supabase (PostgreSQL).

## Table Schemas

### Memorials Table
```sql
create table memorials (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  name text not null,
  date_of_birth date,
  date_of_passing date,
  biography text,
  image_url text,
  is_public boolean default true,
  allow_comments boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index for faster user-based queries
create index memorials_user_id_idx on memorials(user_id);
```

### Memorial Photos Table
```sql
create table memorial_photos (
  id uuid default uuid_generate_v4() primary key,
  memorial_id uuid references memorials(id) on delete cascade,
  url text not null,
  caption text,
  created_at timestamp with time zone default now()
);

-- Index for faster memorial-based queries
create index memorial_photos_memorial_id_idx on memorial_photos(memorial_id);
```

## Row Level Security (RLS) Policies

### Memorials Table Policies

```sql
-- Enable RLS
alter table memorials enable row level security;

-- Create policies
create policy "Users can view their own memorials"
  on memorials for select
  using (auth.uid() = user_id);

create policy "Users can view public memorials"
  on memorials for select
  using (is_public = true);

create policy "Users can create their own memorials"
  on memorials for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own memorials"
  on memorials for update
  using (auth.uid() = user_id);

create policy "Users can delete their own memorials"
  on memorials for delete
  using (auth.uid() = user_id);
```

### Memorial Photos Table Policies

```sql
-- Enable RLS
alter table memorial_photos enable row level security;

-- Create policies
create policy "Users can view photos of memorials they can access"
  on memorial_photos for select
  using (
    exists (
      select 1 from memorials
      where memorials.id = memorial_photos.memorial_id
      and (memorials.user_id = auth.uid() or memorials.is_public = true)
    )
  );

create policy "Users can add photos to their own memorials"
  on memorial_photos for insert
  with check (
    exists (
      select 1 from memorials
      where memorials.id = memorial_photos.memorial_id
      and memorials.user_id = auth.uid()
    )
  );

create policy "Users can update photos of their own memorials"
  on memorial_photos for update
  using (
    exists (
      select 1 from memorials
      where memorials.id = memorial_photos.memorial_id
      and memorials.user_id = auth.uid()
    )
  );

create policy "Users can delete photos from their own memorials"
  on memorial_photos for delete
  using (
    exists (
      select 1 from memorials
      where memorials.id = memorial_photos.memorial_id
      and memorials.user_id = auth.uid()
    )
  );
```

## Storage Bucket Policies

```sql
-- Create a storage bucket for memorial photos
insert into storage.buckets (id, name)
values ('memorial_photos', 'memorial_photos');

-- Set up storage policies
create policy "Anyone can view public memorial photos"
  on storage.objects for select
  using (bucket_id = 'memorial_photos' and
    exists (
      select 1 from memorials
      where memorials.image_url = storage.objects.name
      and memorials.is_public = true
    )
  );

create policy "Users can upload memorial photos"
  on storage.objects for insert
  with check (
    bucket_id = 'memorial_photos' and
    auth.uid() = auth.uid()
  );

create policy "Users can update their own memorial photos"
  on storage.objects for update
  using (
    bucket_id = 'memorial_photos' and
    auth.uid() = owner
  );

create policy "Users can delete their own memorial photos"
  on storage.objects for delete
  using (
    bucket_id = 'memorial_photos' and
    auth.uid() = owner
  );
```

## Functions

### Update Updated At Timestamp
```sql
-- Function to automatically update the updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for memorials table
create trigger update_memorials_updated_at
  before update on memorials
  for each row
  execute function update_updated_at_column();
```

## Indexes

Additional indexes have been created to optimize common queries:

```sql
-- Index for public memorials
create index memorials_public_idx on memorials(is_public) where is_public = true;

-- Index for memorial search by name
create index memorials_name_idx on memorials using gin(to_tsvector('english', name));

-- Index for memorial search by biography
create index memorials_biography_idx on memorials using gin(to_tsvector('english', biography));
```

## Backup and Maintenance

1. Regular backups are handled by Supabase
2. Consider implementing a data retention policy for inactive memorials
3. Monitor table sizes and query performance
4. Regularly update indexes based on query patterns

## Security Considerations

1. All sensitive data is protected by RLS policies
2. User authentication is handled by Supabase Auth
3. File uploads are restricted by size and type
4. All database operations are performed through secure API endpoints
