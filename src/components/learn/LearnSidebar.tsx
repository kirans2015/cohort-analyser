"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Circle, ArrowRight, Lock } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { CURRICULUM } from "@/content/curriculum";

export function LearnSidebar() {
  const pathname = usePathname();
  const { isLessonCompleted, isExploreUnlocked, completedLessonsCount } = useProgress();

  return (
    <nav className="w-64 shrink-0 border-r border-border bg-card/50 overflow-y-auto hidden lg:block">
      <div className="p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Learn
        </h2>

        {CURRICULUM.map((module) => (
          <div key={module.id} className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-2">{module.title}</h3>
            <ul className="space-y-1">
              {module.lessons.map((lesson) => {
                const isActive = pathname === lesson.path;
                const completed = isLessonCompleted(lesson.id);

                return (
                  <li key={lesson.id}>
                    <Link
                      href={lesson.path}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : completed
                            ? "text-muted-foreground hover:text-foreground"
                            : "text-muted-foreground/60 hover:text-muted-foreground"
                      }`}
                    >
                      {completed ? (
                        <Check className="w-3.5 h-3.5 text-emerald shrink-0" />
                      ) : isActive ? (
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Explore section */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 px-3 py-2">
            {isExploreUnlocked ? (
              <Link
                href="/explore"
                className="text-sm font-medium text-emerald hover:underline"
              >
                Explore Case Studies →
              </Link>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />
                <span className="text-sm text-muted-foreground/50">
                  Explore ({completedLessonsCount}/12)
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
