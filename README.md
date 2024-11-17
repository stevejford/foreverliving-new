# Forever Living Memorial

A beautiful and respectful platform for creating and sharing digital memorials, built with Next.js 14 and Supabase.

## Features

- 🔐 Secure Authentication with Supabase
- 📝 Create and manage digital memorials
- 🖼️ Upload and manage memorial photos
- 🌐 Share memorials with loved ones
- 📱 Responsive design for all devices
- ⚡ Fast and modern user interface

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/forever-living-memorial.git
cd forever-living-memorial
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The application uses the following main tables:

### Users
- Managed by Supabase Auth
- Contains user authentication and profile data

### Memorials
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
```

### Photos
```sql
create table memorial_photos (
  id uuid default uuid_generate_v4() primary key,
  memorial_id uuid references memorials(id) on delete cascade,
  url text not null,
  caption text,
  created_at timestamp with time zone default now()
);
```

## Security

- Row Level Security (RLS) policies ensure users can only access their own data
- Secure file uploads with Supabase Storage
- Protected API routes
- Secure authentication flow

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
