'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminNotices } from '@/lib/portal/admin-data';

const statusVariant = { published: 'success', draft: 'warning' } as const;
const categoryColor: Record<string, string> = { academic: 'bg-primary/10 text-primary', event: 'bg-accent/10 text-accent', holiday: 'bg-success/10 text-success', urgent: 'bg-destructive/10 text-destructive', general: 'bg-muted text-muted-foreground' };
const filters = ['all', 'published', 'draft'] as const;

export default function AdminNoticesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');

  const filtered = adminNotices.filter((n) => {
    const matchesSearch = search === '' || n.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || n.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <PageHeader title="Notice Board" description="Publish and manage institution-wide notices.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Notice</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Notices" value={adminNotices.length} icon="Megaphone" accent="primary" />
        <StatCard label="Published" value={adminNotices.filter((n) => n.status === 'published').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Drafts" value={adminNotices.filter((n) => n.status === 'draft').length} icon="Pencil" accent="warning" />
        <StatCard label="Pinned" value={adminNotices.filter((n) => n.pinned).length} icon="Pin" accent="secondary" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search notices..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" aria-label="Search notices" />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted'}`}>{f}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="Megaphone" title="No notices found" description="No notices match your search." />
      ) : (
        <div className="space-y-3">
          {filtered.map((notice) => (
            <div key={notice.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium capitalize ${categoryColor[notice.category]}`}>{notice.category}</span>
                    {notice.pinned && <Icons.Pin className="h-3 w-3 text-warning" />}
                    <h3 className="truncate text-sm font-semibold text-foreground">{notice.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notice.content}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>By {notice.author}</span>
                    {notice.publishedAt && <span>· {new Date(notice.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                    {notice.attachments > 0 && <span className="flex items-center gap-1"><Icons.Paperclip className="h-3 w-3" /> {notice.attachments} file(s)</span>}
                  </div>
                </div>
                <StatusBadge status={notice.status} variant={statusVariant[notice.status]} />
              </div>
              <div className="mt-3 flex gap-2 border-t border-border pt-3">
                <Button size="sm" variant="outline"><Icons.Eye className="mr-2 h-3.5 w-3.5" /> View</Button>
                <Button size="sm" variant="ghost"><Icons.Pencil className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><Icons.Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
