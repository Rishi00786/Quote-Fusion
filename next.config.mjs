// next.config.js

const nextConfig = {
  // Define domains for image optimization
  images: {
    domains: ['img.clerk.com','images.pexels.com'],
  },
  webpack: (config, { isServer }) => {
    // Adjust webpack configuration based on whether it's for server or client
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

export default nextConfig;
