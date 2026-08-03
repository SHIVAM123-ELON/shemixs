'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/lib/portal/admin-data';

const statusVariant = { published: 'success', pending: 'warning', archived: 'muted' } as const;

export default function AdminTestimonialsPage() {
  return (
    <>
      <PageHeader title="Testimonials" description="Manage testimonials displayed on the website.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Testimonial</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total" value={testimonials.length} icon="Quote" accent="primary" />
        <StatCard label="Published" value={testimonials.filter((t) => t.status === 'published').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Pending" value={testimonials.filter((t) => t.status === 'pending').length} icon="Clock" accent="warning" />
        <StatCard label="Avg Rating" value={(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)} icon="Star" accent="secondary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <StatusBadge status={testimonial.status} variant={statusVariant[testimonial.status]} />
            </div>
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icons.Star key={i} className={i < testimonial.rating ? 'h-4 w-4 fill-warning text-warning' : 'h-4 w-4 text-muted-foreground/30'} />
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">&ldquo;{testimonial.content}&rdquo;</p>
            <p className="mt-2 text-xs text-muted-foreground/70">{new Date(testimonial.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1"><Icons.Pencil className="mr-2 h-3.5 w-3.5" /> Edit</Button>
              {testimonial.status === 'pending' && <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90"><Icons.Check className="h-3.5 w-3.5" /></Button>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
