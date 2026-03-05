"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { RetentionCurves } from "@/components/charts/RetentionCurves";
import { retentionCurvesSteps } from "@/content/lessons/m1-retention-curves";
import { useDataset } from "@/context/DataContext";
import { useCohortAnalysis } from "@/hooks/useCohortAnalysis";
import type { LessonStep } from "@/engine/types";

export default function RetentionCurvesLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { retentionCurves, averageRetentionCurve } = useCohortAnalysis(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  if (loading || retentionCurves.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m1-l2"
      moduleId="module-1"
      lessonTitle="Retention Curves"
      steps={retentionCurvesSteps}
      nextLessonUrl="/learn/module-1/revenue-retention"
      nextLessonTitle="Revenue Retention"
      chart={() => (
        <RetentionCurves curves={retentionCurves} averageCurve={averageRetentionCurve} />
      )}
    />
  );
}
