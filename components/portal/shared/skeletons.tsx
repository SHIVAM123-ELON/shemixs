import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-5', className)}>
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-2 w-full rounded bg-muted" />
      </div>
    </div>
  );
}

export function SkeletonRow({ className }: SkeletonCardProps) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)}>
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-2 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
