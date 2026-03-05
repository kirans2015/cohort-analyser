import type { LessonStep } from "@/engine/types";

export const revenueRetentionSteps: LessonStep[] = [
  {
    title: "Why Revenue Retention Is Different",
    content: `User retention asks: "Are people still showing up?" Revenue retention asks: "Is the money still flowing — and growing?"

These are fundamentally different questions. A cohort of 100 users might retain 60 users at M6 (60% user retention), but if those 60 users are each spending more than they did initially, revenue retention could be at 90% — or even higher.

Revenue retention is especially critical for SaaS and subscription businesses where customers can expand their usage over time. It's the single best predictor of long-term business health.`,
    annotation: { type: "none" },
  },
  {
    title: "The Magic of >100% Revenue Retention",
    content: `Here's what makes revenue retention uniquely powerful: it can exceed 100%.

When your existing customers spend more over time — through upsells, seat expansion, usage growth, or premium tier upgrades — the revenue from a cohort can actually grow even as some users churn. This is called net revenue retention (NRR) or net dollar retention (NDR).

Look at the heatmap. If you see cells above 100% in later periods, that means the remaining users are spending enough extra to more than offset the revenue lost from churned users. Elite SaaS companies achieve 120-140% NDR.`,
    annotation: { type: "highlight-column", target: { col: 3 }, label: "Can exceed 100%" },
    ahaInsight: "Net revenue retention above 100% means your business grows even if you stop acquiring new customers entirely. This is why investors prize NRR above almost any other metric — it's a compounding machine.",
  },
  {
    title: "Gross vs. Net Revenue Retention",
    content: `There are two flavors, and the distinction matters:

Gross Revenue Retention (GRR) caps at 100%. It measures how much revenue you keep from existing customers, ignoring any expansion. GRR tells you about your churn problem in isolation.

Net Revenue Retention (NRR) includes expansion revenue. NRR = (Starting Revenue - Churned Revenue - Contraction + Expansion) / Starting Revenue. NRR can exceed 100% and tells you the full picture.

If GRR is 85% but NRR is 110%, you're losing 15% of revenue to churn but gaining 25% from expansion. That's healthy — but you'd still benefit from reducing churn, since every retained dollar also has expansion potential.`,
    annotation: { type: "none" },
  },
  {
    title: "Comparing Revenue and User Retention",
    content: `Place revenue retention alongside user retention and the gaps tell a story:

Revenue retention >> User retention: Your best customers stay and spend more. Losing users but keeping revenue means you're shedding low-value users while power users deepen engagement. This is common in freemium models.

Revenue retention ≈ User retention: Spending is uniform across users. There's no expansion motion, and the users who churn spend roughly the same as those who stay.

Revenue retention << User retention: You're keeping users but losing revenue — a sign of downgrades, discount dependency, or feature degradation. This is a red flag that demands investigation.

Compare the first row values for both metrics at the same period.`,
    annotation: { type: "highlight-row", target: { row: 0 }, label: "Compare with user retention" },
    ahaInsight: "The gap between revenue retention and user retention reveals your monetization health. A wide positive gap means your product gets more valuable to users over time — a hallmark of great SaaS businesses.",
  },
  {
    title: "Reading Revenue Retention by Cohort",
    content: `Just like user retention, comparing revenue retention across cohorts reveals trends:

Are newer cohorts showing stronger early revenue retention? This could mean better pricing, improved onboarding to paid features, or higher-quality customer acquisition.

Are older cohorts showing accelerating expansion over time? This validates that your product creates compounding value — users discover more use cases the longer they stay.

Watch for the "expansion inflection" — the period where revenue retention starts climbing after the initial churn dip. How quickly this happens tells you how fast customers find expansion value.`,
    annotation: { type: "highlight-row", target: { rows: [0, -1] } },
  },
  {
    title: "Revenue Retention Benchmarks",
    content: `Here are the benchmarks top PMs use to assess revenue retention health:

Net Revenue Retention:
• Best-in-class SaaS: 130%+ (Snowflake, Twilio at peak)
• Strong SaaS: 110-130%
• Healthy SaaS: 100-110%
• Concerning: Below 100% (you're shrinking without new sales)

Gross Revenue Retention:
• Best-in-class: 95%+
• Strong: 90-95%
• Needs work: 80-90%
• Critical: Below 80%

Remember: NRR above 100% can mask a GRR problem. Always look at both. A company with 120% NRR but 75% GRR has a churn problem being papered over by expansion from surviving accounts.

In the next lesson, we'll use revenue retention to calculate something even more powerful: lifetime value curves.`,
    annotation: { type: "none" },
  },
];
