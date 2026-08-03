import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/portal/icons';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: { value: string; positive: boolean };
  accent?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive';
}

const accentMap = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
};

export function StatCard({ label, value, icon, trend, accent = 'primary' }: StatCardProps) {
  const Icon = getIcon(icon);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', accentMap[accent])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <p className={cn('mt-1 text-xs font-medium', trend.positive ? 'text-success' : 'text-destructive')}>
            {trend.positive ? '+' : ''}{trend.value} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
