'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { cmsPages } from '@/lib/portal/admin-data';

const statusVariant = { published: 'success', draft: 'warning', archived: 'muted' } as const;

export default function AdminCMSPage() {
  return (
    <>
      <PageHeader title="Website CMS" description="Manage website pages, sections, SEO, and publishing workflow.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Page</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Pages" value={cmsPages.length} icon="Globe" accent="primary" />
        <StatCard label="Published" value={cmsPages.filter((p) => p.status === 'published').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Drafts" value={cmsPages.filter((p) => p.status === 'draft').length} icon="Pencil" accent="warning" />
        <StatCard label="Total Sections" value={cmsPages.reduce((sum, p) => sum + p.sections, 0)} icon="Layers" accent="secondary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title="Pages" icon={<Icons.Globe className="h-4 w-4 text-primary" />}>
            <div className="space-y-2">
              {cmsPages.map((page) => (
                <div key={page.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><Icons.FileText className="h-4 w-4 text-primary" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{page.title}</p>
                    <p className="text-xs text-muted-foreground">{page.slug} · {page.sections} sections · By {page.author}</p>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:block">{new Date(page.lastModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <StatusBadge status={page.status} variant={statusVariant[page.status]} />
                  <Button size="sm" variant="ghost"><Icons.Pencil className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Publish Workflow" icon={<Icons.GitBranch className="h-4 w-4 text-secondary" />}>
          <div className="space-y-3">
            <div className="rounded-lg border border-border p-3">
              <p className="text-sm font-semibold text-foreground">Navbar Management</p>
              <p className="mt-1 text-xs text-muted-foreground">Configure navigation menu items</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">Edit Navbar</Button>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-sm font-semibold text-foreground">Footer Management</p>
              <p className="mt-1 text-xs text-muted-foreground">Configure footer links and content</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">Edit Footer</Button>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-sm font-semibold text-foreground">SEO Settings</p>
              <p className="mt-1 text-xs text-muted-foreground">Meta tags, sitemap, robots.txt</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">Configure SEO</Button>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-sm font-semibold text-foreground">Version History</p>
              <p className="mt-1 text-xs text-muted-foreground">Track and restore previous versions</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">View History</Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
