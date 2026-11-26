import type { NextConfig } from "next";

function buildStrapiImagePatterns(): NonNullable<
  NextConfig["images"]
>["remotePatterns"] {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    },
    {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "1337",
      pathname: "/uploads/**",
    },
  ];

  const strapiUrl = process.env.STRAPI_URL;
  if (strapiUrl) {
    try {
      const parsed = new URL(strapiUrl);
      const protocol = parsed.protocol === "https:" ? "https" : "http";
      patterns.push({
        protocol,
        hostname: parsed.hostname,
        ...(parsed.port ? { port: parsed.port } : {}),
        pathname: "/uploads/**",
      });
    } catch {
      // Ignore malformed STRAPI_URL during static config evaluation
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: buildStrapiImagePatterns(),
  },
};

export default nextConfig;
