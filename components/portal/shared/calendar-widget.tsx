'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import type { CalendarEvent } from '@/lib/portal/types';

interface CalendarWidgetProps {
  events: CalendarEvent[];
}

const eventTypeDot: Record<CalendarEvent['type'], string> = {
  test: 'bg-destructive',
  class: 'bg-primary',
  assignment: 'bg-warning',
  event: 'bg-accent',
};

export function CalendarWidget({ events }: CalendarWidgetProps) {
  const [selected, setSelected] = useState<Date | undefined>(new Date('2025-08-02'));

  const eventDates = new Map<string, CalendarEvent[]>();
  events.forEach((ev) => {
    const key = ev.date;
    if (!eventDates.has(key)) eventDates.set(key, []);
    eventDates.get(key)!.push(ev);
  });

  const modifiers = {
    hasEvent: (date: Date) => eventDates.has(date.toISOString().split('T')[0]),
  };

  const modifiersClassNames = {
    hasEvent: 'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary',
  };

  const selectedEvents = selected
    ? eventDates.get(selected.toISOString().split('T')[0]) ?? []
    : [];
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date('2025-08-02'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div>
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className="rounded-lg"
        initialFocus
      />

      <div className="mt-3 border-t border-border pt-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {selectedEvents.length > 0
            ? `Events on ${(selected as Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
            : 'Upcoming Events'}
        </p>
        <div className="space-y-2">
          {(selectedEvents.length > 0 ? selectedEvents : upcomingEvents).map((ev) => (
            <div key={ev.id} className="flex items-center gap-2 rounded-lg border border-border p-2">
              <span className={cn('h-2 w-2 shrink-0 rounded-full', eventTypeDot[ev.type])} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">{ev.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {ev.time && ` · ${ev.time}`}
                </p>
              </div>
            </div>
          ))}
          {selectedEvents.length === 0 && upcomingEvents.length === 0 && (
            <p className="text-xs text-muted-foreground">No upcoming events</p>
          )}
        </div>
      </div>
    </div>
  );
}
