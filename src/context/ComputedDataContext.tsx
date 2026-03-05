"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { PrecomputedResults } from "@/engine/types";

interface ComputedDataContextValue {
  data: PrecomputedResults | null;
  datasetId: string | null;
  loading: boolean;
  error: string | null;
  loadComputedData: (id: string) => Promise<void>;
}

const ComputedDataContext = createContext<ComputedDataContextValue | null>(null);

/** JSON reviver: "__Infinity__" → Infinity (from precompute script) */
function reviver(_key: string, value: unknown): unknown {
  if (value === "__Infinity__") return Infinity;
  if (value === "__-Infinity__") return -Infinity;
  return value;
}

export function ComputedDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PrecomputedResults | null>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComputedData = useCallback(async (id: string) => {
    if (id === datasetId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/data/${id}.computed.json`);
      if (!res.ok) throw new Error(`Failed to load computed data: ${id}`);
      const text = await res.text();
      const parsed: PrecomputedResults = JSON.parse(text, reviver);
      setData(parsed);
      setDatasetId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [datasetId]);

  return (
    <ComputedDataContext.Provider value={{ data, datasetId, loading, error, loadComputedData }}>
      {children}
    </ComputedDataContext.Provider>
  );
}

export function useComputedData() {
  const ctx = useContext(ComputedDataContext);
  if (!ctx) throw new Error("useComputedData must be used within a ComputedDataProvider");
  return ctx;
}
