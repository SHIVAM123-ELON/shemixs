import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressCard } from './progress-card';
import type { Course } from '@/lib/portal/types';

interface CourseCardProps {
  course: Course;
  href?: string;
}

export function CourseCard({ course, href = '#' }: CourseCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/20">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur">
          {course.subject}
        </span>
        <span className="absolute right-3 top-3 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
          {course.level}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">by {course.instructor}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {course.chapters} chapters
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {course.duration}
          </span>
        </div>
        <div className="mt-3">
          <ProgressCard
            title=""
            progress={course.progress}
            current={`${course.completedChapters}`}
            total={`${course.chapters}`}
            className="border-0 p-0"
          />
        </div>
        <Button asChild className="mt-4 w-full" size="sm">
          <Link href={href}>
            <PlayCircle className="mr-2 h-4 w-4" />
            {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
