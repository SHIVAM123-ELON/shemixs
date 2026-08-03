'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { AttendanceTrendChart } from '@/components/portal/shared/charts';
import { cn } from '@/lib/utils';
import {
  subjectAttendance,
  monthlyAttendance,
  attendanceCalendar,
} from '@/lib/portal/parent-data';

const statusVariant = {
  present: 'success',
  absent: 'destructive',
  late: 'warning',
  excused: 'info',
  holiday: 'muted',
} as const;

const dayStatusColor = {
  present: 'bg-success/20 text-success border-success/30',
  absent: 'bg-destructive/20 text-destructive border-destructive/30',
  late: 'bg-warning/20 text-warning border-warning/30',
  excused: 'bg-accent/20 text-accent border-accent/30',
  holiday: 'bg-muted text-muted-foreground border-border',
};

export default function ParentAttendancePage() {
  const overall = 91;
  const present = 142;
  const absent = 8;
  const late = 4;
  const totalClasses = 156;

  return (
    <>
      <PageHeader title="Attendance" description="Track your child's class attendance and identify trends." />

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall Attendance" value={`${overall}%`} icon="CalendarCheck" accent="success" />
        <StatCard label="Classes Attended" value={present} icon="CheckCircle2" accent="primary" />
        <StatCard label="Classes Missed" value={absent} icon="XCircle" accent="destructive" />
        <StatCard label="Total Classes" value={totalClasses} icon="CalendarDays" accent="secondary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance Trend */}
        <div className="lg:col-span-2">
          <SectionCard title="Attendance Trend" icon={<Icons.TrendingUp className="h-4 w-4 text-success" />}>
            <AttendanceTrendChart data={monthlyAttendance as unknown as Record<string, unknown>[]} />
          </SectionCard>
        </div>

        {/* Summary Breakdown */}
        <SectionCard title="Breakdown" icon={<Icons.PieChart className="h-4 w-4 text-primary" />}>
          <div className="space-y-3">
            {[
              { label: 'Present', value: present, color: 'bg-success' },
              { label: 'Absent', value: absent, color: 'bg-destructive' },
              { label: 'Late', value: late, color: 'bg-warning' },
              { label: 'Excused', value: 2, color: 'bg-accent' },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn('h-full rounded-full', item.color)}
                    style={{ width: `${(item.value / totalClasses) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Subject-wise Attendance */}
      <div className="mt-6">
        <SectionCard title="Subject-wise Attendance" icon={<Icons.BookOpen className="h-4 w-4 text-secondary" />}>
          <div className="space-y-3">
            {subjectAttendance.map((s) => (
              <div key={s.subject} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm text-muted-foreground">{s.subject}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      s.percentage >= 90 ? 'bg-success' : s.percentage >= 75 ? 'bg-primary' : 'bg-warning'
                    )}
                    style={{ width: `${s.percentage}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-sm font-medium text-foreground">
                  {s.attended}/{s.total}
                </span>
                <span className="w-12 shrink-0 text-right text-sm font-bold text-foreground">{s.percentage}%</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Attendance Calendar + Recent Records */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Attendance Calendar" icon={<Icons.CalendarDays className="h-4 w-4 text-accent" />}>
          <div className="grid grid-cols-7 gap-1.5">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-center text-xs font-medium text-muted-foreground">{d}</div>
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {attendanceCalendar.map((day) => (
              <div
                key={day.date}
                className={cn(
                  'flex h-9 items-center justify-center rounded-lg border text-xs font-medium',
                  dayStatusColor[day.status]
                )}
                title={`${day.date}: ${day.status}`}
              >
                {new Date(day.date).getDate()}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {Object.entries(dayStatusColor).map(([status, classes]) => (
              <div key={status} className="flex items-center gap-1.5">
                <span className={cn('h-3 w-3 rounded border', classes)} />
                <span className="text-xs capitalize text-muted-foreground">{status}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Attendance Records" icon={<Icons.List className="h-4 w-4 text-primary" />}>
          <div className="space-y-2">
            {[
              { date: '2025-08-01', subject: 'Physics', status: 'present' as const },
              { date: '2025-08-01', subject: 'Mathematics', status: 'present' as const },
              { date: '2025-08-01', subject: 'Chemistry', status: 'late' as const },
              { date: '2025-07-31', subject: 'Biology', status: 'absent' as const },
              { date: '2025-07-31', subject: 'Physics', status: 'present' as const },
              { date: '2025-07-30', subject: 'Computer Science', status: 'excused' as const },
            ].map((record, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-border p-3">
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
