'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { adminAssignments } from '@/lib/portal/admin-data';

const statusVariant = { active: 'success', graded: 'info', expired: 'muted' } as const;

export default function AdminAssignmentsPage() {
  const totalSubmissions = adminAssignments.reduce((sum, a) => sum + a.submitted, 0);
  const totalStudents = adminAssignments.reduce((sum, a) => sum + a.total, 0);
  const completionRate = Math.round((totalSubmissions / totalStudents) * 100);

  return (
    <>
      <PageHeader title="Assignment Management" description="Monitor assignments and submission statistics.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> Create Assignment</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Assignments" value={adminAssignments.length} icon="FileText" accent="primary" />
        <StatCard label="Active" value={adminAssignments.filter((a) => a.status === 'active').length} icon="Clock" accent="warning" />
        <StatCard label="Graded" value={adminAssignments.filter((a) => a.status === 'graded').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Completion Rate" value={`${completionRate}%`} icon="TrendingUp" accent="secondary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {adminAssignments.map((assignment) => (
            <div key={assignment.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{assignment.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{assignment.course} · {assignment.batch}</p>
                </div>
                <StatusBadge status={assignment.status} variant={statusVariant[assignment.status]} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Icons.User className="h-3 w-3" /> {assignment.teacher}</span>
                <span className="flex items-center gap-1"><Icons.CalendarDays className="h-3 w-3" /> Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Icons.Award className="h-3 w-3" /> {assignment.totalMarks} marks</span>
                <span className="flex items-center gap-1"><Icons.Users className="h-3 w-3" /> {assignment.submitted}/{assignment.total}</span>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">Submission Rate</span>
                  <span className="font-semibold text-foreground">{Math.round((assignment.submitted / assignment.total) * 100)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionCard title="Evaluation Status" icon={<Icons.ClipboardCheck className="h-4 w-4 text-secondary" />}>
          <div className="space-y-3">
            <div className="rounded-lg border border-success/20 bg-success/5 p-3 text-center">
              <p className="text-2xl font-bold text-success">{adminAssignments.filter((a) => a.status === 'graded').length}</p>
              <p className="text-xs text-muted-foreground">Fully Graded</p>
            </div>
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-3 text-center">
              <p className="text-2xl font-bold text-warning">{adminAssignments.filter((a) => a.status === 'active').length}</p>
              <p className="text-xs text-muted-foreground">Awaiting Submissions</p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
              <p className="text-2xl font-bold text-primary">{totalSubmissions}</p>
              <p className="text-xs text-muted-foreground">Total Submissions</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
