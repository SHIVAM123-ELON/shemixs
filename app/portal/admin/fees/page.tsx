'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { feeStructures, feeRecords } from '@/lib/portal/admin-data';

const statusVariant = { paid: 'success', pending: 'warning', overdue: 'destructive' } as const;
const feeStatusVariant = { active: 'success', inactive: 'muted' } as const;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function AdminFeesPage() {
  const totalCollected = feeRecords.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = feeRecords.filter((f) => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalOverdue = feeRecords.filter((f) => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);

  return (
    <>
      <PageHeader title="Fee Management" description="Manage fee structures, installments, and collections.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Fee Structure</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Collected" value={formatCurrency(totalCollected)} icon="CheckCircle2" accent="success" trend={{ value: '8%', positive: true }} />
        <StatCard label="Pending" value={formatCurrency(totalPending)} icon="Clock" accent="warning" />
        <StatCard label="Overdue" value={formatCurrency(totalOverdue)} icon="AlertCircle" accent="destructive" />
        <StatCard label="Collection Rate" value="85%" icon="TrendingUp" accent="primary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Fee Structures" icon={<Icons.CreditCard className="h-4 w-4 text-primary" />}>
          <div className="space-y-2">
            {feeStructures.map((fee) => (
              <div key={fee.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><Icons.CreditCard className="h-4 w-4 text-primary" /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{fee.category}</p>
                  <p className="text-xs text-muted-foreground">{fee.grade} · {fee.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{formatCurrency(fee.amount)}</p>
                  <StatusBadge status={fee.status} variant={feeStatusVariant[fee.status]} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Fee Records" icon={<Icons.Receipt className="h-4 w-4 text-secondary" />}>
          <div className="space-y-2">
            {feeRecords.map((fee) => (
              <div key={fee.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{fee.studentName}</p>
                  <p className="text-xs text-muted-foreground">{fee.category} · {fee.invoiceId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{formatCurrency(fee.amount)}</p>
                  <StatusBadge status={fee.status} variant={statusVariant[fee.status]} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10"><Icons.Percent className="h-5 w-5 text-warning" /></div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Scholarships</h3>
              <p className="text-xs text-muted-foreground">Manage scholarship programs</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="mt-3 w-full">Manage Scholarships</Button>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Icons.CalendarDays className="h-5 w-5 text-primary" /></div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Installments</h3>
              <p className="text-xs text-muted-foreground">Configure payment plans</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="mt-3 w-full">Manage Installments</Button>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10"><Icons.AlertCircle className="h-5 w-5 text-destructive" /></div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Overdue Fees</h3>
              <p className="text-xs text-muted-foreground">{feeRecords.filter((f) => f.status === 'overdue').length} students overdue</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="mt-3 w-full">View Overdue</Button>
        </div>
      </div>
    </>
  );
}
