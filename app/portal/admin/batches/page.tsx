'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { adminBatches } from '@/lib/portal/admin-data';

const statusVariant = { active: 'success', completed: 'muted', upcoming: 'info' } as const;

export default function AdminBatchesPage() {
  return (
    <>
      <PageHeader title="Batch Management" description="Manage student batches and capacity.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Batch</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Batches" value={adminBatches.length} icon="Layers" accent="primary" />
        <StatCard label="Active" value={adminBatches.filter((b) => b.status === 'active').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Upcoming" value={adminBatches.filter((b) => b.status === 'upcoming').length} icon="CalendarPlus" accent="warning" />
        <StatCard label="Total Students" value={adminBatches.reduce((sum, b) => sum + b.students, 0)} icon="Users" accent="secondary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminBatches.map((batch) => (
          <div key={batch.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground">{batch.name}</h3>
              <StatusBadge status={batch.status} variant={statusVariant[batch.status]} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{batch.course}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-border p-2 text-center">
                <p className="font-bold text-foreground">{batch.students}/{batch.capacity}</p>
                <p className="text-muted-foreground">Students</p>
              </div>
              <div className="rounded-lg border border-border p-2 text-center">
                <p className="font-bold text-foreground">{batch.teachers}</p>
                <p className="text-muted-foreground">Teachers</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {new Date(batch.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(batch.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Capacity</span>
                <span className="font-semibold text-foreground">{Math.round((batch.students / batch.capacity) * 100)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(batch.students / batch.capacity) * 100}%` }} />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Assign Students</Button>
              <Button size="sm" variant="ghost"><Icons.Pencil className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
