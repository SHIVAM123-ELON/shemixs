'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teacherProfile, teacherCourses, studentRecords, assignments, testRecords } from '@/lib/portal/teacher-data';

export default function TeacherProfilePage() {
  const totalStudents = studentRecords.length;
  const activeCourses = teacherCourses.filter((c) => c.status === 'active').length;
  const totalAssignments = assignments.length;
  const totalTests = testRecords.length;
  const batches = Array.from(new Set(teacherCourses.map((c) => c.batch)));

  return (
    <>
      <PageHeader title="Profile" description="Your teacher profile and performance overview.">
        <Button asChild variant="outline" size="sm">
          <Link href="/portal/teacher/settings">
            <Icons.Settings className="mr-2 h-4 w-4" />
            Edit Settings
          </Link>
        </Button>
      </PageHeader>

      {/* Profile Header Card */}
      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
        <div className="h-28 gradient-brand-soft" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
            <Avatar className="h-24 w-24 border-4 border-card">
              <AvatarImage src={teacherProfile.avatar} alt={teacherProfile.name} />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{teacherProfile.name}</h2>
              <p className="text-sm text-muted-foreground">{teacherProfile.department}</p>
              <p className="text-xs text-muted-foreground">{teacherProfile.email}</p>
            </div>
            <Button size="sm" variant="outline">
              <Icons.Camera className="mr-2 h-3.5 w-3.5" />
              Change Photo
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Courses" value={activeCourses} icon="BookOpen" accent="primary" />
        <StatCard label="Total Students" value={totalStudents} icon="Users" accent="success" />
        <StatCard label="Assignments" value={totalAssignments} icon="Pencil" accent="warning" />
        <StatCard label="Tests Created" value={totalTests} icon="ClipboardList" accent="secondary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column — Personal Info */}
        <div className="space-y-6 lg:col-span-1">
          <SectionCard title="Personal Information" icon={<Icons.User className="h-4 w-4 text-primary" />}>
            <dl className="space-y-3">
              {[
                { label: 'Name', value: teacherProfile.name },
                { label: 'Department', value: teacherProfile.department },
                { label: 'Qualification', value: teacherProfile.qualification },
                { label: 'Experience', value: `${teacherProfile.experience} years` },
                { label: 'Email', value: teacherProfile.email },
                { label: 'Phone', value: teacherProfile.phone },
                { label: 'Joined', value: new Date(teacherProfile.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>

          <SectionCard title="Subjects" icon={<Icons.BookMarked className="h-4 w-4 text-secondary" />}>
            <div className="flex flex-wrap gap-2">
              {teacherProfile.subjects.map((subject) => (
                <span key={subject} className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
                  {subject}
                </span>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Assigned Batches" icon={<Icons.GraduationCap className="h-4 w-4 text-accent" />}>
            <div className="space-y-2">
              {batches.map((batch) => (
                <div key={batch} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <Icons.GraduationCap className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{batch}</p>
                    <p className="text-xs text-muted-foreground">
                      {teacherCourses.filter((c) => c.batch === batch).length} courses
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Column — Courses & Performance */}
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Bio" icon={<Icons.FileText className="h-4 w-4 text-primary" />}>
            <p className="text-sm leading-relaxed text-muted-foreground">{teacherProfile.bio}</p>
          </SectionCard>

          <SectionCard title="Assigned Courses" icon={<Icons.BookOpen className="h-4 w-4 text-secondary" />}>
            <div className="space-y-2">
              {teacherCourses.map((course) => (
                <div key={course.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icons.BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.batch} · {course.students} students</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Performance Summary" icon={<Icons.BarChart3 className="h-4 w-4 text-success" />}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-success/20 bg-success/5 p-4 text-center">
                <p className="text-2xl font-bold text-success">4.8</p>
                <p className="text-xs text-muted-foreground">Student Rating</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-2xl font-bold text-primary">95%</p>
                <p className="text-xs text-muted-foreground">On-Time Rate</p>
              </div>
              <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4 text-center">
                <p className="text-2xl font-bold text-secondary">27h</p>
                <p className="text-xs text-muted-foreground">Weekly Hours</p>
              </div>
              <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 text-center">
                <p className="text-2xl font-bold text-warning">42</p>
                <p className="text-xs text-muted-foreground">Uploads</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
