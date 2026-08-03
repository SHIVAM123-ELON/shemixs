import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/portal/icons';

interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  icon: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const colorMap = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {items.map((item, index) => {
        const Icon = getIcon(item.icon);
        const color = item.color ?? 'primary';
        return (
          <div key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
            {index < items.length - 1 && (
              <div className="absolute left-5 top-10 h-full w-px bg-border" aria-hidden="true" />
            )}
            <div className={cn('relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full', colorMap[color])}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              {item.subtitle && (
                <p className="mt-0.5 text-sm text-muted-foreground">{item.subtitle}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground/70">
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
