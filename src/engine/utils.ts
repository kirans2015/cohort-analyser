import { format, parse, differenceInMonths, differenceInDays, addMonths, addDays, startOfMonth } from "date-fns";

/** Parse an ISO date string to a Date object */
export function parseDate(dateStr: string): Date {
  return parse(dateStr, "yyyy-MM-dd", new Date());
}

/** Format a Date to YYYY-MM-DD */
export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/** Format a Date to YYYY-MM */
export function formatMonth(date: Date): string {
  return format(date, "yyyy-MM");
}

/** Format a month string (YYYY-MM) to a display label like "Jan 2010" */
export function monthLabel(monthStr: string): string {
  const date = parse(monthStr + "-01", "yyyy-MM-dd", new Date());
  return format(date, "MMM yyyy");
}

/** Get the month string (YYYY-MM) from a date string */
export function getMonth(dateStr: string): string {
  return dateStr.slice(0, 7);
}

/** Get the start-of-month Date from a date string */
export function getMonthStart(dateStr: string): Date {
  return startOfMonth(parseDate(dateStr));
}

/** Calculate the number of months between two month strings */
export function monthsBetween(fromMonth: string, toMonth: string): number {
  const from = parse(fromMonth + "-01", "yyyy-MM-dd", new Date());
  const to = parse(toMonth + "-01", "yyyy-MM-dd", new Date());
  return differenceInMonths(to, from);
}

/** Calculate the number of days between two date strings */
export function daysBetween(fromDate: string, toDate: string): number {
  return differenceInDays(parseDate(toDate), parseDate(fromDate));
}

/** Add N months to a month string, return new month string */
export function addMonthsToMonth(monthStr: string, n: number): string {
  const date = parse(monthStr + "-01", "yyyy-MM-dd", new Date());
  return formatMonth(addMonths(date, n));
}

/** Add N days to a date string, return new date string */
export function addDaysToDate(dateStr: string, n: number): string {
  return formatDate(addDays(parseDate(dateStr), n));
}

/** Generate a range of month strings from start to end (inclusive) */
export function monthRange(startMonth: string, endMonth: string): string[] {
  const months: string[] = [];
  let current = startMonth;
  while (current <= endMonth) {
    months.push(current);
    current = addMonthsToMonth(current, 1);
  }
  return months;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Round to N decimal places */
export function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Format a number as a percentage string */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${round(value * 100, decimals)}%`;
}

/** Format a number with commas */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** Format currency */
export function formatCurrency(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Get unique values from an array */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Group an array by a key function */
export function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}
