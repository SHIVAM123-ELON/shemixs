'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { DonutChart } from '@/components/portal/shared/charts';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { adminResults, gradeDistributionData } from '@/lib/portal/admin-data';

const gradeColor: Record<string, string> = { 'A+': 'text-success', 'A': 'text-primary', 'B+': 'text-warning', 'B': 'text-warning', 'C': 'text-destructive', 'F': 'text-destructive' };

export default function AdminResultsPage() {
  return (
    <>
      <PageHeader title="Result Management" description="Publish and analyze examination results.">
        <Button size="sm" variant="outline"><Icons.Download className="mr-2 h-4 w-4" /> Download</Button>
        <Button size="sm"><Icons.Award className="mr-2 h-4 w-4" /> Publish Results</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Results" value={adminResults.length} icon="Award" accent="primary" />
        <StatCard label="Published" value={adminResults.filter((r) => r.published).length} icon="CheckCircle2" accent="success" />
        <StatCard label="Pending" value={adminResults.filter((r) => !r.published).length} icon="Clock" accent="warning" />
        <StatCard label="Pass Rate" value={`${Math.round((adminResults.filter((r) => r.grade_letter !== 'F').length / adminResults.length) * 100)}%`} icon="TrendingUp" accent="secondary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title="Merit List — Mid-Term Examination" icon={<Icons.Trophy className="h-4 w-4 text-warning" />}>
            <div className="space-y-2">
              {adminResults.sort((a, b) => a.rank - b.rank).map((result) => (
                <div key={result.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${result.rank <= 3 ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>{result.rank}</span>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${result.id.charCodeAt(0)}`} alt={result.studentName} />
                    <AvatarFallback>{result.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{result.studentName}</p>
                    <p className="text-xs text-muted-foreground">{result.rollNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{result.marks}/{result.totalMarks}</p>
                    <p className={`text-xs font-bold ${gradeColor[result.grade_letter]}`}>{result.grade_letter}</p>
                  </div>
                  <StatusBadge status={result.published ? 'published' : 'pending'} variant={result.published ? 'success' : 'warning'} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Grade Distribution" icon={<Icons.BarChart3 className="h-4 w-4 text-primary" />}>
            <DonutChart data={gradeDistributionData} />
          </SectionCard>

          <SectionCard title="Result Analytics" icon={<Icons.TrendingUp className="h-4 w-4 text-secondary" />}>
            <div className="space-y-3">
              <div className="rounded-lg border border-success/20 bg-success/5 p-3 text-center">
                <p className="text-2xl font-bold text-success">{Math.round((adminResults.filter((r) => r.marks >= 85).length / adminResults.length) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Distinction</p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
                <p className="text-2xl font-bold text-primary">{Math.round((adminResults.filter((r) => r.marks >= 65 && r.marks < 85).length / adminResults.length) * 100)}%</p>
                <p className="text-xs text-muted-foreground">First Class</p>
              </div>
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-center">
                <p className="text-2xl font-bold text-destructive">{Math.round((adminResults.filter((r) => r.marks < 50).length / adminResults.length) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
