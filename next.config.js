//this code is used to configure experimental features, image handling, and Webpack settings in a Next.js application,
//helping you tailor the application to your specific needs and take advantage of new features while optimizing performance.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;

// ANOTHER WAY
// const nextConfig = {
//   images: {
//     //https://nextjs.org/docs/app/api-reference/components/image#domains
//     //next doesnot allow external image urls(for eg: https://images.pexels.com/photos/18900657) unless its domain is mentioned here
//     //we can add multiple domains
//     domains: ["images.pexels.com"],
//   },
// };

// module.exports = nextConfig;
