/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checks for production
  },
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checks
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
