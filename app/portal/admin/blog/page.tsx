'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogPosts } from '@/lib/portal/admin-data';

const statusVariant = { published: 'success', draft: 'warning', archived: 'muted' } as const;
const tabs = ['all', 'published', 'draft', 'archived'] as const;

export default function AdminBlogPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('all');
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter((p) => {
    const matchesTab = tab === 'all' || p.status === tab;
    const matchesSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <PageHeader title="Blog Management" description="Manage blog posts, categories, tags, and SEO.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Post</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Posts" value={blogPosts.length} icon="PenLine" accent="primary" />
        <StatCard label="Published" value={blogPosts.filter((p) => p.status === 'published').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Total Views" value={blogPosts.reduce((sum, p) => sum + p.views, 0)} icon="Eye" accent="secondary" />
        <StatCard label="Drafts" value={blogPosts.filter((p) => p.status === 'draft').length} icon="Pencil" accent="warning" />
      </div>

      <div className="mb-4 relative max-w-sm">
        <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" aria-label="Search blog posts" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'}`}>{t}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="PenLine" title="No posts found" description="No blog posts match your filter." />
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <div key={post.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-foreground">{post.title}</h3>
                    <StatusBadge status={post.status} variant={statusVariant[post.status]} />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">By {post.author} · {post.category}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {post.tags.map((tag) => <span key={tag} className="rounded-md border border-border bg-muted/30 px-1.5 py-0.5 text-xs text-muted-foreground">{tag}</span>)}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{post.views} views</p>
                    {post.publishedAt && <p className="text-xs text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>}
                  </div>
                  <Button size="sm" variant="ghost"><Icons.Pencil className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><Icons.Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
