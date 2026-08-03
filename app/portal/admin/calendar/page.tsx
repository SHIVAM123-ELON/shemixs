'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { ParentCalendarWidget } from '@/components/portal/shared/parent-calendar-widget';
import { cn } from '@/lib/utils';
import { adminCalendarEvents } from '@/lib/portal/admin-data';

const eventTypeColor: Record<string, string> = { class: 'bg-primary/10 text-primary border-primary/20', exam: 'bg-destructive/10 text-destructive border-destructive/20', meeting: 'bg-accent/10 text-accent border-accent/20', holiday: 'bg-success/10 text-success border-success/20', event: 'bg-secondary/10 text-secondary border-secondary/20', deadline: 'bg-warning/10 text-warning border-warning/20' };
const eventTypeIcon: Record<string, string> = { class: 'Video', exam: 'Timer', meeting: 'Users', holiday: 'CalendarOff', event: 'CalendarPlus', deadline: 'Clock' };
const weeklyDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekDates = ['28', '29', '30', '31', '1', '2', '3'];

export default function AdminCalendarPage() {
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly');
  const weekEvents = adminCalendarEvents.filter((e) => { const d = new Date(e.date); return d >= new Date('2025-07-28') && d <= new Date('2025-08-03'); });

  return (
    <>
      <PageHeader title="Calendar" description="Institution-wide calendar of events, exams, and deadlines." />

      <div className="mb-6 flex gap-2">
        <button type="button" onClick={() => setView('monthly')} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium transition-colors', view === 'monthly' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted')}>Monthly</button>
        <button type="button" onClick={() => setView('weekly')} className={cn('rounded-lg px-3 py-1.5 text-sm font-medium transition-colors', view === 'weekly' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted')}>Weekly</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {view === 'monthly' ? (
            <SectionCard title="Monthly View" icon={<Icons.CalendarDays className="h-4 w-4 text-primary" />}>
              <ParentCalendarWidget events={adminCalendarEvents as unknown as import('@/lib/portal/parent-types').ParentCalendarEvent[]} />
            </SectionCard>
          ) : (
            <SectionCard title="Weekly View — July 28 to August 3" icon={<Icons.CalendarRange className="h-4 w-4 text-primary" />}>
              <div className="grid grid-cols-7 gap-2">
                {weeklyDays.map((day, i) => {
                  const dateStr = `2025-${i < 4 ? '07' : '08'}-${weekDates[i].padStart(2, '0')}`;
                  const dayEvents = weekEvents.filter((e) => e.date === dateStr);
                  return (
                    <div key={day} className="min-h-[120px] rounded-lg border border-border p-2">
                      <div className="mb-2 text-center"><p className="text-xs font-medium text-muted-foreground">{day}</p><p className="text-sm font-bold text-foreground">{weekDates[i]}</p></div>
                      <div className="space-y-1">
                        {dayEvents.map((ev) => {
                          const Icon = Icons[eventTypeIcon[ev.type] as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                          return <div key={ev.id} className={cn('rounded border px-1.5 py-1 text-xs', eventTypeColor[ev.type])}><Icon className="mr-1 inline h-2.5 w-2.5" /><span className="truncate">{ev.title}</span></div>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          )}
        </div>

        <SectionCard title="Upcoming Events" icon={<Icons.List className="h-4 w-4 text-secondary" />}>
          <div className="space-y-2">
            {adminCalendarEvents.filter((e) => new Date(e.date) >= new Date('2025-08-02')).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((ev) => {
              const Icon = Icons[eventTypeIcon[ev.type] as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
              return (
                <div key={ev.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border', eventTypeColor[ev.type])}><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-foreground">{ev.title}</p><p className="text-xs text-muted-foreground">{new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{ev.time && ` · ${ev.time}`}</p></div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
