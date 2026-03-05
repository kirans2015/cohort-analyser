"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { QuickRatioGauge } from "@/components/charts/QuickRatioGauge";
import { quickRatioSteps } from "@/content/lessons/m2-quick-ratio";
import { useDataset } from "@/context/DataContext";
import { useGrowthAccounting } from "@/hooks/useGrowthAccounting";

export default function QuickRatioLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { quickRatioData } = useGrowthAccounting(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  if (loading || quickRatioData.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m2-l2"
      moduleId="module-2"
      lessonTitle="Quick Ratio"
      steps={quickRatioSteps}
      nextLessonUrl="/learn/module-2/retention-rates"
      nextLessonTitle="Retention Rates"
      chart={() => <QuickRatioGauge data={quickRatioData} />}
    />
  );
}
