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
  adminProfile,
  dashboardStats,
  recentPayments,
  adminNotices,
  adminActivities,
  loginActivities,
  systemHealth,
  adminCalendarEvents,
  enrollmentTrendData,
  revenueData,
  attendanceTrendData,
  studentGrowthData,
  gradeDistributionData,
  websiteVisitsData,
  systemUsageData,
} from '@/lib/portal/admin-data';
import { MonthlyProgressChart, ResultAnalysisChart, FeeHistoryChart } from '@/components/portal/shared/parent-charts';
import { AttendanceTrendChart, DonutChart, SubjectPerformanceChart } from '@/components/portal/shared/charts';

const quickActions = [
  { title: 'Add Student', href: '/portal/admin/students', icon: 'UserPlus', accent: 'primary' as const },
  { title: 'Add Teacher', href: '/portal/admin/teachers', icon: 'Users', accent: 'secondary' as const },
  { title: 'Create Course', href: '/portal/admin/courses', icon: 'BookOpen', accent: 'success' as const },
  { title: 'Publish Notice', href: '/portal/admin/notices', icon: 'Megaphone', accent: 'warning' as const },
];

const accentClass = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
};

const healthStatusVariant = {
  operational: 'success',
  degraded: 'warning',
  down: 'destructive',
} as const;

