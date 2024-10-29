/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors and warnings during the build
    },
    typescript: {
      ignoreBuildErrors: true, // Ignore TypeScript errors as well
    },
  };
  
  export default nextConfig;