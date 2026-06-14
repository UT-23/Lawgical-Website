/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/services', destination: '/expertise', permanent: true },
      { source: '/services/:slug', destination: '/expertise', permanent: true },
      { source: '/team', destination: '/people', permanent: true },
      { source: '/news', destination: '/insights', permanent: true },
      { source: '/news/:slug', destination: '/insights/:slug', permanent: true },
    ]
  },
}

export default nextConfig
