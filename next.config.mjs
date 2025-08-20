/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "cuddly-space-winner-g47p66jg7g7g2vp7r-3000.app.github.dev"
      ]
    }
  }
}

export default nextConfig
