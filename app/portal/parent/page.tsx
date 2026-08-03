'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { getIcon } from '@/lib/portal/icons';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { MonthlyProgressChart } from '@/components/portal/shared/parent-charts';
import { AttendanceTrendChart } from '@/components/portal/shared/charts';
import { ParentCalendarWidget } from '@/components/portal/shared/parent-calendar-widget';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  parentProfile,
  childSummary,
  childProfile,
  examResults,
  feeSummary,
  teacherFeedback,
  parentNotifications,
  parentActivities,
  parentCalendarEvents,
  monthlyProgress,
  monthlyAttendance,
} from '@/lib/portal/parent-data';

const quickActions = [
  { title: 'View Results', href: '/portal/parent/results', icon: 'Award', accent: 'primary' as const },
  { title: 'Check Attendance', href: '/portal/parent/attendance', icon: 'CalendarCheck', accent: 'success' as const },
  { title: 'Pay Fees', href: '/portal/parent/fees', icon: 'CreditCard', accent: 'warning' as const },
  { title: 'Progress Reports', href: '/portal/parent/progress-reports', icon: 'TrendingUp', accent: 'secondary' as const },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

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

const latestExam = examResults[0];

export default function ParentDashboardPage() {
  const unreadCount = parentNotifications.filter((n) => !n.read).length;
  const recentFeedback = teacherFeedback.slice(0, 3);
  const recentNotifications = parentNotifications.slice(0, 4);

  return (
    <>
      <PageHeader
        title={`Welcome, ${parentProfile.name.split(' ')[0]}!`}
        description="Here's an overview of your child's academic progress."
      >
        <Button asChild variant="outline" size="sm">
          <Link href="/portal/parent/student-profile">
            <Icons.User className="mr-2 h-4 w-4" />
            Student Profile
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/portal/parent/progress-reports">
            <Icons.FileText className="mr-2 h-4 w-4" />
            Progress Report
          </Link>
        </Button>
      </PageHeader>

      {/* Welcome / Student Overview Card */}
      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
        <div className="gradient-brand-soft p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-card">
                <AvatarImage src={childSummary.avatar} alt={childSummary.name} />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-foreground">{childSummary.name}</h2>
                <p className="text-sm text-muted-foreground">{childSummary.grade} · {childSummary.section}</p>
                <p className="text-xs text-muted-foreground">{childSummary.institution}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{childSummary.overallScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{childSummary.attendance}%</p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">#{childSummary.rank}</p>
                <p className="text-xs text-muted-foreground">Class Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Attendance" value={`${childSummary.attendance}%`} icon="CalendarCheck" accent="success" trend={{ value: '3%', positive: true }} />
        <StatCard label="Overall Score" value={`${childSummary.overallScore}%`} icon="Award" accent="primary" trend={{ value: '4%', positive: true }} />
        <StatCard label="Pending Homework" value={childSummary.pendingHomework} icon="Pencil" accent="warning" />
        <StatCard label="Upcoming Exams" value={childSummary.upcomingExams} icon="Timer" accent="destructive" />
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = getIcon(action.icon);
          const accentClass = {
            primary: 'bg-primary/10 text-primary',
            secondary: 'bg-secondary/10 text-secondary',
            success: 'bg-success/10 text-success',
            warning: 'bg-warning/10 text-warning',
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
          {/* Academic Performance */}
          <SectionCard
            title="Academic Performance"
            icon={<Icons.Award className="h-4 w-4 text-primary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/parent/results">View details</Link>
              </Button>
            }
          >
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xl font-bold text-foreground">{latestExam.overallPercentage}%</p>
                <p className="text-xs text-muted-foreground">Latest Score</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xl font-bold text-primary">Grade {latestExam.overallGrade}</p>
                <p className="text-xs text-muted-foreground">Overall Grade</p>
              </div>
              <div className="rounded-lg border border-border p-3 text-center">
                <p className="text-xl font-bold text-secondary">#{latestExam.overallRank}</p>
                <p className="text-xs text-muted-foreground">Class Rank</p>
              </div>
            </div>
            <div className="space-y-2">
              {latestExam.subjects.slice(0, 4).map((s) => (
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
                  <span className="w-12 shrink-0 text-right text-sm font-medium text-foreground">{s.percentage}%</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Monthly Progress */}
          <SectionCard
            title="Monthly Progress"
            icon={<Icons.TrendingUp className="h-4 w-4 text-success" />}
          >
            <MonthlyProgressChart data={monthlyProgress as unknown as Record<string, unknown>[]} />
          </SectionCard>

          {/* Pending Homework Summary */}
          <SectionCard
            title="Pending Homework"
            icon={<Icons.Pencil className="h-4 w-4 text-warning" />}
          >
            <div className="space-y-2">
              {[
                { title: 'Solve 15 Problems on Projectile Motion', subject: 'Physics', dueDate: 'Aug 5', priority: 'high' },
                { title: 'Write Lab Report: Acid-Base Titration', subject: 'Chemistry', dueDate: 'Aug 7', priority: 'medium' },
                { title: 'Build a Simple Calculator in Python', subject: 'Computer Science', dueDate: 'Aug 10', priority: 'high' },
              ].map((hw, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                    <Icons.Pencil className="h-4 w-4 text-warning" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{hw.title}</p>
                    <p className="text-xs text-muted-foreground">{hw.subject} · Due {hw.dueDate}</p>
                  </div>
                  <StatusBadge status={hw.priority} variant={hw.priority === 'high' ? 'destructive' : 'warning'} />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Performance Summary */}
          <SectionCard
            title="Performance Summary"
            icon={<Icons.BarChart3 className="h-4 w-4 text-secondary" />}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-muted-foreground">Best Subject</p>
                <p className="mt-1 text-lg font-bold text-success">English — 96%</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-muted-foreground">Needs Focus</p>
                <p className="mt-1 text-lg font-bold text-warning">Biology — 87%</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-muted-foreground">Study Hours (This Week)</p>
                <p className="mt-1 text-lg font-bold text-primary">35 hours</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-muted-foreground">Tests Completed</p>
                <p className="mt-1 text-lg font-bold text-secondary">6 tests</p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <SectionCard
            title="Upcoming Exams"
            icon={<Icons.Timer className="h-4 w-4 text-destructive" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/parent/results">View all</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {[
                { title: 'Physics Unit Test — Thermodynamics', date: 'Aug 8', duration: '90 min' },
                { title: 'Chemistry Mock Test — Full Syllabus', date: 'Aug 12', duration: '180 min' },
              ].map((exam, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <p className="truncate text-sm font-semibold text-foreground">{exam.title}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icons.CalendarDays className="h-3 w-3" />
                      {exam.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Clock className="h-3 w-3" />
                      {exam.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Upcoming Classes */}
          <SectionCard
            title="Today's Classes"
            icon={<Icons.CalendarDays className="h-4 w-4 text-accent" />}
          >
            <div className="space-y-2">
              {[
                { subject: 'Physics', time: '08:00 - 09:00', room: '204' },
                { subject: 'Mathematics', time: '09:15 - 10:15', room: '108' },
                { subject: 'Chemistry', time: '10:30 - 11:30', room: '205' },
              ].map((cls, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex w-14 shrink-0 flex-col items-center text-xs font-medium text-muted-foreground">
                    <span>{cls.time.split(' - ')[0]}</span>
                    <span className="text-muted-foreground/60">{cls.time.split(' - ')[1]}</span>
                  </div>
                  <div className="h-8 w-1 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{cls.subject}</p>
                    <p className="text-xs text-muted-foreground">Room {cls.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Pending Fees */}
          <SectionCard
            title="Pending Fees"
            icon={<Icons.CreditCard className="h-4 w-4 text-warning" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/parent/fees">View all</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-warning/20 bg-warning/5 p-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Next Payment Due</p>
                  <p className="text-xs text-muted-foreground">{new Date(feeSummary.nextDueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                </div>
                <p className="text-lg font-bold text-warning">{formatCurrency(feeSummary.nextDueAmount)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-success/20 bg-success/5 p-3 text-center">
                  <p className="text-sm font-bold text-success">{formatCurrency(feeSummary.totalPaid)}</p>
                  <p className="text-xs text-muted-foreground">Total Paid</p>
                </div>
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-center">
                  <p className="text-sm font-bold text-destructive">{formatCurrency(feeSummary.totalOverdue)}</p>
                  <p className="text-xs text-muted-foreground">Overdue</p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Teacher Feedback Summary */}
          <SectionCard
            title="Teacher Feedback"
            icon={<Icons.MessageSquare className="h-4 w-4 text-accent" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/parent/teacher-feedback">View all</Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {recentFeedback.map((fb) => (
                <div key={fb.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={fb.teacherAvatar} alt={fb.teacherName} />
                    <AvatarFallback>{fb.teacherName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{fb.teacherName}</p>
                      <StatusBadge status={fb.priority} variant={fb.priority === 'high' ? 'destructive' : fb.priority === 'medium' ? 'warning' : 'success'} />
                    </div>
                    <p className="text-xs text-muted-foreground">{fb.subject}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{fb.feedback}</p>
                  </div>
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
                <Link href="/portal/parent/notifications">View all</Link>
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
                    <p className="mt-1 text-xs text-muted-foreground/70">{formatTimestamp(notif.timestamp)}</p>
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
            <ParentCalendarWidget events={parentCalendarEvents} />
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard
            title="Recent Activity"
            icon={<Icons.Activity className="h-4 w-4 text-accent" />}
          >
            <div className="space-y-3">
              {parentActivities.slice(0, 5).map((activity) => {
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
