"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComputedDataProvider, useComputedData } from "@/context/ComputedDataContext";
import { ProgressProvider, useProgress } from "@/context/ProgressContext";
import {
  DynamicCohortHeatmap as CohortHeatmap,
  DynamicRetentionCurves as RetentionCurves,
  DynamicGrowthDecomposition as GrowthDecomposition,
  DynamicQuickRatioGauge as QuickRatioGauge,
  DynamicRetentionRateTrend as RetentionRateTrend,
  DynamicCMGRChart as CMGRChart,
  DynamicRetentionMatrix as RetentionMatrix,
  DynamicWhatIfSimulator as WhatIfSimulator,
} from "@/components/charts/dynamic";
import { Navbar } from "@/components/shared/Navbar";
import { formatNumber, formatCurrency, formatPercent } from "@/engine/utils";
import { useTrack } from "@/analytics/useTrack";

function DatasetExplorer() {
  const params = useParams();
  const router = useRouter();
  const datasetId = params.dataset as string;

  const { data, loadComputedData, loading, error } = useComputedData();
  const { isExploreUnlocked } = useProgress();
  const { track } = useTrack();

  useEffect(() => {
    loadComputedData(datasetId);
  }, [datasetId, loadComputedData]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted/30 rounded" />
          <div className="h-4 w-96 bg-muted/30 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-muted/30 rounded-lg" />
            ))}
          </div>
          <div className="h-[400px] bg-muted/30 rounded-lg" />
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-destructive">{error || "Dataset not found"}</div>
      </div>
    );
  }

  // Destructure after the !data guard so TypeScript knows all fields are defined
  const {
    retentionTable, retentionCurves, averageRetentionCurve,
    growthData, quickRatioData, retentionRates, cmgrData,
    dayNRetention, dauRetentionCurve,
  } = data;

  const latestQR = quickRatioData[quickRatioData.length - 1];
  const latestRetRate = retentionRates[retentionRates.length - 1];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <Badge variant="outline">{data.archetype}</Badge>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl">{data.description}</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Total Users</p>
              <p className="text-xl font-mono font-semibold">{formatNumber(data.meta.totalUsers)}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Total Events</p>
              <p className="text-xl font-mono font-semibold">{formatNumber(data.meta.totalEvents)}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Date Range</p>
              <p className="text-sm font-mono">{data.meta.dateRange.start} to {data.meta.dateRange.end}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Quick Ratio</p>
              <p className="text-xl font-mono font-semibold">
                {latestQR ? (latestQR.quickRatio === Infinity ? "∞" : latestQR.quickRatio.toFixed(1)) : "—"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="cohorts" onValueChange={(tab) => track("explore_tab_changed", { dataset: datasetId, tab })}>
          <TabsList className="mb-6">
            <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="cohorts" className="space-y-8">
            {retentionTable && (
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">Retention Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <CohortHeatmap table={retentionTable} maxCohorts={15} maxPeriods={13} />
                </CardContent>
              </Card>
            )}
            {retentionCurves.length > 0 && (
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">Retention Curves</CardTitle>
                </CardHeader>
                <CardContent>
                  <RetentionCurves curves={retentionCurves} averageCurve={averageRetentionCurve} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="growth" className="space-y-8">
            {growthData.length > 0 && (
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">Growth Decomposition</CardTitle>
                </CardHeader>
                <CardContent>
                  <GrowthDecomposition data={growthData} />
                </CardContent>
              </Card>
            )}
            <div className="grid md:grid-cols-2 gap-8">
              {quickRatioData.length > 0 && (
                <Card className="bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-base">Quick Ratio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QuickRatioGauge data={quickRatioData} />
                  </CardContent>
                </Card>
              )}
              {retentionRates.length > 0 && (
                <Card className="bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-base">Retention Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RetentionRateTrend data={retentionRates} />
                  </CardContent>
                </Card>
              )}
            </div>
            {cmgrData.length > 0 && (
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">CMGR</CardTitle>
                </CardHeader>
                <CardContent>
                  <CMGRChart data={cmgrData} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="forecast" className="space-y-8">
            {dayNRetention.length > 0 && (
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">Day-N Retention Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <RetentionMatrix rows={dayNRetention} />
                </CardContent>
              </Card>
            )}
            {dauRetentionCurve.length > 0 && (
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">What-If DAU Simulator</CardTitle>
                </CardHeader>
                <CardContent>
                  <WhatIfSimulator baselineRetentionCurve={dauRetentionCurve} />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}

export default function DatasetPage() {
  return (
    <ProgressProvider>
      <ComputedDataProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <DatasetExplorer />
        </div>
      </ComputedDataProvider>
    </ProgressProvider>
  );
}
