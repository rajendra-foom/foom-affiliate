/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.foomid.id",
                pathname: "/**",
            },
        ],
    },

    allowedDevOrigins: ["*.foom.id", "*.foomid.id", "*.xperiencefreedom.com"],
};

export default nextConfig;
