import type {
  UserEvent,
  Cohort,
  RetentionTable,
  RevenueRetentionTable,
  RetentionCurve,
  RetentionCurvePoint,
} from "./types";
import { getMonth, monthLabel, monthsBetween, monthRange, groupBy } from "./utils";

// ── Cohort Assignment ───────────────────────────────────────

/**
 * Assign each user to a cohort based on their first activity month.
 * Returns cohorts sorted chronologically.
 */
export function assignCohorts(events: UserEvent[]): Cohort[] {
  // Find each user's first active month
  const userFirstMonth: Record<string, string> = {};
  for (const event of events) {
    const month = getMonth(event.date);
    if (!userFirstMonth[event.userId] || month < userFirstMonth[event.userId]) {
      userFirstMonth[event.userId] = month;
    }
  }

  // Group users by first month
  const cohortMap: Record<string, string[]> = {};
  for (const [userId, month] of Object.entries(userFirstMonth)) {
    if (!cohortMap[month]) cohortMap[month] = [];
    cohortMap[month].push(userId);
  }

  // Build sorted cohort objects
  const months = Object.keys(cohortMap).sort();
  return months.map((month) => ({
    label: monthLabel(month),
    month,
    size: cohortMap[month].length,
    userIds: cohortMap[month],
  }));
}

// ── Retention Table ─────────────────────────────────────────

/**
 * Compute a monthly retention table from raw events.
 *
 * retention[i][j] = fraction of cohort i that was active in period j
 * where period 0 = cohort month, period 1 = cohort month + 1, etc.
 */
export function computeRetentionTable(events: UserEvent[]): RetentionTable {
  const cohorts = assignCohorts(events);
  if (cohorts.length === 0) {
    return { cohorts: [], retention: [], counts: [], maxPeriods: 0 };
  }

  // Build a lookup: userId → Set of active months
  const userActiveMonths: Record<string, Set<string>> = {};
  for (const event of events) {
    const month = getMonth(event.date);
    if (!userActiveMonths[event.userId]) {
      userActiveMonths[event.userId] = new Set();
    }
    userActiveMonths[event.userId].add(month);
  }

  // Find the latest month in the data
  const allMonths = Object.values(userActiveMonths).flatMap((s) => [...s]);
  const lastMonth = allMonths.sort().pop()!;

  // Compute retention matrix
  const retention: number[][] = [];
  const counts: number[][] = [];
  let maxPeriods = 0;

  for (const cohort of cohorts) {
    const numPeriods = monthsBetween(cohort.month, lastMonth) + 1;
    maxPeriods = Math.max(maxPeriods, numPeriods);

    const cohortRetention: number[] = [];
    const cohortCounts: number[] = [];

    for (let p = 0; p < numPeriods; p++) {
      const targetMonth = monthRange(cohort.month, lastMonth)[p];
      let activeCount = 0;

      for (const userId of cohort.userIds!) {
        if (userActiveMonths[userId]?.has(targetMonth)) {
          activeCount++;
        }
      }

      cohortCounts.push(activeCount);
      cohortRetention.push(cohort.size > 0 ? activeCount / cohort.size : 0);
    }

    retention.push(cohortRetention);
    counts.push(cohortCounts);
  }

  return { cohorts, retention, counts, maxPeriods };
}

// ── Revenue Retention Table ─────────────────────────────────

/**
 * Compute revenue retention table. Unlike user retention, this can exceed 100%
 * if users spend more in later months (expansion revenue).
 */
export function computeRevenueRetentionTable(events: UserEvent[]): RevenueRetentionTable {
  const cohorts = assignCohorts(events);
  if (cohorts.length === 0) {
    return { cohorts: [], revenueRetention: [], revenue: [], maxPeriods: 0 };
  }

  // Build lookup: userId → month → total revenue
  const userMonthRevenue: Record<string, Record<string, number>> = {};
  for (const event of events) {
    if (event.revenue == null) continue;
    const month = getMonth(event.date);
    if (!userMonthRevenue[event.userId]) {
      userMonthRevenue[event.userId] = {};
    }
    userMonthRevenue[event.userId][month] =
      (userMonthRevenue[event.userId][month] || 0) + event.revenue;
  }

  const allMonths = events.map((e) => getMonth(e.date));
  const lastMonth = allMonths.sort().pop()!;

  const revenueRetention: number[][] = [];
  const revenue: number[][] = [];
  let maxPeriods = 0;

  for (const cohort of cohorts) {
    const months = monthRange(cohort.month, lastMonth);
    const numPeriods = months.length;
    maxPeriods = Math.max(maxPeriods, numPeriods);

    const cohortRevRetention: number[] = [];
    const cohortRevenue: number[] = [];

    // Period 0 revenue (baseline)
    let baseRevenue = 0;
    for (const userId of cohort.userIds!) {
      baseRevenue += userMonthRevenue[userId]?.[cohort.month] || 0;
    }

    for (let p = 0; p < numPeriods; p++) {
      let periodRevenue = 0;
      for (const userId of cohort.userIds!) {
        periodRevenue += userMonthRevenue[userId]?.[months[p]] || 0;
      }

      cohortRevenue.push(Math.round(periodRevenue * 100) / 100);
      cohortRevRetention.push(baseRevenue > 0 ? periodRevenue / baseRevenue : 0);
    }

    revenueRetention.push(cohortRevRetention);
    revenue.push(cohortRevenue);
  }

  return { cohorts, revenueRetention, revenue, maxPeriods };
}

// ── Retention Curves ────────────────────────────────────────

/**
 * Extract retention curves for each cohort from a retention table.
 * Each curve is a series of (period, retention) points.
 */
export function extractRetentionCurves(table: RetentionTable): RetentionCurve[] {
  return table.cohorts.map((cohort, i) => ({
    cohortLabel: cohort.label,
    cohortMonth: cohort.month,
    points: table.retention[i].map(
      (ret, period): RetentionCurvePoint => ({
        period,
        retention: ret,
      })
    ),
  }));
}

/**
 * Compute the average retention curve across all cohorts.
 */
export function computeAverageRetentionCurve(table: RetentionTable): RetentionCurvePoint[] {
  const points: RetentionCurvePoint[] = [];

  for (let p = 0; p < table.maxPeriods; p++) {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < table.cohorts.length; i++) {
      if (p < table.retention[i].length) {
        sum += table.retention[i][p];
        count++;
      }
    }

    if (count > 0) {
      points.push({ period: p, retention: sum / count });
    }
  }

  return points;
}
