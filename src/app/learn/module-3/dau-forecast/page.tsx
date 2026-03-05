"use client";

import { useEffect, useMemo } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { DAUForecast } from "@/components/charts/DAUForecast";
import { dauForecastSteps } from "@/content/lessons/m3-dau-forecast";
import { useDataset } from "@/context/DataContext";
import { useForecasting } from "@/hooks/useForecasting";
import { forecastDAU } from "@/engine/forecasting";

export default function DAUForecastLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { averageRetentionCurve } = useForecasting(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  const forecastData = useMemo(() => {
    if (averageRetentionCurve.length === 0) return [];
    return forecastDAU(
      { dailyNewUsers: 50, retentionMultiplier: 1.0, forecastDays: 90 },
      averageRetentionCurve
    );
  }, [averageRetentionCurve]);

  if (loading || forecastData.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m3-l2"
      moduleId="module-3"
      lessonTitle="DAU Forecast Model"
      steps={dauForecastSteps}
      nextLessonUrl="/learn/module-3/what-if-simulator"
      nextLessonTitle="What-If Simulator"
      chart={() => <DAUForecast data={forecastData} />}
    />
  );
}
