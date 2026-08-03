'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { AttendanceTrendChart } from '@/components/portal/shared/charts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { attendanceTrendData, adminClasses } from '@/lib/portal/admin-data';

export default function AdminAttendancePage() {
  const [view, setView] = useState<'daily' | 'monthly'>('daily');

  return (
    <>
      <PageHeader title="Attendance" description="Institution-wide attendance overview and reports." />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Attendance" value="95%" icon="CalendarCheck" accent="success" trend={{ value: '2%', positive: true }} />
        <StatCard label="Present" value="428" icon="CheckCircle2" accent="primary" />
        <StatCard label="Absent" value="15" icon="XCircle" accent="destructive" />
        <StatCard label="Late" value="7" icon="Clock" accent="warning" />
      </div>

      <div className="mb-6 flex gap-2">
        <button onClick={() => setView('daily')} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${view === 'daily' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted'}`}>Daily</button>
        <button onClick={() => setView('monthly')} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${view === 'monthly' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted'}`}>Monthly</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title={view === 'daily' ? 'Daily Attendance Trend' : 'Monthly Attendance Trend'} icon={<Icons.BarChart3 className="h-4 w-4 text-primary" />}>
            <AttendanceTrendChart data={attendanceTrendData as unknown as Record<string, unknown>[]} />
          </SectionCard>
        </div>

        <SectionCard title="Class-wise Reports" icon={<Icons.School className="h-4 w-4 text-secondary" />}>
          <div className="space-y-2">
            {adminClasses.filter((c) => c.status === 'active').map((cls) => {
              const rate = Math.round((cls.students / cls.capacity) * 95);
              return (
                <div key={cls.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><Icons.School className="h-4 w-4 text-primary" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{cls.name}</p>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${rate >= 90 ? 'bg-success' : rate >= 75 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${rate}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground">{rate}%</span>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Teacher Attendance" icon={<Icons.Users className="h-4 w-4 text-success" />}>
          <div className="space-y-2">
            {[
              { name: 'Dr. Priya Menon', rate: 96 },
              { name: 'Prof. Vikram Rao', rate: 94 },
              { name: 'Dr. Anjali Verma', rate: 98 },
              { name: 'Ms. Sneha Kapoor', rate: 95 },
            ].map((t) => (
              <div key={t.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-success" style={{ width: `${t.rate}%` }} />
                  </div>
                </div>
                <span className="text-sm font-bold text-success">{t.rate}%</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Student Attendance" icon={<Icons.GraduationCap className="h-4 w-4 text-primary" />}>
          <div className="space-y-2">
            {[
              { name: 'Grade 11 — Section A', rate: 91 },
              { name: 'Grade 12 — Section B', rate: 88 },
              { name: 'Grade 11 — Section C', rate: 85 },
              { name: 'Grade 10 — Section A', rate: 93 },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${s.rate >= 90 ? 'bg-success' : 'bg-warning'}`} style={{ width: `${s.rate}%` }} />
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground">{s.rate}%</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
