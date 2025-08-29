// src/utils/storage.ts
import type { MeetingEvent } from "../types/meeting";

const KEY = "nexus-events-v1";

export function loadEvents(): MeetingEvent[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MeetingEvent[]) : [];
  } catch {
    return [];
  }
}

export function saveEvents(events: MeetingEvent[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(events));
    // trigger storage event for other tabs/components
    window.dispatchEvent(new Event("storage"));
  } catch {}
}
