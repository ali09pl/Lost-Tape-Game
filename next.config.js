/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    trailingSlash: true,
    productionBrowserSourceMaps: true,
}

module.exports = nextConfig
