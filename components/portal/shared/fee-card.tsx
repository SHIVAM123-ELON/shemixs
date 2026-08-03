'use client';

import * as Icons from 'lucide-react';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FeePaymentRecord } from '@/lib/portal/parent-types';

interface FeeCardProps {
  fee: FeePaymentRecord;
}

const statusVariant = {
  paid: 'success',
  pending: 'warning',
  overdue: 'destructive',
} as const;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export function FeeCard({ fee }: FeeCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
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
                <span className="text-muted-foreground">
                  Paid on {new Date(fee.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {fee.method && ` · ${fee.method}`}
                </span>
              )}
              {!fee.paidDate && (
                <span className="text-muted-foreground">
                  Due {new Date(fee.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
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
  );
}
