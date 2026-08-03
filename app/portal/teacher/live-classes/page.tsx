'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { liveClasses, teacherCourses } from '@/lib/portal/teacher-data';

const statusVariant = {
  upcoming: 'info',
  live: 'destructive',
  completed: 'success',
  cancelled: 'muted',
} as const;

export default function TeacherLiveClassesPage() {
  const [showSchedule, setShowSchedule] = useState(false);
  const upcoming = liveClasses.filter((l) => l.status === 'upcoming' || l.status === 'live');
  const previous = liveClasses.filter((l) => l.status === 'completed');

  return (
    <>
      <PageHeader title="Live Classes" description="Schedule and manage live online classes for your students.">
        <Dialog open={showSchedule} onOpenChange={setShowSchedule}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Icons.PlusCircle className="mr-2 h-4 w-4" />
              Schedule Class
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Schedule Live Class</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="lc-title">Class Title</Label>
                <Input id="lc-title" placeholder="e.g. Thermodynamics — Live Problem Solving" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="lc-course">Course</Label>
                <Select>
                  <SelectTrigger id="lc-course" className="mt-1.5">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {teacherCourses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="lc-batch">Batch</Label>
                  <Select>
                    <SelectTrigger id="lc-batch" className="mt-1.5">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcm-a">PCM-A</SelectItem>
                      <SelectItem value="pcm-b">PCM-B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lc-duration">Duration (min)</Label>
                  <Input id="lc-duration" type="number" placeholder="e.g. 60" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="lc-date">Date</Label>
                  <Input id="lc-date" type="date" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="lc-time">Time</Label>
                  <Input id="lc-time" type="time" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="lc-link">Meeting Link</Label>
                <Input id="lc-link" placeholder="https://meet.shemixs.com/room/..." className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="lc-agenda">Agenda</Label>
                <textarea
                  id="lc-agenda"
                  placeholder="What will be covered in this class?"
                  className="mt-1.5 h-24 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setShowSchedule(false)}>Schedule Class</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Upcoming & Live */}
      <div className="mb-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Upcoming & Live Classes</h2>
        {upcoming.length === 0 ? (
          <EmptyState icon="Radio" title="No upcoming classes" description="Schedule a new live class to get started." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {upcoming.map((lc) => (
              <div key={lc.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{lc.title}</h3>
                  <StatusBadge status={lc.status} variant={statusVariant[lc.status]} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{lc.course} · {lc.batch}</p>
                <p className="mt-2 text-sm text-muted-foreground">{lc.agenda}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icons.CalendarDays className="h-3 w-3" />
                    {new Date(lc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icons.Clock className="h-3 w-3" />
                    {lc.time} · {lc.duration} min
                  </span>
                  {lc.attendees && (
                    <span className="flex items-center gap-1">
                      <Icons.Users className="h-3 w-3" />
                      {lc.attendees} attending
                    </span>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  {lc.status === 'live' ? (
                    <Button size="sm" className="flex-1">
                      <Icons.Radio className="mr-2 h-3.5 w-3.5" />
                      Join Now
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Icons.Link className="mr-2 h-3.5 w-3.5" />
                      Copy Link
                    </Button>
                  )}
                  <Button size="sm" variant="ghost">
                    <Icons.Pencil className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Previous Classes */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Previous Classes</h2>
        {previous.length === 0 ? (
          <EmptyState icon="History" title="No previous classes" description="Your completed live classes will appear here." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {previous.map((lc) => (
              <div key={lc.id} className="rounded-xl border border-border bg-card p-4 opacity-80">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{lc.title}</h3>
                  <StatusBadge status={lc.status} variant={statusVariant[lc.status]} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{lc.course} · {lc.batch}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icons.CalendarDays className="h-3 w-3" />
                    {new Date(lc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {lc.attendees && (
                    <span className="flex items-center gap-1">
                      <Icons.Users className="h-3 w-3" />
                      {lc.attendees} attended
                    </span>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Icons.PlayCircle className="mr-2 h-3.5 w-3.5" />
                    Watch Recording
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
