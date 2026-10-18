/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Set to '/repository-name' for project GitHub Pages; empty for username.github.io.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  allowedDevOrigins: ['192.168.9.19'],
};

export default nextConfig;
