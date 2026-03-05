"use client";

import { motion } from "framer-motion";
import type { QuickRatioData } from "@/engine/types";
import { round } from "@/engine/utils";

interface QuickRatioGaugeProps {
  data: QuickRatioData[];
  /** Which month index to show the gauge for (defaults to latest) */
  selectedMonth?: number;
}

function getQuickRatioLabel(qr: number): { label: string; color: string } {
  if (qr >= 4) return { label: "Hypergrowth", color: "hsl(142, 76%, 52%)" };
  if (qr >= 2) return { label: "Strong Growth", color: "hsl(142, 76%, 42%)" };
  if (qr >= 1) return { label: "Growing", color: "hsl(43, 96%, 56%)" };
  if (qr > 0.5) return { label: "Declining", color: "hsl(30, 100%, 50%)" };
  return { label: "Severe Decline", color: "hsl(0, 84%, 55%)" };
}

export function QuickRatioGauge({ data, selectedMonth }: QuickRatioGaugeProps) {
  const idx = selectedMonth ?? data.length - 1;
  const current = data[idx];
  if (!current) return null;

  const qr = current.quickRatio === Infinity ? 99 : round(current.quickRatio, 2);
  const { label, color } = getQuickRatioLabel(qr);

  // Gauge: arc from -135° to 135° (270° total)
  const maxQR = 5;
  const normalized = Math.min(qr / maxQR, 1);
  const startAngle = -135;
  const endAngle = startAngle + normalized * 270;

  const cx = 150;
  const cy = 140;
  const r = 100;

  function polarToCart(angleDeg: number): { x: number; y: number } {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  const arcStart = polarToCart(startAngle);
  const arcEnd = polarToCart(endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  const bgStart = polarToCart(startAngle);
  const bgEnd = polarToCart(135);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={300} height={200} viewBox="0 0 300 200">
        {/* Background arc */}
        <path
          d={`M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 1 1 ${bgEnd.x} ${bgEnd.y}`}
          fill="none"
          className="stroke-border"
          strokeWidth={16}
          strokeLinecap="round"
        />

        {/* Value arc */}
        <motion.path
          d={`M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${largeArc} 1 ${arcEnd.x} ${arcEnd.y}`}
          fill="none"
          stroke={color}
          strokeWidth={16}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Value text */}
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          className="fill-foreground"
          fontSize={36}
          fontWeight={700}
        >
          {qr >= 99 ? "∞" : qr.toFixed(1)}
        </text>

        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          fontSize={12}
          fill={color}
          fontWeight={600}
        >
          {label}
        </text>

        <text
          x={cx}
          y={cy + 35}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize={11}
        >
          Quick Ratio
        </text>

        {/* Scale labels */}
        <text x={45} y={185} className="fill-muted-foreground" fontSize={10}>0</text>
        <text x={255} y={185} className="fill-muted-foreground" fontSize={10}>{maxQR}+</text>
      </svg>

      {/* Gains vs Losses breakdown */}
      <div className="flex gap-8 text-sm">
        <div className="text-center">
          <p className="text-muted-foreground text-xs">Gains</p>
          <p className="font-mono font-medium text-emerald">
            +{current.gains.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground/60">new + resurrected</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xs">Losses</p>
          <p className="font-mono font-medium text-destructive">
            -{current.losses.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground/60">churned</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{current.label}</p>
    </div>
  );
}
