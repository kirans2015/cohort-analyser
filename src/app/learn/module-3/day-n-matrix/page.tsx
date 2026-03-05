"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { RetentionMatrix } from "@/components/charts/RetentionMatrix";
import { dayNMatrixSteps } from "@/content/lessons/m3-day-n-matrix";
import { useDataset } from "@/context/DataContext";
import { useForecasting } from "@/hooks/useForecasting";

export default function DayNMatrixLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { dayNRetention } = useForecasting(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  if (loading || dayNRetention.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m3-l1"
      moduleId="module-3"
      lessonTitle="Day-N Retention Matrix"
      steps={dayNMatrixSteps}
      nextLessonUrl="/learn/module-3/dau-forecast"
      nextLessonTitle="DAU Forecast"
      chart={() => <RetentionMatrix rows={dayNRetention} />}
    />
  );
}
