'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function UploadNotesPage() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <PageHeader title="Upload Notes" description="Upload PDF notes and study materials for your students." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Area + Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* PDF Upload */}
          <SectionCard title="PDF File" icon={<Icons.FileText className="h-4 w-4 text-primary" />}>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-16 text-center transition-colors hover:border-primary/40 hover:bg-muted/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Icons.FileUp className="h-8 w-8 text-primary" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">Drag and drop your PDF here</p>
              <p className="mt-1 text-xs text-muted-foreground">PDF up to 50MB</p>
              <Button size="sm" variant="outline" className="mt-4">
                <Icons.FolderOpen className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
            </div>
          </SectionCard>

          {/* Notes Details */}
          <SectionCard title="Notes Details" icon={<Icons.Info className="h-4 w-4 text-accent" />}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="notes-title">Notes Title</Label>
                <Input id="notes-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Thermodynamics Formula Sheet" className="mt-1.5" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject" className="mt-1.5">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="math">Applied Mathematics</SelectItem>
                      <SelectItem value="chem">Chemistry</SelectItem>
                      <SelectItem value="bio">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes-chapter">Chapter</Label>
                  <Select value={chapter} onValueChange={setChapter}>
                    <SelectTrigger id="notes-chapter" className="mt-1.5">
                      <SelectValue placeholder="Select chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ch1">Chapter 1: Introduction</SelectItem>
                      <SelectItem value="ch2">Chapter 2: Fundamentals</SelectItem>
                      <SelectItem value="ch3">Chapter 3: Applications</SelectItem>
                      <SelectItem value="ch4">Chapter 4: Advanced Topics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes-description">Description</Label>
                <textarea
                  id="notes-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what these notes cover..."
                  className="mt-1.5 h-24 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Preview & Actions */}
        <div className="space-y-6">
          <SectionCard title="Download Preview" icon={<Icons.Eye className="h-4 w-4 text-primary" />}>
            <div className="rounded-lg border border-border bg-muted p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <Icons.FileText className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm font-semibold text-foreground">{title || 'Untitled Notes'}</p>
                <p className="mt-1 text-xs text-muted-foreground">{subject || 'No subject selected'}</p>
                <p className="mt-1 text-xs text-muted-foreground">{description || 'No description provided'}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              <Icons.Download className="mr-2 h-4 w-4" />
              Preview PDF
            </Button>
          </SectionCard>

          <SectionCard title="Actions" icon={<Icons.Settings className="h-4 w-4 text-secondary" />}>
            <div className="space-y-3">
              <Button className="w-full">
                <Icons.Upload className="mr-2 h-4 w-4" />
                Publish Notes
              </Button>
              <Button variant="outline" className="w-full">
                <Icons.Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <p className="text-center text-xs text-muted-foreground">Published notes are visible to enrolled students</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
