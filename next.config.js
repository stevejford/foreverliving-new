/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  images: {
    domains: ['nqahimgeesyjmnvjbmwj.supabase.co'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  }
}

module.exports = nextConfig
