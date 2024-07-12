const nextConfig = {
  images: {
    domains: ['img.clerk.com', 'images.pexels.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "async_hooks": false,
        "net": false,
        "tls": false,
        "fs": false,
      };
    }
    return config;
  },
};

export default nextConfig
