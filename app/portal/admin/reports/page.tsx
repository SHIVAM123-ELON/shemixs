'use client';

import * as Icons from 'lucide-react';
import { getIcon } from '@/lib/portal/icons';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { reportTypes } from '@/lib/portal/admin-data';

const accentClass = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
};

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Generate and export institutional reports.">
        <Button size="sm" variant="outline"><Icons.Download className="mr-2 h-4 w-4" /> Export All</Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report) => {
          const Icon = getIcon(report.icon);
          return (
            <div key={report.id} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20">
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', accentClass[report.accent])}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">{report.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{report.description}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1"><Icons.Eye className="mr-2 h-3.5 w-3.5" /> Preview</Button>
                <Button size="sm" variant="ghost"><Icons.Download className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <SectionCard title="Recent Exports" icon={<Icons.Download className="h-4 w-4 text-primary" />}>
          <div className="space-y-2">
            {[
              { name: 'admissions-report-aug-2025.csv', date: '2025-08-01', size: '245 KB' },
              { name: 'attendance-report-jul-2025.pdf', date: '2025-07-31', size: '1.2 MB' },
              { name: 'fee-collection-q2-2025.xlsx', date: '2025-07-30', size: '890 KB' },
              { name: 'results-spring-2025.pdf', date: '2025-07-25', size: '2.1 MB' },
            ].map((file) => (
              <div key={file.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted"><Icons.FileBarChart className="h-4 w-4 text-muted-foreground" /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(file.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {file.size}</p>
                </div>
                <Button size="sm" variant="ghost"><Icons.Download className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
