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
import { adminParents } from '@/lib/portal/admin-data';

const statusVariant = { active: 'success', inactive: 'muted' } as const;
const filters = ['all', 'active', 'inactive'] as const;
const PAGE_SIZE = 6;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function AdminParentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [page, setPage] = useState(1);

  const filtered = adminParents.filter((p) => {
    const matchesSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader title="Parent Management" description="Manage all parents and guardians across the institution.">
        <Button size="sm" variant="outline"><Icons.Download className="mr-2 h-4 w-4" /> Export</Button>
        <Button size="sm"><Icons.UserPlus className="mr-2 h-4 w-4" /> Add Parent</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Parents" value={adminParents.length} icon="HeartHandshake" accent="primary" />
        <StatCard label="Active" value={adminParents.filter((p) => p.status === 'active').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Fees Pending" value={adminParents.filter((p) => p.feeSummary.pending > 0).length} icon="CreditCard" accent="warning" />
        <StatCard label="Total Linked" value={adminParents.reduce((sum, p) => sum + p.linkedStudents.length, 0)} icon="Link" accent="secondary" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search by name or email..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" aria-label="Search parents" />
        </div>
        <Select value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setPage(1); }}>
          <SelectTrigger className="sm:w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            {filters.map((f) => <SelectItem key={f} value={f} className="capitalize">{f === 'all' ? 'All Parents' : f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {paginated.length === 0 ? (
        <EmptyState icon="HeartHandshake" title="No parents found" description="No parents match your search or filter." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((parent) => (
            <div key={parent.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={parent.avatar} alt={parent.name} />
                  <AvatarFallback>{parent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-foreground">{parent.name}</h3>
                  <p className="text-xs text-muted-foreground">{parent.email}</p>
                  <div className="mt-1"><StatusBadge status={parent.status} variant={statusVariant[parent.status]} /></div>
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icons.Phone className="h-3 w-3" /> {parent.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icons.Users className="h-3 w-3" /> {parent.relation}
                </div>
              </div>
              <div className="mt-3 border-t border-border pt-3">
                <p className="mb-1.5 text-xs font-semibold text-muted-foreground">Linked Students</p>
                <div className="space-y-1">
                  {parent.linkedStudents.map((student) => (
                    <div key={student.rollNumber} className="flex items-center gap-2 rounded-lg bg-muted/30 p-2">
                      <Icons.GraduationCap className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground">{student.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{student.rollNumber}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
                <div>
                  <p className="text-sm font-bold text-foreground">{formatCurrency(parent.feeSummary.total)}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-success">{formatCurrency(parent.feeSummary.paid)}</p>
                  <p className="text-xs text-muted-foreground">Paid</p>
                </div>
                <div>
                  <p className={cn('text-sm font-bold', parent.feeSummary.pending > 0 ? 'text-destructive' : 'text-muted-foreground')}>{formatCurrency(parent.feeSummary.pending)}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="mt-3 w-full"><Icons.Eye className="mr-2 h-3.5 w-3.5" /> View Details</Button>
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
