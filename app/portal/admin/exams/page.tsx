'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { adminExams } from '@/lib/portal/admin-data';

const statusVariant = { scheduled: 'info', ongoing: 'destructive', completed: 'success', cancelled: 'muted' } as const;
const typeLabels: Record<string, string> = { unit_test: 'Unit Test', mid_term: 'Mid-Term', final: 'Final', quiz: 'Quiz', mock: 'Mock Test' };

export default function AdminExamsPage() {
  return (
    <>
      <PageHeader title="Exam Management" description="Schedule and manage examinations across the institution.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> Schedule Exam</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Exams" value={adminExams.length} icon="ClipboardList" accent="primary" />
        <StatCard label="Scheduled" value={adminExams.filter((e) => e.status === 'scheduled').length} icon="CalendarPlus" accent="warning" />
        <StatCard label="Completed" value={adminExams.filter((e) => e.status === 'completed').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Upcoming" value={adminExams.filter((e) => e.status === 'scheduled').length} icon="Clock" accent="secondary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {adminExams.map((exam) => (
            <div key={exam.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{exam.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{typeLabels[exam.type]} · {exam.grade} · Sec {exam.section}</p>
                </div>
                <StatusBadge status={exam.status} variant={statusVariant[exam.status]} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                <div className="flex items-center gap-1 text-muted-foreground"><Icons.CalendarDays className="h-3 w-3" /> {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div className="flex items-center gap-1 text-muted-foreground"><Icons.Clock className="h-3 w-3" /> {exam.duration} min</div>
                <div className="flex items-center gap-1 text-muted-foreground"><Icons.Award className="h-3 w-3" /> {exam.totalMarks} marks</div>
                <div className="flex items-center gap-1 text-muted-foreground"><Icons.MapPin className="h-3 w-3" /> {exam.room}</div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs">
                <span className="text-muted-foreground">Invigilator: {exam.invigilator}</span>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
            </div>
          ))}
        </div>

        <SectionCard title="Exam Calendar" icon={<Icons.CalendarDays className="h-4 w-4 text-primary" />}>
          <div className="space-y-2">
            {adminExams.filter((e) => e.status === 'scheduled').map((exam) => (
              <div key={exam.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10">
                  <span className="text-xs font-bold text-primary">{new Date(exam.date).getDate()}</span>
                  <span className="text-[10px] text-muted-foreground">{new Date(exam.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{exam.title}</p>
                  <p className="text-xs text-muted-foreground">{exam.duration} min · {exam.room}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
