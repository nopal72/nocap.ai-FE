/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://apinocapai.vercel.app/api/auth/:path*", // Proxy to Backend
        // destination: "http://localhost:3000/auth/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//         instrumentationHook: true
//     },
// }
// export default nextConfig;
