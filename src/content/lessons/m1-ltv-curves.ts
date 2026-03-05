import type { LessonStep } from "@/engine/types";

export const ltvCurvesSteps: LessonStep[] = [
  {
    title: "What Is a Lifetime Value Curve?",
    content: `Lifetime Value (LTV) is the total revenue a user generates over their entire relationship with your product. An LTV curve plots cumulative revenue per user over time, one line per cohort.

Unlike retention curves that start at 100% and decline, LTV curves start at zero and rise. The question is: how steeply do they rise, and do they keep climbing or level off?

Each point on the curve represents: "By month N, the average user in this cohort has generated $X in total." The shape of this curve drives almost every important business decision — from how much you can spend to acquire a user to how long until they become profitable.`,
    annotation: { type: "none" },
  },
  {
    title: "Reading the Slope: Steepness Matters",
    content: `The steepness of an LTV curve tells you how quickly users generate value:

A steep initial rise means users monetize fast — they pay upfront, make early purchases, or quickly adopt paid features. This is great for payback period but doesn't guarantee long-term value.

A gentle but persistent rise means revenue accumulates slowly but steadily. This is the signature of products with strong retention and recurring revenue — less flashy but often more valuable long-term.

Look at the first few periods on the chart. A curve that's steep early suggests quick monetization. A curve that keeps climbing in later periods suggests deep, sustained engagement.`,
    annotation: { type: "highlight-column", target: { cols: [0, 1, 2, 3] }, label: "Early monetization speed" },
    ahaInsight: "The best businesses combine both: fast initial monetization (steep early slope) AND continued growth (persistent later slope). This dual-slope pattern means users find immediate value and then discover more over time.",
  },
  {
    title: "When Curves Flatten: The LTV Ceiling",
    content: `An LTV curve that flattens means users have stopped generating incremental revenue. In a subscription business, this happens when the remaining subscribers are on a fixed plan with no expansion.

A curve that never flattens — one that keeps climbing linearly or even accelerates — is the holy grail. It means your surviving users keep finding new reasons to pay more. Usage-based pricing models (AWS, Snowflake) often show this pattern.

The gap between where a curve is today and where it eventually flattens is your "unrealized LTV" — the future revenue you can expect from existing cohorts if historical patterns hold.`,
    annotation: { type: "highlight-column", target: { cols: [8, 9, 10, 11] }, label: "Still climbing?" },
  },
  {
    title: "Comparing Cohorts: Which Users Are Most Valuable?",
    content: `Overlaying LTV curves from different cohorts reveals which groups of users are most valuable and how your monetization is evolving.

Higher LTV curves mean that cohort generates more revenue per user. This could be driven by:
• Better user quality (more motivated buyers)
• Pricing changes (higher ARPU)
• Product improvements (more reasons to pay)
• Seasonal effects (Q4 cohorts in e-commerce)

If newer cohorts have steeper curves, your product and monetization strategy are improving. If newer cohorts are flatter, you may be acquiring less valuable users or your pricing power is declining.

Compare the oldest and newest cohorts at the same maturity point.`,
    annotation: { type: "highlight-row", target: { rows: [0, -1] }, label: "Cohort value comparison" },
  },
  {
    title: "LTV and CAC: The Unit Economics Equation",
    content: `LTV is most powerful when paired with Customer Acquisition Cost (CAC). The ratio LTV/CAC tells you if your business model works:

LTV/CAC > 3: Strong unit economics. You earn 3x+ what you spend to acquire each user. This gives room for reinvestment and profit.

LTV/CAC = 1-3: Workable but tight. You need to either increase LTV (better retention, more monetization) or decrease CAC (more efficient marketing).

LTV/CAC < 1: You're losing money on every user. Unless you have a clear path to improving this, growth actually makes things worse.

The LTV curve also reveals your payback period — the month where cumulative revenue exceeds CAC. A shorter payback period means faster reinvestment cycles and less capital risk.`,
    annotation: { type: "none" },
    ahaInsight: "LTV/CAC is a ratio, which means you have two levers. Most teams focus on reducing CAC, but improving retention by just a few percentage points often has a larger impact on LTV — and compounds over time.",
  },
  {
    title: "Using LTV Curves in Practice",
    content: `Here's how experienced PMs use LTV curves in their daily work:

Budget Allocation: If Q1 cohorts have higher LTV curves than Q3 cohorts, invest more in Q1 acquisition. The same spend yields more lifetime revenue.

Pricing Decisions: If LTV curves flatten early, there might be room for usage-based pricing or premium tiers that extend the curve upward.

Feature Prioritization: Features that steepen the LTV curve — by improving retention or increasing ARPU — should be prioritized over features that only help acquisition.

Forecasting: Extrapolating mature cohort LTV curves lets you project future revenue from existing users, even without new growth.

In the next lesson, we'll look at engagement from a completely different angle — the Power User Curve, which reveals whether your user base is deeply engaged or just occasionally passing through.`,
    annotation: { type: "none" },
  },
];
