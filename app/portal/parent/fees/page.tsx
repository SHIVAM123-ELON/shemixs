'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { FeeCard } from '@/components/portal/shared/fee-card';
import { FeeHistoryChart } from '@/components/portal/shared/parent-charts';
import { SectionCard } from '@/components/portal/shared/section-card';
import { feeSummary, feePaymentRecords, feeHistoryData } from '@/lib/portal/parent-data';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function ParentFeesPage() {
  return (
    <>
      <PageHeader title="Fee Status" description="View and manage your child's fee payments." />

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Fees" value={formatCurrency(feeSummary.totalFees)} icon="Receipt" accent="secondary" />
        <StatCard label="Total Paid" value={formatCurrency(feeSummary.totalPaid)} icon="CheckCircle2" accent="success" />
        <StatCard label="Pending" value={formatCurrency(feeSummary.totalPending)} icon="Clock" accent="warning" />
        <StatCard label="Overdue" value={formatCurrency(feeSummary.totalOverdue)} icon="AlertCircle" accent="destructive" />
      </div>

      {/* Next Due Date Banner */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-warning/30 bg-warning/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
            <Icons.CalendarClock className="h-6 w-6 text-warning" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Next Payment Due</p>
            <p className="text-sm text-muted-foreground">
              {new Date(feeSummary.nextDueDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold text-warning">{formatCurrency(feeSummary.nextDueAmount)}</p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Icons.CreditCard className="h-4 w-4" />
            Pay Now
          </button>
        </div>
      </div>

      {/* Fee History Chart */}
      <div className="mb-6">
        <SectionCard title="Payment History" icon={<Icons.BarChart3 className="h-4 w-4 text-secondary" />}>
          <FeeHistoryChart data={feeHistoryData as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      {/* Fee Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">All Invoices</h3>
        {feePaymentRecords.map((fee) => (
          <FeeCard key={fee.id} fee={fee} />
        ))}
      </div>
    </>
  );
}
