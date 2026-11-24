const createNextIntlPlugin = require("next-intl/plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // ChatbotLoader lê esses arquivos com fs em runtime; sem isso o deploy (Vercel) não os inclui.
        outputFileTracingIncludes: {
            "/[locale]": ["./app/botData/systemPrompt.txt", "./public/llms.txt"],
        },
    },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));