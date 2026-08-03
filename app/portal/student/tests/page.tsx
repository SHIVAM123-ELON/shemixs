'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tests } from '@/lib/portal/data';

export default function TestsPage() {
  const upcoming = tests.filter((t) => t.type === 'upcoming');
  const mock = tests.filter((t) => t.type === 'mock');
  const practice = tests.filter((t) => t.type === 'practice');
  const previous = tests.filter((t) => t.type === 'previous');

  const renderTestCard = (test: (typeof tests)[number]) => (
    <div key={test.id} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{test.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{test.subject}</p>
        </div>
        <StatusBadge status={test.type} variant="info" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-muted p-2 text-center">
          <p className="font-semibold text-foreground">{new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          <p className="text-muted-foreground">Date</p>
        </div>
        <div className="rounded-lg bg-muted p-2 text-center">
          <p className="font-semibold text-foreground">{test.duration}</p>
          <p className="text-muted-foreground">Duration</p>
        </div>
        <div className="rounded-lg bg-muted p-2 text-center">
          <p className="font-semibold text-foreground">{test.questions}</p>
          <p className="text-muted-foreground">Questions</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Total: {test.totalMarks} marks</span>
        {test.status === 'completed' ? (
          <Button size="sm" variant="outline">
            <Icons.Eye className="mr-2 h-3.5 w-3.5" />
            View Result
          </Button>
        ) : (
          <Button size="sm">
            <Icons.Timer className="mr-2 h-3.5 w-3.5" />
            {test.type === 'practice' ? 'Start Practice' : test.type === 'mock' ? 'Start Mock' : 'Start Test'}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <PageHeader title="Online Tests" description="Take upcoming tests, practice tests, and mock exams." />

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="mock">Mock Tests ({mock.length})</TabsTrigger>
          <TabsTrigger value="practice">Practice ({practice.length})</TabsTrigger>
          <TabsTrigger value="previous">Previous ({previous.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{upcoming.map(renderTestCard)}</div>
        </TabsContent>
        <TabsContent value="mock">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{mock.map(renderTestCard)}</div>
        </TabsContent>
        <TabsContent value="practice">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{practice.map(renderTestCard)}</div>
        </TabsContent>
        <TabsContent value="previous">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{previous.map(renderTestCard)}</div>
        </TabsContent>
      </Tabs>
    </>
  );
}
