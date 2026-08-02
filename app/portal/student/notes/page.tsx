'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { notes as initialNotes } from '@/lib/portal/data';
import type { Note } from '@/lib/portal/types';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites' | 'bookmarked'>('all');

  const filtered = notes.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'favorites' && n.favorite) || (filter === 'bookmarked' && n.bookmarked);
    return matchesSearch && matchesFilter;
  });

  const toggleFavorite = (id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite } : n)));
  };
  const toggleBookmark = (id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, bookmarked: !n.bookmarked } : n)));
  };

  return (
    <>
      <PageHeader title="Handwritten Notes" description="Access and download handwritten notes for all your subjects.">
        <Button variant="outline" size="sm">
          <Icons.Download className="mr-2 h-4 w-4" />
          Download All
        </Button>
      </PageHeader>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search notes"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'favorites', 'bookmarked'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors',
                filter === f ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="FileText" title="No notes found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((note) => (
            <div key={note.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/20">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image src={note.thumbnail} alt={note.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur">
                  {note.subject}
                </span>
                <div className="absolute right-3 top-3 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(note.id)}
                    aria-label="Toggle favorite"
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur transition-colors',
                      note.favorite ? 'bg-warning text-warning-foreground' : 'bg-background/90 text-foreground hover:bg-background'
                    )}
                  >
                    <Icons.Star className="h-4 w-4" fill={note.favorite ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(note.id)}
                    aria-label="Toggle bookmark"
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur transition-colors',
                      note.bookmarked ? 'bg-primary text-primary-foreground' : 'bg-background/90 text-foreground hover:bg-background'
                    )}
                  >
                    <Icons.Bookmark className="h-4 w-4" fill={note.bookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{note.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icons.FileText className="h-3 w-3" />
                    {note.pages} pages
                  </span>
                  <span className="flex items-center gap-1">
                    <Icons.CalendarDays className="h-3 w-3" />
                    {new Date(note.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icons.Eye className="mr-2 h-3.5 w-3.5" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Icons.Download className="mr-2 h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
