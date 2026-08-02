'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import {
  WeeklyProgressChart,
  SubjectPerformanceChart,
  AttendanceTrendChart,
  TestScoresChart,
} from '@/components/portal/shared/charts';
import { performanceData } from '@/lib/portal/data';

export default function PerformancePage() {
  return (
    <>
      <PageHeader title="Performance Analytics" description="Deep insights into your academic progress and trends." />

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg. Test Score" value="88%" icon="Award" accent="primary" trend={{ value: '4%', positive: true }} />
        <StatCard label="Study Hours / Week" value="30h" icon="Clock" accent="secondary" trend={{ value: '2h', positive: true }} />
        <StatCard label="Attendance Rate" value="91%" icon="CalendarCheck" accent="success" />
        <StatCard label="Completion Rate" value="68%" icon="CheckCircle2" accent="warning" trend={{ value: '5%', positive: true }} />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Weekly Study Progress" icon={<Icons.BarChart3 className="h-4 w-4 text-primary" />}>
          <WeeklyProgressChart data={performanceData.weeklyProgress} />
        </SectionCard>

        <SectionCard title="Subject Performance vs Class Average" icon={<Icons.TrendingUp className="h-4 w-4 text-success" />}>
          <SubjectPerformanceChart data={performanceData.subjectPerformance} />
        </SectionCard>

        <SectionCard title="Attendance Trend" icon={<Icons.CalendarCheck className="h-4 w-4 text-accent" />}>
          <AttendanceTrendChart data={performanceData.attendanceTrend} />
        </SectionCard>

        <SectionCard title="Test Scores Overview" icon={<Icons.Award className="h-4 w-4 text-secondary" />}>
          <TestScoresChart data={performanceData.testScores} />
        </SectionCard>
      </div>

      {/* Insights */}
      <div className="mt-6">
        <SectionCard title="AI Insights" icon={<Icons.Sparkles className="h-4 w-4 text-primary" />}>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-success/20 bg-success/5 p-3">
              <Icons.TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">Strong improvement in Mathematics</p>
                <p className="text-xs text-muted-foreground">Your test scores have improved by 15% over the last 3 months. Keep it up!</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-warning/20 bg-warning/5 p-3">
              <Icons.AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
              <div>
                <p className="text-sm font-medium text-foreground">Physics needs attention</p>
                <p className="text-xs text-muted-foreground">Your Physics scores are below class average. Consider revisiting Thermodynamics chapter.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <Icons.Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Consistent study schedule</p>
                <p className="text-xs text-muted-foreground">You've maintained 30+ study hours per week. Great consistency!</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
