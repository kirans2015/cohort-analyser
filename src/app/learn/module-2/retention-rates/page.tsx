"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { RetentionRateTrend } from "@/components/charts/RetentionRateTrend";
import { retentionRatesSteps } from "@/content/lessons/m2-retention-rates";
import { useDataset } from "@/context/DataContext";
import { useGrowthAccounting } from "@/hooks/useGrowthAccounting";

export default function RetentionRatesLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { retentionRates } = useGrowthAccounting(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  if (loading || retentionRates.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m2-l3"
      moduleId="module-2"
      lessonTitle="Retention Rates"
      steps={retentionRatesSteps}
      nextLessonUrl="/learn/module-2/cmgr"
      nextLessonTitle="CMGR"
      chart={() => <RetentionRateTrend data={retentionRates} />}
    />
  );
}
