"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import type { LTVCurve } from "@/engine/types";
import { formatCurrency } from "@/engine/utils";
import { useChartTheme } from "@/hooks/useChartTheme";

interface LTVCurvesProps {
  curves: LTVCurve[];
  maxPeriods?: number;
}

const CHART_COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(160, 84%, 39%)",
  "hsl(43, 96%, 56%)",
  "hsl(262, 83%, 58%)",
  "hsl(349, 89%, 60%)",
  "hsl(190, 90%, 50%)",
  "hsl(30, 100%, 50%)",
  "hsl(280, 70%, 55%)",
];

export function LTVCurves({ curves, maxPeriods = 13 }: LTVCurvesProps) {
  const chartTheme = useChartTheme();
  const data = useMemo(() => {
    return curves.slice(-8).map((curve) => ({
      id: curve.cohortLabel,
      data: curve.points
        .filter((p) => p.period <= maxPeriods)
        .map((p) => ({
          x: p.period,
          y: p.cumulativeLtv,
        })),
    }));
  }, [curves, maxPeriods]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 120, bottom: 50, left: 70 }}
        xScale={{ type: "linear", min: 0, max: maxPeriods }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        curve="monotoneX"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Months Since Join",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Cumulative LTV",
          legendOffset: -60,
          legendPosition: "middle",
          format: (v) => `$${v}`,
        }}
        enablePoints={false}
        lineWidth={2}
        colors={CHART_COLORS}
        enableSlices="x"
        sliceTooltip={({ slice }) => (
          <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
            <p className="text-xs text-muted-foreground mb-2">
              Month {slice.points[0].data.xFormatted}
            </p>
            {slice.points.map((point) => (
              <div key={point.id} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: point.seriesColor }}
                />
                <span className="text-muted-foreground">{point.seriesId}:</span>
                <span className="font-mono font-medium">
                  {formatCurrency(point.data.y as number)}
                </span>
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
