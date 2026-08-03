'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const testimonials = [
  {
    quote:
      'Shemixs replaced five separate tools with one platform. Our teachers save 10+ hours a week on grading alone, and parents finally have a single place to track progress.',
    author: 'Dr. Anita Sharma',
    role: 'Principal, Delhi Public School',
    rating: 5,
  },
  {
    quote:
      'The AI Tutor module is transformative. Students who struggled with one-on-one attention now get personalized guidance 24/7. Our pass rates jumped 18%.',
    author: 'Prof. James Whitfield',
    role: 'Dean of Sciences, Cambridge College',
    rating: 5,
  },
  {
    quote:
      "As a parent, I can see my daughter's attendance, assignments, and teacher feedback in real time. No more waiting for report card day.",
    author: 'Sarah Chen',
    role: 'Parent of two',
    rating: 5,
  },
  {
    quote:
      'We rolled Shemixs out across 42 campuses in three months. The modular architecture meant we never had to rewrite a single existing page.',
    author: 'Michael Rodriguez',
    role: 'CIO, State University System',
    rating: 5,
  },
  {
    quote:
      'The analytics dashboard flagged at-risk students weeks before our old system would have. That early warning saved careers.',
    author: 'Dr. Fatima Al-Rashid',
    role: 'Vice Rector, Gulf University',
    rating: 5,
  },
  {
    quote:
      'Shemixs is the first platform that actually feels like an operating system for education. Everything connects, everything scales.',
    author: 'Kenji Tanaka',
    role: 'EdTech Director, Tokyo Institute',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="resources" className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="text-eyebrow">
            Loved by educators
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-headline text-foreground">
            What institutions say about Shemixs
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <Quote className="mt-4 h-6 w-6 text-primary/30" />
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                {t.quote}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-sm font-semibold text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.author}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
