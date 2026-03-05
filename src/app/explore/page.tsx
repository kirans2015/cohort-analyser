"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, TrendingUp, BarChart3, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressProvider, useProgress } from "@/context/ProgressContext";
import { Navbar } from "@/components/shared/Navbar";
import { useTrack } from "@/analytics/useTrack";

const DATASETS = [
  {
    id: "ecommerce",
    name: "E-commerce Store",
    description: "Derived from a sample of the UCI Online Retail II dataset. Shows healthy growth with strong retention and revenue expansion. Sampled and aggregated for educational use.",
    archetype: "Healthy Growth",
    icon: TrendingUp,
    color: "text-emerald",
    badge: "bg-emerald/10 text-emerald border-emerald/20",
    stats: { users: "5,878", months: "24", hasRevenue: true },
  },
  {
    id: "hm-fashion",
    name: "Fashion Retail",
    description: "Large-scale fashion retail dataset with 1.36M users. Shows classic power-law engagement — most buy once, a small core drives disproportionate value.",
    archetype: "Power-Law",
    icon: BarChart3,
    color: "text-blue-400",
    badge: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    stats: { users: "1,362,281", months: "24", hasRevenue: true },
  },
  {
    id: "declining-product",
    name: "Declining SaaS Product",
    description: "Synthetic dataset simulating a SaaS tool losing product-market fit. Falling acquisition, leaky bucket retention, and contracting revenue. Generated for educational purposes.",
    archetype: "Leaky Bucket",
    icon: TrendingDown,
    color: "text-red-400",
    badge: "bg-red-400/10 text-red-400 border-red-400/20",
    stats: { users: "3,348", months: "20", hasRevenue: true },
  },
];

function ExploreContent() {
  const { isExploreUnlocked, completedLessonsCount } = useProgress();
  const { track } = useTrack();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Explore Case Studies</h1>
          <p className="text-muted-foreground mb-8">
            Apply what you&apos;ve learned to real datasets representing different growth archetypes.
          </p>

          {!isExploreUnlocked && (
            <div className="mb-8 p-4 rounded-lg border border-border bg-card/50 flex items-center gap-3">
              <Lock className="w-5 h-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium">Complete all lessons to unlock</p>
                <p className="text-xs text-muted-foreground">
                  Progress: {completedLessonsCount}/12 lessons completed
                </p>
              </div>
              <Link href="/learn/module-1/retention-heatmap" className="ml-auto">
                <Button size="sm" variant="outline">Continue Learning</Button>
              </Link>
            </div>
          )}

          <div className="grid gap-6">
            {DATASETS.map((ds, i) => (
              <motion.div
                key={ds.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {isExploreUnlocked ? (
                  <Link href={`/explore/${ds.id}`} onClick={() => track("case_study_selected", { dataset: ds.id, archetype: ds.archetype })}>
                    <Card className="bg-card/50 border-border hover:border-border/80 transition-all cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <ds.icon className={`w-6 h-6 ${ds.color}`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-lg">{ds.name}</CardTitle>
                              <Badge variant="outline" className={ds.badge}>{ds.archetype}</Badge>
                            </div>
                            <CardDescription>{ds.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-6 text-xs text-muted-foreground">
                          <span>{ds.stats.users} users</span>
                          <span>{ds.stats.months} months</span>
                          {ds.stats.hasRevenue && <span>Revenue data</span>}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="bg-card/50 border-border opacity-50">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Lock className="w-6 h-6 text-muted-foreground/50" />
                        <div>
                          <CardTitle className="text-lg">{ds.name}</CardTitle>
                          <CardDescription>{ds.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <ProgressProvider>
      <ExploreContent />
    </ProgressProvider>
  );
}
