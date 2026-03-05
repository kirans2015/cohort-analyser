"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import type { DAUForecastPoint } from "@/engine/types";
import { useChartTheme } from "@/hooks/useChartTheme";

interface DAUForecastProps {
  data: DAUForecastPoint[];
  showCohortContributions?: boolean;
}

export function DAUForecast({ data, showCohortContributions = false }: DAUForecastProps) {
  const chartTheme = useChartTheme();
  const chartData = useMemo(() => {
    const totalLine = {
      id: "Total DAU",
      data: data.map((d, i) => ({
        x: i,
        y: d.totalDAU,
      })),
    };

    return [totalLine];
  }, [data]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 30, bottom: 50, left: 70 }}
        xScale={{ type: "linear", min: 0, max: data.length - 1 }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        curve="monotoneX"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Day",
          legendOffset: 40,
          legendPosition: "middle",
          tickValues: 10,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Daily Active Users",
          legendOffset: -60,
          legendPosition: "middle",
          format: (v) => (v as number).toLocaleString(),
        }}
        enablePoints={false}
        lineWidth={2}
        colors={["hsl(217, 91%, 60%)"]}
        enableArea
        areaBaselineValue={0}
        areaOpacity={0.15}
        enableSlices="x"
        sliceTooltip={({ slice }) => (
          <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
            <p className="text-xs text-muted-foreground mb-2">
              Day {slice.points[0].data.xFormatted}
            </p>
            {slice.points.map((point) => (
              <div key={point.id} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: point.seriesColor }}
                />
                <span className="font-mono font-medium">
                  {(point.data.y as number).toLocaleString()} users
                </span>
              </div>
            ))}
          </div>
        )}
        theme={chartTheme}
      />
    </div>
  );
}
