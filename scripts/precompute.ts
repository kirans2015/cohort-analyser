/**
 * Build-time pre-computation script.
 *
 * Reads raw Dataset JSONs, runs all engine analytics, and writes
 * compact .computed.json files for the Explore page.
 *
 * Usage: npx tsx scripts/precompute.ts
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Engine imports (relative paths — tsx doesn't resolve tsconfig @/* aliases)
import type { Dataset, PrecomputedResults } from "../src/engine/types";
import { computeRetentionTable, extractRetentionCurves, computeAverageRetentionCurve } from "../src/engine/cohorts";
import { computeGrowthAccounting, computeQuickRatio, computeRetentionRates, computeCMGR } from "../src/engine/growth-accounting";
import { computeDayNRetention, computeAverageDayNRetention } from "../src/engine/forecasting";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = resolve(__dirname, "..");

const DATASETS: { id: string; path: string }[] = [
  { id: "ecommerce", path: "public/data/ecommerce.json" },
  { id: "declining-product", path: "public/data/declining-product.json" },
  { id: "hm-fashion", path: "raw-data/hm-fashion.json" },
];

/** JSON.stringify replacer: Infinity → "__Infinity__" */
function replacer(_key: string, value: unknown): unknown {
  if (value === Infinity) return "__Infinity__";
  if (value === -Infinity) return "__-Infinity__";
  return value;
}

function precompute(dataset: Dataset): PrecomputedResults {
  const { events } = dataset;

  // Cohort analysis
  const retentionTable = computeRetentionTable(events);
  const retentionCurves = extractRetentionCurves(retentionTable);
  const averageRetentionCurve = computeAverageRetentionCurve(retentionTable);

  // Growth accounting
  const growthData = computeGrowthAccounting(events);
  const quickRatioData = computeQuickRatio(growthData);
  const retentionRates = computeRetentionRates(growthData);
  const cmgrData = computeCMGR(growthData);

  // Forecasting
  const dayNRetention = computeDayNRetention(events, 90);
  const dauRetentionCurve = computeAverageDayNRetention(dayNRetention);

  // Strip userIds from cohorts to save space
  for (const cohort of retentionTable.cohorts) {
    delete cohort.userIds;
  }

  return {
    id: dataset.id,
    name: dataset.name,
    description: dataset.description,
    archetype: dataset.archetype,
    meta: dataset.meta,
    retentionTable,
    retentionCurves,
    averageRetentionCurve,
    growthData,
    quickRatioData,
    retentionRates,
    cmgrData,
    dayNRetention,
    dauRetentionCurve,
  };
}

// ── Main ──────────────────────────────────────────────────────

console.log("Pre-computing analytics for Explore mode...\n");

for (const { id, path } of DATASETS) {
  const fullPath = resolve(PROJECT_DIR, path);

  if (!existsSync(fullPath)) {
    console.log(`⚠  Skipping ${id} — source not found: ${path}`);
    continue;
  }

  console.log(`Processing ${id}...`);
  const raw = readFileSync(fullPath, "utf-8");
  const dataset: Dataset = JSON.parse(raw);

  const results = precompute(dataset);

  const outPath = resolve(PROJECT_DIR, "public/data", `${id}.computed.json`);
  const json = JSON.stringify(results, replacer);
  writeFileSync(outPath, json);

  const sizeKB = (Buffer.byteLength(json) / 1024).toFixed(1);
  console.log(`  ✓ ${outPath} (${sizeKB} KB)`);
}

console.log("\nDone!");
