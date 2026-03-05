import type { MetadataRoute } from "next";

// TODO: update with production domain
const SITE_URL = "https://cohortanalyser.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1.0 },
    { path: "/explore", priority: 0.8 },
    { path: "/learn/module-1/retention-heatmap", priority: 0.8 },
    { path: "/learn/module-1/retention-curves", priority: 0.8 },
    { path: "/learn/module-1/power-user-curve", priority: 0.8 },
    { path: "/learn/module-1/ltv-curves", priority: 0.8 },
    { path: "/learn/module-1/revenue-retention", priority: 0.8 },
    { path: "/learn/module-2/retention-rates", priority: 0.8 },
    { path: "/learn/module-2/growth-decomposition", priority: 0.8 },
    { path: "/learn/module-2/quick-ratio", priority: 0.8 },
    { path: "/learn/module-2/cmgr", priority: 0.8 },
    { path: "/learn/module-3/day-n-matrix", priority: 0.8 },
    { path: "/learn/module-3/dau-forecast", priority: 0.8 },
    { path: "/learn/module-3/what-if-simulator", priority: 0.8 },
  ];

  const datasets = ["ecommerce", "declining-product", "hm-fashion"];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      priority,
    })),
    ...datasets.map((dataset) => ({
      url: `${SITE_URL}/explore/${dataset}`,
      lastModified: new Date(),
      priority: 0.6,
    })),
  ];
}
