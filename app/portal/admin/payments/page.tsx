'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { FeeHistoryChart } from '@/components/portal/shared/parent-charts';
import { Button } from '@/components/ui/button';
import { paymentRecords, revenueData } from '@/lib/portal/admin-data';

const statusVariant = { success: 'success', pending: 'warning', failed: 'destructive', refunded: 'info' } as const;
const methodLabels: Record<string, string> = { card: 'Card', bank_transfer: 'Bank Transfer', cash: 'Cash', upi: 'UPI', cheque: 'Cheque' };

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function AdminPaymentsPage() {
  const totalRevenue = paymentRecords.filter((p) => p.status === 'success').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = paymentRecords.filter((p) => p.status === 'pending').length;

  return (
    <>
      <PageHeader title="Payments" description="Track transactions, invoices, and payment analytics.">
        <Button size="sm" variant="outline"><Icons.Download className="mr-2 h-4 w-4" /> Export</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon="TrendingUp" accent="success" trend={{ value: '12%', positive: true }} />
        <StatCard label="Transactions" value={paymentRecords.length} icon="Receipt" accent="primary" />
        <StatCard label="Pending" value={pendingPayments} icon="Clock" accent="warning" />
        <StatCard label="Failed" value={paymentRecords.filter((p) => p.status === 'failed').length} icon="XCircle" accent="destructive" />
      </div>

      <div className="mb-6">
        <SectionCard title="Payment Analytics" icon={<Icons.BarChart3 className="h-4 w-4 text-primary" />}>
          <FeeHistoryChart data={revenueData.map((d) => ({ month: d.month, paid: d.revenue, pending: Math.round(d.revenue * 0.1) })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      <SectionCard title="Transaction History" icon={<Icons.Receipt className="h-4 w-4 text-secondary" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Invoice</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground sm:table-cell">Student</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground md:table-cell">Method</th>
                <th className="hidden px-4 py-3 text-center font-semibold text-muted-foreground lg:table-cell">Date</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Amount</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paymentRecords.map((payment) => (
                <tr key={payment.id} className="transition-colors hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{payment.invoiceId}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <p className="font-medium text-foreground">{payment.studentName}</p>
                    <p className="text-xs text-muted-foreground">{payment.rollNumber}</p>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell text-muted-foreground">{methodLabels[payment.method]}</td>
                  <td className="hidden px-4 py-3 text-center lg:table-cell text-muted-foreground">{new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground">{formatCurrency(payment.amount)}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={payment.status} variant={statusVariant[payment.status]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </>
  );
}
