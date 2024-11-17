# Forever Living Memorial

A beautiful and respectful platform for creating and sharing digital memorials, built with Next.js 14 and Supabase.

## Features

- 🔐 Secure Authentication with Supabase
- 📝 Create and manage digital memorials
- 🖼️ Upload and manage memorial photos
- 🌐 Share memorials with loved ones
- 📱 Responsive design for all devices
- ⚡ Fast and modern user interface
- 🔄 Reverse proxy with Traefik
- 🔒 Automatic HTTPS with Let's Encrypt

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Deployment**: Docker & Traefik
- **SSL**: Let's Encrypt

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Docker and Docker Compose
- Domain name (for production)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/forever-living-memorial.git
cd forever-living-memorial
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

### Production Deployment with Docker and Traefik

1. Update configuration files:
   - Set your domain in `docker-compose.yml`
   - Set your email in `docker-compose.yml` and `traefik.yml` for Let's Encrypt

2. Start the application:
   ```bash
   # On Windows:
   start.bat

   # On Linux/Mac:
   ./start.sh
   ```

This will:
- Create required Docker networks
- Set up Traefik as a reverse proxy
- Configure automatic HTTPS with Let's Encrypt
- Start your Next.js application

Access points:
- Application: https://your-domain.com
- Traefik Dashboard: http://localhost:8080

### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart services
docker-compose up -d --build
```

## Project Structure

```
├── app/                # Next.js app directory
├── components/         # React components
├── public/            # Static assets
├── styles/           # Global styles
├── utils/            # Utility functions
├── docker-compose.yml # Docker composition
├── Dockerfile        # Docker build instructions
├── traefik.yml       # Traefik configuration
└── next.config.js    # Next.js configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
