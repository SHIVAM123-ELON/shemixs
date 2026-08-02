'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { assignments } from '@/lib/portal/data';

const statusVariant = {
  'not-started': 'muted',
  'in-progress': 'info',
  submitted: 'warning',
  graded: 'success',
} as const;

const filters = ['all', 'not-started', 'in-progress', 'submitted', 'graded'] as const;

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');

  const filtered = assignments.filter((a) => filter === 'all' || a.status === filter);

  return (
    <>
      <PageHeader title="Assignments" description="Manage your assignments and track your grades." />

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
            {f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="ClipboardList" title="No assignments found" description="You have no assignments in this category." />
      ) : (
        <div className="space-y-4">
          {filtered.map((assignment) => (
            <SectionCard key={assignment.id} title={assignment.title} icon={<Icons.ClipboardList className="h-4 w-4 text-primary" />}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{assignment.subject}</span>
                    <StatusBadge status={assignment.status.replace('-', ' ')} variant={statusVariant[assignment.status]} />
                  </div>
                  <p className="text-sm text-muted-foreground">{assignment.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icons.CalendarDays className="h-3.5 w-3.5" />
                      Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Award className="h-3.5 w-3.5" />
                      Max {assignment.maxGrade} marks
                    </span>
                    {assignment.grade !== undefined && (
                      <span className="flex items-center gap-1 font-semibold text-success">
                        <Icons.CheckCircle2 className="h-3.5 w-3.5" />
                        Scored {assignment.grade}/{assignment.maxGrade}
                      </span>
                    )}
                  </div>
                </div>
                <div className="shrink-0">
                  {assignment.status === 'graded' ? (
                    <Button size="sm" variant="outline">
                      <Icons.Eye className="mr-2 h-3.5 w-3.5" />
                      View Result
                    </Button>
                  ) : assignment.status === 'submitted' ? (
                    <Button size="sm" variant="outline" disabled>
                      <Icons.Clock className="mr-2 h-3.5 w-3.5" />
                      Awaiting Grade
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Icons.Upload className="mr-2 h-3.5 w-3.5" />
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </>
  );
}
