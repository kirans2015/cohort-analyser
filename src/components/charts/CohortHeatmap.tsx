"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RetentionTable, ChartAnnotation } from "@/engine/types";
import { formatPercent } from "@/engine/utils";

interface CohortHeatmapProps {
  table: RetentionTable;
  /** Max number of cohort rows to display (most recent N) */
  maxCohorts?: number;
  /** Max number of period columns to display */
  maxPeriods?: number;
  /** Annotation to highlight specific cells/rows/columns */
  annotation?: ChartAnnotation;
  /** Whether to animate cells on mount */
  animate?: boolean;
  /** Show revenue values instead of user retention */
  isRevenue?: boolean;
  /** Custom title */
  title?: string;
}

// Color scale: 0% → deep red/gray, 100% → vibrant emerald
function retentionColor(value: number, isRevenue = false): string {
  if (value === 0) return "hsl(0 0% 12%)";

  if (isRevenue && value > 1) {
    // Revenue retention > 100% → blue/purple tones (expansion)
    const intensity = Math.min((value - 1) / 0.5, 1);
    const h = 220 + intensity * 40;
    const s = 70 + intensity * 20;
    const l = 35 + intensity * 15;
    return `hsl(${h} ${s}% ${l}%)`;
  }

  const clamped = Math.max(0, Math.min(1, value));
  // Interpolate from dark red/warm → emerald green
  const h = clamped * 142; // 0 = red-ish, 142 = emerald
  const s = 40 + clamped * 36; // 40% → 76%
  const l = 15 + clamped * 25; // 15% → 40%
  return `hsl(${h} ${s}% ${l}%)`;
}

function textColor(value: number): string {
  return value > 0.4 ? "hsl(0 0% 98%)" : "hsl(0 0% 75%)";
}

const CELL_WIDTH = 64;
const CELL_HEIGHT = 36;
const LABEL_WIDTH = 100;
const HEADER_HEIGHT = 40;
const ROW_GAP = 2;
const COL_GAP = 2;

