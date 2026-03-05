"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { CohortHeatmap } from "@/components/charts/CohortHeatmap";
import { revenueRetentionSteps } from "@/content/lessons/m1-revenue-retention";
import { useDataset } from "@/context/DataContext";
import { useCohortAnalysis } from "@/hooks/useCohortAnalysis";
import type { LessonStep } from "@/engine/types";
import type { RetentionTable } from "@/engine/types";

export default function RevenueRetentionLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { revenueRetentionTable } = useCohortAnalysis(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  if (loading || !revenueRetentionTable) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  // Adapt revenue retention to the RetentionTable interface for CohortHeatmap
  const adaptedTable: RetentionTable = {
    cohorts: revenueRetentionTable.cohorts,
    retention: revenueRetentionTable.revenueRetention,
    counts: revenueRetentionTable.revenue.map(row => row.map(v => Math.round(v))),
    maxPeriods: revenueRetentionTable.maxPeriods,
  };

  return (
    <LessonLayout
      lessonId="m1-l3"
      moduleId="module-1"
      lessonTitle="Revenue Retention"
      steps={revenueRetentionSteps}
      nextLessonUrl="/learn/module-1/ltv-curves"
      nextLessonTitle="LTV Curves"
      chart={(step: LessonStep) => (
        <CohortHeatmap
          table={adaptedTable}
          annotation={step.annotation}
          isRevenue
          maxCohorts={12}
          maxPeriods={13}
        />
      )}
    />
  );
}
