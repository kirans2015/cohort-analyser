import type { LessonStep } from "@/engine/types";

export const retentionRatesSteps: LessonStep[] = [
  {
    title: "Gross Retention Rate: Your Baseline Metric",
    content: `Gross Retention Rate (GRR) answers a simple question: of the users who were active last month, what percentage came back this month?

GRR = Retained Users / Previous Month's MAU

This is a period-over-period metric, not a cohort metric. While cohort retention tracks a specific group over its lifetime, GRR measures the overall stickiness of your entire active user base from one month to the next.

A GRR of 80% means that 80% of last month's active users were active again this month. The remaining 20% churned. It's a straightforward, easy-to-communicate metric that everyone in the company can understand.`,
    annotation: { type: "none" },
  },
  {
    title: "Net Churn Rate: The Flip Side",
    content: `Net Churn Rate is the complement of Gross Retention Rate:

Net Churn Rate = Churned Users / Previous Month's MAU = 1 - GRR

If GRR is 80%, Net Churn Rate is 20%. They carry the same information, but framing matters.

Retention framing ("We retain 80%") is positive and feels good in exec presentations. Churn framing ("We lose 20% every month") creates urgency and drives action. Savvy PMs use both strategically.

The chart shows both metrics over time. Focus on the churn line — even small changes in monthly churn compound dramatically over a year. A 5% monthly churn rate means you lose 46% of users over 12 months. A 10% rate means you lose 72%.`,
    annotation: { type: "highlight-row", target: { row: 0 }, label: "Monthly churn rate" },
    ahaInsight: "Monthly churn compounds. A 'small' improvement from 10% to 8% monthly churn means retaining 38% of users over a year instead of 28%. That's a 36% improvement in annual retention from just 2 percentage points.",
  },
  {
    title: "Trend Analysis: Direction Matters More Than Level",
    content: `The absolute level of your retention rate matters, but the trend matters more. A product with 70% GRR that's improving by 1 point per month is in a better position than one with 85% GRR that's declining by 1 point per month.

When analyzing the trend, look for:

Sustained improvement: GRR rising over 3+ consecutive months. This suggests structural improvements — better product, better users, or both.

Sudden drops: A sharp decline in GRR often corresponds to a specific event — a bad product update, a competitor launch, or a change in acquisition channels bringing lower-quality users.

Seasonal patterns: Some products see predictable retention cycles (higher in winter for indoor entertainment, lower in summer for productivity tools). Separate seasonal effects from structural trends.

Compare the earliest months to the most recent. What's the overall trajectory?`,
    annotation: { type: "highlight-row", target: { rows: [0, -1] } },
  },
  {
    title: "Why GRR Can Be Misleading",
    content: `Gross Retention Rate has a subtle but important flaw: it's heavily influenced by the composition of your user base.

Consider two scenarios with identical 80% GRR:
• Scenario A: Power users retain at 95%, but you have many new casual users retaining at 60%. Blended: 80%.
• Scenario B: All users retain at a uniform 80%. No segment is particularly strong or weak.

The blended GRR is the same, but the strategies are completely different. Scenario A needs better activation of casual users. Scenario B needs a broad improvement to the core product.

This is why GRR should always be analyzed alongside cohort-level retention. GRR tells you the overall pulse; cohort analysis tells you which patient needs treatment.

When GRR changes, always ask: did the actual retention behavior change, or did the user mix change?`,
    annotation: { type: "none" },
    ahaInsight: "A rising GRR might not mean your product is getting stickier. It could mean you're acquiring fewer new users (who always have lower retention), making the surviving base look better. Simpson's Paradox is real in retention metrics.",
  },
  {
    title: "Benchmarks and Target Setting",
    content: `Here are GRR benchmarks by product category:

Consumer Social Apps: 40-60% monthly GRR. High churn is endemic to the category — user attention is fickle. Success means having such strong acquisition that the bucket refills faster than it leaks.

Consumer Subscription: 90-95% monthly GRR. Once someone subscribes, inertia is powerful. Monthly churn above 8% is a red flag.

B2B SaaS (SMB): 92-96% monthly GRR. Small businesses churn due to going out of business or budget cuts more than dissatisfaction.

B2B SaaS (Enterprise): 96-99% monthly GRR. Annual contracts and deep integration create high switching costs. Monthly churn above 2% means serious account management issues.

When setting targets, aim for improvement trajectories rather than absolute numbers. "Improve GRR by 2 percentage points this quarter" is more actionable than "achieve 90% GRR."`,
    annotation: { type: "none" },
  },
  {
    title: "From Rates to Action: The Churn Diagnostic",
    content: `When retention rates need improvement, follow this diagnostic framework:

Step 1 — Segment the churn: Are you losing new users (activation problem), medium-tenure users (engagement problem), or long-tenure users (value degradation)?

Step 2 — Identify the exit point: What was the last action churned users took? Where in the product did they spend time before leaving? This reveals the "moment of disillusionment."

Step 3 — Compare with retained users: What do retained users do that churned users don't? The behavioral gaps are your intervention points.

Step 4 — Run targeted experiments: Improve onboarding for new user churn, add engagement hooks for mid-tenure churn, build loyalty features for long-tenure churn.

Step 5 — Measure the impact on GRR: Did the needle move? By how much? Is the improvement sustainable?

In the next lesson, we'll look at CMGR — a way to smooth out volatile month-over-month growth and see the true growth trajectory.`,
    annotation: { type: "none" },
  },
];
