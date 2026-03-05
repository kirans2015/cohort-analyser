"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

// PostHog is initialized via instrumentation-client.ts (Next.js 15.3+).
// This provider only wraps children with the React context for usePostHog() hooks.
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
