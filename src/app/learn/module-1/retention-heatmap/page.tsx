"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { CohortHeatmap } from "@/components/charts/CohortHeatmap";
import { retentionHeatmapSteps } from "@/content/lessons/m1-retention-heatmap";
import { useDataset } from "@/context/DataContext";
import { useCohortAnalysis } from "@/hooks/useCohortAnalysis";
import type { LessonStep } from "@/engine/types";

export default function RetentionHeatmapLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { retentionTable } = useCohortAnalysis(dataset?.events ?? null);

  useEffect(() => {
    loadDataset("ecommerce");
  }, [loadDataset]);

  if (loading || !retentionTable) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground text-sm">Loading dataset...</div>
      </div>
    );
  }

  return (
    <LessonLayout
      lessonId="m1-l1"
      moduleId="module-1"
      lessonTitle="Retention Heatmap"
      steps={retentionHeatmapSteps}
      nextLessonUrl="/learn/module-1/retention-curves"
      nextLessonTitle="Retention Curves"
      chart={(step: LessonStep, stepIndex: number) => (
        <CohortHeatmap
          table={retentionTable}
          annotation={step.annotation}
          animate={stepIndex === 0}
          maxCohorts={12}
          maxPeriods={13}
        />
      )}
    />
  );
}
