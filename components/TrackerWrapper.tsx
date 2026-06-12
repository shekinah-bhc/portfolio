"use client";

import { useVisitTracker } from "@/hooks/useVisitTracker";

export function TrackerWrapper() {
  useVisitTracker();
  return null;
}
