/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
        domains: ['img.freepik.com',"plus.unsplash.com"],
      },
  };
  
  export default nextConfig;
  