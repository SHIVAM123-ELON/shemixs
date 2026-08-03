'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
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
import { studentRecords } from '@/lib/portal/teacher-data';

const statusVariant = {
  excellent: 'success',
  good: 'info',
  average: 'warning',
  needs_attention: 'destructive',
} as const;

const filters = ['all', 'excellent', 'good', 'average', 'needs_attention'] as const;

const PAGE_SIZE = 6;

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [page, setPage] = useState(1);

  const filtered = studentRecords.filter((s) => {
    const matchesSearch = search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader title="Students" description="View and manage all your students across courses and batches." />

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
            aria-label="Search students"
          />
        </div>
        <Select value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setPage(1); }}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Filter by performance" />
          </SelectTrigger>
          <SelectContent>
            {filters.map((f) => (
              <SelectItem key={f} value={f} className="capitalize">{f === 'all' ? 'All Students' : f.replace('_', ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Student Cards */}
      {paginated.length === 0 ? (
        <EmptyState icon="Users" title="No students found" description="No students match your search or filter." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((student) => (
            <div key={student.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>{student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-foreground">{student.name}</h3>
                  <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                  <p className="text-xs text-muted-foreground">{student.batch}</p>
                </div>
                <StatusBadge status={student.status.replace('_', ' ')} variant={statusVariant[student.status]} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-2 text-center">
                  <p className="text-lg font-bold text-foreground">{student.attendance}%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
                <div className="rounded-lg border border-border p-2 text-center">
                  <p className="text-lg font-bold text-foreground">{student.assignmentCompletion}%</p>
                  <p className="text-xs text-muted-foreground">Assignments</p>
                </div>
                <div className="rounded-lg border border-border p-2 text-center">
                  <p className="text-lg font-bold text-foreground">{student.testScore}%</p>
                  <p className="text-xs text-muted-foreground">Test Score</p>
                </div>
                <div className="rounded-lg border border-border p-2 text-center">
                  <p className={cn('text-lg font-bold', student.overallPerformance >= 85 ? 'text-success' : student.overallPerformance >= 70 ? 'text-warning' : 'text-destructive')}>
                    {student.overallPerformance}%
                  </p>
                  <p className="text-xs text-muted-foreground">Overall</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="mt-3 w-full">
                <Icons.Eye className="mr-2 h-3.5 w-3.5" />
                View Details
              </Button>
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
