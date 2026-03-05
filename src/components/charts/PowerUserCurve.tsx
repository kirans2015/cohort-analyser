"use client";

import { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import type { PowerUserDistribution } from "@/engine/types";
import { formatPercent } from "@/engine/utils";
import { useChartTheme } from "@/hooks/useChartTheme";

interface PowerUserCurveProps {
  distribution: PowerUserDistribution;
}

export function PowerUserCurve({ distribution }: PowerUserCurveProps) {
  const chartTheme = useChartTheme();
  const data = useMemo(() => {
    return distribution.buckets.map((bucket) => ({
      activeDays: bucket.activeDays.toString(),
      users: bucket.userCount,
      percentage: Math.round(bucket.percentage * 1000) / 10,
    }));
  }, [distribution]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveBar
        data={data}
        keys={["users"]}
        indexBy="activeDays"
        margin={{ top: 20, right: 30, bottom: 60, left: 60 }}
        padding={0.15}
        colors={({ index }) => {
          const days = parseInt(data[index].activeDays);
          if (days >= 20) return "hsl(142, 76%, 52%)"; // Power users — emerald
          if (days >= 10) return "hsl(217, 91%, 60%)"; // Core users — blue
          return "hsl(0, 0%, 30%)"; // Casual users — gray
        }}
        borderRadius={2}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Active Days in Month",
          legendOffset: 45,
          legendPosition: "middle",
          tickValues: [1, 5, 10, 15, 20, 25, 30],
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Number of Users",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        tooltip={({ data }) => (
          <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
            <p className="text-xs font-medium">{data.activeDays} active days</p>
            <p className="text-xs text-muted-foreground">
              {(data.users as number).toLocaleString()} users ({data.percentage}%)
            </p>
          </div>
        )}
        theme={chartTheme}
      />
    </div>
  );
}
