'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { adminStudents } from '@/lib/portal/admin-data';
import type { AdminStudent } from '@/lib/portal/admin-types';

const feeStatusVariant = {
  paid: 'success',
  pending: 'warning',
  overdue: 'destructive',
} as const;

const studentStatusVariant = {
  active: 'success',
  inactive: 'muted',
  suspended: 'destructive',
} as const;

const filters = ['all', 'active', 'inactive', 'suspended'] as const;
const PAGE_SIZE = 8;

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<AdminStudent | null>(null);

  const filtered = adminStudents.filter((s) => {
    const matchesSearch = search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader title="Student Management" description="Manage all students across the institution.">
        <Button size="sm" variant="outline">
          <Icons.Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button size="sm">
          <Icons.UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={adminStudents.length} icon="GraduationCap" accent="primary" />
        <StatCard label="Active" value={adminStudents.filter((s) => s.status === 'active').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Suspended" value={adminStudents.filter((s) => s.status === 'suspended').length} icon="Ban" accent="destructive" />
        <StatCard label="Fees Overdue" value={adminStudents.filter((s) => s.feeStatus === 'overdue').length} icon="CreditCard" accent="warning" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search by name or roll number..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" aria-label="Search students" />
        </div>
        <Select value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setPage(1); }}>
          <SelectTrigger className="sm:w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            {filters.map((f) => <SelectItem key={f} value={f} className="capitalize">{f === 'all' ? 'All Students' : f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {paginated.length === 0 ? (
        <EmptyState icon="GraduationCap" title="No students found" description="No students match your search or filter." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Student</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground sm:table-cell">Grade</th>
                <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground lg:table-cell">Guardian</th>
                <th className="hidden px-4 py-3 text-center font-semibold text-muted-foreground md:table-cell">Attendance</th>
                <th className="hidden px-4 py-3 text-center font-semibold text-muted-foreground md:table-cell">Fee Status</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((student) => (
                <tr key={student.id} className="transition-colors hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <p className="text-foreground">{student.grade}</p>
                    <p className="text-xs text-muted-foreground">Sec {student.section}</p>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell text-muted-foreground">{student.guardian}</td>
                  <td className="hidden px-4 py-3 text-center md:table-cell">
                    <span className={cn('font-semibold', student.attendance >= 85 ? 'text-success' : student.attendance >= 75 ? 'text-warning' : 'text-destructive')}>{student.attendance}%</span>
                  </td>
                  <td className="hidden px-4 py-3 text-center md:table-cell">
                    <StatusBadge status={student.feeStatus} variant={feeStatusVariant[student.feeStatus]} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={student.status} variant={studentStatusVariant[student.status]} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => setSelected(student)}>
                      <Icons.Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            <Icons.ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next <Icons.ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Student Details Drawer */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="border-b border-border pb-4">
                <SheetTitle>Student Details</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selected.avatar} alt={selected.name} />
                    <AvatarFallback>{selected.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{selected.name}</h3>
                    <p className="text-sm text-muted-foreground">{selected.rollNumber}</p>
                    <StatusBadge status={selected.status} variant={studentStatusVariant[selected.status]} />
                  </div>
                </div>

                <SectionCard title="Academic Information" icon={<Icons.BookOpen className="h-4 w-4 text-primary" />}>
                  <dl className="space-y-2">
                    {[
                      { label: 'Grade', value: selected.grade },
                      { label: 'Section', value: selected.section },
                      { label: 'Batch', value: selected.batch },
                      { label: 'Academic Score', value: `${selected.academicScore}%` },
                      { label: 'Attendance', value: `${selected.attendance}%` },
                      { label: 'Enrolled', value: new Date(selected.enrolledAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                        <dt className="text-sm text-muted-foreground">{item.label}</dt>
                        <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </SectionCard>

                <SectionCard title="Guardian & Fees" icon={<Icons.HeartHandshake className="h-4 w-4 text-secondary" />}>
                  <dl className="space-y-2">
                    <div className="flex justify-between gap-4 border-b border-border pb-2">
                      <dt className="text-sm text-muted-foreground">Guardian</dt>
                      <dd className="text-right text-sm font-medium text-foreground">{selected.guardian}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-border pb-2">
                      <dt className="text-sm text-muted-foreground">Fee Status</dt>
                      <dd><StatusBadge status={selected.feeStatus} variant={feeStatusVariant[selected.feeStatus]} /></dd>
                    </div>
                  </dl>
                </SectionCard>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Edit</Button>
                  <Button size="sm" variant="outline">View Full Profile</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
