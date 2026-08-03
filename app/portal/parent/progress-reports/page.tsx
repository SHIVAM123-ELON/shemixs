'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Timeline } from '@/components/portal/shared/timeline';
import {
  MonthlyProgressChart,
  WeeklyProgressChart,
} from '@/components/portal/shared/parent-charts';
import { SubjectPerformanceChart } from '@/components/portal/shared/charts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  progressReports,
  weeklyProgress,
  monthlyProgress,
} from '@/lib/portal/parent-data';
import { performanceData } from '@/lib/portal/data';

const reportTimeline = [
  { id: 't1', title: 'July 2025 Report', subtitle: 'Overall: 88% — Grade A', date: '2025-07-31', icon: 'FileText', color: 'success' as const },
  { id: 't2', title: 'June 2025 Report', subtitle: 'Overall: 84% — Grade A', date: '2025-06-30', icon: 'FileText', color: 'primary' as const },
  { id: 't3', title: 'May 2025 Report', subtitle: 'Overall: 84% — Grade A', date: '2025-05-31', icon: 'FileText', color: 'accent' as const },
  { id: 't4', title: 'April 2025 Report', subtitle: 'Overall: 87% — Grade A', date: '2025-04-30', icon: 'FileText', color: 'secondary' as const },
];

export default function ParentProgressReportsPage() {
  const latestReport = progressReports[0];

  return (
    <>
      <PageHeader title="Progress Reports" description="Track your child's academic progress over time.">
        <Button variant="outline" size="sm">
          <Icons.Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </PageHeader>

      {/* Weekly Progress */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Weekly Progress" icon={<Icons.BarChart3 className="h-4 w-4 text-primary" />}>
          <WeeklyProgressChart data={weeklyProgress as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Monthly Progress" icon={<Icons.TrendingUp className="h-4 w-4 text-success" />}>
          <MonthlyProgressChart data={monthlyProgress as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      {/* Subject Performance */}
      <div className="mb-6">
        <SectionCard title="Subject Performance" icon={<Icons.Award className="h-4 w-4 text-secondary" />}>
          <SubjectPerformanceChart data={performanceData.subjectPerformance as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      {/* AI Performance Summary */}
      <div className="mb-6">
        <SectionCard
          title="AI Performance Summary"
          icon={<Icons.Sparkles className="h-4 w-4 text-accent" />}
        >
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Icons.Sparkles className="h-4 w-4 text-accent" />
              <p className="text-sm font-semibold text-foreground">{latestReport.period} Summary</p>
              <StatusBadge status={`${latestReport.overallPercentage}%`} variant="success" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{latestReport.aiSummary}</p>
          </div>
        </SectionCard>
      </div>

      {/* Strength & Improvement Areas */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Strength Areas" icon={<Icons.ThumbsUp className="h-4 w-4 text-success" />}>
          <div className="space-y-2">
            {latestReport.strengthAreas.map((area, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-3">
                <Icons.CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                <p className="text-sm font-medium text-foreground">{area}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Improvement Areas" icon={<Icons.AlertTriangle className="h-4 w-4 text-warning" />}>
          <div className="space-y-2">
            {latestReport.improvementAreas.map((area, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-warning/20 bg-warning/5 p-3">
                <Icons.ArrowUpCircle className="h-4 w-4 shrink-0 text-warning" />
                <p className="text-sm font-medium text-foreground">{area}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Teacher Remarks */}
      <div className="mb-6">
        <SectionCard title="Teacher Remarks" icon={<Icons.MessageSquare className="h-4 w-4 text-primary" />}>
          <div className="space-y-3">
            {latestReport.teacherRemarks.map((remark, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">{remark.teacher}</p>
                  <StatusBadge status={remark.subject} variant="info" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{remark.remark}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Progress Timeline */}
      <SectionCard title="Progress Timeline" icon={<Icons.History className="h-4 w-4 text-secondary" />}>
        <Timeline items={reportTimeline} />
      </SectionCard>
    </>
  );
}
