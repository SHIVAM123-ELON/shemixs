import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface ProgressCardProps {
  title: string;
  subtitle?: string;
  progress: number;
  current?: string;
  total?: string;
  className?: string;
}

export function ProgressCard({ title, subtitle, progress, current, total, className }: ProgressCardProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <span className="shrink-0 text-sm font-bold text-primary">{progress}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {(current || total) && (
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            {progress === 100 ? <CheckCircle2 className="h-3 w-3 text-success" /> : <Clock className="h-3 w-3" />}
            {current} {total && `/ ${total}`}
          </span>
          <span>{progress === 100 ? 'Completed' : 'In progress'}</span>
        </div>
      )}
    </div>
  );
}
