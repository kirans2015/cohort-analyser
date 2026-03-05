"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LessonStep } from "@/engine/types";
import { useProgress } from "@/context/ProgressContext";
import { useTrack } from "@/analytics/useTrack";

interface LessonLayoutProps {
  lessonId: string;
  moduleId: string;
  lessonTitle: string;
  steps: LessonStep[];
  /** The chart component, receiving the current step's annotation */
  chart: (step: LessonStep, stepIndex: number) => ReactNode;
  /** URL for next lesson */
  nextLessonUrl?: string;
  nextLessonTitle?: string;
}

export function LessonLayout({
  lessonId,
  moduleId,
  lessonTitle,
  steps,
  chart,
  nextLessonUrl,
  nextLessonTitle,
}: LessonLayoutProps) {
  const { markStepViewed, markLessonCompleted, getLessonProgress } = useProgress();
  const { track } = useTrack();

  const savedProgress = getLessonProgress(lessonId);
  const isFirstVisit = !savedProgress;
  const [currentStep, setCurrentStep] = useState(savedProgress?.currentStep ?? 0);
  const [lessonStartTime] = useState(() => Date.now());

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    markStepViewed(lessonId, currentStep);
    track("lesson_step_viewed", {
      module: moduleId,
      lesson: lessonId,
      step: step.title,
      step_number: currentStep + 1,
      total_steps: steps.length,
    });
  }, [currentStep, lessonId, moduleId, step.title, steps.length, markStepViewed, track]);

  // Track lesson_started once on mount
  useEffect(() => {
    track("lesson_started", {
      module: moduleId,
      lesson: lessonId,
      is_first_visit: isFirstVisit,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = useCallback(() => {
    if (isLastStep) {
      track("lesson_completed", {
        module: moduleId,
        lesson: lessonId,
        time_spent_seconds: Math.round((Date.now() - lessonStartTime) / 1000),
      });
      markLessonCompleted(lessonId);
      if (nextLessonUrl) {
        window.location.href = nextLessonUrl;
      }
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [isLastStep, lessonId, moduleId, lessonStartTime, nextLessonUrl, markLessonCompleted, track]);

  const goPrev = useCallback(() => {
    if (!isFirstStep) setCurrentStep((s) => s - 1);
  }, [isFirstStep]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-4rem)]">
      {/* Left pane: lesson text */}
      <div className="w-full lg:w-[40%] p-6 lg:p-8 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-8 bg-primary"
                  : i < currentStep
                    ? "w-4 bg-primary/40"
                    : "w-4 bg-muted"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            {currentStep + 1} / {steps.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">{step.title}</h2>

            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
              {step.content.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Aha Insight */}
            {step.ahaInsight && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 rounded-lg border border-emerald/20 bg-emerald/5"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-emerald mb-1">Key Insight</p>
                    <p className="text-sm text-muted-foreground">{step.ahaInsight}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation — sticky on mobile */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-border sticky bottom-0 bg-background pb-4 lg:static lg:pb-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={goPrev}
            disabled={isFirstStep}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            size="sm"
            onClick={goNext}
            className="gap-1"
          >
            {isLastStep ? (
              nextLessonUrl ? (
                <>
                  <span className="hidden sm:inline">Next: {nextLessonTitle}</span>
                  <span className="sm:hidden">Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                "Complete Lesson"
              )
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Right pane: chart */}
      <div className="w-full lg:w-[60%] p-4 lg:p-8 flex items-center justify-center bg-background min-h-[350px] lg:min-h-0">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`chart-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {chart(step, currentStep)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
