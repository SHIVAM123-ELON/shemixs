'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { adminEvents } from '@/lib/portal/admin-data';

const statusVariant = { upcoming: 'info', ongoing: 'destructive', completed: 'success', cancelled: 'muted' } as const;
const typeColor: Record<string, string> = { academic: 'bg-primary/10 text-primary', meeting: 'bg-accent/10 text-accent', exam: 'bg-destructive/10 text-destructive', holiday: 'bg-success/10 text-success', workshop: 'bg-warning/10 text-warning', cultural: 'bg-secondary/10 text-secondary' };

export default function AdminEventsPage() {
  return (
    <>
      <PageHeader title="Events" description="Manage academic events, meetings, and holidays.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Event</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Events" value={adminEvents.length} icon="CalendarPlus" accent="primary" />
        <StatCard label="Upcoming" value={adminEvents.filter((e) => e.status === 'upcoming').length} icon="Clock" accent="warning" />
        <StatCard label="Completed" value={adminEvents.filter((e) => e.status === 'completed').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Holidays" value={adminEvents.filter((e) => e.type === 'holiday').length} icon="CalendarOff" accent="secondary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminEvents.map((event) => (
          <div key={event.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <span className={`rounded-md px-2 py-0.5 text-xs font-medium capitalize ${typeColor[event.type]}`}>{event.type}</span>
              <StatusBadge status={event.status} variant={statusVariant[event.status]} />
            </div>
            <h3 className="mt-3 text-sm font-bold text-foreground">{event.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{event.description}</p>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-1"><Icons.CalendarDays className="h-3 w-3" /> {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              {event.time && <p className="flex items-center gap-1"><Icons.Clock className="h-3 w-3" /> {event.time}</p>}
              <p className="flex items-center gap-1"><Icons.MapPin className="h-3 w-3" /> {event.location}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Manage</Button>
              <Button size="sm" variant="ghost"><Icons.Pencil className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
