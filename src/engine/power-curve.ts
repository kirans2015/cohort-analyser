import type { UserEvent, PowerUserBucket, PowerUserDistribution } from "./types";
import { getMonth, monthLabel, unique } from "./utils";

/**
 * Compute the L30 Power User Curve for a given month.
 * Groups users by how many unique days they were active in a 30-day period.
 *
 * The distribution reveals user engagement:
 * - Heavy left skew (most at 1-2 days) = casual, low engagement
 * - Fat right tail (users at 20+ days) = power users, strong habit
 * - Bimodal = distinct casual and power segments
 */
export function computePowerUserDistribution(
  events: UserEvent[],
  targetMonth: string
): PowerUserDistribution {
  // Get all events in the target month
  const monthEvents = events.filter((e) => getMonth(e.date) === targetMonth);

  // Count unique active days per user in this month
  const userActiveDays: Record<string, Set<string>> = {};
  for (const event of monthEvents) {
    if (!userActiveDays[event.userId]) {
      userActiveDays[event.userId] = new Set();
    }
    userActiveDays[event.userId].add(event.date);
  }

  const totalUsers = Object.keys(userActiveDays).length;

  // Create buckets for 1-30 active days
  const bucketCounts: number[] = new Array(30).fill(0);
  for (const days of Object.values(userActiveDays)) {
    const count = Math.min(days.size, 30);
    bucketCounts[count - 1]++;
  }

  const buckets: PowerUserBucket[] = bucketCounts.map((count, i) => ({
    activeDays: i + 1,
    userCount: count,
    percentage: totalUsers > 0 ? count / totalUsers : 0,
  }));

  return {
    month: targetMonth,
    label: monthLabel(targetMonth),
    buckets,
    totalUsers,
  };
}

/**
 * Get available months for power curve analysis.
 */
export function getAvailableMonths(events: UserEvent[]): string[] {
  const months = unique(events.map((e) => getMonth(e.date)));
  return months.sort();
}
