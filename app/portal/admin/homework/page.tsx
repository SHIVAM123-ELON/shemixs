'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminHomework } from '@/lib/portal/admin-data';

const statusVariant = { active: 'success', completed: 'info', expired: 'muted' } as const;

export default function AdminHomeworkPage() {
  return (
    <>
      <PageHeader title="Homework Management" description="Monitor homework across all classes and subjects.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> Assign Homework</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Homework" value={adminHomework.length} icon="Pencil" accent="primary" />
        <StatCard label="Active" value={adminHomework.filter((h) => h.status === 'active').length} icon="Clock" accent="warning" />
        <StatCard label="Completed" value={adminHomework.filter((h) => h.status === 'completed').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Avg Submission" value={`${Math.round(adminHomework.reduce((sum, h) => sum + h.submissionRate, 0) / adminHomework.length)}%`} icon="TrendingUp" accent="secondary" />
      </div>

      <div className="mb-6 relative max-w-sm">
        <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search homework..." className="pl-9" aria-label="Search homework" />
      </div>

      {adminHomework.length === 0 ? (
        <EmptyState icon="Pencil" title="No homework" description="No homework has been assigned yet." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Title</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground sm:table-cell">Subject</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground md:table-cell">Class</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground lg:table-cell">Teacher</th>
                <th className="hidden px-4 py-3 text-center font-semibold text-muted-foreground md:table-cell">Due Date</th>
                <th className="hidden px-4 py-3 text-center font-semibold text-muted-foreground lg:table-cell">Submission</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {adminHomework.map((hw) => (
                <tr key={hw.id} className="transition-colors hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium text-foreground">{hw.title}</td>
                  <td className="hidden px-4 py-3 sm:table-cell text-muted-foreground">{hw.subject}</td>
                  <td className="hidden px-4 py-3 md:table-cell text-muted-foreground">{hw.class}</td>
                  <td className="hidden px-4 py-3 lg:table-cell text-muted-foreground">{hw.teacher}</td>
                  <td className="hidden px-4 py-3 text-center md:table-cell text-muted-foreground">{new Date(hw.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  <td className="hidden px-4 py-3 text-center lg:table-cell">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${hw.submissionRate}%` }} /></div>
                      <span className="text-xs font-medium text-foreground">{hw.submissionRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={hw.status} variant={statusVariant[hw.status]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
