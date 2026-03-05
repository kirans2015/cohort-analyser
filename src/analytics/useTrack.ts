"use client";

import { useCallback } from "react";
import posthog from "posthog-js";
import type { EventName, EventProperties } from "./events";

export function useTrack() {
  const track = useCallback(
    <T extends EventName>(eventName: T, properties: EventProperties<T>) => {
      if (typeof window !== "undefined" && posthog.__loaded) {
        posthog.capture(eventName, properties);
      }
    },
    []
  );

  return { track };
}
