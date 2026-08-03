'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { teacherCourses } from '@/lib/portal/teacher-data';

const statusVariant = {
  active: 'success',
  completed: 'info',
  draft: 'muted',
} as const;

export default function TeacherCoursesPage() {
  return (
    <>
      <PageHeader title="My Courses" description="Manage your assigned courses and track progress.">
        <Button size="sm">
          <Icons.PlusCircle className="mr-2 h-4 w-4" />
          New Course
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teacherCourses.map((course) => (
          <div key={course.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="gradient-brand-soft p-4">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icons.BookOpen className="h-5 w-5 text-primary" />
                </div>
                <StatusBadge status={course.status} variant={statusVariant[course.status]} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-foreground">{course.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{course.subject} · {course.grade}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icons.Users className="h-3 w-3" />
                  {course.students}
                </span>
                <span className="flex items-center gap-1">
                  <Icons.Layers className="h-3 w-3" />
                  {course.completedChapters}/{course.chapters} chapters
                </span>
                <span className="flex items-center gap-1">
                  <Icons.GraduationCap className="h-3 w-3" />
                  {course.batch}
                </span>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{course.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={cn('h-full rounded-full', course.progress >= 75 ? 'bg-success' : course.progress >= 40 ? 'bg-primary' : 'bg-warning')} style={{ width: `${course.progress}%` }} />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">Manage</Button>
                <Button size="sm" variant="ghost">
                  <Icons.Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
