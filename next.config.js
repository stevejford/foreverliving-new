/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizeCss: false,
    scrollRestoration: true
  },
  images: {
    domains: ['nqahimgeesyjmnvjbmwj.supabase.co', 'images.pexels.com'],
  },
  webpack: (config, { isServer }) => {
    // Add video file handling
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    // Add font file handling
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data: blob:",
              "img-src 'self' data: blob: https://*.supabase.co https://images.pexels.com",
              "media-src 'self' blob: https://*.supabase.co",
              "connect-src 'self' https://*.supabase.co https://api.emailjs.com wss://*.supabase.co",
              "frame-src 'self' https://*.supabase.co",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'"
            ].join('; ')
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/:path*.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8'
          }
        ]
      },
      {
        source: '/:path*.css',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8'
          }
        ]
      },
      {
        source: '/:path*.woff2',
        headers: [
          {
            key: 'Content-Type',
            value: 'font/woff2'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
