import type {
  UserEvent,
  DayNRetentionRow,
  DAUForecastPoint,
  WhatIfParams,
} from "./types";
import { groupBy, unique, daysBetween, addDaysToDate } from "./utils";

/**
 * Compute Day-N retention matrix from daily user events.
 * Groups users into weekly cohorts, then calculates what fraction
 * is still active on day 1, 7, 14, 30, 60, 90, etc.
 */
export function computeDayNRetention(
  events: UserEvent[],
  maxDays: number = 90
): DayNRetentionRow[] {
  // Find each user's first active date
  const userFirstDate: Record<string, string> = {};
  const userActiveDates: Record<string, Set<string>> = {};

  for (const event of events) {
    if (!userFirstDate[event.userId] || event.date < userFirstDate[event.userId]) {
      userFirstDate[event.userId] = event.date;
    }
    if (!userActiveDates[event.userId]) {
      userActiveDates[event.userId] = new Set();
    }
    userActiveDates[event.userId].add(event.date);
  }

  // Group users into monthly cohorts by first date
  const cohortUsers: Record<string, string[]> = {};
  for (const [userId, firstDate] of Object.entries(userFirstDate)) {
    const cohortKey = firstDate.slice(0, 7); // YYYY-MM
    if (!cohortUsers[cohortKey]) cohortUsers[cohortKey] = [];
    cohortUsers[cohortKey].push(userId);
  }

  const cohortMonths = Object.keys(cohortUsers).sort();

  return cohortMonths.map((cohortMonth) => {
    const users = cohortUsers[cohortMonth];
    const cohortSize = users.length;

    // For each day offset, calculate retention
    const dayRetention: number[] = [];
    for (let d = 0; d <= maxDays; d++) {
      let activeCount = 0;
      for (const userId of users) {
        const targetDate = addDaysToDate(userFirstDate[userId], d);
        if (userActiveDates[userId].has(targetDate)) {
          activeCount++;
        }
      }
      dayRetention.push(cohortSize > 0 ? activeCount / cohortSize : 0);
    }

    return {
      cohortDate: cohortMonth + "-01",
      cohortLabel: cohortMonth,
      cohortSize,
      dayRetention,
    };
  });
}

/**
 * Compute the average Day-N retention curve across all cohorts.
 * This serves as the baseline for DAU forecasting.
 */
export function computeAverageDayNRetention(rows: DayNRetentionRow[]): number[] {
  if (rows.length === 0) return [];

  const maxDays = Math.max(...rows.map((r) => r.dayRetention.length));
  const avgRetention: number[] = [];

  for (let d = 0; d < maxDays; d++) {
    let sum = 0;
    let count = 0;
    for (const row of rows) {
      if (d < row.dayRetention.length) {
        sum += row.dayRetention[d];
        count++;
      }
    }
    avgRetention.push(count > 0 ? sum / count : 0);
  }

  return avgRetention;
}

/**
 * Forecast DAU using a retention curve and new-user acquisition rate.
 *
 * DAU on day D = sum of (users acquired on day d) * retention(D - d)
 * for all d from 0 to D.
 */
export function forecastDAU(params: WhatIfParams, retentionCurve: number[]): DAUForecastPoint[] {
  const { dailyNewUsers, retentionMultiplier, forecastDays } = params;
  const startDate = "2024-01-01"; // Arbitrary start for forecast
  const points: DAUForecastPoint[] = [];

  for (let day = 0; day < forecastDays; day++) {
    const date = addDaysToDate(startDate, day);
    let totalDAU = 0;
    const contributions: { cohortDate: string; dau: number }[] = [];

    // Sum contributions from all cohorts (day 0 through current day)
    for (let cohortDay = 0; cohortDay <= day; cohortDay++) {
      const age = day - cohortDay;
      const retIdx = Math.min(age, retentionCurve.length - 1);
      const baseRetention = retentionCurve[retIdx] || 0;
      const adjustedRetention = Math.min(1, baseRetention * retentionMultiplier);
      const cohortDAU = Math.round(dailyNewUsers * adjustedRetention);

      if (cohortDAU > 0) {
        const cohortDate = addDaysToDate(startDate, cohortDay);
        contributions.push({ cohortDate, dau: cohortDAU });
        totalDAU += cohortDAU;
      }
    }

    points.push({ date, totalDAU, cohortContributions: contributions });
  }

  return points;
}

/**
 * Get the steady-state DAU given a constant new-user rate and retention curve.
 * Steady-state DAU = dailyNewUsers * sum(retentionCurve)
 */
export function computeSteadyStateDAU(
  dailyNewUsers: number,
  retentionCurve: number[]
): number {
  const retentionSum = retentionCurve.reduce((sum, r) => sum + r, 0);
  return Math.round(dailyNewUsers * retentionSum);
}
