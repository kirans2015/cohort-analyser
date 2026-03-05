import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Case Studies — Cohort Analyser",
  description:
    "Apply growth analytics skills to curated case study datasets: healthy e-commerce, power-law fashion retail, and declining SaaS. Derived from public data sources, sampled for educational use.",
  openGraph: {
    title: "Explore Case Studies — Cohort Analyser",
    description:
      "Explore real datasets representing different growth archetypes with interactive charts.",
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
