/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
};

module.exports = nextConfig;