export function CohortHeatmap({
  table,
  maxCohorts = 15,
  maxPeriods = 13,
  annotation,
  animate = false,
  isRevenue = false,
  title,
}: CohortHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const displayData = useMemo(() => {
    const startIdx = Math.max(0, table.cohorts.length - maxCohorts);
    const cohorts = table.cohorts.slice(startIdx);
    const retention = table.retention.slice(startIdx);
    const counts = table.counts.slice(startIdx);
    const periods = Math.min(maxPeriods, table.maxPeriods);
    return { cohorts, retention, counts, periods, startIdx };
  }, [table, maxCohorts, maxPeriods]);

  const { cohorts, retention, counts, periods } = displayData;

  const svgWidth = LABEL_WIDTH + 50 + periods * (CELL_WIDTH + COL_GAP);
  const svgHeight = HEADER_HEIGHT + cohorts.length * (CELL_HEIGHT + ROW_GAP) + 10;

  const isHighlighted = useCallback(
    (row: number, col: number): boolean => {
      if (!annotation || annotation.type === "none") return false;
      const t = annotation.target;
      if (!t) return false;

      switch (annotation.type) {
        case "highlight-row":
          return t.row === row || (t.rows?.includes(row) ?? false);
        case "highlight-column":
          return t.col === col || (t.cols?.includes(col) ?? false);
        case "highlight-cell":
          return t.row === row && t.col === col;
        case "region":
          return (
            (t.rows?.includes(row) ?? false) &&
            (t.cols?.includes(col) ?? false)
          );
        default:
          return false;
      }
    },
    [annotation]
  );

  const hasAnnotation = annotation && annotation.type !== "none";

  return (
    <div className="w-full overflow-x-auto">
      {title && (
        <h3 className="text-sm font-medium text-muted-foreground mb-3">{title}</h3>
      )}
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="font-mono text-xs"
      >
        {/* Column headers: Month 0, Month 1, ... */}
        {Array.from({ length: periods }, (_, col) => (
          <text
            key={`header-${col}`}
            x={LABEL_WIDTH + 50 + col * (CELL_WIDTH + COL_GAP) + CELL_WIDTH / 2}
            y={HEADER_HEIGHT - 10}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize={11}
          >
            {col === 0 ? "M0" : `M${col}`}
          </text>
        ))}

        {/* Cohort size header */}
        <text
          x={LABEL_WIDTH + 25}
          y={HEADER_HEIGHT - 10}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize={11}
        >
          Size
        </text>

        {/* Rows */}
        {cohorts.map((cohort, row) => {
          const y = HEADER_HEIGHT + row * (CELL_HEIGHT + ROW_GAP);

          return (
            <g key={cohort.month}>
              {/* Cohort label */}
              <text
                x={LABEL_WIDTH - 8}
                y={y + CELL_HEIGHT / 2 + 4}
                textAnchor="end"
                className="fill-foreground"
                fontSize={12}
              >
                {cohort.label}
              </text>

              {/* Cohort size */}
              <text
                x={LABEL_WIDTH + 25}
                y={y + CELL_HEIGHT / 2 + 4}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize={11}
              >
                {cohort.size.toLocaleString()}
              </text>

              {/* Cells */}
              {Array.from({ length: Math.min(periods, retention[row]?.length ?? 0) }, (_, col) => {
                const value = retention[row][col];
                const count = counts[row][col];
                const isHovered = hoveredCell?.row === row && hoveredCell?.col === col;
                const highlighted = isHighlighted(row, col);
                const dimmed = hasAnnotation && !highlighted;
                const cellX = LABEL_WIDTH + 50 + col * (CELL_WIDTH + COL_GAP);

                return (
                  <g
                    key={`${row}-${col}`}
                    onMouseEnter={() => setHoveredCell({ row, col })}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <motion.rect
                      x={cellX}
                      y={y}
                      width={CELL_WIDTH}
                      height={CELL_HEIGHT}
                      rx={4}
                      fill={retentionColor(value, isRevenue)}
                      opacity={dimmed ? 0.3 : 1}
                      initial={animate ? { opacity: 0 } : false}
                      animate={{
                        opacity: dimmed ? 0.3 : 1,
                        strokeWidth: isHovered || highlighted ? 2 : 0,
                        stroke: isHovered
                          ? "hsl(0 0% 98%)"
                          : highlighted
                            ? "hsl(217 91% 60%)"
                            : "transparent",
                      }}
                      transition={{
                        delay: animate ? (row * periods + col) * 0.02 : 0,
                        duration: animate ? 0.3 : 0.15,
                      }}
                    />
                    <text
                      x={cellX + CELL_WIDTH / 2}
                      y={y + CELL_HEIGHT / 2 + 4}
                      textAnchor="middle"
                      fill={textColor(value)}
                      fontSize={11}
                      fontWeight={col === 0 ? 600 : 400}
                      opacity={dimmed ? 0.3 : 1}
                    >
                      {formatPercent(value)}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredCell && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {(() => {
                const { row, col } = hoveredCell;
                const value = retention[row]?.[col];
                const count = counts[row]?.[col];
                if (value == null) return null;

                const tooltipX = LABEL_WIDTH + 50 + col * (CELL_WIDTH + COL_GAP) + CELL_WIDTH / 2;
                const tooltipY = HEADER_HEIGHT + row * (CELL_HEIGHT + ROW_GAP) - 8;

                return (
                  <>
                    <rect
                      x={tooltipX - 70}
                      y={tooltipY - 38}
                      width={140}
                      height={34}
                      rx={6}
                      className="fill-card stroke-border"
                      strokeWidth={1}
                    />
                    <text
                      x={tooltipX}
                      y={tooltipY - 23}
                      textAnchor="middle"
                      className="fill-foreground"
                      fontSize={11}
                    >
                      {cohorts[row].label} → M{col}: {formatPercent(value, 1)} ({count?.toLocaleString()} users)
                    </text>
                  </>
                );
              })()}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
