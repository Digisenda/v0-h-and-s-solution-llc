/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
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
