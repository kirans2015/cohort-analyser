import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/shared/ChartSkeleton";

const loading = () => ChartSkeleton({});

export const DynamicRetentionCurves = dynamic(
  () => import("./RetentionCurves").then((m) => m.RetentionCurves),
  { ssr: false, loading }
);

export const DynamicLTVCurves = dynamic(
  () => import("./LTVCurves").then((m) => m.LTVCurves),
  { ssr: false, loading }
);

export const DynamicPowerUserCurve = dynamic(
  () => import("./PowerUserCurve").then((m) => m.PowerUserCurve),
  { ssr: false, loading }
);

export const DynamicGrowthDecomposition = dynamic(
  () => import("./GrowthDecomposition").then((m) => m.GrowthDecomposition),
  { ssr: false, loading }
);

export const DynamicQuickRatioGauge = dynamic(
  () => import("./QuickRatioGauge").then((m) => m.QuickRatioGauge),
  { ssr: false, loading }
);

export const DynamicRetentionRateTrend = dynamic(
  () => import("./RetentionRateTrend").then((m) => m.RetentionRateTrend),
  { ssr: false, loading }
);

export const DynamicCMGRChart = dynamic(
  () => import("./CMGRChart").then((m) => m.CMGRChart),
  { ssr: false, loading }
);

export const DynamicDAUForecast = dynamic(
  () => import("./DAUForecast").then((m) => m.DAUForecast),
  { ssr: false, loading }
);

export const DynamicRetentionMatrix = dynamic(
  () => import("./RetentionMatrix").then((m) => m.RetentionMatrix),
  { ssr: false, loading }
);

export const DynamicWhatIfSimulator = dynamic(
  () => import("./WhatIfSimulator").then((m) => m.WhatIfSimulator),
  { ssr: false, loading }
);

export const DynamicCohortHeatmap = dynamic(
  () => import("./CohortHeatmap").then((m) => m.CohortHeatmap),
  { ssr: false, loading }
);
