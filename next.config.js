/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  images : {
    domains : ["localhost","fridas3new.s3.amazonaws.com"]
  }
}

module.exports = nextConfig
