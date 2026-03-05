import type { LessonStep } from "@/engine/types";

export const retentionCurvesSteps: LessonStep[] = [
  {
    title: "From Heatmap to Curves",
    content: `In the previous lesson you learned to read a cohort retention table as a heatmap. Now we're looking at the same data plotted as line charts — one curve per cohort.

Each line starts at 100% on the left (Month 0) and traces how retention decays over time. The x-axis is the number of months since the cohort joined, and the y-axis is the percentage still active.

Why bother with a different view? Curves make it far easier to compare the shape of retention across cohorts. Patterns that are hidden in a grid of numbers jump out when you see them as lines.`,
    annotation: { type: "none" },
  },
  {
    title: "The Anatomy of a Retention Curve",
    content: `Every retention curve has three distinct phases:

1. The Initial Drop (M0 → M1): The steepest decline. Most casual or accidental users leave immediately. A consumer app might lose 70% here; a B2B tool with a sales-led motion might only lose 30%.

2. The Decay Phase (M1 → M6): Retention continues to decline but at a decreasing rate. Users who survived the first month are more engaged, so each subsequent month loses fewer people.

3. The Plateau (M6+): In a healthy product, the curve flattens out. The remaining users have formed a habit. This "retention floor" is arguably the most important number in your product.

Look at the highlighted early periods — this is where the curve is steepest and where onboarding improvements have the highest leverage.`,
    annotation: { type: "highlight-column", target: { cols: [0, 1, 2] }, label: "Steep decay zone" },
    ahaInsight: "The steepness of the initial drop is not the problem — it's normal. What matters is whether the curve eventually flattens. A product with 80% M1 drop but a stable 15% floor will outperform one with 50% M1 drop that never stops declining.",
  },
  {
    title: "Flattening vs. Continuing Decline",
    content: `This is the most critical diagnostic when reading retention curves. Ask yourself: does this curve have an asymptote, or is it trending to zero?

A flattening curve means you've found product-market fit with at least a segment of users. Those users get enough value to keep coming back indefinitely. Your job is to grow this segment.

A curve that never flattens — one that keeps declining even at M12 or M18 — signals a fundamental value problem. No amount of growth marketing can fix a product where even long-tenure users eventually leave.

Look at the later periods on the chart. If the curves are roughly horizontal in that zone, you're in good shape.`,
    annotation: { type: "highlight-column", target: { cols: [6, 7, 8, 9, 10, 11] }, label: "Does it flatten?" },
  },
  {
    title: "Comparing Cohorts: Are You Improving?",
    content: `The real power of retention curves comes from comparing cohorts side by side.

If newer cohorts (later months) sit above older ones at the same period, your product is improving. Maybe you shipped better onboarding, fixed a pain point, or improved activation flows.

If newer cohorts sit below older ones, something is going wrong — you might be acquiring lower-quality users as you scale, or a product change may have hurt the experience.

Look at the top row (oldest cohort) versus the bottom row (newest cohort). At the same period column, which one has higher retention?`,
    annotation: { type: "highlight-row", target: { rows: [0, -1] }, label: "Oldest vs. Newest" },
    ahaInsight: "When newer cohorts consistently retain better than older ones at the same maturity, it's one of the strongest signals that your product org is executing well. This is the 'cohort improvement' pattern that top PMs track obsessively.",
  },
  {
    title: "Spotting the Smile: Resurrection Effects",
    content: `Occasionally you'll see a retention curve that dips and then ticks back up — a "smile" shape. This happens when users churn but then come back, often driven by seasonal patterns, reactivation campaigns, or natural use cycles (like tax software or travel apps).

A genuine smile in a retention curve isn't always good news. It can mask underlying issues if you're reading the metric wrong. Ask: are these truly retained users, or are reactivation campaigns artificially inflating the numbers?

For most products, a smooth L-shaped curve that flattens is the healthiest pattern. Smiles are worth investigating but shouldn't be your goal.`,
    annotation: { type: "none" },
  },
  {
    title: "Your Retention Curve Checklist",
    content: `You now know how to read retention curves like a pro. Here's what to evaluate every time you see one:

1. How steep is the initial drop? (Onboarding quality)
2. Does the curve flatten? At what level? (Product-market fit check)
3. Are newer cohorts above or below older ones? (Product improvement trajectory)
4. Is there a "smile" or anomaly? (Investigate the cause)
5. At M6, what percentage remains? (A quick benchmark — 25%+ is strong for consumer, 80%+ for B2B SaaS)

In the next lesson, we'll explore revenue retention — where curves can actually go above 100%, something impossible with user retention. This unlocks a powerful new dimension of analysis.`,
    annotation: { type: "none" },
  },
];
