"use client";

import { useEffect, useMemo } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { PowerUserCurve } from "@/components/charts/PowerUserCurve";
import { powerUserCurveSteps } from "@/content/lessons/m1-power-user-curve";
import { useDataset } from "@/context/DataContext";
import { computePowerUserDistribution, getAvailableMonths } from "@/engine/power-curve";

export default function PowerUserCurveLesson() {
  const { dataset, loadDataset, loading } = useDataset();

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  const distribution = useMemo(() => {
    if (!dataset) return null;
    const months = getAvailableMonths(dataset.events);
    // Use a month with good data (not the last, which may be partial)
    const targetMonth = months[Math.max(0, months.length - 3)];
    return computePowerUserDistribution(dataset.events, targetMonth);
  }, [dataset]);

  if (loading || !distribution) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m1-l5"
      moduleId="module-1"
      lessonTitle="Power User Curve"
      steps={powerUserCurveSteps}
      nextLessonUrl="/learn/module-2/growth-decomposition"
      nextLessonTitle="Growth Decomposition"
      chart={() => <PowerUserCurve distribution={distribution} />}
    />
  );
}
