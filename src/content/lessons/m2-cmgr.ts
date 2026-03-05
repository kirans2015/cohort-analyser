import type { LessonStep } from "@/engine/types";

export const cmgrSteps: LessonStep[] = [
  {
    title: "The Problem with Month-over-Month Growth",
    content: `Month-over-Month (MoM) growth is intuitive: how much bigger are you this month versus last month? But it has a serious problem — it's incredibly noisy.

One great marketing campaign and MoM jumps to 15%. A seasonal lull and it drops to -3%. A viral moment sends it to 30%. Then it mean-reverts to 5%. These swings make it nearly impossible to see the underlying trend.

When your CEO asks "How fast are we growing?" and you answer with MoM, you'll get a different answer depending on which month you pick. That's not useful for decision-making.

CMGR — Compound Monthly Growth Rate — solves this by smoothing over a window of time, revealing the true growth trajectory beneath the noise.`,
    annotation: { type: "none" },
  },
  {
    title: "How CMGR Works",
    content: `CMGR is calculated as:

CMGR = (MAU_end / MAU_start)^(1/months) - 1

It's the constant monthly growth rate that would take you from your starting MAU to your ending MAU over the given period. Think of it as the "average" growth rate, but calculated using geometric rather than arithmetic mean — which is correct for compounding quantities.

For example: if MAU grew from 10,000 to 16,000 over 6 months, CMGR = (16000/10000)^(1/6) - 1 = 8.1%. This means a steady 8.1% monthly growth would produce the same result, regardless of what happened in individual months.

The chart shows MoM growth (volatile) alongside CMGR windows (smooth). Notice how CMGR filters out the noise while preserving the trend.`,
    annotation: { type: "none" },
    ahaInsight: "CMGR is to growth what a moving average is to stock prices. It doesn't predict the future, but it tells you the real velocity of growth by filtering out noise. Always present CMGR alongside MoM when communicating to stakeholders.",
  },
  {
    title: "Choosing Your Window: 3, 6, or 12 Months",
    content: `The window size determines how much smoothing you get:

3-Month CMGR: Most responsive to recent changes. Good for tracking the impact of recent launches, campaigns, or product changes. Still somewhat noisy — one outlier month affects it significantly. Best for tactical decisions.

6-Month CMGR: The workhorse window. Smooths out most seasonal effects and one-off spikes while still responding to genuine trend changes within a couple of months. Best for quarterly planning and board reporting.

12-Month CMGR: Maximum smoothing. Eliminates nearly all seasonality and noise. Reveals deep structural trends but is slow to react — a product could be declining for 6 months before 12-month CMGR turns negative. Best for long-term strategic assessment.

Look at all three windows on the chart. Notice how the shorter windows are more volatile and the longer windows lag behind trend changes.`,
    annotation: { type: "highlight-row", target: { rows: [0, 1, 2] }, label: "3m / 6m / 12m windows" },
  },
  {
    title: "When the Windows Diverge",
    content: `The most interesting signal is when different CMGR windows tell different stories:

Short > Long (3m CMGR > 12m CMGR): Recent growth is accelerating. Something positive happened — new feature, new channel, product-market fit improvement. If this persists, the longer windows will catch up.

Short < Long (3m CMGR < 12m CMGR): Recent growth is decelerating. The product is losing momentum. This is an early warning — the 12-month CMGR still looks good because it includes the higher-growth past, but the current trajectory is weaker.

Short crosses below zero while Long is positive: Critical alert. You're currently shrinking despite a historically positive trend. The long-window CMGR masks the urgency. Act now.

All windows converging: Growth rate is stabilizing. The product has found its natural growth cadence.`,
    annotation: { type: "none" },
    ahaInsight: "When 3-month CMGR drops below 12-month CMGR, it's like a 'death cross' in technical analysis. The product's recent growth is underperforming its historical average. This divergence is one of the most reliable early warning signals in product analytics.",
  },
  {
    title: "CMGR Benchmarks and Context",
    content: `What does "good" CMGR look like? It depends heavily on stage and category:

Early Stage (Pre-PMF): 15-25% CMGR is expected if you're on to something. Below 10% means you haven't found product-market fit yet. Above 30% for sustained periods is exceptional.

Growth Stage: 8-15% CMGR is strong. This is the phase where you've found PMF and are scaling. The rate naturally declines as you grow — going from 1K to 2K users is easier than 100K to 200K.

Mature Stage: 2-5% CMGR is solid. Large user bases grow slowly in percentage terms. At this stage, the absolute number of new users matters more than the rate.

Declining Products: Negative CMGR, especially on the 12-month window, indicates structural decline. Time for a major pivot or revitalization effort.

The law of large numbers means CMGR naturally declines as you scale. Don't benchmark a 10M-user product against a 10K-user one.`,
    annotation: { type: "none" },
  },
  {
    title: "Presenting Growth: A PM's Playbook",
    content: `Here's how top PMs communicate growth effectively:

For board meetings and investors: Lead with 6-month CMGR. It's smooth enough to be trustworthy and responsive enough to be current. Show MoM as supporting detail, not the headline.

For quarterly planning: Compare 3-month CMGR across quarters. This gives four clean data points per year, each smoothing out monthly noise within the quarter.

For weekly standups: MoM is fine for operational awareness, but always contextualize it: "MoM was 12% this month, but our 3-month CMGR is 7%, so this is likely an above-trend month."

For goal setting: Set CMGR targets, not MoM targets. "Achieve 10% 6-month CMGR by Q4" is measurable, meaningful, and resistant to gaming via one-off spikes.

You've completed Module 2's growth accounting toolkit. In Module 3, we'll build on everything you've learned to forecast future DAU and run what-if scenarios.`,
    annotation: { type: "none" },
  },
];
