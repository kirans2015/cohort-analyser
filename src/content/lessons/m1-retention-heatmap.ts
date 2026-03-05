import type { LessonStep } from "@/engine/types";

export const retentionHeatmapSteps: LessonStep[] = [
  {
    title: "What is a Cohort Retention Table?",
    content: `A cohort retention table is the single most important tool in a product manager's analytics toolkit. It answers a deceptively simple question: "Of the users who started using our product in a given month, how many are still around?"

Each row represents a cohort — a group of users who first appeared in the same month. Each column represents a time period after their first month (M0, M1, M2, ...). The cell values show the percentage of the original cohort still active.

Look at the heatmap on the right. The first column (M0) is always 100% — by definition, everyone in a cohort was active in the month they joined.`,
    annotation: { type: "highlight-column", target: { col: 0 } },
  },
  {
    title: "Reading the First Drop",
    content: `The most important number in any retention table is M1 — the percentage of users who come back the month after they first appeared.

This is where most products lose the majority of their users. A typical consumer app sees 60-80% drop-off in Month 1. B2B products with stronger onboarding might retain 50-70%.

Look at the M1 column highlighted on the chart. Notice how this column tells you immediately whether your product's first experience is working. If M1 is below 20%, you have a serious onboarding problem — most users tried it once and never came back.`,
    annotation: { type: "highlight-column", target: { col: 1 } },
    ahaInsight: "Month 1 retention is the steepest drop for every product. This is normal — but how steep that drop is tells you everything about your onboarding experience.",
  },
  {
    title: "Do the Curves Flatten?",
    content: `Here's the most critical diagnostic question: do your retention curves eventually flatten, or do they keep declining toward zero?

Look at the later columns (M6+). If retention stabilizes around a consistent percentage — say 20-30% — that's your retention floor. These are your core users who have built a habit around your product.

If retention keeps declining with no floor in sight, you have a "leaky bucket" — users eventually churn out no matter how long they've been around. This is an existential problem.`,
    annotation: { type: "highlight-column", target: { cols: [6, 7, 8, 9, 10, 11, 12] } },
    ahaInsight: "A healthy product has a retention floor — a percentage below which retention doesn't drop. Finding and raising this floor is one of the highest-leverage growth activities.",
  },
  {
    title: "Comparing Cohorts Over Time",
    content: `Now look at the rows — are newer cohorts (bottom rows) retaining better or worse than older cohorts (top rows)?

If newer cohorts show higher retention at the same period, your product is improving. Maybe you've improved onboarding, added features that drive habit formation, or attracted better-fit users.

If newer cohorts are retaining worse, something is degrading — perhaps you're reaching less engaged audiences as you scale, or product quality is declining.

Compare the top row and bottom row at the same period column.`,
    annotation: { type: "highlight-row", target: { rows: [0, -1] } },
  },
  {
    title: "The Color Gradient Tells a Story",
    content: `The heatmap colors encode retention values: darker/cooler colors mean lower retention, brighter/warmer greens mean higher retention.

Take a step back and look at the overall color pattern:

A healthy product shows a "bright left column → darker middle → stable color on the right" pattern. The initial drop happens, then colors stabilize.

A struggling product shows colors that get progressively darker all the way across — no stabilization.

The most powerful use of a cohort heatmap is this bird's-eye view. Before analyzing any individual cell, the color gradient tells you the product's retention story at a glance.`,
    annotation: { type: "none" },
    ahaInsight: "The color pattern of a retention heatmap tells the product's health story at a glance — before you read a single number. Train your eyes to see the gradient, not individual cells.",
  },
  {
    title: "Putting It All Together",
    content: `You now know how to read a cohort retention table. Here's your checklist for any product:

1. What's the M1 retention? (First impression check)
2. Is there a retention floor? (Sustainability check)
3. Are newer cohorts improving? (Trajectory check)
4. What does the color gradient show? (Bird's-eye health check)

In the next lesson, we'll look at the same data as retention curves — line charts that make trend comparison even easier.

Practice: hover over individual cells to see exact values and user counts. Notice which cohorts are healthiest.`,
    annotation: { type: "none" },
  },
];
