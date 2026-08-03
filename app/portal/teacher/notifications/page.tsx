'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { getIcon } from '@/lib/portal/icons';
import { PageHeader } from '@/components/portal/shared/page-header';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { teacherNotifications as initialNotifications } from '@/lib/portal/teacher-data';
import type { TeacherNotification } from '@/lib/portal/teacher-types';

const categoryConfig: Record<TeacherNotification['category'], { icon: string; color: string }> = {
  classes: { icon: 'Video', color: 'bg-primary/10 text-primary' },
  assignments: { icon: 'Pencil', color: 'bg-warning/10 text-warning' },
  tests: { icon: 'Timer', color: 'bg-destructive/10 text-destructive' },
  results: { icon: 'Award', color: 'bg-success/10 text-success' },
  general: { icon: 'Bell', color: 'bg-accent/10 text-accent' },
};

const categories = ['all', 'classes', 'assignments', 'tests', 'results', 'general'] as const;
const PAGE_SIZE = 5;

function formatTimestamp(ts: string) {
  const date = new Date(ts);
  const now = new Date('2025-08-02T12:00:00');
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

export default function TeacherNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<(typeof categories)[number]>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = notifications.filter((n) => {
    const matchesFilter = filter === 'all' || n.category === filter;
    const matchesSearch = search === '' || n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggleRead = (id: string) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));

  return (
    <>
      <PageHeader title="Notifications" description={`You have ${unreadCount} unread notifications.`}>
        <Button variant="outline" size="sm" onClick={markAllRead}>
          <Icons.CheckCheck className="mr-2 h-4 w-4" />
          Mark all read
        </Button>
      </PageHeader>

      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9"
          aria-label="Search notifications"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => { setFilter(cat); setPage(1); }}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors',
              filter === cat ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {paginated.length === 0 ? (
        <EmptyState icon="Bell" title="No notifications" description="You're all caught up!" />
      ) : (
        <div className="space-y-2">
          {paginated.map((notif) => {
            const config = categoryConfig[notif.category];
            const Icon = getIcon(config.icon);
            return (
              <div
                key={notif.id}
                className={cn(
                  'flex items-start gap-3 rounded-xl border p-4 transition-colors',
                  notif.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/5'
                )}
              >
                <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', config.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                    {!notif.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{notif.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground/70">{formatTimestamp(notif.timestamp)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleRead(notif.id)}
                  className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={notif.read ? 'Mark as unread' : 'Mark as read'}
                >
                  {notif.read ? <Icons.Circle className="h-4 w-4" /> : <Icons.CheckCircle2 className="h-4 w-4" />}
                </button>
              </div>
            );
          })}
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
