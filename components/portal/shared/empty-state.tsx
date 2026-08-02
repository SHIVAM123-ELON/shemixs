import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/portal/icons';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon = 'Inbox', title, description, action, className }: EmptyStateProps) {
  const Icon = getIcon(icon);

  return (
    <div className={cn('flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center', className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
