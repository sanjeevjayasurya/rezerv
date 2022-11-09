const withFonts = require("next-fonts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...withFonts({
    webpack(config, options) {
      return config;
    },
  }),
};

module.exports = nextConfig;