const paymentStatusVariant = {
  success: 'success',
  pending: 'warning',
  failed: 'destructive',
} as const;

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

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader title={`Welcome, ${adminProfile.name.split(' ')[0]}!`} description="Here's your institution overview for today.">
        <Button asChild variant="outline" size="sm">
          <Link href="/portal/admin/reports">
            <Icons.FileBarChart className="mr-2 h-4 w-4" />
            Reports
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/portal/admin/analytics">
            <Icons.BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Link>
        </Button>
      </PageHeader>

      {/* Welcome Card */}
      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-card">
        <div className="gradient-brand-soft p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-card">
                <AvatarImage src={adminProfile.avatar} alt={adminProfile.name} />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-foreground">{adminProfile.name}</h2>
                <p className="text-sm text-muted-foreground">{adminProfile.role} — Shemixs Institution</p>
                <p className="text-xs text-muted-foreground">Last login: {new Date(adminProfile.lastLogin).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{dashboardStats.totalStudents}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{dashboardStats.totalTeachers}</p>
                <p className="text-xs text-muted-foreground">Teachers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{dashboardStats.totalCourses}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">{dashboardStats.totalBatches}</p>
                <p className="text-xs text-muted-foreground">Batches</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={dashboardStats.totalStudents} icon="GraduationCap" accent="primary" trend={{ value: '5%', positive: true }} />
        <StatCard label="Total Teachers" value={dashboardStats.totalTeachers} icon="Users" accent="success" />
        <StatCard label="Total Parents" value={dashboardStats.totalParents} icon="HeartHandshake" accent="secondary" />
        <StatCard label="Total Courses" value={dashboardStats.totalCourses} icon="BookOpen" accent="warning" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Attendance" value={`${Math.round((dashboardStats.todayAttendance / dashboardStats.totalStudents) * 100)}%`} icon="CalendarCheck" accent="success" trend={{ value: '2%', positive: true }} />
        <StatCard label="Today's Revenue" value={formatCurrency(dashboardStats.todayRevenue)} icon="Receipt" accent="primary" trend={{ value: '8%', positive: true }} />
        <StatCard label="Pending Admissions" value={dashboardStats.pendingAdmissions} icon="UserPlus" accent="warning" />
        <StatCard label="Pending Fees" value={dashboardStats.pendingFees} icon="CreditCard" accent="destructive" />
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

      {/* Charts Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Enrollment Trend" icon={<Icons.TrendingUp className="h-4 w-4 text-primary" />}>
          <MonthlyProgressChart data={enrollmentTrendData.map((d) => ({ month: d.month, score: d.students, attendance: 450 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Revenue Overview" icon={<Icons.Receipt className="h-4 w-4 text-success" />}>
          <FeeHistoryChart data={revenueData.map((d) => ({ month: d.month, paid: d.revenue, pending: 0 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Attendance Trend" icon={<Icons.CalendarCheck className="h-4 w-4 text-success" />}>
          <AttendanceTrendChart data={attendanceTrendData as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Student Growth" icon={<Icons.TrendingUp className="h-4 w-4 text-primary" />}>
          <ResultAnalysisChart data={studentGrowthData.map((d) => ({ subject: d.month, scored: d.newStudents, total: 20 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="Grade Distribution" icon={<Icons.Award className="h-4 w-4 text-secondary" />}>
          <DonutChart data={gradeDistributionData} />
        </SectionCard>
        <SectionCard title="Website Visits" icon={<Icons.Globe className="h-4 w-4 text-accent" />}>
          <SubjectPerformanceChart data={websiteVisitsData.map((d) => ({ subject: d.day, score: d.visits, average: 1000 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="System Usage" icon={<Icons.Server className="h-4 w-4 text-warning" />}>
          <DonutChart data={systemUsageData} />
        </SectionCard>
      </div>

      {/* Main Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Payments */}
          <SectionCard
            title="Recent Payments"
            icon={<Icons.Receipt className="h-4 w-4 text-primary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/admin/payments">View all</Link>
              </Button>
            }
          >
            <div className="space-y-2">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icons.Receipt className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{payment.studentName}</p>
                    <p className="text-xs text-muted-foreground">{payment.method} · {new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{formatCurrency(payment.amount)}</p>
                    <StatusBadge status={payment.status} variant={paymentStatusVariant[payment.status]} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Latest Notices */}
          <SectionCard
            title="Latest Notices"
            icon={<Icons.Megaphone className="h-4 w-4 text-secondary" />}
            action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/portal/admin/notices">View all</Link>
              </Button>
            }
          >
            <div className="space-y-2">
              {adminNotices.filter((n) => n.status === 'published').slice(0, 4).map((notice) => (
                <div key={notice.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <Icons.Megaphone className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{notice.title}</p>
                      {notice.pinned && <Icons.Pin className="h-3 w-3 text-warning" />}
                    </div>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{notice.content}</p>
                    <p className="mt-1 text-xs text-muted-foreground/70">{notice.publishedAt ? new Date(notice.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Draft'}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* System Health */}
          <SectionCard title="System Health" icon={<Icons.Server className="h-4 w-4 text-success" />}>
            <div className="grid gap-3 sm:grid-cols-2">
              {systemHealth.map((item) => (
                <div key={item.service} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{item.service}</p>
                    <StatusBadge status={item.status} variant={healthStatusVariant[item.status]} />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Uptime: {item.uptime}</span>
                    <span>Latency: {item.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Recent Login Activity */}
          <SectionCard title="Recent Login Activity" icon={<Icons.LogIn className="h-4 w-4 text-warning" />}>
            <div className="space-y-2">
              {loginActivities.map((login) => (
                <div key={login.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={login.avatar} alt={login.user} />
                    <AvatarFallback>{login.user.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{login.user}</p>
                    <p className="text-xs text-muted-foreground">{login.role} · {login.device} · {login.ip}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{new Date(login.loginTime).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</p>
                    <StatusBadge status={login.status} variant={login.status === 'success' ? 'success' : 'destructive'} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pending Items */}
          <SectionCard title="Pending Items" icon={<Icons.Clock className="h-4 w-4 text-warning" />}>
            <div className="space-y-2">
              {[
                { label: 'Pending Admissions', value: dashboardStats.pendingAdmissions, href: '/portal/admin/admissions', icon: 'UserPlus', color: 'text-warning' },
                { label: 'Pending Fees', value: dashboardStats.pendingFees, href: '/portal/admin/fees', icon: 'CreditCard', color: 'text-destructive' },
                { label: 'Assignments Pending', value: dashboardStats.assignmentsPending, href: '/portal/admin/assignments', icon: 'Pencil', color: 'text-primary' },
                { label: 'Upcoming Exams', value: dashboardStats.upcomingExams, href: '/portal/admin/exams', icon: 'ClipboardList', color: 'text-secondary' },
              ].map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
                    <Icon className={cn('h-5 w-5', item.color)} />
                    <span className="flex-1 text-sm text-foreground">{item.label}</span>
                    <span className="text-lg font-bold text-foreground">{item.value}</span>
                  </Link>
                );
              })}
            </div>
          </SectionCard>

          {/* Latest Activities */}
          <SectionCard title="Latest Activities" icon={<Icons.Activity className="h-4 w-4 text-accent" />}>
            <div className="space-y-3">
              {adminActivities.map((activity) => {
                const Icon = getIcon(activity.icon);
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>{activity.user.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span className="text-muted-foreground">{activity.action.toLowerCase()}</span>{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground/70">{formatTimestamp(activity.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Calendar Widget */}
          <SectionCard title="Institution Calendar" icon={<Icons.CalendarDays className="h-4 w-4 text-primary" />}>
            <ParentCalendarWidget events={adminCalendarEvents as unknown as import('@/lib/portal/parent-types').ParentCalendarEvent[]} />
          </SectionCard>

          {/* Storage Usage */}
          <SectionCard title="Storage Usage" icon={<Icons.HardDrive className="h-4 w-4 text-secondary" />}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Used</span>
                <span className="font-semibold text-foreground">68 GB / 100 GB</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: '68%' }} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Videos: 32 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  <span className="text-muted-foreground">Documents: 18 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Images: 12 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                  <span className="text-muted-foreground">Other: 6 GB</span>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
