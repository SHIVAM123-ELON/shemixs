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
import { teacherCourses } from '@/lib/portal/teacher-data';

export default function UploadVideosPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [chapter, setChapter] = useState('');
  const [lesson, setLesson] = useState('');
  const [duration, setDuration] = useState('');

  return (
    <>
      <PageHeader title="Upload Videos" description="Upload lecture videos for your courses." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Upload */}
          <SectionCard title="Video File" icon={<Icons.Video className="h-4 w-4 text-primary" />}>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-16 text-center transition-colors hover:border-primary/40 hover:bg-muted/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Icons.UploadCloud className="h-8 w-8 text-primary" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">Drag and drop your video here</p>
              <p className="mt-1 text-xs text-muted-foreground">MP4, MOV, AVI up to 2GB</p>
              <Button size="sm" variant="outline" className="mt-4">
                <Icons.FolderOpen className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
            </div>
          </SectionCard>

          {/* Thumbnail Upload */}
          <SectionCard title="Thumbnail" icon={<Icons.Image className="h-4 w-4 text-secondary" />}>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-12 text-center transition-colors hover:border-secondary/40 hover:bg-muted/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <Icons.ImagePlus className="h-6 w-6 text-secondary" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">Upload thumbnail image</p>
              <p className="mt-1 text-xs text-muted-foreground">JPG, PNG · 16:9 recommended</p>
              <Button size="sm" variant="outline" className="mt-3">
                <Icons.FolderOpen className="mr-2 h-4 w-4" />
                Choose Image
              </Button>
            </div>
          </SectionCard>

          {/* Video Details */}
          <SectionCard title="Video Details" icon={<Icons.Info className="h-4 w-4 text-accent" />}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Newton's Laws of Motion — Part 3" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this video covers..."
                  className="mt-1.5 h-24 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select value={course} onValueChange={setCourse}>
                    <SelectTrigger id="course" className="mt-1.5">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherCourses.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="chapter">Chapter</Label>
                  <Select value={chapter} onValueChange={setChapter}>
                    <SelectTrigger id="chapter" className="mt-1.5">
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
                <div>
                  <Label htmlFor="lesson">Lesson</Label>
                  <Select value={lesson} onValueChange={setLesson}>
                    <SelectTrigger id="lesson" className="mt-1.5">
                      <SelectValue placeholder="Select lesson" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="l1">Lesson 1</SelectItem>
                      <SelectItem value="l2">Lesson 2</SelectItem>
                      <SelectItem value="l3">Lesson 3</SelectItem>
                      <SelectItem value="l4">Lesson 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 45" className="mt-1.5" />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Preview & Actions */}
        <div className="space-y-6">
          <SectionCard title="Preview" icon={<Icons.Eye className="h-4 w-4 text-primary" />}>
            <div className="aspect-video rounded-lg bg-muted">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Icons.PlayCircle className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-xs text-muted-foreground">Video preview will appear here</p>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-sm font-semibold text-foreground">{title || 'Untitled Video'}</p>
              <p className="text-xs text-muted-foreground">{description || 'No description provided'}</p>
              {duration && <p className="text-xs text-muted-foreground">Duration: {duration} min</p>}
            </div>
          </SectionCard>

          <SectionCard title="Actions" icon={<Icons.Settings className="h-4 w-4 text-secondary" />}>
            <div className="space-y-3">
              <Button className="w-full">
                <Icons.Upload className="mr-2 h-4 w-4" />
                Publish Video
              </Button>
              <Button variant="outline" className="w-full">
                <Icons.Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <p className="text-center text-xs text-muted-foreground">Drafts are only visible to you</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
