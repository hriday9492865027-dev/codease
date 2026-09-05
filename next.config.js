/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.codechef.com', 'www.codechef.com'],
  },
};

module.exports = nextConfig;
