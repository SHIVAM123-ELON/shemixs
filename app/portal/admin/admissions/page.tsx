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
import { admissionApplications } from '@/lib/portal/admin-data';

const statusVariant = { pending: 'warning', verification: 'info', approved: 'success', rejected: 'destructive' } as const;
const filters = ['all', 'pending', 'verification', 'approved', 'rejected'] as const;
const PAGE_SIZE = 6;

export default function AdminAdmissionsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [page, setPage] = useState(1);

  const filtered = admissionApplications.filter((a) => {
    const matchesSearch = search === '' || a.studentName.toLowerCase().includes(search.toLowerCase()) || a.parentName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader title="Admissions" description="Review and manage admission applications.">
        <Button size="sm" variant="outline"><Icons.Download className="mr-2 h-4 w-4" /> Export</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Applications" value={admissionApplications.length} icon="UserPlus" accent="primary" />
        <StatCard label="Pending" value={admissionApplications.filter((a) => a.status === 'pending').length} icon="Clock" accent="warning" />
        <StatCard label="Approved" value={admissionApplications.filter((a) => a.status === 'approved').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Rejected" value={admissionApplications.filter((a) => a.status === 'rejected').length} icon="XCircle" accent="destructive" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search by student or parent name..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" aria-label="Search applications" />
        </div>
        <Select value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setPage(1); }}>
          <SelectTrigger className="sm:w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            {filters.map((f) => <SelectItem key={f} value={f} className="capitalize">{f === 'all' ? 'All Applications' : f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {paginated.length === 0 ? (
        <EmptyState icon="UserPlus" title="No applications found" description="No applications match your search or filter." />
      ) : (
        <div className="space-y-4">
          {paginated.map((app) => (
            <div key={app.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex items-center gap-3 lg:flex-1">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={app.avatar} alt={app.studentName} />
                    <AvatarFallback>{app.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground">{app.studentName}</h3>
                    <p className="text-xs text-muted-foreground">Applying for: {app.appliedGrade}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {new Date(app.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="lg:flex-1">
                  <p className="text-xs font-semibold text-muted-foreground">Parent / Guardian</p>
                  <p className="text-sm font-medium text-foreground">{app.parentName}</p>
                  <p className="text-xs text-muted-foreground">{app.parentEmail} · {app.parentPhone}</p>
                </div>
                <div className="lg:flex-1">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Documents ({app.documents.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {app.documents.map((doc) => (
                      <span key={doc} className="flex items-center gap-1 rounded-md border border-border bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground">
                        <Icons.FileText className="h-3 w-3" /> {doc}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:flex-col lg:items-end lg:gap-2">
                  <StatusBadge status={app.status} variant={statusVariant[app.status]} />
                  <div className="flex gap-2">
                    {app.status === 'pending' || app.status === 'verification' ? (
                      <>
                        <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90"><Icons.Check className="mr-1 h-3.5 w-3.5" /> Approve</Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive"><Icons.X className="h-3.5 w-3.5" /></Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline"><Icons.Eye className="mr-1 h-3.5 w-3.5" /> View</Button>
                    )}
                  </div>
                </div>
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
