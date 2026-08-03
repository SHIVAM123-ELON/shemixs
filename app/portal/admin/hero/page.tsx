'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/lib/portal/admin-data';

const statusVariant = { active: 'success', inactive: 'muted' } as const;

export default function AdminHeroPage() {
  return (
    <>
      <PageHeader title="Hero Management" description="Manage homepage hero slides, buttons, and scheduling.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Slide</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Slides" value={heroSlides.length} icon="Image" accent="primary" />
        <StatCard label="Active" value={heroSlides.filter((s) => s.status === 'active').length} icon="PlayCircle" accent="success" />
        <StatCard label="Inactive" value={heroSlides.filter((s) => s.status === 'inactive').length} icon="PauseCircle" accent="secondary" />
        <StatCard label="Scheduled" value={0} icon="Clock" accent="warning" />
      </div>

      <div className="space-y-4">
        {heroSlides.map((slide) => (
          <div key={slide.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex items-center gap-3 lg:flex-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Icons.Image className="h-5 w-5 text-primary" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">{slide.order}</span>
                    <h3 className="truncate text-sm font-semibold text-foreground">{slide.title}</h3>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{slide.subtitle}</p>
                </div>
              </div>
              <div className="lg:flex-1">
                <p className="text-xs font-semibold text-muted-foreground">Button</p>
                <p className="text-sm text-foreground">{slide.buttonText} → {slide.buttonHref}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={slide.status} variant={statusVariant[slide.status]} />
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
