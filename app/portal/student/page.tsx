'use client';

import Link from 'next/link';
import Image from 'next/image';
import * as Icons from 'lucide-react';
import { getIcon } from '@/lib/portal/icons';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { ProgressCard } from '@/components/portal/shared/progress-card';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { WeeklyProgressChart } from '@/components/portal/shared/charts';
import { CalendarWidget } from '@/components/portal/shared/calendar-widget';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  studentProfile,
  courses,
  tests,
  assignments,
  notifications,
  activities,
  attendanceSummary,
  performanceData,
  timetable,
  calendarEvents,
} from '@/lib/portal/data';

const quickActions = [
  { title: 'Continue Learning', href: '/portal/student/courses', icon: 'PlayCircle', accent: 'primary' as const },
  { title: 'Take a Test', href: '/portal/student/tests', icon: 'Timer', accent: 'secondary' as const },
  { title: 'Submit Homework', href: '/portal/student/homework', icon: 'Pencil', accent: 'accent' as const },
  { title: 'View Notes', href: '/portal/student/notes', icon: 'FileText', accent: 'success' as const },
];

const today = 'Monday';
const todayClasses = timetable.filter((t) => t.day === today);
const upcomingTests = tests.filter((t) => t.type === 'upcoming' || t.type === 'mock').slice(0, 3);
const pendingAssignments = assignments.filter((a) => a.status !== 'graded');
const recentNotifications = notifications.slice(0, 4);
const inProgressCourses = courses.filter((c) => c.progress < 100).slice(0, 3);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader title={`Welcome back, ${studentProfile.name.split(' ')[0]}!`} description="Here's what's happening with your studies today.">
        <Button asChild variant="outline" size="sm">
          <Link href="/portal/student/timetable">
            <Icons.CalendarDays className="mr-2 h-4 w-4" />
            View Timetable
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/portal/student/courses">
            <Icons.BookOpen className="mr-2 h-4 w-4" />
            My Courses
          </Link>
        </Button>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Enrolled Courses" value={studentProfile.enrolledCourses} icon="BookOpen" accent="primary" trend={{ value: '2', positive: true }} />
        <StatCard label="Attendance" value={`${attendanceSummary.overall}%`} icon="CalendarCheck" accent="success" trend={{ value: '3%', positive: true }} />
        <StatCard label="Pending Assignments" value={pendingAssignments.length} icon="ClipboardList" accent="warning" />
        <StatCard label="Upcoming Tests" value={upcomingTests.length} icon="Timer" accent="destructive" />
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = getIcon(action.icon);
          const accentClass = {
            primary: 'bg-primary/10 text-primary',
            secondary: 'bg-secondary/10 text-secondary',
            accent: 'bg-accent/10 text-accent',
            success: 'bg-success/10 text-success',
          };
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
          {/* Continue Learning */}
          <SectionCard
            title="Continue Learning"
            icon={<Icons.PlayCircle className="h-4 w-4 text-primary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/student/courses">View all</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {inProgressCourses.map((course) => (
                <Link
                  key={course.id}
                  href="/portal/student/lectures"
                  className="group flex items-center gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                      <Icons.Play className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-foreground">{course.title}</h4>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{course.lastWatched}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </SectionCard>

          {/* Today's Classes */}
          <SectionCard
            title="Today's Classes"
            icon={<Icons.CalendarDays className="h-4 w-4 text-accent" />}
          >
            <div className="space-y-2">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex w-14 shrink-0 flex-col items-center text-xs font-medium text-muted-foreground">
                    <span>{cls.startTime}</span>
                    <span className="text-muted-foreground/60">{cls.endTime}</span>
                  </div>
                  <div className="h-8 w-1 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{cls.subject}</p>
                    <p className="text-xs text-muted-foreground">{cls.instructor} · Room {cls.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Performance Summary */}
          <SectionCard
            title="Weekly Study Progress"
            icon={<Icons.TrendingUp className="h-4 w-4 text-success" />}
          >
            <WeeklyProgressChart data={performanceData.weeklyProgress} />
          </SectionCard>

          {/* Course Progress */}
          <SectionCard
            title="Course Progress"
            icon={<Icons.BarChart3 className="h-4 w-4 text-secondary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/student/courses">View all</Link>
              </Button>
            }
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {courses.slice(0, 4).map((course) => (
                <ProgressCard
                  key={course.id}
                  title={course.subject}
                  subtitle={course.title}
                  progress={course.progress}
                  current={`${course.completedChapters}`}
                  total={`${course.chapters}`}
                />
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Tests */}
          <SectionCard
            title="Upcoming Tests"
            icon={<Icons.Timer className="h-4 w-4 text-destructive" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/student/tests">View all</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {upcomingTests.map((test) => (
                <div key={test.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{test.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{test.subject}</p>
                    </div>
                    <StatusBadge status={test.type} variant="info" />
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icons.CalendarDays className="h-3 w-3" />
                      {formatDate(test.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Clock className="h-3 w-3" />
                      {test.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Attendance Percentage */}
          <SectionCard
            title="Attendance"
            icon={<Icons.CalendarCheck className="h-4 w-4 text-success" />}
          >
            <div className="flex flex-col items-center py-2">
              <div className="relative h-32 w-32">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="hsl(var(--success))"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(attendanceSummary.overall / 100) * 314} 314`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">{attendanceSummary.overall}%</span>
                  <span className="text-xs text-muted-foreground">Present</span>
                </div>
              </div>
              <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-bold text-success">{attendanceSummary.present}</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-destructive">{attendanceSummary.absent}</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-warning">{attendanceSummary.late}</p>
                  <p className="text-xs text-muted-foreground">Late</p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Assignment Status */}
          <SectionCard
            title="Assignment Status"
            icon={<Icons.ClipboardList className="h-4 w-4 text-warning" />}
          >
            <div className="space-y-2">
              {pendingAssignments.slice(0, 3).map((assignment) => (
                <div key={assignment.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                    <Icons.ClipboardList className="h-4 w-4 text-warning" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">Due {formatDate(assignment.dueDate)}</p>
                  </div>
                  <StatusBadge
                    status={assignment.status.replace('-', ' ')}
                    variant={assignment.status === 'in-progress' ? 'info' : 'muted'}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Recent Notifications */}
          <SectionCard
            title="Recent Notifications"
            icon={<Icons.Bell className="h-4 w-4 text-primary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/student/notifications">View all</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {recentNotifications.map((notif) => (
                <div key={notif.id} className={cn('flex gap-3 rounded-lg p-2', !notif.read && 'bg-primary/5')}>
                  <div className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', notif.read ? 'bg-muted' : 'bg-primary')} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{notif.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{notif.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground/70">{formatTime(notif.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Calendar Widget */}
          <SectionCard
            title="Calendar"
            icon={<Icons.CalendarDays className="h-4 w-4 text-primary" />}
          >
            <CalendarWidget events={calendarEvents} />
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard
            title="Recent Activity"
            icon={<Icons.Activity className="h-4 w-4 text-accent" />}
          >
            <div className="space-y-3">
              {activities.slice(0, 5).map((activity) => {
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
                      <p className="text-xs text-muted-foreground/70">{formatTime(activity.timestamp)}</p>
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
