'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { feeRecords } from '@/lib/portal/data';

const statusVariant = {
  paid: 'success',
  pending: 'warning',
  overdue: 'destructive',
} as const;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function FeesPage() {
  const totalPaid = feeRecords.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = feeRecords.filter((f) => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalOverdue = feeRecords.filter((f) => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);
  const nextDue = feeRecords.filter((f) => f.status === 'pending').sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  return (
    <>
      <PageHeader title="Fee Status" description="View and manage your fee payments." />

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Paid" value={formatCurrency(totalPaid)} icon="CheckCircle2" accent="success" />
        <StatCard label="Pending" value={formatCurrency(totalPending)} icon="Clock" accent="warning" />
        <StatCard label="Overdue" value={formatCurrency(totalOverdue)} icon="AlertCircle" accent="destructive" />
        <StatCard label="Next Due Date" value={nextDue ? new Date(nextDue.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'} icon="CalendarDays" accent="primary" />
      </div>

      {/* Fee Cards */}
      <div className="space-y-4">
        {feeRecords.map((fee) => (
          <div key={fee.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
                  fee.status === 'paid' ? 'bg-success/10 text-success' : fee.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                )}>
                  <Icons.CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{fee.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">Invoice: {fee.invoiceId}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    <span className="text-lg font-bold text-foreground">{formatCurrency(fee.amount)}</span>
                    {fee.paidDate && (
                      <span className="text-muted-foreground">Paid on {new Date(fee.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    )}
                    {!fee.paidDate && (
                      <span className="text-muted-foreground">Due {new Date(fee.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={fee.status} variant={statusVariant[fee.status]} />
                {fee.status === 'paid' ? (
                  <Button size="sm" variant="outline">
                    <Icons.Download className="mr-2 h-3.5 w-3.5" />
                    Receipt
                  </Button>
                ) : (
                  <Button size="sm">
                    <Icons.CreditCard className="mr-2 h-3.5 w-3.5" />
                    Pay Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
