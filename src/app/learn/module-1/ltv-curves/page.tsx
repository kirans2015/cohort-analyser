"use client";

import { useEffect, useMemo } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { LTVCurves } from "@/components/charts/LTVCurves";
import { ltvCurvesSteps } from "@/content/lessons/m1-ltv-curves";
import { useDataset } from "@/context/DataContext";
import { computeLTVCurves } from "@/engine/ltv";

export default function LTVCurvesLesson() {
  const { dataset, loadDataset, loading } = useDataset();

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  const ltvCurves = useMemo(() => {
    if (!dataset) return [];
    return computeLTVCurves(dataset.events);
  }, [dataset]);

  if (loading || ltvCurves.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m1-l4"
      moduleId="module-1"
      lessonTitle="LTV Curves"
      steps={ltvCurvesSteps}
      nextLessonUrl="/learn/module-1/power-user-curve"
      nextLessonTitle="Power User Curve"
      chart={() => <LTVCurves curves={ltvCurves} />}
    />
  );
}
