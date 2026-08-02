'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { AttendanceTrendChart } from '@/components/portal/shared/charts';
import { cn } from '@/lib/utils';
import { attendanceRecords, attendanceSummary, performanceData } from '@/lib/portal/data';

const statusVariant = {
  present: 'success',
  absent: 'destructive',
  late: 'warning',
  excused: 'info',
} as const;

export default function AttendancePage() {
  return (
    <>
      <PageHeader title="Attendance" description="Track your class attendance and identify trends." />

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall Attendance" value={`${attendanceSummary.overall}%`} icon="CalendarCheck" accent="success" />
        <StatCard label="Classes Attended" value={attendanceSummary.present} icon="CheckCircle2" accent="primary" />
        <StatCard label="Classes Missed" value={attendanceSummary.absent} icon="XCircle" accent="destructive" />
        <StatCard label="Total Classes" value={attendanceSummary.totalClasses} icon="CalendarDays" accent="secondary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance Trend */}
        <div className="lg:col-span-2">
          <SectionCard title="Attendance Trend" icon={<Icons.TrendingUp className="h-4 w-4 text-success" />}>
            <AttendanceTrendChart data={performanceData.attendanceTrend} />
          </SectionCard>
        </div>

        {/* Summary Breakdown */}
        <SectionCard title="Breakdown" icon={<Icons.PieChart className="h-4 w-4 text-primary" />}>
          <div className="space-y-3">
            {[
              { label: 'Present', value: attendanceSummary.present, color: 'bg-success' },
              { label: 'Absent', value: attendanceSummary.absent, color: 'bg-destructive' },
              { label: 'Late', value: attendanceSummary.late, color: 'bg-warning' },
              { label: 'Excused', value: attendanceSummary.excused, color: 'bg-accent' },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn('h-full rounded-full', item.color)}
                    style={{ width: `${(item.value / attendanceSummary.totalClasses) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Recent Records */}
      <div className="mt-6">
        <SectionCard title="Recent Attendance Records" icon={<Icons.CalendarDays className="h-4 w-4 text-accent" />}>
          <div className="space-y-2">
            {attendanceRecords.map((record) => (
              <div key={record.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                <div className="flex w-12 shrink-0 flex-col items-center">
                  <span className="text-sm font-bold text-foreground">
                    {new Date(record.date).getDate()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{record.subject}</p>
                </div>
                <StatusBadge status={record.status} variant={statusVariant[record.status]} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
