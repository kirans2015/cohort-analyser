"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import type { CMGRData } from "@/engine/types";
import { useChartTheme } from "@/hooks/useChartTheme";

interface CMGRChartProps {
  data: CMGRData[];
}

export function CMGRChart({ data }: CMGRChartProps) {
  const chartTheme = useChartTheme();
  const chartData = useMemo(() => {
    return [
      {
        id: "MoM Growth",
        data: data.map((d) => ({
          x: d.label,
          y: Math.round(d.momGrowth * 1000) / 10,
        })),
      },
      {
        id: "CMGR (3m)",
        data: data
          .filter((d) => d.cmgr3 != null)
          .map((d) => ({
            x: d.label,
            y: Math.round(d.cmgr3! * 1000) / 10,
          })),
      },
      {
        id: "CMGR (6m)",
        data: data
          .filter((d) => d.cmgr6 != null)
          .map((d) => ({
            x: d.label,
            y: Math.round(d.cmgr6! * 1000) / 10,
          })),
      },
      {
        id: "CMGR (12m)",
        data: data
          .filter((d) => d.cmgr12 != null)
          .map((d) => ({
            x: d.label,
            y: Math.round(d.cmgr12! * 1000) / 10,
          })),
      },
    ];
  }, [data]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 120, bottom: 60, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        curve="monotoneX"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Growth Rate (%)",
          legendOffset: -50,
          legendPosition: "middle",
          format: (v) => `${v}%`,
        }}
        enablePoints={false}
        lineWidth={2}
        colors={[
          "hsl(0, 0%, 40%)",     // MoM — dimmed
          "hsl(217, 91%, 60%)",  // 3m — blue
          "hsl(142, 76%, 42%)",  // 6m — green
          "hsl(262, 83%, 58%)",  // 12m — purple
        ]}
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
            translateX: 110,
            itemWidth: 100,
            itemHeight: 16,
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
