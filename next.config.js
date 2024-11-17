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
    domains: ['nqahimgeesyjmnvjbmwj.supabase.co', 'images.pexels.com'],
  },
  webpack: (config, { isServer }) => {
    // Add video file handling
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      }],
    });

    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
  // Optimize for production
  experimental: {
    optimizeCss: false,  // Disable CSS optimization since it requires critters
    scrollRestoration: true,
  },
  // Configure static file serving
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://nqahimgeesyjmnvjbmwj.supabase.co",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://nqahimgeesyjmnvjbmwj.supabase.co https://images.pexels.com",
              "media-src 'self' https://nqahimgeesyjmnvjbmwj.supabase.co",
              "connect-src 'self' https://nqahimgeesyjmnvjbmwj.supabase.co https://api.emailjs.com",
              "font-src 'self'",
              "frame-src 'self'",
              "object-src 'none'"
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
