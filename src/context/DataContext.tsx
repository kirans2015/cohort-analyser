"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Dataset } from "@/engine/types";

interface DataContextValue {
  dataset: Dataset | null;
  datasetId: string | null;
  loading: boolean;
  error: string | null;
  loadDataset: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDataset = useCallback(async (id: string) => {
    if (id === datasetId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/data/${id}.json`);
      if (!res.ok) throw new Error(`Failed to load dataset: ${id}`);
      const data: Dataset = await res.json();
      setDataset(data);
      setDatasetId(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [datasetId]);

  return (
    <DataContext.Provider value={{ dataset, datasetId, loading, error, loadDataset }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataset() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDataset must be used within a DataProvider");
  return ctx;
}
