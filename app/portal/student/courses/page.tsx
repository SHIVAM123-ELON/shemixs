'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { CourseCard } from '@/components/portal/shared/course-card';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { courses } from '@/lib/portal/data';
import { Search, Filter } from 'lucide-react';

const filters = ['All', 'In Progress', 'Completed', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'In Progress' && c.progress < 100) ||
      (activeFilter === 'Completed' && c.progress === 100) ||
      c.level === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <PageHeader title="My Courses" description="Browse and manage all your enrolled courses.">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Sort by Progress
        </Button>
      </PageHeader>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search courses"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="BookOpen"
          title="No courses found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} href="/portal/student/lectures" />
          ))}
        </div>
      )}
    </>
  );
}
