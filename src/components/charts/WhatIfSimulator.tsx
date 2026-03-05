"use client";

import { useState, useMemo } from "react";
import { DAUForecast } from "./DAUForecast";
import { forecastDAU, computeSteadyStateDAU } from "@/engine/forecasting";
import type { WhatIfParams } from "@/engine/types";
import { useTrack } from "@/analytics/useTrack";

interface WhatIfSimulatorProps {
  baselineRetentionCurve: number[];
}

export function WhatIfSimulator({ baselineRetentionCurve }: WhatIfSimulatorProps) {
  const [dailyNewUsers, setDailyNewUsers] = useState(100);
  const [retentionMultiplier, setRetentionMultiplier] = useState(1.0);
  const [forecastDays, setForecastDays] = useState(90);
  const { track } = useTrack();

  const params: WhatIfParams = { dailyNewUsers, retentionMultiplier, forecastDays };

  const forecastData = useMemo(
    () => forecastDAU(params, baselineRetentionCurve),
    [dailyNewUsers, retentionMultiplier, forecastDays, baselineRetentionCurve]
  );

  const steadyStateDAU = useMemo(
    () => computeSteadyStateDAU(dailyNewUsers, baselineRetentionCurve.map((r) => r * retentionMultiplier)),
    [dailyNewUsers, retentionMultiplier, baselineRetentionCurve]
  );

  const currentDAU = forecastData[forecastData.length - 1]?.totalDAU ?? 0;

  return (
    <div className="space-y-6">
      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            New Users / Day: <span className="font-mono font-medium text-foreground">{dailyNewUsers}</span>
          </label>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={dailyNewUsers}
            onChange={(e) => setDailyNewUsers(Number(e.target.value))}
            onPointerUp={() => track("chart_interacted", { chart_type: "what_if_simulator", action: "daily_new_users_changed", module: "explore", context: "explore" })}
            className="w-full accent-emerald"
          />
          <div className="flex justify-between text-xs text-muted-foreground/60">
            <span>10</span>
            <span>500</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            Retention Multiplier: <span className="font-mono font-medium text-foreground">{retentionMultiplier.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min={0.2}
            max={2.0}
            step={0.1}
            value={retentionMultiplier}
            onChange={(e) => setRetentionMultiplier(Number(e.target.value))}
            onPointerUp={() => track("chart_interacted", { chart_type: "what_if_simulator", action: "retention_multiplier_changed", module: "explore", context: "explore" })}
            className="w-full accent-emerald"
          />
          <div className="flex justify-between text-xs text-muted-foreground/60">
            <span>0.2x</span>
            <span>2.0x</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">
            Forecast Days: <span className="font-mono font-medium text-foreground">{forecastDays}</span>
          </label>
          <input
            type="range"
            min={30}
            max={180}
            step={30}
            value={forecastDays}
            onChange={(e) => setForecastDays(Number(e.target.value))}
            onPointerUp={() => track("chart_interacted", { chart_type: "what_if_simulator", action: "forecast_days_changed", module: "explore", context: "explore" })}
            className="w-full accent-emerald"
          />
          <div className="flex justify-between text-xs text-muted-foreground/60">
            <span>30</span>
            <span>180</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex gap-6 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Current DAU (Day {forecastDays})</p>
          <p className="font-mono text-lg font-semibold">{currentDAU.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Steady-State DAU</p>
          <p className="font-mono text-lg font-semibold text-muted-foreground">
            {steadyStateDAU.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <DAUForecast data={forecastData} />
    </div>
  );
}
