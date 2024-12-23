/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.externals.push("pino-pretty");
    return config;
  },
};

export default nextConfig;
