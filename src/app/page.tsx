"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, ArrowRight, Lock, BookOpen, LineChart, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressProvider, useProgress } from "@/context/ProgressContext";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useTrack } from "@/analytics/useTrack";

function HeroHeatmap() {
  const rows = [
    { label: "Jan 2022", values: [1.0, 0.52, 0.38, 0.31, 0.27, 0.25, 0.24, 0.23] },
    { label: "Feb 2022", values: [1.0, 0.48, 0.35, 0.29, 0.26, 0.24, 0.23] },
    { label: "Mar 2022", values: [1.0, 0.55, 0.41, 0.34, 0.30, 0.27] },
    { label: "Apr 2022", values: [1.0, 0.50, 0.37, 0.32, 0.28] },
    { label: "May 2022", values: [1.0, 0.53, 0.39, 0.33] },
    { label: "Jun 2022", values: [1.0, 0.49, 0.36] },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        <div className="flex gap-1 mb-1 ml-20">
          {["M0", "M1", "M2", "M3", "M4", "M5", "M6", "M7"].map((h) => (
            <div key={h} className="w-14 text-center text-[10px] text-muted-foreground">{h}</div>
          ))}
        </div>
        {rows.map((row, ri) => (
          <div key={row.label} className="flex items-center gap-1 mb-1">
            <span className="w-18 text-[11px] text-muted-foreground text-right pr-2 shrink-0">
              {row.label}
            </span>
            {row.values.map((v, ci) => {
              const h = v * 142;
              const s = 40 + v * 36;
              const l = 15 + v * 25;
              return (
                <motion.div
                  key={ci}
                  className="w-14 h-7 rounded-sm flex items-center justify-center text-[10px] font-mono"
                  style={{
                    backgroundColor: `hsl(${h} ${s}% ${l}%)`,
                    color: v > 0.4 ? "white" : "hsl(0 0% 75%)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ri * 0.12 + ci * 0.06, duration: 0.4, ease: "easeOut" }}
                >
                  {Math.round(v * 100)}%
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const MODULES = [
  {
    title: "Cohort Analysis",
    description: "Retention heatmaps, curves, revenue retention, LTV, and power user distributions",
    lessons: 5,
    icon: BarChart3,
    color: "text-blue-400",
  },
  {
    title: "Growth Accounting",
    description: "Growth decomposition, Quick Ratio, retention rates, and CMGR",
    lessons: 4,
    icon: LineChart,
    color: "text-emerald",
  },
  {
    title: "DAU Forecasting",
    description: "Day-N retention, DAU forecast models, and what-if simulations",
    lessons: 3,
    icon: Target,
    color: "text-purple-400",
  },
];

const CASE_STUDIES = [
  { id: "ecommerce", name: "E-commerce Store", archetype: "Healthy Growth", badge: "bg-emerald/10 text-emerald" },
  { id: "hm-fashion", name: "Fashion Retail", archetype: "Power-Law", badge: "bg-blue-400/10 text-blue-400" },
  { id: "declining-product", name: "Declining SaaS", archetype: "Leaky Bucket", badge: "bg-red-400/10 text-red-400" },
];

function LandingContent() {
  const { isExploreUnlocked } = useProgress();
  const { track } = useTrack();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald" />
            <span className="font-semibold text-sm">Cohort Analyser</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/learn/module-1/retention-heatmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Learn</Link>
            <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Explore</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 pt-12 lg:pt-20 pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">
              Learn Growth Analytics
              <br />
              <span className="text-gradient">by Doing.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Interactive lessons + real data.
              <br />
              No signup. No paywall. Just learn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/learn/module-1/retention-heatmap" onClick={() => track("start_learning_clicked", {})}>
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <BookOpen className="w-4 h-4" />
                  Start Learning
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  Explore Case Studies
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass rounded-xl p-6">
            <HeroHeatmap />
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground text-center mb-8">What You&apos;ll Learn</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {MODULES.map((module, i) => (
            <motion.div key={module.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <Card className="bg-card/50 border-border hover:border-border/80 transition-colors h-full">
                <CardHeader>
                  <module.icon className={`w-8 h-8 mb-2 ${module.color}`} />
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{module.lessons} lessons</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground text-center mb-8">Then Explore Real Case Studies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, i) => (
            <motion.div key={study.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
              <Card className={`bg-card/50 border-border h-full ${!isExploreUnlocked ? "opacity-60" : "hover:border-border/80"} transition-all`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={study.badge}>{study.archetype}</Badge>
                    {!isExploreUnlocked && <Lock className="w-4 h-4 text-muted-foreground/50" />}
                  </div>
                  <CardTitle className="text-lg mt-2">{study.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{isExploreUnlocked ? "Ready to explore" : "Complete all lessons to unlock"}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, Nivo, and shadcn/ui. Case studies derived from sampled and aggregated public datasets.
            {" "}All data processed for educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ProgressProvider>
      <LandingContent />
    </ProgressProvider>
  );
}
