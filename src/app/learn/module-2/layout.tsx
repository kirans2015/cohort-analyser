import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Module 2: Growth Accounting — Cohort Analyser",
  description:
    "Learn growth accounting: decompose MAU into new, retained, resurrected and churned users. Understand Quick Ratio, retention rates, and CMGR.",
  openGraph: {
    title: "Module 2: Growth Accounting — Cohort Analyser",
    description:
      "Interactive lessons on growth decomposition, Quick Ratio, retention rates, and CMGR.",
  },
};

export default function Module2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
