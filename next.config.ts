import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.es https://*.googlesyndication.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "img-src 'self' data: https://images.unsplash.com https://images.pexels.com https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.es https://*.googlesyndication.com;",
              "font-src 'self' https://fonts.gstatic.com;",
              "frame-src 'self' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.es https://*.googlesyndication.com;",
              "connect-src 'self' ws: wss: https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.es https://*.googlesyndication.com;",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'none';",
              "upgrade-insecure-requests;"
            ].join(" "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
