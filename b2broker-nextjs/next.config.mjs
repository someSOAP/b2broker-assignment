/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    //https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    //https://github.com/vercel/next.js/discussions/42343
    optimizePackageImports: ["@/components"]
  }
};

export default nextConfig;
