module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        }]
      }
    ]
  },
}
