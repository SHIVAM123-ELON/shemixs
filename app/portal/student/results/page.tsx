'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { TestScoresChart, SubjectPerformanceChart } from '@/components/portal/shared/charts';
import { cn } from '@/lib/utils';
import { testResults, performanceData } from '@/lib/portal/data';

const gradeColor = (grade: string) => {
  if (grade.startsWith('A+')) return 'text-success';
  if (grade.startsWith('A')) return 'text-primary';
  if (grade.startsWith('B')) return 'text-warning';
  return 'text-destructive';
};

export default function ResultsPage() {
  const avgPercentage = Math.round(testResults.reduce((sum, r) => sum + r.percentage, 0) / testResults.length);

  return (
    <>
      <PageHeader title="Results" description="Your test results and academic performance overview." />

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icons.Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{avgPercentage}%</p>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Icons.TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{testResults.length}</p>
              <p className="text-xs text-muted-foreground">Tests Completed</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Icons.Trophy className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                #{Math.min(...testResults.map((r) => r.rank ?? 999))}
              </p>
              <p className="text-xs text-muted-foreground">Best Rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Test Scores" icon={<Icons.BarChart3 className="h-4 w-4 text-secondary" />}>
          <TestScoresChart data={performanceData.testScores} />
        </SectionCard>
        <SectionCard title="Subject Performance vs Class Average" icon={<Icons.TrendingUp className="h-4 w-4 text-success" />}>
          <SubjectPerformanceChart data={performanceData.subjectPerformance} />
        </SectionCard>
      </div>

      {/* Results Table */}
      <SectionCard title="Detailed Results" icon={<Icons.Award className="h-4 w-4 text-primary" />}>
        <div className="space-y-3">
          {testResults.map((result) => (
            <div key={result.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
                <span className={cn('text-lg font-bold', gradeColor(result.grade))}>{result.percentage}%</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{result.title}</p>
                <p className="text-xs text-muted-foreground">
                  {result.subject} · {new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-foreground">{result.scoredMarks}/{result.totalMarks}</p>
                <p className="text-xs text-muted-foreground">Grade: {result.grade}</p>
              </div>
              {result.rank && (
                <div className="hidden text-right md:block">
                  <p className="text-sm font-semibold text-primary">#{result.rank}</p>
                  <p className="text-xs text-muted-foreground">of {result.totalStudents}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
