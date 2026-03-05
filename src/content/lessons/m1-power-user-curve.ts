import type { LessonStep } from "@/engine/types";

export const powerUserCurveSteps: LessonStep[] = [
  {
    title: "Beyond Retention: How Engaged Are Your Users?",
    content: `Retention tells you whether users come back. The Power User Curve tells you how often.

Also known as the L30 chart (Activity Level in the last 30 days), this histogram shows the distribution of users by how many days they were active in a month. The x-axis runs from 1 to 30 days, and the y-axis shows the number (or percentage) of users at each activity level.

A user active 1 day out of 30 is barely engaged. A user active 25+ days out of 30 is a power user who has deeply integrated your product into their daily routine. The shape of this distribution tells you more about product health than any single retention number.`,
    annotation: { type: "none" },
  },
  {
    title: "The Three User Segments",
    content: `The Power User Curve naturally segments your user base into three groups:

Casual Users (1-5 days/month): They use your product occasionally. Maybe they check in once a week or only when they have a specific need. For some products (like travel booking), this is fine. For daily-use products, these users are at high risk of churning.

Core Users (6-15 days/month): The backbone of your product. They've built some habit but aren't daily users. They find consistent value but your product isn't essential to their daily workflow.

Power Users (16-30 days/month): Your champions. They use your product almost every day. They drive word-of-mouth, generate the most revenue, and provide the best feedback. Understanding what makes them different from core users is key to growth.

Look at the histogram — where does the weight of the distribution sit?`,
    annotation: { type: "region", target: { cols: [0, 1, 2, 3, 4] }, label: "Casual users" },
    ahaInsight: "The ratio of power users to casual users is a leading indicator of product health. A growing power user segment — even if total users is flat — often predicts future growth through organic referrals.",
  },
  {
    title: "Reading the Shape: Smile, Frown, or Flat?",
    content: `The shape of the Power User Curve reveals your product's engagement archetype:

The "Smile" (U-shape): Weight at both ends — many casual users AND many power users, with fewer in the middle. This is the ideal pattern for daily-use products like social networks or messaging apps. Users either use it every day or barely at all, with clear separation.

The "Left-heavy Frown" (L-shape): Most users are on the low end. This is common for utility apps or content platforms — users come for a specific need and leave. Not inherently bad, but it means your product serves transactional rather than habitual needs.

The "Flat" distribution: Users are spread evenly. This usually means your product lacks a strong daily hook — there's no strong pull to come back every day, but users find enough value to visit regularly.

The right-heavy pattern (most users on the high end) is the gold standard — it means your product is essential to daily workflows.`,
    annotation: { type: "none" },
  },
  {
    title: "How the Curve Changes Over Time",
    content: `A single snapshot of the Power User Curve is informative, but the real insight comes from watching it evolve month over month.

A shift to the right over time means users are becoming more engaged — your product is getting stickier. This often follows the launch of features that create daily habits, like notifications, streaks, or collaboration tools.

A shift to the left means engagement is weakening — users are visiting less frequently. This can happen when novelty wears off, competitors emerge, or quality degrades.

Compare the distribution across different months. Is the weight shifting right (good) or left (concerning)?`,
    annotation: { type: "highlight-column", target: { cols: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29] }, label: "Power user zone" },
  },
  {
    title: "Connecting Power Users to Business Outcomes",
    content: `Power users aren't just engaged — they're your economic engine:

Revenue: Power users typically generate 5-10x the revenue of casual users through higher subscription tiers, more purchases, or greater usage.

Retention: Users active 15+ days/month have near-zero churn risk. Converting core users into power users is often more valuable than acquiring new users.

Virality: Power users are your organic growth engine. They recommend the product, create content, invite teammates, and become advocates.

The strategic question becomes: what do power users do differently? Look at their behavior patterns, feature usage, and journey to find the "habits" that distinguish them — then build product experiences that guide all users toward those habits.`,
    annotation: { type: "none" },
    ahaInsight: "The path from casual to power user is your product's most important user journey. Every feature and experiment should be evaluated by whether it moves users rightward on this curve.",
  },
  {
    title: "Power User Curve Benchmarks",
    content: `Here's how to benchmark your Power User Curve:

Social Networks (Instagram, Twitter): Expect a smile — 30-40% power users (daily), long tail of casuals. DAU/MAU ratio of 50%+ is world-class.

Productivity SaaS (Slack, Notion): Core and power users dominate. 60-70% of MAU should be active 10+ days/month.

Marketplace / E-commerce: Left-heavy is normal. Most users buy 1-2x/month. Power users (10+ days) are rare but incredibly valuable.

Consumer Content (Netflix, Spotify): Middle-heavy. Users engage several times per week. 40-50% of MAU active 10+ days.

Your DAU/MAU ratio is a quick summary of this entire curve. It equals the average of the distribution divided by 30. A ratio above 50% means more than half your monthly users engage daily — exceptional for almost any category.

You've completed Module 1. In the next module, we'll zoom out from cohort-level analysis to understand how your overall user base grows, shrinks, and evolves.`,
    annotation: { type: "none" },
  },
];
