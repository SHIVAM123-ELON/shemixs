'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { getIcon } from '@/lib/portal/icons';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { ParentCalendarWidget } from '@/components/portal/shared/parent-calendar-widget';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  teacherProfile,
  teacherCourses,
  todayClasses,
  liveClasses,
  studentRecords,
  assignments,
  testRecords,
  teacherNotifications,
  teacherActivities,
  recentUploads,
  weeklyTeaching,
  teacherCalendarEvents,
} from '@/lib/portal/teacher-data';

const quickActions = [
  { title: 'Upload Video', href: '/portal/teacher/upload-videos', icon: 'Video', accent: 'primary' as const },
  { title: 'Upload Notes', href: '/portal/teacher/upload-notes', icon: 'FileText', accent: 'secondary' as const },
  { title: 'Create Test', href: '/portal/teacher/create-test', icon: 'PlusCircle', accent: 'success' as const },
  { title: 'Take Attendance', href: '/portal/teacher/attendance', icon: 'CalendarCheck', accent: 'warning' as const },
];

const accentClass = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
};

function formatTimestamp(ts: string) {
  const date = new Date(ts);
  const now = new Date('2025-08-02T12:00:00');
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

const classStatusVariant = {
  upcoming: 'info',
  live: 'destructive',
  completed: 'success',
} as const;

const notifCategoryColor: Record<string, string> = {
  classes: 'bg-primary/10 text-primary',
  assignments: 'bg-warning/10 text-warning',
  tests: 'bg-destructive/10 text-destructive',
  results: 'bg-success/10 text-success',
  general: 'bg-accent/10 text-accent',
};

const notifCategoryIcon: Record<string, string> = {
  classes: 'Video',
  assignments: 'Pencil',
  tests: 'Timer',
  results: 'Award',
  general: 'Bell',
};

export default function TeacherDashboardPage() {
  const unreadCount = teacherNotifications.filter((n) => !n.read).length;
  const totalStudents = studentRecords.length;
  const pendingAssignments = assignments.filter((a) => a.status === 'active').length;
  const pendingEval = testRecords.filter((t) => t.status === 'completed' && t.submissions < t.totalStudents).length;
  const activeCourses = teacherCourses.filter((c) => c.status === 'active').length;
  const upcomingLive = liveClasses.filter((l) => l.status === 'upcoming').slice(0, 3);
  const recentNotifs = teacherNotifications.slice(0, 4);

  return (
    <>
      <PageHeader
        title={`Welcome, ${teacherProfile.name.split(' ')[1]}!`}
        description="Here's your teaching overview for today."
      >
        <Button asChild variant="outline" size="sm">
          <Link href="/portal/teacher/profile">
            <Icons.User className="mr-2 h-4 w-4" />
            My Profile
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/portal/teacher/create-test">
            <Icons.PlusCircle className="mr-2 h-4 w-4" />
            Create Test
          </Link>
        </Button>
      </PageHeader>

      {/* Welcome Card */}
      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
        <div className="gradient-brand-soft p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-card">
                <AvatarImage src={teacherProfile.avatar} alt={teacherProfile.name} />
                <AvatarFallback>PM</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-foreground">{teacherProfile.name}</h2>
                <p className="text-sm text-muted-foreground">{teacherProfile.department}</p>
                <p className="text-xs text-muted-foreground">{teacherProfile.qualification}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{activeCourses}</p>
                <p className="text-xs text-muted-foreground">Active Courses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{totalStudents}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{pendingAssignments}</p>
                <p className="text-xs text-muted-foreground">Pending Tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Courses" value={activeCourses} icon="BookOpen" accent="primary" />
        <StatCard label="Total Students" value={totalStudents} icon="Users" accent="success" />
        <StatCard label="Pending Assignments" value={pendingAssignments} icon="Pencil" accent="warning" />
        <StatCard label="Pending Evaluation" value={pendingEval} icon="ClipboardCheck" accent="destructive" />
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = getIcon(action.icon);
          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', accentClass[action.accent])}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{action.title}</p>
              </div>
              <Icons.ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Today's Classes */}
          <SectionCard
            title="Today's Classes"
            icon={<Icons.CalendarDays className="h-4 w-4 text-primary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/teacher/calendar">View calendar</Link>
              </Button>
            }
          >
            <div className="space-y-2">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex w-16 shrink-0 flex-col items-center text-xs font-medium text-muted-foreground">
                    <span>{cls.time.split(' - ')[0]}</span>
                    <span className="text-muted-foreground/60">{cls.time.split(' - ')[1]}</span>
                  </div>
                  <div className={cn('h-8 w-1 rounded-full', cls.status === 'live' ? 'bg-destructive' : cls.status === 'completed' ? 'bg-success' : 'bg-primary')} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{cls.topic}</p>
                    <p className="text-xs text-muted-foreground">{cls.subject} · Room {cls.room} · {cls.batch}</p>
                  </div>
                  <StatusBadge status={cls.status} variant={classStatusVariant[cls.status]} />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Upcoming Live Classes */}
          <SectionCard
            title="Upcoming Live Classes"
            icon={<Icons.Radio className="h-4 w-4 text-destructive" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/teacher/live-classes">View all</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {upcomingLive.map((lc) => (
                <div key={lc.id} className="rounded-lg border border-border p-3">
                  <p className="truncate text-sm font-semibold text-foreground">{lc.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icons.CalendarDays className="h-3 w-3" />
                      {new Date(lc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Clock className="h-3 w-3" />
                      {lc.time} · {lc.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Users className="h-3 w-3" />
                      {lc.batch}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Active Courses */}
          <SectionCard
            title="Active Courses"
            icon={<Icons.BookOpen className="h-4 w-4 text-secondary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/teacher/courses">View all</Link>
              </Button>
            }
          >
            <div className="space-y-2">
              {teacherCourses.filter((c) => c.status === 'active').slice(0, 4).map((course) => (
                <div key={course.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icons.BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.batch} · {course.students} students</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Recent Uploads */}
          <SectionCard
            title="Recent Uploads"
            icon={<Icons.Upload className="h-4 w-4 text-accent" />}
          >
            <div className="space-y-2">
              {recentUploads.map((upload) => {
                const Icon = upload.type === 'video' ? Icons.Video : Icons.FileText;
                return (
                  <div key={upload.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', upload.type === 'video' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary')}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{upload.title}</p>
                      <p className="text-xs text-muted-foreground">{upload.course} · {upload.size}</p>
                    </div>
                    <span className="text-xs text-muted-foreground/70">{formatTimestamp(upload.uploadedAt)}</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Student Performance Summary */}
          <SectionCard
            title="Student Performance Summary"
            icon={<Icons.BarChart3 className="h-4 w-4 text-success" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/teacher/analytics">View analytics</Link>
              </Button>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-success/20 bg-success/5 p-4 text-center">
                <p className="text-2xl font-bold text-success">{studentRecords.filter((s) => s.status === 'excellent').length}</p>
                <p className="text-xs text-muted-foreground">Excellent</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-2xl font-bold text-primary">{studentRecords.filter((s) => s.status === 'good').length}</p>
                <p className="text-xs text-muted-foreground">Good</p>
              </div>
              <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 text-center">
                <p className="text-2xl font-bold text-warning">{studentRecords.filter((s) => s.status === 'average').length}</p>
                <p className="text-xs text-muted-foreground">Average</p>
              </div>
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center">
                <p className="text-2xl font-bold text-destructive">{studentRecords.filter((s) => s.status === 'needs_attention').length}</p>
                <p className="text-xs text-muted-foreground">Needs Attention</p>
              </div>
            </div>
          </SectionCard>

          {/* Weekly Teaching Overview */}
          <SectionCard
            title="Weekly Teaching Overview"
            icon={<Icons.BarChart3 className="h-4 w-4 text-primary" />}
          >
            <div className="space-y-3">
              {weeklyTeaching.map((day) => (
                <div key={day.day} className="flex items-center gap-3">
                  <span className="w-10 shrink-0 text-sm font-medium text-muted-foreground">{day.day}</span>
                  <div className="h-6 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="flex h-full items-center justify-end rounded-full bg-primary px-2 text-xs font-medium text-primary-foreground"
                      style={{ width: `${(day.hours / 6) * 100}%` }}
                    >
                      {day.hours}h
                    </div>
                  </div>
                  <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">{day.classes} classes</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Attendance Summary */}
          <SectionCard
            title="Attendance Summary"
            icon={<Icons.CalendarCheck className="h-4 w-4 text-success" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/teacher/attendance">Mark attendance</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-success/20 bg-success/5 p-3 text-center">
                  <p className="text-xl font-bold text-success">40</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-center">
                  <p className="text-xl font-bold text-destructive">1</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
                <div className="rounded-lg border border-warning/20 bg-warning/5 p-3 text-center">
                  <p className="text-xl font-bold text-warning">1</p>
                  <p className="text-xs text-muted-foreground">Late</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Today&apos;s overall attendance: 95%</p>
            </div>
          </SectionCard>

          {/* Pending Test Evaluation */}
          <SectionCard
            title="Pending Test Evaluation"
            icon={<Icons.ClipboardCheck className="h-4 w-4 text-destructive" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/teacher/tests">View all</Link>
              </Button>
            }
          >
            <div className="space-y-2">
              {testRecords.filter((t) => t.status === 'completed').slice(0, 3).map((test) => (
                <div key={test.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
                    <Icons.Timer className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{test.title}</p>
                    <p className="text-xs text-muted-foreground">{test.submissions}/{test.totalStudents} submitted</p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/portal/teacher/publish-results">Evaluate</Link>
                  </Button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Notifications */}
          <SectionCard
            title="Notifications"
            icon={<Icons.Bell className="h-4 w-4 text-primary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/teacher/notifications">View all</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {recentNotifs.map((notif) => {
                const Icon = getIcon(notifCategoryIcon[notif.category]);
                return (
                  <div key={notif.id} className={cn('flex gap-3 rounded-lg p-2', !notif.read && 'bg-primary/5')}>
                    <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full', notifCategoryColor[notif.category])}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{notif.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{notif.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground/70">{formatTimestamp(notif.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Calendar Widget */}
          <SectionCard
            title="Calendar"
            icon={<Icons.CalendarDays className="h-4 w-4 text-primary" />}
          >
            <ParentCalendarWidget events={teacherCalendarEvents as unknown as import('@/lib/portal/parent-types').ParentCalendarEvent[]} />
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard
            title="Recent Activity"
            icon={<Icons.Activity className="h-4 w-4 text-accent" />}
          >
            <div className="space-y-3">
              {teacherActivities.slice(0, 5).map((activity) => {
                const Icon = getIcon(activity.icon);
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">
                        <span className="text-muted-foreground">{activity.action} </span>
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground/70">{formatTimestamp(activity.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
