'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { homework } from '@/lib/portal/data';

const statusVariant = {
  pending: 'warning',
  submitted: 'info',
  graded: 'success',
  overdue: 'destructive',
} as const;

const priorityVariant = {
  low: 'muted',
  medium: 'info',
  high: 'destructive',
} as const;

const filters = ['all', 'pending', 'submitted', 'graded', 'overdue'] as const;

export default function HomeworkPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');

  const filtered = homework.filter((h) => filter === 'all' || h.status === filter);

  return (
    <>
      <PageHeader title="Homework" description="Track and submit your homework assignments on time." />

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors',
              filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="Pencil" title="No homework found" description="You're all caught up!" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((hw) => (
            <SectionCard key={hw.id} title={hw.title} icon={<Icons.Pencil className="h-4 w-4 text-primary" />}>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{hw.subject}</span>
                <StatusBadge status={hw.status} variant={statusVariant[hw.status]} />
                <StatusBadge status={`${hw.priority} priority`} variant={priorityVariant[hw.priority]} />
              </div>
              <p className="text-sm text-muted-foreground">{hw.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icons.CalendarDays className="h-3.5 w-3.5" />
                  Due {new Date(hw.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {hw.status === 'pending' || hw.status === 'overdue' ? (
                  <Button size="sm">
                    <Icons.Upload className="mr-2 h-3.5 w-3.5" />
                    Submit
                  </Button>
                ) : hw.status === 'submitted' ? (
                  <Button size="sm" variant="outline" disabled>
                    <Icons.CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                    Submitted
                  </Button>
                ) : (
                  <Button size="sm" variant="outline">
                    <Icons.Eye className="mr-2 h-3.5 w-3.5" />
                    View Feedback
                  </Button>
                )}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </>
  );
}
