'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { MonthlyProgressChart } from '@/components/portal/shared/parent-charts';
import { AttendanceTrendChart, SubjectPerformanceChart } from '@/components/portal/shared/charts';
import { ResultAnalysisChart, FeeHistoryChart } from '@/components/portal/shared/parent-charts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  studentPerformanceData,
  courseCompletionData,
  assignmentCompletionData,
  testPerformanceData,
  topStudents,
  attentionStudents,
  studentRecords,
} from '@/lib/portal/teacher-data';

const trendIcon = {
  up: { icon: Icons.TrendingUp, color: 'text-success' },
  down: { icon: Icons.TrendingDown, color: 'text-destructive' },
  stable: { icon: Icons.Minus, color: 'text-muted-foreground' },
};

export default function TeacherAnalyticsPage() {
  const avgScore = Math.round(studentRecords.reduce((sum, s) => sum + s.testScore, 0) / studentRecords.length);
  const avgAttendance = Math.round(studentRecords.reduce((sum, s) => sum + s.attendance, 0) / studentRecords.length);
  const avgAssignment = Math.round(studentRecords.reduce((sum, s) => sum + s.assignmentCompletion, 0) / studentRecords.length);
  const completionRate = Math.round(courseCompletionData.reduce((sum, c) => sum + c.completion, 0) / courseCompletionData.length);

  return (
    <>
      <PageHeader title="Student Analytics" description="Comprehensive insights into student performance and engagement." />

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg Test Score" value={`${avgScore}%`} icon="Award" accent="primary" trend={{ value: '4%', positive: true }} />
        <StatCard label="Avg Attendance" value={`${avgAttendance}%`} icon="CalendarCheck" accent="success" trend={{ value: '2%', positive: true }} />
        <StatCard label="Assignment Completion" value={`${avgAssignment}%`} icon="CheckCircle2" accent="secondary" />
        <StatCard label="Course Completion" value={`${completionRate}%`} icon="BookOpen" accent="warning" />
      </div>

      {/* Charts Row 1 */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Student Performance Trend" icon={<Icons.TrendingUp className="h-4 w-4 text-primary" />}>
          <MonthlyProgressChart data={studentPerformanceData as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Attendance Trend" icon={<Icons.CalendarCheck className="h-4 w-4 text-success" />}>
          <AttendanceTrendChart data={studentPerformanceData.map((d) => ({ month: d.month, percentage: d.attendance })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      {/* Charts Row 2 */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Assignment Completion" icon={<Icons.CheckCircle2 className="h-4 w-4 text-secondary" />}>
          <FeeHistoryChart data={assignmentCompletionData as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Test Performance" icon={<Icons.BarChart3 className="h-4 w-4 text-accent" />}>
          <ResultAnalysisChart data={testPerformanceData.map((t) => ({ subject: t.test, scored: t.avgScore, total: 100 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      {/* Course Completion */}
      <div className="mb-6">
        <SectionCard title="Course Completion" icon={<Icons.BookOpen className="h-4 w-4 text-primary" />}>
          <SubjectPerformanceChart data={courseCompletionData.map((c) => ({ subject: c.subject, score: c.completion, average: 100 })) as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      {/* Top & Attention Students */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performing Students */}
        <SectionCard title="Top Performing Students" icon={<Icons.Trophy className="h-4 w-4 text-warning" />}>
          <div className="space-y-2">
            {topStudents.map((student) => {
              const TrendIcon = trendIcon[student.trend].icon;
              return (
                <div key={student.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">
                    {student.rank}
                  </span>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">Score: {student.score}%</p>
                  </div>
                  <TrendIcon className={cn('h-4 w-4', trendIcon[student.trend].color)} />
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Students Requiring Attention */}
        <SectionCard title="Students Requiring Attention" icon={<Icons.AlertCircle className="h-4 w-4 text-destructive" />}>
          <div className="space-y-2">
            {attentionStudents.map((student) => (
              <div key={student.id} className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.issue}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-destructive">{student.score}%</p>
                  <p className="text-xs text-muted-foreground">{student.attendance}% att.</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
