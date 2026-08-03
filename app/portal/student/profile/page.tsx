'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { ProgressCard } from '@/components/portal/shared/progress-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { studentProfile, courses, certificates, feeRecords, attendanceSummary } from '@/lib/portal/data';

export default function ProfilePage() {
  const paidFees = feeRecords.filter((f) => f.status === 'paid').length;
  const pendingFees = feeRecords.filter((f) => f.status !== 'paid').length;

  return (
    <>
      <PageHeader title="Profile" description="Your student profile and academic overview.">
        <Button asChild variant="outline" size="sm">
          <Link href="/portal/student/settings">
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
              <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
              <AvatarFallback className="text-xl font-bold">AS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{studentProfile.name}</h2>
              <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
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
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icons.BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{studentProfile.enrolledCourses}</p>
              <p className="text-xs text-muted-foreground">Enrolled Courses</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Icons.CalendarCheck className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{attendanceSummary.overall}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Icons.BadgeCheck className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{certificates.length}</p>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Icons.CreditCard className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingFees}</p>
              <p className="text-xs text-muted-foreground">Pending Fees</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Basic Information */}
        <div className="lg:col-span-1">
          <SectionCard title="Basic Information" icon={<Icons.User className="h-4 w-4 text-primary" />}>
            <dl className="space-y-3">
              {[
                { label: 'Roll Number', value: studentProfile.rollNumber },
                { label: 'Grade', value: studentProfile.grade },
                { label: 'Section', value: studentProfile.section },
                { label: 'Institution', value: studentProfile.institution },
                { label: 'Phone', value: studentProfile.phone },
                { label: 'Joined', value: new Date(studentProfile.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
                { label: 'Parent', value: studentProfile.parentName },
                { label: 'Parent Phone', value: studentProfile.parentPhone },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        </div>

        {/* Enrolled Courses & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Enrolled Courses" icon={<Icons.BookOpen className="h-4 w-4 text-secondary" />}>
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

          {/* Certificates Summary */}
          <SectionCard title="Certificates" icon={<Icons.BadgeCheck className="h-4 w-4 text-success" />}>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
                    <Icons.BadgeCheck className="h-4 w-4 text-success" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{cert.title}</p>
                    <p className="text-xs text-muted-foreground">Grade {cert.grade} · {new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  </div>
                  <StatusBadge status="earned" variant="success" />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Fee Status Summary */}
          <SectionCard title="Fee Status" icon={<Icons.CreditCard className="h-4 w-4 text-warning" />}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-success/20 bg-success/5 p-4 text-center">
                <p className="text-2xl font-bold text-success">{paidFees}</p>
                <p className="text-xs text-muted-foreground">Paid Invoices</p>
              </div>
              <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 text-center">
                <p className="text-2xl font-bold text-warning">{pendingFees}</p>
                <p className="text-xs text-muted-foreground">Pending / Overdue</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-3 w-full">
              <Link href="/portal/student/fees">View Fee Details</Link>
            </Button>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
