import type { LessonStep } from "@/engine/types";

export const quickRatioSteps: LessonStep[] = [
  {
    title: "One Number to Rule Them All",
    content: `The Quick Ratio distills the entire growth accounting framework into a single, powerful number:

Quick Ratio = (New Users + Resurrected Users) / Churned Users

Or simply: Gains / Losses.

It tells you how efficiently your product is growing. For every user you lose, how many do you gain? A Quick Ratio of 2 means you add 2 users for every 1 you lose. A ratio below 1 means you're shrinking.

The chart shows your Quick Ratio over time. A single glance tells you whether your product is growing, stable, or declining — and how efficiently.`,
    annotation: { type: "none" },
  },
  {
    title: "What the Numbers Mean",
    content: `Here's how to interpret different Quick Ratio values:

Quick Ratio > 4: Hypergrowth. You're adding 4+ users for every one lost. This is typical of early-stage products with strong product-market fit and aggressive acquisition. Rarely sustainable long-term.

Quick Ratio 2-4: Healthy growth. Strong enough to compound meaningfully. This is the sweet spot for scaling companies — growing fast while maintaining reasonable efficiency.

Quick Ratio 1-2: Slow growth or near-stagnation. You're barely outpacing churn. At this level, a small increase in churn could tip you into decline. Urgent attention needed on retention or acquisition.

Quick Ratio < 1: Decline. You're losing more users than you gain. Without intervention, your user base will shrink to zero. This is a red alert.

Look at where your product's Quick Ratio falls on this scale.`,
    annotation: { type: "none" },
    ahaInsight: "The Quick Ratio separates growth quality from growth quantity. A product adding 10,000 users/month with a Quick Ratio of 1.2 is in a weaker position than one adding 1,000 users/month with a Quick Ratio of 4.",
  },
  {
    title: "The Two Ways to Improve Quick Ratio",
    content: `Since Quick Ratio = Gains / Losses, you have two levers:

Increase the numerator (more gains): Acquire more new users or resurrect more lapsed ones. This is the brute-force approach — pour more into the top of the funnel. It works but is expensive and has diminishing returns.

Decrease the denominator (fewer losses): Reduce churn. This is almost always the higher-leverage move. Here's why: reducing churn doesn't just improve this month's ratio — it permanently keeps those users in the retained pool, compounding your user base.

Consider: if you have 1000 churned users and 2000 gains (QR = 2.0), reducing churn by 20% to 800 gives you QR = 2.5. But adding 20% more gains (2400) only gives you QR = 2.4. Reducing churn has a disproportionate effect because it shrinks the denominator.`,
    annotation: { type: "none" },
  },
  {
    title: "Quick Ratio Trends Over Time",
    content: `A single Quick Ratio reading is useful. The trend over time is far more revealing.

Rising Quick Ratio: Product health is improving. Either you're acquiring more efficiently or retaining better (or both). This is a strong signal to investors and leadership.

Stable Quick Ratio: Predictable growth dynamics. Good for forecasting and planning. As long as it's above 2, this is a fine state.

Declining Quick Ratio: Warning sign. Growth is becoming less efficient. Often happens when acquisition channels saturate (harder to find new users) while churn stays constant or increases. This demands immediate investigation.

Watch for seasonal patterns too — some products naturally see higher Quick Ratios in certain months (back-to-school, New Year resolutions, etc.).`,
    annotation: { type: "highlight-row", target: { rows: [0, -1] }, label: "Trend direction" },
    ahaInsight: "A declining Quick Ratio is one of the earliest warning signs of growth trouble — often visible 2-3 quarters before the top-line MAU number actually starts to decline. It's a leading indicator, not a lagging one.",
  },
  {
    title: "Quick Ratio Benchmarks by Category",
    content: `Context matters when evaluating Quick Ratios. Here are benchmarks by product category:

Consumer Social (Instagram, TikTok): QR > 4 during growth phase. High acquisition but also high churn due to fickle attention. Mature social products often settle at 1.5-2.5.

B2B SaaS (Slack, Salesforce): QR of 2-4 is strong. Lower churn rates mean you don't need as many new users to maintain a healthy ratio. Enterprise products can sustain QR > 3 for years.

Marketplaces (Airbnb, Uber): QR of 1.5-3. Both supply and demand sides have their own Quick Ratios — analyze them separately for the full picture.

Consumer Subscriptions (Netflix, Spotify): QR of 1.5-2.5 during maturity. These products have natural churn ceilings due to subscription fatigue, so even modest QR above 1 can sustain growth.

Remember: Quick Ratio is a health diagnostic, not a KPI to optimize directly. Use it to identify problems, then dig into the components to find solutions.`,
    annotation: { type: "none" },
  },
  {
    title: "From Quick Ratio to Action",
    content: `Here's the decision framework experienced PMs use with Quick Ratio:

QR < 1 — Crisis Mode: Stop all acquisition spending. Fix the product. Run user interviews to understand why people leave. Every dollar spent on acquisition is wasted if more users leave than arrive.

QR 1-2 — Fix Retention: Your product works for some users but not enough. Focus on activation rate (are new users finding value?), core loop (is there a reason to come back?), and churn analysis (where and why do users drop?).

QR 2-4 — Optimize Both: You're in a healthy range. Invest in both acquisition and retention. A/B test onboarding, expand channels, and reduce friction. This is where growth teams thrive.

QR > 4 — Pour Fuel: Retention is strong enough to support aggressive growth. Invest heavily in acquisition while it's efficient. But monitor — this ratio will naturally decline as you saturate your best channels.

In the next lesson, we'll look at retention rates from a different angle — gross retention and net churn trends.`,
    annotation: { type: "none" },
  },
];
