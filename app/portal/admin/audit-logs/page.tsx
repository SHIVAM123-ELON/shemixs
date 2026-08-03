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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { auditLogs, loginActivities } from '@/lib/portal/admin-data';

const statusVariant = { success: 'success', failed: 'destructive', warning: 'warning' } as const;
const filters = ['all', 'success', 'failed', 'warning'] as const;
const PAGE_SIZE = 6;

function formatTimestamp(ts: string) {
  const date = new Date(ts);
  const now = new Date('2025-08-02T12:00:00');
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.floor(diffH / 24)}d ago`;
}

export default function AdminAuditLogsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [page, setPage] = useState(1);

  const filtered = auditLogs.filter((log) => {
    const matchesSearch = search === '' || log.user.toLowerCase().includes(search.toLowerCase()) || log.action.toLowerCase().includes(search.toLowerCase()) || log.target.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || log.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader title="Audit Logs" description="Track all system actions, login history, and user activity.">
        <Button size="sm" variant="outline"><Icons.Download className="mr-2 h-4 w-4" /> Export Logs</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Logs" value={auditLogs.length} icon="Scroll" accent="primary" />
        <StatCard label="Successful" value={auditLogs.filter((l) => l.status === 'success').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Failed" value={auditLogs.filter((l) => l.status === 'failed').length} icon="XCircle" accent="destructive" />
        <StatCard label="Warnings" value={auditLogs.filter((l) => l.status === 'warning').length} icon="AlertTriangle" accent="warning" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search by user, action, or target..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" aria-label="Search audit logs" />
        </div>
        <Select value={filter} onValueChange={(v) => { setFilter(v as typeof filter); setPage(1); }}>
          <SelectTrigger className="sm:w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            {filters.map((f) => <SelectItem key={f} value={f} className="capitalize">{f === 'all' ? 'All Logs' : f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {paginated.length === 0 ? (
            <EmptyState icon="Scroll" title="No logs found" description="No audit logs match your search." />
          ) : (
            <SectionCard title="Recent Actions" icon={<Icons.Activity className="h-4 w-4 text-primary" />}>
              <div className="space-y-2">
                {paginated.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={log.avatar} alt={log.user} />
                      <AvatarFallback>{log.user.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{log.user}</p>
                        <StatusBadge status={log.status} variant={statusVariant[log.status]} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span>{log.action}</span> <span className="font-medium text-foreground">{log.target}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground/70">
                        {log.module} · IP: {log.ip} · {formatTimestamp(log.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><Icons.ChevronLeft className="h-4 w-4" /> Previous</Button>
              <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next <Icons.ChevronRight className="h-4 w-4" /></Button>
            </div>
          )}
        </div>

        <SectionCard title="Login History" icon={<Icons.LogIn className="h-4 w-4 text-secondary" />}>
          <div className="space-y-2">
            {loginActivities.map((login) => (
              <div key={login.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={login.avatar} alt={login.user} />
                  <AvatarFallback>{login.user.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{login.user}</p>
                  <p className="text-xs text-muted-foreground">{login.role} · {login.device}</p>
                  <p className="text-xs text-muted-foreground/70">{new Date(login.loginTime).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })} · {login.ip}</p>
                </div>
                <StatusBadge status={login.status} variant={login.status === 'success' ? 'success' : 'destructive'} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
