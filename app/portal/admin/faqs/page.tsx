'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { faqItems } from '@/lib/portal/admin-data';

const statusVariant = { published: 'success', draft: 'warning' } as const;

export default function AdminFAQsPage() {
  return (
    <>
      <PageHeader title="FAQ Management" description="Manage frequently asked questions on the website.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New FAQ</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total FAQs" value={faqItems.length} icon="HelpCircle" accent="primary" />
        <StatCard label="Published" value={faqItems.filter((f) => f.status === 'published').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Drafts" value={faqItems.filter((f) => f.status === 'draft').length} icon="Pencil" accent="warning" />
        <StatCard label="Categories" value={Array.from(new Set(faqItems.map((f) => f.category))).length} icon="FolderTree" accent="secondary" />
      </div>

      <div className="space-y-3">
        {faqItems.map((faq) => (
          <div key={faq.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">{faq.order}</span>
                  <h3 className="text-sm font-semibold text-foreground">{faq.question}</h3>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{faq.answer}</p>
                <span className="mt-2 inline-block rounded-md border border-border bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground">{faq.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={faq.status} variant={statusVariant[faq.status]} />
                <Button size="sm" variant="ghost"><Icons.Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><Icons.Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
