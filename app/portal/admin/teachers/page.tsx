'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { adminTeachers } from '@/lib/portal/admin-data';

const statusVariant = { active: 'success', on_leave: 'warning', inactive: 'muted' } as const;
const filters = ['all', 'active', 'on_leave', 'inactive'] as const;
const PAGE_SIZE = 6;

export default function AdminTeachersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [page, setPage] = useState(1);

  const filtered = adminTeachers.filter((t) => {
    const matchesSearch = search === '' || t.name.toLowerCase().includes(search.toLowerCase()) || t.department.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader title="Teacher Management" description="Manage all teaching staff across the institution.">
        <Button size="sm" variant="outline"><Icons.Download className="mr-2 h-4 w-4" /> Export</Button>
        <Button size="sm"><Icons.UserPlus className="mr-2 h-4 w-4" /> Add Teacher</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Teachers" value={adminTeachers.length} icon="Users" accent="primary" />
        <StatCard label="Active" value={adminTeachers.filter((t) => t.status === 'active').length} icon="CheckCircle2" accent="success" />
        <StatCard label="On Leave" value={adminTeachers.filter((t) => t.status === 'on_leave').length} icon="CalendarOff" accent="warning" />
        <StatCard label="Avg Performance" value="4.7" icon="Star" accent="secondary" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search by name or department..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" aria-label="Search teachers" />
        </div>
        <Select value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setPage(1); }}>
          <SelectTrigger className="sm:w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            {filters.map((f) => <SelectItem key={f} value={f} className="capitalize">{f === 'all' ? 'All Teachers' : f.replace('_', ' ')}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {paginated.length === 0 ? (
        <EmptyState icon="Users" title="No teachers found" description="No teachers match your search or filter." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((teacher) => (
            <div key={teacher.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-foreground">{teacher.name}</h3>
                  <p className="text-xs text-muted-foreground">{teacher.department}</p>
                  <StatusBadge status={teacher.status.replace('_', ' ')} variant={statusVariant[teacher.status]} />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {teacher.subjects.map((subject) => (
                  <span key={subject} className="rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">{subject}</span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-border p-2 text-center">
                  <p className="font-bold text-foreground">{teacher.assignedClasses}</p>
                  <p className="text-muted-foreground">Classes</p>
                </div>
                <div className="rounded-lg border border-border p-2 text-center">
                  <p className="font-bold text-foreground">{teacher.assignedCourses}</p>
                  <p className="text-muted-foreground">Courses</p>
                </div>
                <div className="rounded-lg border border-border p-2 text-center">
                  <p className="font-bold text-foreground">{teacher.attendance}%</p>
                  <p className="text-muted-foreground">Attendance</p>
                </div>
                <div className="rounded-lg border border-border p-2 text-center">
                  <p className={cn('font-bold', teacher.performance >= 4.5 ? 'text-success' : 'text-warning')}>{teacher.performance}</p>
                  <p className="text-muted-foreground">Rating</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs text-muted-foreground">Salary: ₹{teacher.salary.toLocaleString('en-IN')}</span>
                <Button size="sm" variant="outline"><Icons.Eye className="mr-2 h-3.5 w-3.5" /> View</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><Icons.ChevronLeft className="h-4 w-4" /> Previous</Button>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next <Icons.ChevronRight className="h-4 w-4" /></Button>
        </div>
      )}
    </>
  );
}
