import type { UserEvent, LTVCurve, LTVCurvePoint, Cohort } from "./types";
import { getMonth, monthRange, groupBy } from "./utils";
import { assignCohorts } from "./cohorts";

/**
 * Compute cumulative LTV curves per cohort.
 * LTV at period N = sum of average revenue per user from period 0 to N.
 */
export function computeLTVCurves(events: UserEvent[]): LTVCurve[] {
  const revenueEvents = events.filter((e) => e.revenue != null && e.revenue > 0);
  if (revenueEvents.length === 0) return [];

  const cohorts = assignCohorts(events);

  // Build user → month → total revenue lookup
  const userMonthRevenue: Record<string, Record<string, number>> = {};
  for (const event of revenueEvents) {
    const month = getMonth(event.date);
    if (!userMonthRevenue[event.userId]) userMonthRevenue[event.userId] = {};
    userMonthRevenue[event.userId][month] =
      (userMonthRevenue[event.userId][month] || 0) + event.revenue!;
  }

  // Find last month in data
  const allMonths = revenueEvents.map((e) => getMonth(e.date)).sort();
  const lastMonth = allMonths[allMonths.length - 1];

  return cohorts.map((cohort) => {
    const months = monthRange(cohort.month, lastMonth);
    let cumulative = 0;
    const points: LTVCurvePoint[] = [];

    for (let p = 0; p < months.length; p++) {
      let periodRevenue = 0;
      for (const userId of cohort.userIds!) {
        periodRevenue += userMonthRevenue[userId]?.[months[p]] || 0;
      }
      // Average revenue per user (divided by cohort size, not active users)
      const avgRevenuePerUser = cohort.size > 0 ? periodRevenue / cohort.size : 0;
      cumulative += avgRevenuePerUser;

      points.push({
        period: p,
        cumulativeLtv: Math.round(cumulative * 100) / 100,
      });
    }

    return {
      cohortLabel: cohort.label,
      cohortMonth: cohort.month,
      points,
    };
  });
}
