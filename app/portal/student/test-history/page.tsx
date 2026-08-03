'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tests } from '@/lib/portal/data';

const previousTests = tests.filter((t) => t.type === 'previous' || t.status === 'completed');

export default function TestHistoryPage() {
  return (
    <>
      <PageHeader title="Test History" description="Review your completed tests and scores." />

      {previousTests.length === 0 ? (
        <EmptyState icon="History" title="No test history yet" description="Your completed tests will appear here." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold text-foreground">Test</th>
                <th className="hidden px-4 py-3 font-semibold text-foreground sm:table-cell">Subject</th>
                <th className="hidden px-4 py-3 font-semibold text-foreground md:table-cell">Date</th>
                <th className="px-4 py-3 font-semibold text-foreground">Score</th>
                <th className="hidden px-4 py-3 font-semibold text-foreground lg:table-cell">Type</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {previousTests.map((test) => {
                const percentage = test.scoredMarks ? Math.round((test.scoredMarks / test.totalMarks) * 100) : 0;
                return (
                  <tr key={test.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{test.title}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{test.subject}</p>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{test.subject}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn('font-semibold', percentage >= 90 ? 'text-success' : percentage >= 75 ? 'text-primary' : 'text-warning')}>
                          {test.scoredMarks}/{test.totalMarks}
                        </span>
                        <span className="text-xs text-muted-foreground">({percentage}%)</span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <StatusBadge status={test.type} variant="info" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost">
                        <Icons.Eye className="h-4 w-4" />
                        <span className="sr-only">View result</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
