'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-gradient-mesh" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-primary/5 via-transparent to-transparent"
        aria-hidden
      />

      <div className="container relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              The Education Operating System for the next 50 years
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-display text-foreground"
          >
            One intelligent platform for{' '}
            <span className="text-gradient-brand">every learner</span>, teacher, and
            institution
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            Shemixs unifies student, teacher, parent, and admin experiences into a
            single AI-powered operating system — built to scale from a single
            classroom to an entire university.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" asChild className="group">
              <Link href="#pricing">
                Start building free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="group">
              <Link href="#platform">
                <Play className="mr-2 h-4 w-4" />
                Watch demo
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Free for up to 50 students
            </span>
          </motion.div>
        </motion.div>

        {/* Dashboard preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="surface-card overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-background-secondary px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-success" />
                app.shemixs.com/dashboard
              </div>
            </div>
            {/* Dashboard content */}
            <div className="grid gap-4 p-6 lg:grid-cols-[200px_1fr]">
              {/* Sidebar */}
              <div className="hidden space-y-1 lg:block">
                {['Dashboard', 'Courses', 'Assignments', 'Analytics', 'AI Tutor', 'Settings'].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                        i === 0
                          ? 'bg-primary/10 font-medium text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <div className="h-4 w-4 rounded bg-current opacity-60" />
                      {item}
                    </div>
                  )
                )}
              </div>
              {/* Main content */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Active Courses', value: '12', trend: '+3' },
                    { label: 'Completion', value: '87%', trend: '+5%' },
                    { label: 'AI Sessions', value: '342', trend: '+28' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg border border-border p-3">
                      <div className="text-2xs text-muted-foreground">{stat.label}</div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-xl font-bold text-foreground">{stat.value}</span>
                        <span className="text-2xs text-success">{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-medium text-foreground">Learning Progress</div>
                    <div className="text-2xs text-muted-foreground">Last 7 days</div>
                  </div>
                  <div className="flex h-32 items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1">
                        <div
                          className="w-full rounded-t gradient-brand opacity-80"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-2xs font-medium text-foreground">AI Tutor Session</div>
                    <div className="mt-2 space-y-1.5">
                      <div className="h-2 w-3/4 rounded bg-muted" />
                      <div className="h-2 w-1/2 rounded bg-muted" />
                      <div className="h-2 w-2/3 rounded bg-primary/30" />
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <div className="text-2xs font-medium text-foreground">Upcoming</div>
                    <div className="mt-2 space-y-1.5">
                      {['Math Quiz', 'Science Lab'].map((t) => (
                        <div key={t} className="flex items-center gap-1.5 text-2xs text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
