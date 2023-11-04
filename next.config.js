//this code is used to configure experimental features, image handling, and Webpack settings in a Next.js application,
//helping you tailor the application to your specific needs and take advantage of new features while optimizing performance.
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
