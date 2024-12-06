import MillionLint from "@million/lint";

const isDev = process.env.NODE_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*", // Apply headers to all paths
        headers: [
          {
            key: "Content-Security-Policy",
            value: isDev
              ? `
                default-src *;
                script-src * 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.network https://hcaptcha.com https://*.hcaptcha.com;
                connect-src * https://api.stripe.com https://m.stripe.network https://hcaptcha.com https://*.hcaptcha.com;
                frame-src * https://js.stripe.com https://hcaptcha.com https://*.hcaptcha.com;
                style-src * 'unsafe-inline';
                font-src *;
                img-src * data:;
                object-src *;
              `
                  .replace(/\s{2,}/g, " ")
                  .trim()
              : `
                default-src 'self';
                script-src 'self' https://js.stripe.com https://m.stripe.network https://hcaptcha.com https://*.hcaptcha.com;
                connect-src 'self' https://api.stripe.com https://m.stripe.network https://hcaptcha.com https://*.hcaptcha.com;
                frame-src https://js.stripe.com https://hcaptcha.com https://*.hcaptcha.com;
                style-src 'self' 'unsafe-inline';
                font-src 'self';
                img-src 'self' data:;
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

export default MillionLint.next()(nextConfig);
