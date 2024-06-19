/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'sessionize.com',
      },
    ],
  },
};

module.exports = nextConfig;
