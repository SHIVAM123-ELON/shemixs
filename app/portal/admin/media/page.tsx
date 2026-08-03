'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mediaItems } from '@/lib/portal/admin-data';

const typeIcon = { image: Icons.Image, video: Icons.Video, document: Icons.FileText };
const typeColor = { image: 'bg-primary/10 text-primary', video: 'bg-warning/10 text-warning', document: 'bg-secondary/10 text-secondary' };

export default function AdminMediaPage() {
  const [search, setSearch] = useState('');
  const filtered = mediaItems.filter((m) => search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.folder.toLowerCase().includes(search.toLowerCase()));
  const folders = Array.from(new Set(mediaItems.map((m) => m.folder)));

  return (
    <>
      <PageHeader title="Media Library" description="Upload, organize, and manage media assets.">
        <Button size="sm"><Icons.Upload className="mr-2 h-4 w-4" /> Upload</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Files" value={mediaItems.length} icon="FolderOpen" accent="primary" />
        <StatCard label="Images" value={mediaItems.filter((m) => m.type === 'image').length} icon="Image" accent="secondary" />
        <StatCard label="Videos" value={mediaItems.filter((m) => m.type === 'video').length} icon="Video" accent="warning" />
        <StatCard label="Documents" value={mediaItems.filter((m) => m.type === 'document').length} icon="FileText" accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Folders</p>
            <div className="space-y-1">
              <button className="flex w-full items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                <Icons.FolderOpen className="h-4 w-4" /> All Files
              </button>
              {folders.map((folder) => (
                <button key={folder} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
                  <Icons.Folder className="h-4 w-4" /> {folder}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4 relative max-w-sm">
            <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" aria-label="Search media" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => {
              const Icon = typeIcon[item.type];
              return (
                <div key={item.id} className="rounded-xl border border-border bg-card p-3">
                  <div className={`flex h-20 items-center justify-center rounded-lg ${typeColor[item.type]}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="mt-2 truncate text-sm font-medium text-foreground">{item.name}</p>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.size}</span>
                    <span className="flex items-center gap-1"><Icons.Folder className="h-3 w-3" /> {item.folder}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Used {item.usage}x</span>
                    <span>{new Date(item.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
