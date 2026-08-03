'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { MonthlyProgressChart, ResultAnalysisChart, FeeHistoryChart } from '@/components/portal/shared/parent-charts';
import { AttendanceTrendChart, DonutChart, SubjectPerformanceChart } from '@/components/portal/shared/charts';
import {
  studentGrowthData, enrollmentTrendData, revenueData, attendanceTrendData,
  coursePopularityData, gradeDistributionData, websiteVisitsData, systemUsageData, activeUsersData,
} from '@/lib/portal/admin-data';

export default function AdminAnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Comprehensive insights across the institution." />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={450} icon="GraduationCap" accent="primary" trend={{ value: '5%', positive: true }} />
        <StatCard label="Total Revenue" value="₹25.2L" icon="TrendingUp" accent="success" trend={{ value: '12%', positive: true }} />
        <StatCard label="Avg Attendance" value="94%" icon="CalendarCheck" accent="secondary" trend={{ value: '2%', positive: true }} />
        <StatCard label="Website Visits" value="9.1K" icon="Globe" accent="warning" trend={{ value: '8%', positive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Student Growth" icon={<Icons.TrendingUp className="h-4 w-4 text-primary" />}>
          <MonthlyProgressChart data={studentGrowthData.map((d) => ({ month: d.month, score: d.total, attendance: 450 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Enrollment Trend" icon={<Icons.GraduationCap className="h-4 w-4 text-success" />}>
          <ResultAnalysisChart data={enrollmentTrendData.map((d) => ({ subject: d.month, scored: d.students, total: 500 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Revenue Trend" icon={<Icons.Receipt className="h-4 w-4 text-secondary" />}>
          <FeeHistoryChart data={revenueData.map((d) => ({ month: d.month, paid: d.revenue, pending: Math.round(d.revenue * 0.1) })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Attendance Trend" icon={<Icons.CalendarCheck className="h-4 w-4 text-success" />}>
          <AttendanceTrendChart data={attendanceTrendData as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Course Popularity" icon={<Icons.BookOpen className="h-4 w-4 text-primary" />}>
          <SubjectPerformanceChart data={coursePopularityData.map((d) => ({ subject: d.subject, score: d.students, average: 50 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Grade Distribution" icon={<Icons.Award className="h-4 w-4 text-secondary" />}>
          <DonutChart data={gradeDistributionData} />
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Website Visits (Weekly)" icon={<Icons.Globe className="h-4 w-4 text-accent" />}>
          <SubjectPerformanceChart data={websiteVisitsData.map((d) => ({ subject: d.day, score: d.visits, average: 1000 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Active Users (Hourly)" icon={<Icons.Users className="h-4 w-4 text-primary" />}>
          <ResultAnalysisChart data={activeUsersData.map((d) => ({ subject: d.hour, scored: d.users, total: 200 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard title="System Usage" icon={<Icons.Server className="h-4 w-4 text-warning" />}>
          <DonutChart data={systemUsageData} />
        </SectionCard>
      </div>
    </>
  );
}
