// src/pages/Dashboard.tsx
import React, { useEffect, useMemo, useState } from "react";
import type { MeetingEvent } from "../types/meeting";
import { loadEvents } from "../utils/storage";

export default function Dashboard() {
  const [events, setEvents] = useState<MeetingEvent[]>([]);

  useEffect(() => {
    setEvents(loadEvents());
    const onStorage = () => setEvents(loadEvents());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const pending = useMemo(() => events.filter(e => e.status === "pending"), [events]);
  const confirmed = useMemo(() => events.filter(e => e.status === "confirmed"), [events]);
  const declined = useMemo(() => events.filter(e => e.status === "declined"), [events]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-sm text-gray-500">Pending Requests</div>
          <div className="text-3xl font-bold">{pending.length}</div>
        </div>
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-sm text-gray-500">Confirmed Meetings</div>
          <div className="text-3xl font-bold">{confirmed.length}</div>
        </div>
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-sm text-gray-500">Declined</div>
          <div className="text-3xl font-bold">{declined.length}</div>
        </div>
      </div>

      <div className="p-4 rounded-lg border bg-white">
        <h2 className="text-lg font-semibold mb-2">Upcoming Confirmed</h2>
        {confirmed.length === 0 ? (
          <p className="text-gray-500">No confirmed meetings yet.</p>
        ) : (
          <ul className="space-y-2">
            {confirmed
              .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
              .slice(0, 10)
              .map(e => (
                <li key={e.id} className="flex justify-between">
                  <span className="font-medium">{e.title}</span>
                  <span className="text-gray-600">{new Date(e.start).toLocaleString()}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
