"use client";

import { useMemo } from "react";
import type { UserEvent } from "@/engine/types";
import {
  computeGrowthAccounting,
  computeQuickRatio,
  computeRetentionRates,
  computeCMGR,
} from "@/engine/growth-accounting";

export function useGrowthAccounting(events: UserEvent[] | null) {
  const growthData = useMemo(() => {
    if (!events || events.length === 0) return [];
    return computeGrowthAccounting(events);
  }, [events]);

  const quickRatioData = useMemo(() => computeQuickRatio(growthData), [growthData]);
  const retentionRates = useMemo(() => computeRetentionRates(growthData), [growthData]);
  const cmgrData = useMemo(() => computeCMGR(growthData), [growthData]);

  return { growthData, quickRatioData, retentionRates, cmgrData };
}
