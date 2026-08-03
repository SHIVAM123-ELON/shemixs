'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { galleryAlbums } from '@/lib/portal/admin-data';

export default function AdminGalleryPage() {
  return (
    <>
      <PageHeader title="Gallery Management" description="Manage photo and video albums.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Album</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Albums" value={galleryAlbums.length} icon="Images" accent="primary" />
        <StatCard label="Total Images" value={galleryAlbums.reduce((sum, a) => sum + a.imageCount, 0)} icon="Image" accent="secondary" />
        <StatCard label="Total Videos" value={galleryAlbums.reduce((sum, a) => sum + a.videoCount, 0)} icon="Video" accent="warning" />
        <StatCard label="Featured" value={galleryAlbums.filter((a) => a.featured).length} icon="Star" accent="success" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryAlbums.map((album) => (
          <div key={album.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="gradient-brand-soft relative h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <Icons.Images className="h-12 w-12 text-muted-foreground/30" />
              </div>
              {album.featured && (
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning">
                  <Icons.Star className="h-3 w-3" /> Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-foreground">{album.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{album.category}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Icons.Image className="h-3 w-3" /> {album.imageCount}</span>
                <span className="flex items-center gap-1"><Icons.Video className="h-3 w-3" /> {album.videoCount}</span>
                <span className="ml-auto">{new Date(album.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">Manage</Button>
                <Button size="sm" variant="ghost"><Icons.Pencil className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
