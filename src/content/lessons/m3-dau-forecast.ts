import type { LessonStep } from "@/engine/types";

export const dauForecastSteps: LessonStep[] = [
  {
    title: "DAU Is a Sum of Cohort Contributions",
    content: `Here's the key insight that unlocks DAU forecasting: your Daily Active Users on any given day is the sum of contributions from every cohort that has ever been acquired.

DAU(today) = Sum over all past cohorts of: (cohort size) x (retention rate on Day N)

Each cohort contributes some fraction of its original users. The January 15th cohort of 200 users, now at Day 30 with 15% retention, contributes 200 x 0.15 = 30 active users today. The February 1st cohort of 180 users, now at Day 13 with 25% retention, contributes 45. Add up every cohort and you get total DAU.

This is not an approximation — it's the exact mathematical decomposition of DAU. Understanding this unlocks both forecasting and optimization.`,
    annotation: { type: "none" },
    ahaInsight: "Once you see DAU as a sum of cohort contributions, growth strategy becomes crystal clear: you can grow DAU by acquiring larger cohorts (more users), improving the retention curve (higher percentages), or both. Every product lever maps to one of these two.",
  },
  {
    title: "Visualizing Cohort Contributions",
    content: `The stacked area chart on the right shows DAU decomposed into contributions from each cohort. Each colored band represents one cohort's active users on each day.

Notice several things:

Recent cohorts (top of the stack) contribute the most — they're young, so their retention is still relatively high. But they're also the thinnest, because they haven't had much time to compound.

Older cohorts (bottom of the stack) contribute less individually — many users have churned — but there are many of them, and their contributions are stable.

The total height of the stack is your DAU. Watch how it evolves: if the stack keeps growing, your acquisition pace outweighs your decay. If it shrinks, churn is winning.`,
    annotation: { type: "highlight-row", target: { rows: [0, -1] }, label: "Old vs. new cohort bands" },
  },
  {
    title: "Building the Forecast",
    content: `To forecast future DAU, you need two inputs:

1. The retention curve: Your Day-N retention model from the previous lesson. This tells you what fraction of any cohort will be active N days after acquisition.

2. The acquisition forecast: How many new users will you acquire each day in the future? This can be a constant (e.g., 500/day), a growth trajectory, or a detailed channel-by-channel forecast.

For each future day, the forecast calculates:
• Contribution from all historical cohorts (known sizes, known Day-N values)
• Contribution from all future cohorts (forecasted sizes, projected retention)

Sum them up and you have your DAU forecast. The chart shows both the historical DAU and the projected future DAU.`,
    annotation: { type: "none" },
  },
  {
    title: "The Steady-State Concept",
    content: `Here's a profound result: if you acquire the same number of users every day and your retention curve stays constant, your DAU will converge to a steady state.

Steady-state DAU = Daily New Users x Sum of Retention Curve

That sum is the total area under your retention curve — the expected lifetime active days per user. If you acquire 100 users/day and the average user is active for 30 days total over their lifetime, steady-state DAU = 3,000.

Why does this converge? Each day you add a new cohort and the oldest cohorts' contributions decay toward zero. Eventually, the new contributions exactly balance the decaying ones.

This steady-state equation is remarkably powerful. It means you can calculate the theoretical maximum DAU for any combination of acquisition rate and retention curve — without running a day-by-day simulation.`,
    annotation: { type: "none" },
    ahaInsight: "The steady-state formula reveals a deep truth: DAU is proportional to the AREA under the retention curve, not just the retention rate at any single point. Improving D30 retention by 1% and improving D1 retention by 1% have the same impact on steady-state DAU.",
  },
  {
    title: "Forecast Sensitivity: What Drives DAU Most?",
    content: `Not all inputs are equally important. Here's what drives DAU forecasts most:

Acquisition rate: Linear impact. Double your daily new users, double your steady-state DAU. Straightforward but expensive.

Early retention (D1-D7): Massive impact. These are the highest retention days, so each percentage point here affects every user you'll ever acquire. Improving D1 from 40% to 45% has a bigger DAU impact than improving D30 from 10% to 15%.

Late retention (D30+): Smaller per-day impact, but it accumulates over many days. If your retention curve has a long tail (flattens at 5% indefinitely), those 5% contributions from hundreds of past cohorts add up significantly.

Retention curve shape: A curve that flattens (has an asymptote) produces a finite steady state. A curve that trends to zero means you're dependent on continuous acquisition to maintain DAU.

Think about where you'd invest to maximize DAU: more users, or better retention?`,
    annotation: { type: "none" },
  },
  {
    title: "Putting Forecasts to Work",
    content: `DAU forecasting isn't academic — it drives real decisions:

Headcount planning: If you forecast DAU reaching 500K in 6 months, you need infrastructure, support, and ops teams scaled accordingly.

Revenue forecasting: DAU x ARPDAU (Average Revenue Per DAU) = daily revenue. Your DAU forecast directly drives revenue projections.

Experiment sizing: If a retention improvement would add 5% to steady-state DAU, you can calculate the revenue impact and prioritize against other projects.

Acquisition budget: The steady-state formula tells you exactly how many new users you need per day to hit a DAU target, given your retention curve. Back-calculate the required marketing spend.

Red flag detection: If actual DAU falls below the forecast by more than one standard deviation, something has changed — investigate immediately.

In the next lesson, we'll make this interactive with the What-If Simulator, where you can adjust sliders and see how changes to acquisition and retention ripple through to DAU.`,
    annotation: { type: "none" },
  },
];
