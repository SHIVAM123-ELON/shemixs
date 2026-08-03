'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { courses, lessons } from '@/lib/portal/data';

const playbackSpeeds = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];

export default function LecturesPage() {
  const [activeLessonId, setActiveLessonId] = useState(lessons[4].id);
  const [activePanel, setActivePanel] = useState<'playlist' | 'notes' | 'resources'>('playlist');
  const [speed, setSpeed] = useState('1x');
  const [completed, setCompleted] = useState<string[]>(lessons.filter((l) => l.completed).map((l) => l.id));

  const activeLesson = lessons.find((l) => l.id === activeLessonId)!;
  const course = courses[0];
  const activeIndex = lessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = activeIndex > 0 ? lessons[activeIndex - 1] : null;
  const nextLesson = activeIndex < lessons.length - 1 ? lessons[activeIndex + 1] : null;

  const toggleComplete = (id: string) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]));
  };

  return (
    <>
      <PageHeader title="Video Lectures" description={course.title} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video Player Area */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {/* Video Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-background-secondary to-muted">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icons.Play className="h-8 w-8 text-primary" fill="currentColor" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{activeLesson.title}</p>
                <p className="mt-1 text-xs text-muted-foreground/70">{course.instructor}</p>
              </div>
              {/* Video Controls Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="mb-3 h-1 rounded-full bg-white/20">
                  <div className="h-full w-1/3 rounded-full bg-primary" />
                </div>
                <div className="flex items-center justify-between gap-3 text-white">
                  <div className="flex items-center gap-2">
                    <button type="button" aria-label="Play" className="rounded p-1 hover:bg-white/10">
                      <Icons.Play className="h-5 w-5" fill="currentColor" />
                    </button>
                    <button type="button" aria-label="Skip back 10 seconds" className="rounded p-1 hover:bg-white/10">
                      <Icons.RotateCcw className="h-4 w-4" />
                    </button>
                    <span className="text-xs font-medium">5:23 / {activeLesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSpeed(speed === '2x' ? '0.5x' : playbackSpeeds[paybackSpeedIndex(speed) + 1] ?? '1x')}
                      className="rounded px-2 py-0.5 text-xs font-medium hover:bg-white/10"
                    >
                      {speed}
                    </button>
                    <button type="button" aria-label="Volume" className="rounded p-1 hover:bg-white/10">
                      <Icons.Volume2 className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Settings" className="rounded p-1 hover:bg-white/10">
                      <Icons.Settings className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Full screen" className="rounded p-1 hover:bg-white/10">
                      <Icons.Maximize className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Info & Actions */}
            <div className="border-t border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-foreground">{activeLesson.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Lesson {activeLesson.order} · {course.subject} · {activeLesson.duration}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={completed.includes(activeLessonId) ? 'secondary' : 'default'}
                  onClick={() => toggleComplete(activeLessonId)}
                >
                  <Icons.CheckCircle2 className="mr-2 h-4 w-4" />
                  {completed.includes(activeLessonId) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>

              {/* Prev / Next */}
              <div className="mt-4 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!prevLesson}
                  onClick={() => prevLesson && setActiveLessonId(prevLesson.id)}
                >
                  <Icons.ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!nextLesson}
                  onClick={() => nextLesson && setActiveLessonId(nextLesson.id)}
                >
                  Next
                  <Icons.ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex border-b border-border">
            {(['playlist', 'notes', 'resources'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActivePanel(tab)}
                className={cn(
                  'flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors',
                  activePanel === tab
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-h-[600px] overflow-y-auto p-2">
            {activePanel === 'playlist' && (
              <div className="space-y-1">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors',
                      lesson.id === activeLessonId ? 'bg-primary/10' : 'hover:bg-muted'
                    )}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border">
                      {completed.includes(lesson.id) ? (
                        <Icons.CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <Icons.Play className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {activePanel === 'notes' && (
              <div className="p-3">
                <textarea
                  className="h-64 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Take notes while watching..."
                  aria-label="Lesson notes"
                />
                <Button size="sm" className="mt-3 w-full">
                  <Icons.Save className="mr-2 h-4 w-4" />
                  Save Notes
                </Button>
              </div>
            )}

            {activePanel === 'resources' && (
              <div className="space-y-2 p-2">
                {[
                  { title: 'Lecture Slides — Thermodynamics.pdf', type: 'pdf', size: '3.2 MB' },
                  { title: 'Formula Sheet.pdf', type: 'pdf', size: '1.1 MB' },
                  { title: 'Practice Problems.pdf', type: 'pdf', size: '2.8 MB' },
                ].map((resource, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                      <Icons.FileText className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">{resource.size}</p>
                    </div>
                    <Button size="icon" variant="ghost" aria-label="Download resource">
                      <Icons.Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function paybackSpeedIndex(s: string) {
  return playbackSpeeds.indexOf(s);
}
