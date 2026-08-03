'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { assignments, assignmentSubmissions, teacherCourses } from '@/lib/portal/teacher-data';
import type { Assignment } from '@/lib/portal/teacher-types';

const statusVariant = {
  active: 'success',
  graded: 'info',
  expired: 'muted',
} as const;

const submissionStatusVariant = {
  submitted: 'info',
  late: 'warning',
  graded: 'success',
  pending: 'destructive',
} as const;

export default function TeacherAssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const activeCount = assignments.filter((a) => a.status === 'active').length;
  const gradedCount = assignments.filter((a) => a.status === 'graded').length;
  const totalSubmissions = assignments.reduce((sum, a) => sum + a.submitted, 0);

  return (
    <>
      <PageHeader title="Assignments" description="Create, manage, and grade student assignments.">
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Icons.PlusCircle className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="assign-title">Title</Label>
                <Input id="assign-title" placeholder="e.g. Solve 15 Problems on Projectile Motion" className="mt-1.5" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="assign-course">Course</Label>
                  <Select>
                    <SelectTrigger id="assign-course" className="mt-1.5">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherCourses.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assign-marks">Total Marks</Label>
                  <Input id="assign-marks" type="number" placeholder="e.g. 50" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="assign-due">Due Date</Label>
                <Input id="assign-due" type="date" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="assign-desc">Description</Label>
                <textarea
                  id="assign-desc"
                  placeholder="Describe the assignment..."
                  className="mt-1.5 h-24 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="rounded-lg border-2 border-dashed border-border p-4 text-center">
                <Icons.Paperclip className="mx-auto h-6 w-6 text-muted-foreground" />
                <p className="mt-2 text-xs text-muted-foreground">Attach PDF or images</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setShowCreate(false)}>Create Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Assignments" value={activeCount} icon="Pencil" accent="success" />
        <StatCard label="Graded" value={gradedCount} icon="CheckCircle2" accent="primary" />
        <StatCard label="Total Submissions" value={totalSubmissions} icon="Inbox" accent="secondary" />
        <StatCard label="Pending Review" value={12} icon="Clock" accent="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Assignment List */}
        <div className="lg:col-span-2 space-y-4">
          {assignments.length === 0 ? (
            <EmptyState icon="Pencil" title="No assignments" description="Create your first assignment to get started." />
          ) : (
            assignments.map((assignment) => (
              <div key={assignment.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{assignment.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{assignment.course} · {assignment.batch}</p>
                  </div>
                  <StatusBadge status={assignment.status} variant={statusVariant[assignment.status]} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{assignment.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icons.CalendarDays className="h-3 w-3" />
                    Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icons.Award className="h-3 w-3" />
                    {assignment.totalMarks} marks
                  </span>
                  <span className="flex items-center gap-1">
                    <Icons.Users className="h-3 w-3" />
                    {assignment.submitted}/{assignment.total} submitted
                  </span>
                  {assignment.attachments.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Icons.Paperclip className="h-3 w-3" />
                      {assignment.attachments.length} file(s)
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Submission rate</span>
                    <span className="font-semibold text-foreground">{Math.round((assignment.submitted / assignment.total) * 100)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }} />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedAssignment(assignment)}>
                    <Icons.Eye className="mr-2 h-3.5 w-3.5" />
                    View Submissions
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Icons.Pencil className="mr-2 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                    <Icons.Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Submissions Panel */}
        <SectionCard
          title={selectedAssignment ? `Submissions — ${selectedAssignment.title}` : 'Student Submissions'}
          icon={<Icons.Inbox className="h-4 w-4 text-secondary" />}
        >
          {!selectedAssignment ? (
            <EmptyState icon="Inbox" title="Select an assignment" description="Click 'View Submissions' on an assignment to see student submissions here." />
          ) : (
            <div className="space-y-2">
              {assignmentSubmissions.map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={sub.studentAvatar} alt={sub.studentName} />
                    <AvatarFallback>{sub.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{sub.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Not submitted'}
                      {sub.marks !== undefined && ` · ${sub.marks}/${selectedAssignment.totalMarks}`}
                    </p>
                  </div>
                  <StatusBadge status={sub.status} variant={submissionStatusVariant[sub.status]} />
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
}
