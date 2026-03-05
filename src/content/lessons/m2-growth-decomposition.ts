import type { LessonStep } from "@/engine/types";

export const growthDecompositionSteps: LessonStep[] = [
  {
    title: "The Growth Accounting Framework",
    content: `Welcome to Module 2. We're shifting from cohort-level analysis to understanding how your entire user base evolves month over month.

Growth accounting decomposes your Monthly Active Users (MAU) into four components:

MAU = New Users + Retained Users + Resurrected Users - Churned Users

This equation is an identity — it's always true by definition. Every active user this month falls into exactly one of the first three buckets, and every user who was active last month but not this month is counted as churned.

The stacked bar chart on the right shows this breakdown over time. Understanding each component tells you not just whether you're growing, but why.`,
    annotation: { type: "none" },
  },
  {
    title: "The Four Components Explained",
    content: `Let's define each component precisely:

New Users: Active this month for the very first time. They've never appeared in your data before. This is your top-of-funnel — the result of marketing, virality, and organic discovery.

Retained Users: Active this month AND active last month. These are your sticky users, the backbone of sustainable growth. High retained users means your product delivers ongoing value.

Resurrected Users: Active this month, NOT active last month, but have been seen before. They churned at some point and came back. Resurrection can be organic (they remembered you) or driven (reactivation emails, ads).

Churned Users: Active last month but NOT this month. Shown as negative in the chart because they subtract from your user base. This is your leaky bucket.`,
    annotation: { type: "highlight-column", target: { col: 0 } },
    ahaInsight: "Most PMs focus on new user acquisition. But retained users are the compounding asset — they show up month after month without additional acquisition cost. Growing retained users is the most capital-efficient path to scale.",
  },
  {
    title: "Reading the Stacked Bar Chart",
    content: `The stacked bar chart visualizes all four components simultaneously:

Positive bars (above the axis) stack New + Retained + Resurrected. Together they represent everyone active this month.

Negative bars (below the axis) show Churned users — everyone who left since last month.

The net height (top of positive minus depth of negative) is your total MAU change. If the positive stack is taller than the negative, you're growing.

Look at how the proportions change over time. In early-stage products, new users dominate. In mature products, retained users should be the largest positive component. If churned users are growing faster than new + resurrected, you're in trouble.`,
    annotation: { type: "none" },
  },
  {
    title: "Healthy vs. Unhealthy Growth Patterns",
    content: `The shape of your growth decomposition chart reveals the quality of your growth:

Healthy Growth: Retained users grow over time (the green bar gets taller). New users are supplementary. Churned users are a small and stable fraction. This is sustainable, compounding growth.

Treadmill Growth: New users are high but so is churn. The retained segment stays flat. You're acquiring users as fast as you're losing them — running hard just to stay in place. This is expensive and fragile.

Declining Product: Churned users consistently exceed new + resurrected. Each month the retained bar shrinks. Even heavy marketing spend can't keep up with the exodus.

Look at the retained segment across months. Is it growing, flat, or shrinking?`,
    annotation: { type: "highlight-row", target: { row: 1 }, label: "Retained users trend" },
    ahaInsight: "If your 'retained' segment isn't growing month over month, no amount of new user acquisition will produce sustainable growth. Retained users are the only component that compounds.",
  },
  {
    title: "The Resurrection Signal",
    content: `Resurrected users are often overlooked, but they carry valuable information.

A large resurrection component means two things: first, you've had significant past churn (otherwise there's no one to resurrect). Second, something is pulling users back — maybe you've improved the product, run reactivation campaigns, or hit a seasonal peak.

If resurrection is growing while new user acquisition is flat, it could mean your marketing is re-engaging lapsed users rather than finding new ones. This is fine short-term but not a growth strategy.

If resurrection is consistently near zero, your churned users are truly gone. This makes reducing churn even more critical — once they leave, they never come back.

Watch the resurrection segment's size relative to new users over time.`,
    annotation: { type: "none" },
  },
  {
    title: "Using Growth Accounting for Decisions",
    content: `Growth accounting directly informs strategy:

If churn dominates: Stop spending on acquisition until you fix retention. Every new user you acquire will also churn, wasting your spend. Focus on onboarding, activation, and core product value.

If retained is strong but new is low: Your product works — you need distribution. Invest in marketing, partnerships, and viral loops. This is the best position to be in.

If resurrection is high: Understand what brought users back. Can you systematize it? Build it into the product? This is often an untapped growth lever.

If everything is flat: You've hit a local maximum. Time for a step change — new market, new product surface, or pricing innovation.

In the next lesson, we'll distill this entire decomposition into a single number: the Quick Ratio.`,
    annotation: { type: "none" },
  },
];
