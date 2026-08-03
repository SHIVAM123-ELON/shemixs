'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { cn } from '@/lib/utils';
import { timetable } from '@/lib/portal/data';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

const colorMap: Record<string, string> = {
  primary: 'border-l-primary bg-primary/5',
  secondary: 'border-l-secondary bg-secondary/5',
  accent: 'border-l-accent bg-accent/5',
  success: 'border-l-success bg-success/5',
  warning: 'border-l-warning bg-warning/5',
  'chart-2': 'border-l-chart-2 bg-chart-2/5',
};

export default function TimetablePage() {
  return (
    <>
      <PageHeader title="Timetable" description="Your weekly class schedule at a glance." />

      {/* Desktop View */}
      <div className="hidden overflow-hidden rounded-xl border border-border lg:block">
        <div className="grid grid-cols-6 border-b border-border bg-muted/50">
          {days.map((day) => (
            <div key={day} className="px-4 py-3 text-center text-sm font-semibold text-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-px bg-border">
          {days.map((day) => {
            const dayClasses = timetable.filter((t) => t.day === day);
            return (
              <div key={day} className="min-h-[400px] space-y-2 bg-background p-2">
                {dayClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className={cn('rounded-lg border-l-4 p-3', colorMap[cls.color])}
                  >
                    <p className="text-xs font-semibold text-foreground">{cls.startTime} - {cls.endTime}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{cls.subject}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{cls.instructor}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Icons.MapPin className="h-3 w-3" />
                      Room {cls.room}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="space-y-6 lg:hidden">
        {days.map((day) => {
          const dayClasses = timetable.filter((t) => t.day === day);
          if (dayClasses.length === 0) return null;
          return (
            <div key={day}>
              <h2 className="mb-3 text-sm font-semibold text-foreground">{day}</h2>
              <div className="space-y-2">
                {dayClasses.map((cls) => (
                  <div key={cls.id} className={cn('flex items-center gap-3 rounded-lg border-l-4 p-3', colorMap[cls.color])}>
                    <div className="w-16 shrink-0">
                      <p className="text-xs font-semibold text-foreground">{cls.startTime}</p>
                      <p className="text-xs text-muted-foreground">{cls.endTime}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{cls.subject}</p>
                      <p className="text-xs text-muted-foreground">{cls.instructor} · Room {cls.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
