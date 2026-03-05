export function ChartSkeleton({ height = 400 }: { height?: number }) {
  return (
    <div
      className="w-full rounded-lg bg-muted/30 animate-pulse flex items-center justify-center"
      style={{ height }}
    >
      <div className="text-muted-foreground/40 text-sm">Loading chart...</div>
    </div>
  );
}
