// ── Raw data types ──────────────────────────────────────────

/** A single user activity event */
export interface UserEvent {
  userId: string;
  date: string; // ISO date string YYYY-MM-DD
  revenue?: number;
}

/** A pre-processed dataset ready for analysis */
export interface Dataset {
  id: string;
  name: string;
  description: string;
  archetype: "healthy" | "power-law" | "declining";
  events: UserEvent[];
  meta: {
    totalUsers: number;
    totalEvents: number;
    dateRange: { start: string; end: string };
    hasRevenue: boolean;
  };
}

// ── Cohort Analysis types ───────────────────────────────────

/** A single cohort defined by its first-activity month */
export interface Cohort {
  /** Cohort label, e.g. "Jan 2010" */
  label: string;
  /** ISO month string, e.g. "2010-01" */
  month: string;
  /** Number of users who first appeared in this month */
  size: number;
  /** User IDs in this cohort (omitted in pre-computed results to save space) */
  userIds?: string[];
}

/** Retention table: rows = cohorts, columns = periods (Month 0, 1, 2, ...) */
export interface RetentionTable {
  cohorts: Cohort[];
  /** retention[i][j] = fraction of cohort i active in period j (0-1) */
  retention: number[][];
  /** Absolute counts: counts[i][j] = number of users active */
  counts: number[][];
  /** Maximum number of periods across all cohorts */
  maxPeriods: number;
}

/** Revenue retention table (can exceed 100% due to expansion) */
export interface RevenueRetentionTable {
  cohorts: Cohort[];
  /** revenueRetention[i][j] = ratio of cohort i's revenue in period j vs period 0 */
  revenueRetention: number[][];
  /** Absolute revenue: revenue[i][j] = total revenue */
  revenue: number[][];
  maxPeriods: number;
}

/** A single point on a retention curve */
export interface RetentionCurvePoint {
  period: number;
  retention: number;
}

/** Retention curve for one cohort */
export interface RetentionCurve {
  cohortLabel: string;
  cohortMonth: string;
  points: RetentionCurvePoint[];
}

// ── LTV types ───────────────────────────────────────────────

export interface LTVCurvePoint {
  period: number;
  cumulativeLtv: number;
}

export interface LTVCurve {
  cohortLabel: string;
  cohortMonth: string;
  points: LTVCurvePoint[];
}

// ── Power User Curve (L30) ──────────────────────────────────

export interface PowerUserBucket {
  /** Number of active days (1-30) */
  activeDays: number;
  /** Number of users with this many active days */
  userCount: number;
  /** Percentage of total users */
  percentage: number;
}

export interface PowerUserDistribution {
  month: string;
  label: string;
  buckets: PowerUserBucket[];
  totalUsers: number;
}

// ── Growth Accounting types ─────────────────────────────────

export interface GrowthAccountingMonth {
  month: string;
  label: string;
  /** Total active users this month */
  mau: number;
  /** Users active this month, first seen this month */
  newUsers: number;
  /** Users active this month and last month */
  retainedUsers: number;
  /** Users active this month, not last month, but seen before */
  resurrectedUsers: number;
  /** Users active last month but not this month (shown as negative) */
  churnedUsers: number;
}

export interface QuickRatioData {
  month: string;
  label: string;
  quickRatio: number;
  gains: number; // new + resurrected
  losses: number; // churned
}

export interface RetentionRateData {
  month: string;
  label: string;
  grossRetentionRate: number; // retained / previous MAU
  netChurnRate: number; // churned / previous MAU
}

export interface CMGRData {
  month: string;
  label: string;
  mau: number;
  momGrowth: number;
  cmgr3: number | null;
  cmgr6: number | null;
  cmgr12: number | null;
}

// ── DAU Forecasting types ───────────────────────────────────

export interface DayNRetentionRow {
  cohortDate: string;
  cohortLabel: string;
  cohortSize: number;
  /** dayRetention[n] = fraction retained on day n */
  dayRetention: number[];
}

export interface DAUForecastPoint {
  date: string;
  /** Total forecasted DAU */
  totalDAU: number;
  /** Contribution from each cohort */
  cohortContributions: { cohortDate: string; dau: number }[];
}

export interface WhatIfParams {
  /** New users per day */
  dailyNewUsers: number;
  /** Retention curve multiplier (1 = baseline) */
  retentionMultiplier: number;
  /** Number of days to forecast */
  forecastDays: number;
}

// ── Pre-computed Results (Explore mode) ─────────────────────

/** All analytics pre-computed at build time for a dataset */
export interface PrecomputedResults {
  id: string;
  name: string;
  description: string;
  archetype: "healthy" | "power-law" | "declining";
  meta: Dataset["meta"];

  // Cohort analysis
  retentionTable: RetentionTable;
  retentionCurves: RetentionCurve[];
  averageRetentionCurve: RetentionCurvePoint[];

  // Growth accounting
  growthData: GrowthAccountingMonth[];
  quickRatioData: QuickRatioData[];
  retentionRates: RetentionRateData[];
  cmgrData: CMGRData[];

  // Forecasting
  dayNRetention: DayNRetentionRow[];
  dauRetentionCurve: number[];
}

// ── Lesson / Learn Mode types ───────────────────────────────

export interface LessonStep {
  title: string;
  content: string; // Markdown-compatible text
  /** Chart annotation config for this step */
  annotation?: ChartAnnotation;
  /** Aha moment callout (if any) */
  ahaInsight?: string;
}

export interface ChartAnnotation {
  type: "highlight-row" | "highlight-cell" | "highlight-column" | "arrow" | "region" | "none";
  /** Target indices or identifiers */
  target?: {
    row?: number;
    col?: number;
    rows?: number[];
    cols?: number[];
  };
  /** Label to show near the annotation */
  label?: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  moduleId: string;
  moduleTitle: string;
  steps: LessonStep[];
  chartType: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

// ── Progress tracking ───────────────────────────────────────

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  currentStep: number;
  lastVisited: string; // ISO date
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  exploreUnlocked: boolean;
}
