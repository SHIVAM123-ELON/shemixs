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
import { cn } from '@/lib/utils';
import { testQuestions } from '@/lib/portal/teacher-data';

const testTypes = [
  { id: 'MCQ', label: 'MCQ Test', icon: 'ListChecks', desc: 'Multiple choice questions with auto-grading' },
  { id: 'Subjective', label: 'Subjective Test', icon: 'PenLine', desc: 'Written answers requiring manual grading' },
  { id: 'Practice', label: 'Practice Test', icon: 'Dumbbell', desc: 'Unlimited attempts, no grading' },
  { id: 'Mock', label: 'Mock Test', icon: 'FileWarning', desc: 'Full-length exam simulation' },
] as const;

export default function CreateTestPage() {
  const [testType, setTestType] = useState<string>('MCQ');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

  return (
    <>
      <PageHeader title="Create Test" description="Build a new test or exam for your students." />

      {/* Test Type Selection */}
      <SectionCard title="Test Type" icon={<Icons.ClipboardList className="h-4 w-4 text-primary" />}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {testTypes.map((type) => {
            const Icon = Icons[type.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            const isActive = testType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setTestType(type.id)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all',
                  isActive ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border hover:border-primary/30 hover:bg-muted/30'
                )}
              >
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground')}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{type.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{type.desc}</p>
              </button>
            );
          })}
        </div>
      </SectionCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Test Details */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Test Details" icon={<Icons.Info className="h-4 w-4 text-accent" />}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="test-title">Test Title</Label>
                <Input id="test-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Mechanics Unit Test" className="mt-1.5" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="test-subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="test-subject" className="mt-1.5">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="math">Applied Mathematics</SelectItem>
                      <SelectItem value="chem">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="test-duration">Duration (minutes)</Label>
                  <Input id="test-duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 90" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="test-marks">Total Marks</Label>
                  <Input id="test-marks" type="number" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} placeholder="e.g. 100" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="test-date">Test Date</Label>
                  <Input id="test-date" type="date" className="mt-1.5" />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Questions */}
          <SectionCard
            title="Questions"
            icon={<Icons.HelpCircle className="h-4 w-4 text-secondary" />}
            action={
              <Button size="sm" variant="outline">
                <Icons.Plus className="mr-2 h-3.5 w-3.5" />
                Add Question
              </Button>
            }
          >
            <div className="space-y-3">
              {testQuestions.map((q, i) => (
                <div key={q.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground">Question {i + 1} · {q.type === 'mcq' ? 'MCQ' : 'Subjective'} · {q.marks} marks</p>
                      <p className="mt-1 text-sm text-foreground">{q.question}</p>
                      {q.options && (
                        <div className="mt-2 space-y-1">
                          {q.options.map((opt, j) => (
                            <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex h-5 w-5 items-center justify-center rounded border border-border text-[10px] font-medium">{String.fromCharCode(65 + j)}</span>
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Icons.Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Summary & Actions */}
        <div className="space-y-6">
          <SectionCard title="Test Summary" icon={<Icons.ClipboardList className="h-4 w-4 text-primary" />}>
            <dl className="space-y-3">
              {[
                { label: 'Type', value: testType },
                { label: 'Title', value: title || 'Untitled' },
                { label: 'Subject', value: subject || 'Not selected' },
                { label: 'Duration', value: duration ? `${duration} min` : 'Not set' },
                { label: 'Total Marks', value: totalMarks || 'Not set' },
                { label: 'Questions', value: `${testQuestions.length}` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>

          <SectionCard title="Actions" icon={<Icons.Settings className="h-4 w-4 text-secondary" />}>
            <div className="space-y-3">
              <Button className="w-full">
                <Icons.Upload className="mr-2 h-4 w-4" />
                Publish Test
              </Button>
              <Button variant="outline" className="w-full">
                <Icons.Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <p className="text-center text-xs text-muted-foreground">Published tests are visible to enrolled students immediately</p>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
