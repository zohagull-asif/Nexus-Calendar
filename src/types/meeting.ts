// src/types/meeting.ts
export type MeetingStatus = "pending" | "confirmed" | "declined";

export interface MeetingEvent {
  id: string;
  title: string;
  start: string;  // ISO date-time
  end?: string;   // ISO date-time optional
  status: MeetingStatus;
  createdBy?: string;
  attendee?: string;
}
