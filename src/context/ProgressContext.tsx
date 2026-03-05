"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import posthog from "posthog-js";
import type { UserProgress, LessonProgress } from "@/engine/types";

const STORAGE_KEY = "cohort-analyser-progress";
const TOTAL_LESSONS = 12;

const DEFAULT_PROGRESS: UserProgress = {
  lessons: {},
  exploreUnlocked: false,
};

interface ProgressContextValue {
  progress: UserProgress;
  markStepViewed: (lessonId: string, step: number) => void;
  markLessonCompleted: (lessonId: string) => void;
  getLessonProgress: (lessonId: string) => LessonProgress | null;
  isLessonCompleted: (lessonId: string) => boolean;
  completedLessonsCount: number;
  isExploreUnlocked: boolean;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function loadProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_PROGRESS;
}

function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);

  // Load from localStorage on mount
  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  const markStepViewed = useCallback(
    (lessonId: string, step: number) => {
      updateProgress((prev) => {
        const existing = prev.lessons[lessonId];
        const updated: LessonProgress = {
          lessonId,
          completed: existing?.completed ?? false,
          currentStep: Math.max(step, existing?.currentStep ?? 0),
          lastVisited: new Date().toISOString(),
        };
        return { ...prev, lessons: { ...prev.lessons, [lessonId]: updated } };
      });
    },
    [updateProgress]
  );

  const markLessonCompleted = useCallback(
    (lessonId: string) => {
      updateProgress((prev) => {
        const existing = prev.lessons[lessonId];
        const updated: LessonProgress = {
          lessonId,
          completed: true,
          currentStep: existing?.currentStep ?? 0,
          lastVisited: new Date().toISOString(),
        };
        const newLessons = { ...prev.lessons, [lessonId]: updated };
        const completedCount = Object.values(newLessons).filter((l) => l.completed).length;
        const justUnlocked = !prev.exploreUnlocked && completedCount >= TOTAL_LESSONS;
        if (justUnlocked) {
          posthog.capture("explore_unlocked", { total_learn_time_seconds: 0 });
        }
        return {
          lessons: newLessons,
          exploreUnlocked: completedCount >= TOTAL_LESSONS,
        };
      });
    },
    [updateProgress]
  );

  const getLessonProgress = useCallback(
    (lessonId: string): LessonProgress | null => {
      return progress.lessons[lessonId] ?? null;
    },
    [progress]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string): boolean => {
      return progress.lessons[lessonId]?.completed ?? false;
    },
    [progress]
  );

  const completedLessonsCount = Object.values(progress.lessons).filter((l) => l.completed).length;

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    saveProgress(DEFAULT_PROGRESS);
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markStepViewed,
        markLessonCompleted,
        getLessonProgress,
        isLessonCompleted,
        completedLessonsCount,
        isExploreUnlocked: progress.exploreUnlocked,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
