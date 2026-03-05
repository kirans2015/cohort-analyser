"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { GrowthDecomposition } from "@/components/charts/GrowthDecomposition";
import { growthDecompositionSteps } from "@/content/lessons/m2-growth-decomposition";
import { useDataset } from "@/context/DataContext";
import { useGrowthAccounting } from "@/hooks/useGrowthAccounting";

export default function GrowthDecompositionLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { growthData } = useGrowthAccounting(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  if (loading || growthData.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m2-l1"
      moduleId="module-2"
      lessonTitle="Growth Decomposition"
      steps={growthDecompositionSteps}
      nextLessonUrl="/learn/module-2/quick-ratio"
      nextLessonTitle="Quick Ratio"
      chart={() => <GrowthDecomposition data={growthData} />}
    />
  );
}
