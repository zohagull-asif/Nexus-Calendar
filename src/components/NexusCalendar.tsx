// src/components/NexusCalendar.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { v4 as uuid } from "uuid";
import type { MeetingEvent, MeetingStatus } from "../types/meeting";
import { loadEvents, saveEvents } from "../utils/storage";
import type { DateSelectArg, EventClickArg, EventContentArg } from "@fullcalendar/core";

const NexusCalendar: React.FC = () => {
  const [events, setEvents] = useState<MeetingEvent[]>(() => loadEvents());
  const [selected, setSelected] = useState<MeetingEvent | null>(null);

  // persist helper
  const persist = useCallback((next: MeetingEvent[]) => {
    setEvents(next);
    saveEvents(next);
  }, []);

  // react to external storage events (useful if multiple tabs)
  useEffect(() => {
    const onStorage = () => setEvents(loadEvents());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSelect = useCallback((selectInfo: DateSelectArg) => {
    // unselect to clear the UI
    selectInfo.view.calendar.unselect();

    const title = window.prompt("Enter meeting title (e.g. Intro call):");
    if (!title) return;

    const startISO = selectInfo.startStr;
    const endISO = selectInfo.endStr || new Date(selectInfo.start.getTime() + 60 * 60 * 1000).toISOString();

    const newEvent: MeetingEvent = {
      id: uuid(),
      title,
      start: startISO,
      end: endISO,
      status: "pending",
    };

    persist([...events, newEvent]);
  }, [events, persist]);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    const id = String(clickInfo.event.id);
    const ev = events.find((e) => e.id === id) ?? null;
    setSelected(ev);
  }, [events]);

  const updateStatus = useCallback((id: string, status: MeetingStatus) => {
    persist(events.map((e) => (e.id === id ? { ...e, status } : e)));
  }, [events, persist]);

  const deleteEvent = useCallback((id: string) => {
    persist(events.filter((e) => e.id !== id));
  }, [events, persist]);

  const joinVideo = useCallback((id: string) => {
    // simple Jitsi meeting url using id to differentiate rooms
    const room = `NexusMeeting-${id}`;
    window.open(`https://meet.jit.si/${room}`, "_blank");
  }, []);

  const eventContent = useCallback((arg: EventContentArg) => {
    const id = String(arg.event.id);
    const ev = events.find((e) => e.id === id);
    const status = ev?.status ?? "pending";
    const badge =
      status === "confirmed" ? "bg-green-100 text-green-800 px-2 rounded text-xs" :
      status === "declined"  ? "bg-red-100 text-red-800 px-2 rounded text-xs" :
                               "bg-yellow-100 text-yellow-800 px-2 rounded text-xs";

    return (
      <div className="flex items-center gap-2">
        <span className={badge}>{status}</span>
        <span className="fc-event-title">{arg.event.title}</span>
      </div>
    );
  }, [events]);

  const plugins = useMemo(() => [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin], []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Scheduler</h2>
        <p className="text-sm text-gray-500">Drag/select to create a slot. Click an event for actions.</p>
      </div>

      <FullCalendar
        plugins={plugins}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        initialView="timeGridWeek"
        selectable={true}
        selectMirror={true}
        select={handleSelect}
        eventClick={handleEventClick}
        events={events.map(e => ({
          id: e.id,
          title: e.title,
          start: e.start,
          end: e.end,
          extendedProps: { status: e.status }
        }))}
        eventContent={eventContent}
        nowIndicator={true}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
      />

      {/* Simple Modal (no external UI lib) */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-2">{selected.title}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {new Date(selected.start).toLocaleString()}{" "}
              {selected.end ? ` - ${new Date(selected.end).toLocaleString()}` : ""}
            </p>
            <p className="mb-4">Status: <strong>{selected.status}</strong></p>

            <div className="flex flex-col gap-2">
              <button
                className="px-3 py-2 bg-green-600 text-white rounded"
                onClick={() => { updateStatus(selected.id, "confirmed"); setSelected(null); }}
              >
                ✅ Confirm
              </button>

              <button
                className="px-3 py-2 bg-red-600 text-white rounded"
                onClick={() => { updateStatus(selected.id, "declined"); setSelected(null); }}
              >
                ❌ Decline
              </button>

              <button
                className="px-3 py-2 bg-blue-600 text-white rounded"
                onClick={() => joinVideo(selected.id)}
              >
                📹 Join Video Call
              </button>

              <button
                className="px-3 py-2 bg-gray-500 text-white rounded"
                onClick={() => { deleteEvent(selected.id); setSelected(null); }}
              >
                🗑 Delete
              </button>

              <button
                className="px-3 py-2 border rounded mt-2"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NexusCalendar;
