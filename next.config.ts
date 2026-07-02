import type { NextConfig } from "next";

// Remplace par le sous-domaine exact de ton projet Supabase
// (ex: "abcdefghijkl.supabase.co") pour plus de sécurité en production.
const SUPABASE_HOSTNAME = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "*.supabase.co";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE_HOSTNAME,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Interdit l'intégration dans une iframe (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Empêche le navigateur de deviner le type MIME
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Force HTTPS pour les 365 prochains jours (sous-domaines inclus)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Ne pas envoyer le Referer hors du site
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Désactive les fonctionnalités sensibles non utilisées
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Politique de sécurité du contenu (Content-Security-Policy)
          // Ajustée pour Next.js + Supabase Storage + Google Fonts
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // requis par Next.js en dev/prod
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              `img-src 'self' data: ${SUPABASE_HOSTNAME}`,
              `connect-src 'self' https://${SUPABASE_HOSTNAME}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
