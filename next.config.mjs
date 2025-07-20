/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove appDir — it's enabled by default
  },
  serverExternalPackages: ["mongoose"], // ✅ updated key
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  }
};

export default nextConfig;
