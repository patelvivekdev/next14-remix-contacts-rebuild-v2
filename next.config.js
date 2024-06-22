/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
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
