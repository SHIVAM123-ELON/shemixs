'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  MessageSquare,
  FileText,
  Brain,
  Lightbulb,
  Languages,
} from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const aiModules = [
  {
    icon: Bot,
    title: 'AI Tutor',
    description: "24/7 personalized tutoring that adapts to each student's learning style and pace.",
  },
  {
    icon: FileText,
    title: 'Auto Grading',
    description: 'Instant feedback on assignments, essays, and quizzes with rubric-aligned scoring.',
  },
  {
    icon: Brain,
    title: 'Learning Analytics',
    description: 'Predictive models identify at-risk students and recommend timely interventions.',
  },
  {
    icon: MessageSquare,
    title: 'Smart Communication',
    description: 'AI-drafted announcements, parent updates, and multi-language translation built in.',
  },
  {
    icon: Lightbulb,
    title: 'Content Generation',
    description: 'Generate lesson plans, quizzes, flashcards, and study guides in seconds.',
  },
  {
    icon: Languages,
    title: 'Language Support',
    description: 'Real-time translation and accessibility tools for diverse, global classrooms.',
  },
];

export function AIModules() {
  return (
    <section id="ai-modules" className="relative overflow-hidden py-20 lg:py-28">
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.span variants={fadeUp} className="text-eyebrow">
              AI at the core
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-headline text-foreground">
              Intelligence woven into every interaction
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground">
              Shemixs doesn't bolt AI onto a legacy LMS. Every module is built
              AI-native — from tutoring to grading to institutional analytics.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 space-y-4">
              {[
                'Adaptive learning paths powered by reinforcement learning',
                'Natural language understanding for student queries',
                'Privacy-first: student data never trains third-party models',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid gap-4 sm:grid-cols-2"
          >
            {aiModules.map((mod) => (
              <motion.div
                key={mod.title}
                variants={fadeUp}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 text-primary">
                  <mod.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{mod.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {mod.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
