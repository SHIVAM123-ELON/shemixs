'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { cn } from '@/lib/utils';
import type { TeacherFeedback } from '@/lib/portal/parent-types';

interface FeedbackCardProps {
  feedback: TeacherFeedback;
}

const priorityVariant = {
  low: 'success',
  medium: 'warning',
  high: 'destructive',
} as const;

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={feedback.teacherAvatar} alt={feedback.teacherName} />
          <AvatarFallback>
            {feedback.teacherName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">{feedback.teacherName}</p>
            <StatusBadge
              status={feedback.priority}
              variant={priorityVariant[feedback.priority]}
            />
          </div>
          <p className="text-xs text-muted-foreground">{feedback.subject}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={cn('h-4 w-4', i < feedback.rating ? 'text-warning' : 'text-muted')}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-xs font-medium text-muted-foreground">
          {feedback.rating}.0
        </span>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{feedback.feedback}</p>

      <p className="mt-3 text-xs text-muted-foreground/70">
        {new Date(feedback.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
    </div>
  );
}
