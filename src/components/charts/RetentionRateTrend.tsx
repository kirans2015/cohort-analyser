"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import type { RetentionRateData } from "@/engine/types";
import { useChartTheme } from "@/hooks/useChartTheme";

interface RetentionRateTrendProps {
  data: RetentionRateData[];
}

export function RetentionRateTrend({ data }: RetentionRateTrendProps) {
  const chartTheme = useChartTheme();
  const chartData = useMemo(() => {
    return [
      {
        id: "Gross Retention Rate",
        data: data.map((d) => ({
          x: d.label,
          y: Math.round(d.grossRetentionRate * 1000) / 10,
        })),
      },
      {
        id: "Net Churn Rate",
        data: data.map((d) => ({
          x: d.label,
          y: Math.round(d.netChurnRate * 1000) / 10,
        })),
      },
    ];
  }, [data]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 140, bottom: 60, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: 100 }}
        curve="monotoneX"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Rate (%)",
          legendOffset: -50,
          legendPosition: "middle",
          format: (v) => `${v}%`,
        }}
        enablePoints={true}
        pointSize={6}
        pointBorderWidth={2}
        pointBorderColor={{ from: "seriesColor" }}
        pointColor="hsl(0, 0%, 3.9%)"
        lineWidth={2}
        colors={["hsl(142, 76%, 42%)", "hsl(0, 84%, 55%)"]}
        enableSlices="x"
        sliceTooltip={({ slice }) => (
          <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
            <p className="text-xs text-muted-foreground mb-2">
              {slice.points[0].data.xFormatted}
            </p>
            {slice.points.map((point) => (
              <div key={point.id} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: point.seriesColor }}
                />
                <span className="text-muted-foreground">{point.seriesId}:</span>
                <span className="font-mono font-medium">{point.data.yFormatted}%</span>
              </div>
            ))}
          </div>
        )}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 130,
            itemWidth: 120,
            itemHeight: 18,
            itemTextColor: chartTheme.legendTextColor,
            symbolSize: 8,
            symbolShape: "circle",
          },
        ]}
        theme={chartTheme}
      />
    </div>
  );
}
