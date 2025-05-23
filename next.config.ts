// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // svg 문제랑 상관x
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
