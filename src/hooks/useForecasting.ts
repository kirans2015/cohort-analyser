"use client";

import { useMemo } from "react";
import type { UserEvent } from "@/engine/types";
import { computeDayNRetention, computeAverageDayNRetention } from "@/engine/forecasting";

export function useForecasting(events: UserEvent[] | null) {
  const dayNRetention = useMemo(() => {
    if (!events || events.length === 0) return [];
    return computeDayNRetention(events, 90);
  }, [events]);

  const averageRetentionCurve = useMemo(
    () => computeAverageDayNRetention(dayNRetention),
    [dayNRetention]
  );

  return { dayNRetention, averageRetentionCurve };
}
