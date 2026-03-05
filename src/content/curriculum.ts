/** Curriculum structure — defines the module/lesson hierarchy and navigation paths */

export interface CurriculumLesson {
  id: string;
  title: string;
  path: string;
  chartType: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

export const CURRICULUM: CurriculumModule[] = [
  {
    id: "module-1",
    title: "Module 1: Cohort Analysis",
    description: "Learn to read and interpret cohort retention tables, retention curves, revenue retention, LTV, and power user distributions.",
    lessons: [
      {
        id: "m1-l1",
        title: "Retention Heatmap",
        path: "/learn/module-1/retention-heatmap",
        chartType: "CohortHeatmap",
      },
      {
        id: "m1-l2",
        title: "Retention Curves",
        path: "/learn/module-1/retention-curves",
        chartType: "RetentionCurves",
      },
      {
        id: "m1-l3",
        title: "Revenue Retention",
        path: "/learn/module-1/revenue-retention",
        chartType: "RevenueRetention",
      },
      {
        id: "m1-l4",
        title: "LTV Curves",
        path: "/learn/module-1/ltv-curves",
        chartType: "LTVCurves",
      },
      {
        id: "m1-l5",
        title: "Power User Curve",
        path: "/learn/module-1/power-user-curve",
        chartType: "PowerUserCurve",
      },
    ],
  },
  {
    id: "module-2",
    title: "Module 2: Growth Accounting",
    description: "Decompose growth into its components: new, retained, resurrected, and churned users. Calculate Quick Ratio and CMGR.",
    lessons: [
      {
        id: "m2-l1",
        title: "Growth Decomposition",
        path: "/learn/module-2/growth-decomposition",
        chartType: "GrowthDecomposition",
      },
      {
        id: "m2-l2",
        title: "Quick Ratio",
        path: "/learn/module-2/quick-ratio",
        chartType: "QuickRatioGauge",
      },
      {
        id: "m2-l3",
        title: "Retention Rates",
        path: "/learn/module-2/retention-rates",
        chartType: "RetentionRateTrend",
      },
      {
        id: "m2-l4",
        title: "CMGR",
        path: "/learn/module-2/cmgr",
        chartType: "CMGRChart",
      },
    ],
  },
  {
    id: "module-3",
    title: "Module 3: DAU Forecasting",
    description: "Understand how DAU is built from cohort contributions and learn to forecast user growth.",
    lessons: [
      {
        id: "m3-l1",
        title: "Day-N Retention Matrix",
        path: "/learn/module-3/day-n-matrix",
        chartType: "RetentionMatrix",
      },
      {
        id: "m3-l2",
        title: "DAU Forecast Model",
        path: "/learn/module-3/dau-forecast",
        chartType: "DAUForecast",
      },
      {
        id: "m3-l3",
        title: "What-If Simulator",
        path: "/learn/module-3/what-if-simulator",
        chartType: "WhatIfSimulator",
      },
    ],
  },
];

/** Get all lessons as a flat array */
export function getAllLessons(): CurriculumLesson[] {
  return CURRICULUM.flatMap((m) => m.lessons);
}

/** Get the next lesson after a given lesson ID */
export function getNextLesson(currentLessonId: string): CurriculumLesson | null {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.id === currentLessonId);
  return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
}

/** Get lesson info by ID */
export function getLessonById(lessonId: string): { lesson: CurriculumLesson; module: CurriculumModule } | null {
  for (const module of CURRICULUM) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, module };
  }
  return null;
}
