'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { testRecords } from '@/lib/portal/teacher-data';

const tabs = ['upcoming', 'active', 'completed', 'draft'] as const;

const statusVariant = {
  upcoming: 'info',
  active: 'success',
  completed: 'muted',
  draft: 'warning',
} as const;

const PAGE_SIZE = 4;

export default function TeacherTestsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('upcoming');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = testRecords.filter((t) => {
    const matchesTab = t.status === tab;
    const matchesSearch = search === '' || t.title.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader title="Test Management" description="Manage all your tests across courses and batches.">
        <Button asChild size="sm">
          <a href="/portal/teacher/create-test">
            <Icons.PlusCircle className="mr-2 h-4 w-4" />
            Create Test
          </a>
        </Button>
      </PageHeader>

      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tests..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9"
          aria-label="Search tests"
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTab(t); setPage(1); }}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors',
              tab === t ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {t} ({testRecords.filter((r) => r.status === t).length})
          </button>
        ))}
      </div>

      {/* Test Cards */}
      {paginated.length === 0 ? (
        <EmptyState icon="ClipboardList" title="No tests found" description="No tests match your current filter." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {paginated.map((test) => (
            <div key={test.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{test.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{test.subject} · {test.type}</p>
                </div>
                <StatusBadge status={test.status} variant={statusVariant[test.status]} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Icons.Clock className="h-3 w-3" />
                  {test.duration} min
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Icons.Award className="h-3 w-3" />
                  {test.totalMarks} marks
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Icons.HelpCircle className="h-3 w-3" />
                  {test.questions} questions
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Icons.Users className="h-3 w-3" />
                  {test.submissions}/{test.totalStudents}
                </div>
              </div>
              {test.date && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Scheduled: {new Date(test.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Icons.Eye className="mr-2 h-3.5 w-3.5" />
                  View
                </Button>
                <Button size="sm" variant="ghost">
                  <Icons.Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            <Icons.ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next
            <Icons.ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
