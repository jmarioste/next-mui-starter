/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  rewrites() {
    return [
      {
        source: "/oidc",
        destination: "/api/oidc",
      },
    ];
  },
};

module.exports = nextConfig;
