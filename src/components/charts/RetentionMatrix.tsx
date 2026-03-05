"use client";

import type { DayNRetentionRow } from "@/engine/types";
import { formatPercent } from "@/engine/utils";

interface RetentionMatrixProps {
  rows: DayNRetentionRow[];
  dayColumns?: number[];
}

const DEFAULT_COLUMNS = [0, 1, 3, 7, 14, 30, 60, 90];

export function RetentionMatrix({
  rows,
  dayColumns = DEFAULT_COLUMNS,
}: RetentionMatrixProps) {
  const displayRows = rows.slice(-12);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-3 text-muted-foreground font-medium">Cohort</th>
            <th className="text-right py-2 px-3 text-muted-foreground font-medium">Size</th>
            {dayColumns.map((d) => (
              <th key={d} className="text-right py-2 px-3 text-muted-foreground font-medium">
                D{d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row) => (
            <tr key={row.cohortLabel} className="border-b border-border/50 hover:bg-muted/10">
              <td className="py-2 px-3 font-medium">{row.cohortLabel}</td>
              <td className="py-2 px-3 text-right text-muted-foreground">
                {row.cohortSize.toLocaleString()}
              </td>
              {dayColumns.map((d) => {
                const value = row.dayRetention[d];
                if (value == null || d >= row.dayRetention.length) {
                  return <td key={d} className="py-2 px-3 text-right text-muted-foreground/30">—</td>;
                }
                const intensity = value;
                const bg = `hsla(142, 76%, 42%, ${intensity * 0.5})`;
                return (
                  <td
                    key={d}
                    className="py-2 px-3 text-right font-mono"
                    style={{ backgroundColor: bg }}
                  >
                    {formatPercent(value, 1)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
