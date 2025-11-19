/** @type {import('next').NextConfig} */
const nextConfig = {
  // cacheComponents disabled to fix build errors with filesystem-based content loading
  // cacheComponents: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
