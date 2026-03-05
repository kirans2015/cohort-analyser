import type { LessonStep } from "@/engine/types";

export const whatIfSimulatorSteps: LessonStep[] = [
  {
    title: "From Analysis to Simulation",
    content: `You've learned to read retention data, decompose growth, and forecast DAU. Now it's time to ask: "What if?"

The What-If Simulator lets you manipulate the two fundamental levers of growth — acquisition and retention — and see the impact on DAU in real time. This is how experienced PMs build intuition for which investments will move the needle most.

On the right, you'll see the simulator with interactive controls. As you adjust the sliders, the DAU forecast updates instantly. This isn't a toy — it's the same kind of model that growth teams at top companies use to plan roadmaps and set targets.`,
    annotation: { type: "none" },
  },
  {
    title: "The Acquisition Lever",
    content: `The first slider controls daily new user acquisition. This represents the output of all your growth channels — marketing, virality, organic search, partnerships, and app store discovery combined.

Try adjusting it up and down and watch the DAU forecast respond:

Doubling acquisition: DAU responds linearly. If you double new users, steady-state DAU doubles. The shape of the forecast curve doesn't change, just the magnitude.

Cutting acquisition to zero: DAU doesn't drop to zero immediately — it decays along the retention curve as existing cohorts age out. This shows you how much "stored DAU" you have from past acquisition.

The key insight: acquisition is a linear lever. It's powerful but has no compounding effect. Each dollar of additional acquisition spend produces the same marginal DAU, regardless of how much you're already spending.`,
    annotation: { type: "none" },
    ahaInsight: "If you set acquisition to zero and watch DAU decay, the area under that decay curve equals your total active user-days from all existing cohorts. This is the 'momentum' your product has built — it takes time to dissipate, which is why dying products can look healthy for months.",
  },
  {
    title: "The Retention Lever",
    content: `The second slider is the retention multiplier. A multiplier of 1.0 means your current retention curve. A multiplier of 1.2 means every point on the retention curve is 20% higher (e.g., D7 goes from 25% to 30%).

Try adjusting it and notice something remarkable:

A 20% improvement in retention does NOT increase DAU by 20%. The impact compounds across all future days of the retention curve. Improving retention from 25% to 30% on D7 also means more users survive to D14, D30, D60, and beyond. Each day's improvement cascades forward.

This compounding effect is why retention improvements are almost always higher-leverage than acquisition improvements. A dollar spent improving retention produces more DAU than a dollar spent on acquisition — and the effect persists for every future cohort.`,
    annotation: { type: "none" },
    ahaInsight: "Retention improvements compound in two ways: across time (better D7 means better D14, D30, etc.) and across cohorts (every future cohort benefits from the improvement). Acquisition improvements only scale linearly. This is the fundamental argument for investing in retention.",
  },
  {
    title: "Sensitivity Analysis: Finding the Biggest Lever",
    content: `Sensitivity analysis means asking: "If I improve each input by X%, which one moves DAU the most?"

Try this experiment with the sliders:

1. Start at baseline (multipliers at 1.0). Note the steady-state DAU.
2. Increase acquisition by 20%. Note the new DAU. Reset.
3. Increase retention by 20%. Note the new DAU. Reset.

Which had a bigger impact? For most products, the retention improvement wins — often by a significant margin.

Now try the reverse: decrease each by 20%. Which causes more damage? Again, retention usually dominates.

This analysis directly answers the question: "Should we invest in growth marketing or product retention this quarter?" The simulator gives you quantitative evidence instead of gut feelings.`,
    annotation: { type: "none" },
  },
  {
    title: "Scenario Planning: Optimistic, Base, Pessimistic",
    content: `PMs and growth teams use What-If simulations for scenario planning:

Base case: Current acquisition rate and retention curve continue unchanged. This is your "do nothing" forecast.

Optimistic case: Acquisition increases (new channel, viral feature) AND retention improves (better onboarding, new engagement features). Set both multipliers above 1.0.

Pessimistic case: Acquisition slows (channel saturation, budget cuts) AND retention declines (competitor launch, platform changes). Set both below 1.0.

The spread between optimistic and pessimistic scenarios is your planning uncertainty. If the spread is wide, you need to derisk — run experiments faster, diversify channels, and build contingency plans.

For board presentations and planning, always show all three scenarios. It demonstrates analytical rigor and prepares stakeholders for a range of outcomes.`,
    annotation: { type: "none" },
  },
  {
    title: "Your Cohort Analysis Toolkit Is Complete",
    content: `Congratulations — you've completed the entire cohort analysis curriculum. Let's recap what you can now do:

Module 1 — Cohort Foundations: Read retention heatmaps, interpret retention and revenue curves, calculate LTV, and understand engagement depth via Power User Curves.

Module 2 — Growth Accounting: Decompose growth into new/retained/resurrected/churned, assess health with Quick Ratio, track retention rates and CMGR trends.

Module 3 — Forecasting: Build Day-N retention models, forecast DAU from cohort contributions, understand steady-state dynamics, and run sensitivity analysis.

These skills form the analytical foundation of product-led growth. Every growth team at every top tech company uses these exact frameworks.

Now switch to Explore Mode to apply these skills to your own data. The best way to internalize these concepts is to practice — load a dataset, form a hypothesis, and use the charts to validate or disprove it. Good luck.`,
    annotation: { type: "none" },
  },
];
