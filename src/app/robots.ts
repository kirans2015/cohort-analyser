import type { MetadataRoute } from "next";

// TODO: update with production domain
const SITE_URL = "https://cohortanalyser.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
