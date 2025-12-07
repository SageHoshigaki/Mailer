/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.network https://hcaptcha.com https://*.hcaptcha.com;
              connect-src 'self' https://api.stripe.com https://m.stripe.network https://hcaptcha.com https://*.hcaptcha.com https://*.clerk.accounts.dev https://*.clerk.com;
              frame-src https://js.stripe.com https://hcaptcha.com https://*.hcaptcha.com;
              style-src 'self' 'unsafe-inline';
              font-src 'self' data:;
              img-src 'self' data: blob: https: http: http://localhost:* http://127.0.0.1:* /_next/image /_next/static/media;
              object-src 'none';
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
