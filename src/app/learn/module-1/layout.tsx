import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Module 1: Cohort Analysis — Cohort Analyser",
  description:
    "Learn cohort retention analysis through interactive heatmaps, retention curves, revenue retention, LTV curves, and power user distributions.",
  openGraph: {
    title: "Module 1: Cohort Analysis — Cohort Analyser",
    description:
      "Interactive lessons on cohort retention heatmaps, curves, LTV, and power user analysis.",
  },
};

export default function Module1Layout({ children }: { children: React.ReactNode }) {
  return children;
}
