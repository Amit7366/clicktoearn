// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Allow all hostnames for remote images
      },
    ],
  },
};

module.exports = nextConfig; // Export the configuration
