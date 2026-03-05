"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { WhatIfSimulator } from "@/components/charts/WhatIfSimulator";
import { whatIfSimulatorSteps } from "@/content/lessons/m3-what-if-simulator";
import { useDataset } from "@/context/DataContext";
import { useForecasting } from "@/hooks/useForecasting";

export default function WhatIfSimulatorLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { averageRetentionCurve } = useForecasting(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  if (loading || averageRetentionCurve.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m3-l3"
      moduleId="module-3"
      lessonTitle="What-If Simulator"
      steps={whatIfSimulatorSteps}
      chart={() => <WhatIfSimulator baselineRetentionCurve={averageRetentionCurve} />}
    />
  );
}
