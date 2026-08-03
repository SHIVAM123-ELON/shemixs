'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { adminCourses } from '@/lib/portal/admin-data';

const statusVariant = { published: 'success', draft: 'warning', archived: 'muted' } as const;

export default function AdminCoursesPage() {
  return (
    <>
      <PageHeader title="Course Management" description="Manage all courses, chapters, and lessons.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Course</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Courses" value={adminCourses.length} icon="BookOpen" accent="primary" />
        <StatCard label="Published" value={adminCourses.filter((c) => c.status === 'published').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Drafts" value={adminCourses.filter((c) => c.status === 'draft').length} icon="Pencil" accent="warning" />
        <StatCard label="Total Students" value={adminCourses.reduce((sum, c) => sum + c.students, 0)} icon="Users" accent="secondary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminCourses.map((course) => (
          <div key={course.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icons.BookOpen className="h-5 w-5 text-primary" />
              </div>
              <StatusBadge status={course.status} variant={statusVariant[course.status]} />
            </div>
            <h3 className="mt-3 text-sm font-bold text-foreground">{course.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{course.category}</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Icons.Users className="h-3 w-3" /> {course.students}</span>
              <span className="flex items-center gap-1"><Icons.Layers className="h-3 w-3" /> {course.chapters} ch</span>
              <span className="flex items-center gap-1"><Icons.PlayCircle className="h-3 w-3" /> {course.lessons} lessons</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Instructor: {course.instructor}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Manage</Button>
              <Button size="sm" variant="ghost"><Icons.Pencil className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><Icons.Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
