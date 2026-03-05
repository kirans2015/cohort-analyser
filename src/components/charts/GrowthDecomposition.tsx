"use client";

import { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import type { GrowthAccountingMonth } from "@/engine/types";
import { useChartTheme } from "@/hooks/useChartTheme";

interface GrowthDecompositionProps {
  data: GrowthAccountingMonth[];
  highlightMonth?: number;
}

export function GrowthDecomposition({ data, highlightMonth }: GrowthDecompositionProps) {
  const chartTheme = useChartTheme();
  const chartData = useMemo(() => {
    return data.map((month) => ({
      month: month.label,
      New: month.newUsers,
      Retained: month.retainedUsers,
      Resurrected: month.resurrectedUsers,
      Churned: -month.churnedUsers,
    }));
  }, [data]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveBar
        data={chartData}
        keys={["New", "Retained", "Resurrected", "Churned"]}
        indexBy="month"
        margin={{ top: 20, right: 120, bottom: 60, left: 60 }}
        padding={0.2}
        colors={[
          "hsl(217, 91%, 60%)",   // New — blue
          "hsl(142, 76%, 42%)",   // Retained — green
          "hsl(43, 96%, 56%)",    // Resurrected — amber
          "hsl(0, 84%, 55%)",     // Churned — red
        ]}
        borderRadius={2}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "",
          legendOffset: 45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Users",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        enableLabel={false}
        tooltip={({ id, value, color, indexValue }) => (
          <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
            <p className="text-xs text-muted-foreground mb-1">{indexValue}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-medium">{id}:</span>
              <span className="font-mono">
                {(value as number) < 0 ? "" : "+"}
                {(value as number).toLocaleString()}
              </span>
            </div>
          </div>
        )}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 110,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: chartTheme.legendTextColor,
            symbolSize: 10,
            symbolShape: "square",
          },
        ]}
        theme={chartTheme}
      />
    </div>
  );
}
