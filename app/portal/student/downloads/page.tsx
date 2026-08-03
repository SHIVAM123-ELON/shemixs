'use client';

import * as Icons from 'lucide-react';
import { getIcon } from '@/lib/portal/icons';
import { PageHeader } from '@/components/portal/shared/page-header';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { downloads } from '@/lib/portal/data';

const typeConfig = {
  pdf: { icon: 'FileText', color: 'bg-destructive/10 text-destructive' },
  video: { icon: 'Video', color: 'bg-primary/10 text-primary' },
  slides: { icon: 'Presentation', color: 'bg-warning/10 text-warning' },
  zip: { icon: 'Archive', color: 'bg-secondary/10 text-secondary' },
} as const;

export default function DownloadsPage() {
  return (
    <>
      <PageHeader title="Downloads" description="Access your downloaded resources and materials." />

      <div className="mb-6 relative sm:max-w-xs">
        <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search downloads..."
          className="pl-9"
          aria-label="Search downloads"
        />
      </div>

      {downloads.length === 0 ? (
        <EmptyState icon="Download" title="No downloads yet" description="Your downloaded resources will appear here." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.map((item) => {
            const config = typeConfig[item.type];
            const Icon = getIcon(config.icon);
            return (
              <div key={item.id} className="group rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-start gap-3">
                  <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-lg', config.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.subject}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icons.HardDrive className="h-3 w-3" />
                        {item.size}
                      </span>
                      <span className="capitalize">{item.type}</span>
                      {item.downloadedAt && (
                        <span className="flex items-center gap-1">
                          <Icons.CalendarDays className="h-3 w-3" />
                          {new Date(item.downloadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icons.FolderOpen className="mr-2 h-3.5 w-3.5" />
                    Open
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Icons.Download className="mr-2 h-3.5 w-3.5" />
                    Re-download
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
