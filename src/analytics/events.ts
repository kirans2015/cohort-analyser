/** Typed PostHog event definitions */

export type AnalyticsEvent =
  | { name: "lesson_started"; properties: { module: string; lesson: string; is_first_visit: boolean } }
  | { name: "lesson_step_viewed"; properties: { module: string; lesson: string; step: string; step_number: number; total_steps: number } }
  | { name: "lesson_completed"; properties: { module: string; lesson: string; time_spent_seconds: number } }
  | { name: "module_completed"; properties: { module: string; lessons_completed: number; total_time_seconds: number } }
  | { name: "explore_unlocked"; properties: { total_learn_time_seconds: number } }
  | { name: "case_study_selected"; properties: { dataset: string; archetype: string } }
  | { name: "chart_interacted"; properties: { chart_type: string; action: string; module: string; context: "learn" | "explore" } }
  | { name: "chart_annotation_viewed"; properties: { module: string; lesson: string; step: string; annotation_id: string } }
  | { name: "explore_tab_changed"; properties: { dataset: string; tab: string } }
  | { name: "start_learning_clicked"; properties: Record<string, never> };

export type EventName = AnalyticsEvent["name"];
export type EventProperties<T extends EventName> = Extract<AnalyticsEvent, { name: T }>["properties"];
