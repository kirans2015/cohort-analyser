"use client";

import { useEffect } from "react";
import { LessonLayout } from "@/components/learn/LessonLayout";
import { CMGRChart } from "@/components/charts/CMGRChart";
import { cmgrSteps } from "@/content/lessons/m2-cmgr";
import { useDataset } from "@/context/DataContext";
import { useGrowthAccounting } from "@/hooks/useGrowthAccounting";

export default function CMGRLesson() {
  const { dataset, loadDataset, loading } = useDataset();
  const { cmgrData } = useGrowthAccounting(dataset?.events ?? null);

  useEffect(() => { loadDataset("ecommerce"); }, [loadDataset]);

  if (loading || cmgrData.length === 0) {
    return <div className="flex items-center justify-center h-full"><div className="text-muted-foreground text-sm">Loading...</div></div>;
  }

  return (
    <LessonLayout
      lessonId="m2-l4"
      moduleId="module-2"
      lessonTitle="CMGR"
      steps={cmgrSteps}
      nextLessonUrl="/learn/module-3/day-n-matrix"
      nextLessonTitle="Day-N Matrix"
      chart={() => <CMGRChart data={cmgrData} />}
    />
  );
}
