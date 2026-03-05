import type { LessonStep } from "@/engine/types";

export const dayNMatrixSteps: LessonStep[] = [
  {
    title: "Welcome to Module 3: Forecasting",
    content: `In Modules 1 and 2, you learned to read and interpret cohort data. Now we're going to use it to predict the future.

The Day-N retention matrix is the foundation of DAU forecasting. Unlike the monthly cohort table from Module 1, this table tracks daily cohorts and daily retention — giving you much higher resolution data.

Each row is a daily cohort (users who first appeared on a specific date). Each column is Day N — how many days after their first appearance. The values show what fraction of the cohort was active on that specific day.

This granular data is the building block for everything in this module: DAU forecasting, steady-state modeling, and what-if simulations.`,
    annotation: { type: "none" },
  },
  {
    title: "Reading the Day-N Matrix",
    content: `The Day-N matrix looks similar to the monthly retention table, but the interpretation is subtly different:

Day 0 is always 100% — users were active on the day they first appeared.

Day 1 is the most critical number. What fraction of users came back the very next day? This is your "next-day retention" and the strongest predictor of long-term engagement. For mobile apps, 40%+ Day 1 retention is considered good. For games, 35%+ is strong.

Day 7 (one week later) tells you if users survived the first week. Day 30 tells you if they made it through the first month.

Look at the highlighted Day 1 column. This single number is the most-cited retention metric in mobile and consumer products.`,
    annotation: { type: "highlight-column", target: { col: 1 }, label: "Day 1 retention" },
    ahaInsight: "Day 1 retention is where most products lose the battle. If a user doesn't come back tomorrow, the odds of them ever returning drop below 10% for most consumer apps. Every percentage point improvement in D1 has massive downstream effects.",
  },
  {
    title: "The Retention Curve Shape at Daily Resolution",
    content: `At daily resolution, retention curves reveal patterns invisible in monthly data:

The "Power Law" decay: Retention drops steeply in the first few days, then the rate of decline slows dramatically. This is the most common pattern and follows an approximate power law: retention on day N is roughly proportional to N^(-alpha) for some decay parameter alpha.

Weekly periodicity: Many products show a sawtooth pattern — retention dips on certain days of the week and recovers on others. A productivity tool might drop on weekends. A gaming app might spike on weekends. This periodicity is valuable for forecasting.

The "Day 7 cliff": Some products show a noticeable extra drop around Day 7 — the end of a typical trial period or the point where novelty wears off.

Look at the values across a single row. Can you spot any periodicity or inflection points?`,
    annotation: { type: "highlight-row", target: { row: 0 } },
  },
  {
    title: "Building a Retention Curve from the Matrix",
    content: `To forecast DAU, you need a single "average" retention curve that represents typical user behavior. Here's how to build one from the Day-N matrix:

Step 1: For each Day N column, average the retention values across all cohort rows. This gives you the average Day-N retention.

Step 2: Smooth the curve to remove noise and weekly periodicity. A simple 7-day moving average works well.

Step 3: For days beyond your data (e.g., you have 60 days of data but need to forecast 180 days), fit a curve — logarithmic or power law — and extrapolate.

The resulting curve is your "retention model." It says: "A typical new user has X% probability of being active on Day N." This is the key input for DAU forecasting.

The chart highlights later columns where you might need to extrapolate beyond available data.`,
    annotation: { type: "highlight-column", target: { cols: [25, 26, 27, 28, 29] }, label: "Extrapolation zone" },
    ahaInsight: "The Day-N retention curve is a probability distribution in disguise. The area under the curve (sum of all daily retention values) equals the expected number of active days per user — which is directly proportional to LTV.",
  },
  {
    title: "Comparing Daily Cohorts: Signal vs. Noise",
    content: `Individual daily cohorts are noisy — especially if they're small. A cohort of 50 users on a Tuesday might show wildly different Day 7 retention than a cohort of 200 users on a Friday, even if nothing meaningful changed.

When comparing cohorts, keep these principles in mind:

Sample size matters: Only compare cohorts large enough for statistical significance. A cohort of 20 users jumping from 30% to 45% D7 retention might just be noise.

Group by week or month: For trend analysis, average daily cohorts into weekly or monthly cohorts. This smooths out day-of-week effects and small-sample noise.

Look for structural shifts: A genuine improvement shows up as multiple consecutive cohorts outperforming — not one random day. If a product change improved retention, you should see a sustained shift in the cohort rows.`,
    annotation: { type: "highlight-row", target: { rows: [0, -1] }, label: "Early vs. recent cohorts" },
  },
  {
    title: "The Day-N Matrix as a Diagnostic Tool",
    content: `Beyond forecasting, the Day-N matrix is a powerful diagnostic tool:

Activation window: Look at D1 through D7. If retention drops 80% from D0 to D1 but then stabilizes from D1 to D7, your first-time experience is the problem — users who survive Day 1 are fine.

Engagement cliffs: Sudden drops on specific days (D7, D14, D30) may correspond to trial expirations, content exhaustion, or natural usage cycles. These are intervention opportunities.

Cohort quality trends: If recent daily cohorts show systematically different retention shapes, your user acquisition mix has changed. Maybe a new ad campaign is bringing different users.

Product change impact: A change shipped on Day X should show up as a difference between cohorts that started before and after that date. The Day-N matrix lets you see exactly which "day of maturity" was affected.

In the next lesson, we'll use this matrix to forecast Daily Active Users.`,
    annotation: { type: "none" },
  },
];
