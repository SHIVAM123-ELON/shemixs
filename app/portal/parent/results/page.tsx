'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { ResultAnalysisChart } from '@/components/portal/shared/parent-charts';
import { TestScoresChart } from '@/components/portal/shared/charts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { examResults } from '@/lib/portal/parent-data';

const gradeColor = (grade: string) => {
  if (grade.startsWith('A+')) return 'text-success';
  if (grade.startsWith('A')) return 'text-primary';
  if (grade.startsWith('B')) return 'text-warning';
  return 'text-destructive';
};

export default function ParentResultsPage() {
  const latest = examResults[0];
  const previous = examResults[1];
  const chartData = latest.subjects.map((s) => ({
    subject: s.subject.split(' ')[0],
    scored: s.percentage,
    total: 100,
  }));
  const testScoreData = latest.subjects.map((s) => ({
    test: s.subject.split(' ')[0],
    score: s.percentage,
  }));

  return (
    <>
      <PageHeader title="Results" description="Your child's exam results and academic performance overview.">
        <Button variant="outline" size="sm">
          <Icons.Download className="mr-2 h-4 w-4" />
          Download Result
        </Button>
      </PageHeader>

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icons.Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{latest.overallPercentage}%</p>
              <p className="text-xs text-muted-foreground">Latest Overall Score</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Icons.TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">Grade {latest.overallGrade}</p>
              <p className="text-xs text-muted-foreground">Overall Grade</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Icons.Trophy className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">#{latest.overallRank}</p>
              <p className="text-xs text-muted-foreground">Class Rank (of {latest.totalStudents})</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Subject-wise Marks — Latest Exam" icon={<Icons.BarChart3 className="h-4 w-4 text-primary" />}>
          <ResultAnalysisChart data={chartData as unknown as Record<string, unknown>[]} />
        </SectionCard>
        <SectionCard title="Score Comparison" icon={<Icons.TrendingUp className="h-4 w-4 text-success" />}>
          <TestScoresChart data={testScoreData as unknown as Record<string, unknown>[]} />
        </SectionCard>
      </div>

      {/* Latest Exam Results */}
      <SectionCard
        title={`Latest Exam — ${latest.examName}`}
        icon={<Icons.Award className="h-4 w-4 text-primary" />}
        action={<StatusBadge status={latest.overallGrade} variant="success" />}
      >
        <div className="space-y-3">
          {latest.subjects.map((s) => (
            <div key={s.subject} className="flex items-center gap-4 rounded-lg border border-border p-3">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
                <span className={cn('text-sm font-bold', gradeColor(s.grade))}>{s.percentage}%</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{s.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {s.scored}/{s.total} · Grade {s.grade}
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-primary">#{s.rank}</p>
                <p className="text-xs text-muted-foreground">of {s.totalStudents}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Previous Results */}
      <div className="mt-6">
        <SectionCard
          title={`Previous Exam — ${previous.examName}`}
          icon={<Icons.History className="h-4 w-4 text-secondary" />}
          action={<StatusBadge status={previous.overallGrade} variant="info" />}
        >
          <div className="space-y-3">
            {previous.subjects.map((s) => (
              <div key={s.subject} className="flex items-center gap-4 rounded-lg border border-border p-3">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
                  <span className={cn('text-sm font-bold', gradeColor(s.grade))}>{s.percentage}%</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{s.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.scored}/{s.total} · Grade {s.grade}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-primary">#{s.rank}</p>
                  <p className="text-xs text-muted-foreground">of {s.totalStudents}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
