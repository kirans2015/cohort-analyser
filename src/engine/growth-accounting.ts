import type {
  UserEvent,
  GrowthAccountingMonth,
  QuickRatioData,
  RetentionRateData,
  CMGRData,
} from "./types";
import { getMonth, monthLabel, monthRange, unique } from "./utils";

/**
 * Compute growth accounting decomposition:
 * MAU = New + Retained + Resurrected - Churned
 *
 * - New: First seen this month
 * - Retained: Active this month AND last month
 * - Resurrected: Active this month, NOT last month, but seen before
 * - Churned: Active last month, NOT this month
 */
export function computeGrowthAccounting(events: UserEvent[]): GrowthAccountingMonth[] {
  // Build user → Set<month> lookup
  const userMonths: Record<string, Set<string>> = {};
  const userFirstMonth: Record<string, string> = {};

  for (const event of events) {
    const month = getMonth(event.date);
    if (!userMonths[event.userId]) {
      userMonths[event.userId] = new Set();
      userFirstMonth[event.userId] = month;
    }
    userMonths[event.userId].add(month);
    if (month < userFirstMonth[event.userId]) {
      userFirstMonth[event.userId] = month;
    }
  }

  // Get all months in order
  const allMonths = unique(events.map((e) => getMonth(e.date))).sort();
  if (allMonths.length < 2) return [];

  const results: GrowthAccountingMonth[] = [];

  for (let i = 1; i < allMonths.length; i++) {
    const currentMonth = allMonths[i];
    const prevMonth = allMonths[i - 1];

    // Users active in each month
    const activeThisMonth = new Set<string>();
    const activePrevMonth = new Set<string>();

    for (const [userId, months] of Object.entries(userMonths)) {
      if (months.has(currentMonth)) activeThisMonth.add(userId);
      if (months.has(prevMonth)) activePrevMonth.add(userId);
    }

    let newUsers = 0;
    let retainedUsers = 0;
    let resurrectedUsers = 0;
    let churnedUsers = 0;

    // Classify active users this month
    for (const userId of activeThisMonth) {
      if (userFirstMonth[userId] === currentMonth) {
        newUsers++;
      } else if (activePrevMonth.has(userId)) {
        retainedUsers++;
      } else {
        resurrectedUsers++;
      }
    }

    // Churned = active last month but not this month
    for (const userId of activePrevMonth) {
      if (!activeThisMonth.has(userId)) {
        churnedUsers++;
      }
    }

    results.push({
      month: currentMonth,
      label: monthLabel(currentMonth),
      mau: activeThisMonth.size,
      newUsers,
      retainedUsers,
      resurrectedUsers,
      churnedUsers,
    });
  }

  return results;
}

/**
 * Compute Quick Ratio = (New + Resurrected) / Churned
 * QR > 1 means growth, QR < 1 means decline
 * QR > 4 is exceptional (hypergrowth)
 */
export function computeQuickRatio(growthData: GrowthAccountingMonth[]): QuickRatioData[] {
  return growthData.map((month) => {
    const gains = month.newUsers + month.resurrectedUsers;
    const losses = month.churnedUsers;
    return {
      month: month.month,
      label: month.label,
      quickRatio: losses > 0 ? gains / losses : gains > 0 ? Infinity : 0,
      gains,
      losses,
    };
  });
}

/**
 * Compute Gross Retention Rate and Net Churn Rate
 * GRR = Retained / Previous MAU
 * Net Churn = Churned / Previous MAU
 */
export function computeRetentionRates(
  growthData: GrowthAccountingMonth[]
): RetentionRateData[] {
  const results: RetentionRateData[] = [];

  for (let i = 0; i < growthData.length; i++) {
    const current = growthData[i];
    // Previous MAU = retained + churned (users who were active last month)
    const prevMAU = current.retainedUsers + current.churnedUsers;

    results.push({
      month: current.month,
      label: current.label,
      grossRetentionRate: prevMAU > 0 ? current.retainedUsers / prevMAU : 0,
      netChurnRate: prevMAU > 0 ? current.churnedUsers / prevMAU : 0,
    });
  }

  return results;
}

/**
 * Compute CMGR (Compound Monthly Growth Rate)
 * CMGR(n) = (MAU_end / MAU_start)^(1/n) - 1
 * Provides smoothed growth rate over 3, 6, and 12 month windows.
 */
export function computeCMGR(growthData: GrowthAccountingMonth[]): CMGRData[] {
  return growthData.map((month, i) => {
    const prevMAU = i > 0 ? growthData[i - 1].mau : month.mau;
    const momGrowth = prevMAU > 0 ? (month.mau - prevMAU) / prevMAU : 0;

    const cmgr = (windowSize: number): number | null => {
      if (i < windowSize) return null;
      const startMAU = growthData[i - windowSize].mau;
      if (startMAU <= 0) return null;
      return Math.pow(month.mau / startMAU, 1 / windowSize) - 1;
    };

    return {
      month: month.month,
      label: month.label,
      mau: month.mau,
      momGrowth,
      cmgr3: cmgr(3),
      cmgr6: cmgr(6),
      cmgr12: cmgr(12),
    };
  });
}
