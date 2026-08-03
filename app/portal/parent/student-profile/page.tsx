'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { childProfile, feeSummary } from '@/lib/portal/parent-data';
import { certificates, courses } from '@/lib/portal/data';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function ParentStudentProfilePage() {
  return (
    <>
      <PageHeader title="Student Profile" description="Your child's complete academic and personal overview.">
        <Button asChild variant="outline" size="sm">
          <Link href="/portal/parent/settings">
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
              <AvatarImage src={childProfile.avatar} alt={childProfile.name} />
              <AvatarFallback className="text-xl font-bold">AS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{childProfile.name}</h2>
              <p className="text-sm text-muted-foreground">{childProfile.email}</p>
            </div>
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
              <p className="text-2xl font-bold text-foreground">{childProfile.enrolledCourses}</p>
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
              <p className="text-2xl font-bold text-foreground">{childProfile.attendance}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Icons.Award className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{childProfile.overallScore}%</p>
              <p className="text-xs text-muted-foreground">Overall Score</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Icons.CreditCard className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{childProfile.pendingFees}</p>
              <p className="text-xs text-muted-foreground">Pending Fees</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column — Basic Info */}
        <div className="space-y-6 lg:col-span-1">
          <SectionCard title="Basic Information" icon={<Icons.User className="h-4 w-4 text-primary" />}>
            <dl className="space-y-3">
              {[
                { label: 'Roll Number', value: childProfile.rollNumber },
                { label: 'Grade', value: childProfile.grade },
                { label: 'Section', value: childProfile.section },
                { label: 'Institution', value: childProfile.institution },
                { label: 'Date of Birth', value: new Date(childProfile.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                { label: 'Blood Group', value: childProfile.bloodGroup },
                { label: 'Admission Date', value: new Date(childProfile.admissionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
                { label: 'Email', value: childProfile.email },
                { label: 'Phone', value: childProfile.phone },
                { label: 'Address', value: childProfile.address },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>

          <SectionCard title="Parent Details" icon={<Icons.Users className="h-4 w-4 text-secondary" />}>
            <dl className="space-y-3">
              {[
                { label: 'Name', value: childProfile.parentName },
                { label: 'Relation', value: childProfile.parentRelation },
                { label: 'Phone', value: childProfile.parentPhone },
                { label: 'Email', value: childProfile.parentEmail },
                { label: 'Occupation', value: childProfile.parentOccupation },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>

          <SectionCard title="Emergency Contact" icon={<Icons.Phone className="h-4 w-4 text-destructive" />}>
            <dl className="space-y-3">
              {[
                { label: 'Name', value: childProfile.emergencyContact.name },
                { label: 'Relation', value: childProfile.emergencyContact.relation },
                { label: 'Phone', value: childProfile.emergencyContact.phone },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>
        </div>

        {/* Right Column — Academic Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Attendance Summary */}
          <SectionCard title="Attendance Summary" icon={<Icons.CalendarCheck className="h-4 w-4 text-success" />}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-success/20 bg-success/5 p-4 text-center">
                <p className="text-2xl font-bold text-success">91%</p>
                <p className="text-xs text-muted-foreground">Overall</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">142</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Late</p>
              </div>
            </div>
          </SectionCard>

          {/* Academic Summary */}
          <SectionCard title="Academic Summary" icon={<Icons.Award className="h-4 w-4 text-primary" />}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-2xl font-bold text-primary">88%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">A</p>
                <p className="text-xs text-muted-foreground">Grade</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">#3</p>
                <p className="text-xs text-muted-foreground">Class Rank</p>
              </div>
              <div className="rounded-lg border border-border p-4 text-center">
                <p className="text-2xl font-bold text-foreground">6</p>
                <p className="text-xs text-muted-foreground">Tests Done</p>
              </div>
            </div>
          </SectionCard>

          {/* Enrolled Courses */}
          <SectionCard title="Enrolled Courses" icon={<Icons.BookOpen className="h-4 w-4 text-secondary" />}>
            <div className="space-y-2">
              {courses.slice(0, 5).map((course) => (
                <div key={course.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icons.BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.instructor}</p>
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

          {/* Certificates */}
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

          {/* Fee Summary */}
          <SectionCard title="Fee Summary" icon={<Icons.CreditCard className="h-4 w-4 text-warning" />}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-success/20 bg-success/5 p-4 text-center">
                <p className="text-2xl font-bold text-success">{formatCurrency(feeSummary.totalPaid)}</p>
                <p className="text-xs text-muted-foreground">Total Paid</p>
              </div>
              <div className="rounded-lg border border-warning/20 bg-warning/5 p-4 text-center">
                <p className="text-2xl font-bold text-warning">{formatCurrency(feeSummary.totalPending)}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-3 w-full">
              <Link href="/portal/parent/fees">View Fee Details</Link>
            </Button>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
