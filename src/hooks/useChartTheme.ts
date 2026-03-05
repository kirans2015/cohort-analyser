"use client";

import { useEffect, useState } from "react";

export function useChartTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (isDark) {
    return {
      background: "transparent",
      text: { fill: "hsl(0, 0%, 64%)" },
      axis: {
        ticks: { text: { fill: "hsl(0, 0%, 64%)", fontSize: 10 } },
        legend: { text: { fill: "hsl(0, 0%, 64%)" } },
      },
      grid: { line: { stroke: "hsl(0, 0%, 15%)", strokeWidth: 1 } },
      crosshair: { line: { stroke: "hsl(0, 0%, 40%)", strokeWidth: 1 } },
      legendTextColor: "hsl(0, 0%, 64%)",
    };
  }

  return {
    background: "transparent",
    text: { fill: "hsl(0, 0%, 45%)" },
    axis: {
      ticks: { text: { fill: "hsl(0, 0%, 45%)", fontSize: 10 } },
      legend: { text: { fill: "hsl(0, 0%, 35%)" } },
    },
    grid: { line: { stroke: "hsl(0, 0%, 90%)", strokeWidth: 1 } },
    crosshair: { line: { stroke: "hsl(0, 0%, 60%)", strokeWidth: 1 } },
    legendTextColor: "hsl(0, 0%, 35%)",
  };
}
