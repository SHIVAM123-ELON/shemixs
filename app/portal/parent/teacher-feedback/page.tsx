'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { FeedbackCard } from '@/components/portal/shared/feedback-card';
import { cn } from '@/lib/utils';
import { teacherFeedback } from '@/lib/portal/parent-data';
import type { TeacherFeedback } from '@/lib/portal/parent-types';

const priorities = ['all', 'high', 'medium', 'low'] as const;

export default function ParentTeacherFeedbackPage() {
  const [filter, setFilter] = useState<(typeof priorities)[number]>('all');

  const filtered = teacherFeedback.filter(
    (f) => filter === 'all' || f.priority === filter
  );

  const avgRating = (
    teacherFeedback.reduce((sum, f) => sum + f.rating, 0) / teacherFeedback.length
  ).toFixed(1);

  return (
    <>
      <PageHeader title="Teacher Feedback" description="Feedback from your child's teachers across all subjects.">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
          <Icons.Star className="h-4 w-4 text-warning" />
          <span className="text-sm font-semibold text-foreground">{avgRating}</span>
          <span className="text-xs text-muted-foreground">avg rating</span>
        </div>
      </PageHeader>

      {/* Priority Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {priorities.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setFilter(p)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors',
              filter === p ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {p === 'all' ? 'All Feedback' : `${p} priority`}
          </button>
        ))}
      </div>

      {/* Feedback Cards */}
      {filtered.length === 0 ? (
        <EmptyState icon="MessageSquare" title="No feedback found" description="No teacher feedback matches this filter." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((feedback: TeacherFeedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      )}
    </>
  );
}
