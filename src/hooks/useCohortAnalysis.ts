"use client";

import { useMemo } from "react";
import type { UserEvent, RetentionTable, RevenueRetentionTable, RetentionCurve } from "@/engine/types";
import { computeRetentionTable, computeRevenueRetentionTable, extractRetentionCurves, computeAverageRetentionCurve } from "@/engine/cohorts";

export function useCohortAnalysis(events: UserEvent[] | null) {
  const retentionTable = useMemo<RetentionTable | null>(() => {
    if (!events || events.length === 0) return null;
    return computeRetentionTable(events);
  }, [events]);

  const revenueRetentionTable = useMemo<RevenueRetentionTable | null>(() => {
    if (!events || events.length === 0) return null;
    const hasRevenue = events.some((e) => e.revenue != null);
    if (!hasRevenue) return null;
    return computeRevenueRetentionTable(events);
  }, [events]);

  const retentionCurves = useMemo<RetentionCurve[]>(() => {
    if (!retentionTable) return [];
    return extractRetentionCurves(retentionTable);
  }, [retentionTable]);

  const averageRetentionCurve = useMemo(() => {
    if (!retentionTable) return [];
    return computeAverageRetentionCurve(retentionTable);
  }, [retentionTable]);

  return {
    retentionTable,
    revenueRetentionTable,
    retentionCurves,
    averageRetentionCurve,
  };
}
