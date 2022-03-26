module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
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
