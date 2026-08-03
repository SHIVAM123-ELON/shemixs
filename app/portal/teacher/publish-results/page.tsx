'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { resultEntries, testRecords } from '@/lib/portal/teacher-data';

const gradeColor = (grade: string) => {
  if (grade.startsWith('A+')) return 'text-success';
  if (grade.startsWith('A')) return 'text-primary';
  if (grade.startsWith('B')) return 'text-warning';
  return 'text-destructive';
};

function calculateGrade(marks: number, total: number): string {
  const pct = (marks / total) * 100;
  if (pct >= 95) return 'A+';
  if (pct >= 85) return 'A';
  if (pct >= 75) return 'B+';
  if (pct >= 65) return 'B';
  if (pct >= 50) return 'C';
  return 'F';
}

export default function PublishResultsPage() {
  const [selectedTest, setSelectedTest] = useState('');
  const [entries, setEntries] = useState(resultEntries);

  const updateMarks = (id: string, marks: number) => {
    setEntries((prev) => prev.map((e) => {
      if (e.id !== id) return e;
      const grade = calculateGrade(marks, e.totalMarks);
      return { ...e, marks, grade };
    }));
  };

  const togglePublish = (id: string) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, published: !e.published } : e)));
  };

  const publishedCount = entries.filter((e) => e.published).length;
  const avgScore = Math.round(entries.reduce((sum, e) => sum + (e.marks / e.totalMarks) * 100, 0) / entries.length);

  return (
    <>
      <PageHeader title="Publish Results" description="Enter marks and publish results for completed tests.">
        <Button size="sm">
          <Icons.Download className="mr-2 h-4 w-4" />
          Download Results
        </Button>
      </PageHeader>

      {/* Test Selection */}
      <div className="mb-6">
        <Select value={selectedTest} onValueChange={setSelectedTest}>
          <SelectTrigger className="sm:w-80">
            <SelectValue placeholder="Select a test to publish results" />
          </SelectTrigger>
          <SelectContent>
            {testRecords.filter((t) => t.status === 'completed').map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={entries.length} icon="Users" accent="primary" />
        <StatCard label="Published" value={publishedCount} icon="CheckCircle2" accent="success" />
        <StatCard label="Pending" value={entries.length - publishedCount} icon="Clock" accent="warning" />
        <StatCard label="Avg Score" value={`${avgScore}%`} icon="TrendingUp" accent="secondary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Marks Entry Table */}
        <div className="lg:col-span-2">
          <SectionCard title="Marks Entry" icon={<Icons.ClipboardEdit className="h-4 w-4 text-primary" />}>
            <div className="space-y-2">
              {entries.map((entry) => (
                <div key={entry.id} className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={entry.studentAvatar} alt={entry.studentName} />
                    <AvatarFallback>{entry.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{entry.studentName}</p>
                    <p className="text-xs text-muted-foreground">{entry.rollNumber}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={entry.marks}
                      onChange={(e) => updateMarks(entry.id, parseInt(e.target.value) || 0)}
                      className="w-20"
                      max={entry.totalMarks}
                      aria-label={`Marks for ${entry.studentName}`}
                    />
                    <span className="text-xs text-muted-foreground">/ {entry.totalMarks}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn('w-10 text-center text-sm font-bold', gradeColor(entry.grade))}>{entry.grade}</span>
                    <Button
                      size="sm"
                      variant={entry.published ? 'default' : 'outline'}
                      onClick={() => togglePublish(entry.id)}
                    >
                      {entry.published ? 'Published' : 'Publish'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Result Preview */}
        <SectionCard title="Result Preview" icon={<Icons.Eye className="h-4 w-4 text-secondary" />}>
          <div className="rounded-lg border border-border bg-muted p-4">
            <p className="text-center text-sm font-semibold text-foreground">Test Results</p>
            <p className="text-center text-xs text-muted-foreground">Mid-Term Examination</p>
            <div className="mt-4 space-y-2">
              {entries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between rounded-lg bg-card p-2">
                  <span className="text-xs font-medium text-foreground">{entry.studentName}</span>
                  <span className={cn('text-xs font-bold', gradeColor(entry.grade))}>{entry.marks}/{entry.totalMarks} · {entry.grade}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-3 text-center">
              <p className="text-xs text-muted-foreground">Average Score</p>
              <p className="text-xl font-bold text-primary">{avgScore}%</p>
            </div>
          </div>
          <Button className="mt-3 w-full">
            <Icons.Upload className="mr-2 h-4 w-4" />
            Publish All Results
          </Button>
        </SectionCard>
      </div>
    </>
  );
}
