"use client";

import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import type { RetentionCurve, RetentionCurvePoint } from "@/engine/types";
import { formatPercent } from "@/engine/utils";
import { useChartTheme } from "@/hooks/useChartTheme";

interface RetentionCurvesProps {
  curves: RetentionCurve[];
  averageCurve?: RetentionCurvePoint[];
  /** Which cohort indices to highlight (all others dimmed) */
  highlightCohorts?: number[];
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
  "hsl(120, 60%, 45%)",
  "hsl(200, 80%, 55%)",
  "hsl(330, 80%, 55%)",
  "hsl(60, 80%, 50%)",
];

export function RetentionCurves({
  curves,
  averageCurve,
  highlightCohorts,
  maxPeriods = 13,
}: RetentionCurvesProps) {
  const chartTheme = useChartTheme();
  const data = useMemo(() => {
    const series = curves.slice(-12).map((curve, i) => ({
      id: curve.cohortLabel,
      data: curve.points
        .filter((p) => p.period <= maxPeriods)
        .map((p) => ({
          x: p.period,
          y: Math.round(p.retention * 1000) / 10,
        })),
    }));

    if (averageCurve && averageCurve.length > 0) {
      series.push({
        id: "Average",
        data: averageCurve
          .filter((p) => p.period <= maxPeriods)
          .map((p) => ({
            x: p.period,
            y: Math.round(p.retention * 1000) / 10,
          })),
      });
    }

    return series;
  }, [curves, averageCurve, maxPeriods]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 120, bottom: 50, left: 60 }}
        xScale={{ type: "linear", min: 0, max: maxPeriods }}
        yScale={{ type: "linear", min: 0, max: 100 }}
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
          legend: "Retention %",
          legendOffset: -50,
          legendPosition: "middle",
          format: (v) => `${v}%`,
        }}
        enablePoints={false}
        lineWidth={2}
        colors={(d) => {
          if (d.id === "Average") return "hsl(0, 0%, 98%)";
          const idx = data.findIndex((s) => s.id === d.id);
          return CHART_COLORS[idx % CHART_COLORS.length];
        }}
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
