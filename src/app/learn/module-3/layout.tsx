import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Module 3: DAU Forecasting — Cohort Analyser",
  description:
    "Learn to forecast daily active users using day-N retention matrices, cohort contribution models, and what-if simulations.",
  openGraph: {
    title: "Module 3: DAU Forecasting — Cohort Analyser",
    description:
      "Interactive lessons on DAU forecasting, retention matrices, and what-if simulation.",
  },
};

export default function Module3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
