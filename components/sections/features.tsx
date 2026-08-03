'use client';

import { motion } from 'framer-motion';
import {
  Layers,
  ShieldCheck,
  Zap,
  Globe2,
  BarChart3,
  Plug,
} from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const features = [
  {
    icon: Layers,
    title: 'Modular Architecture',
    description:
      'Every feature is an independent module. Add payments, marketplace, or community without touching existing pages.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description:
      'Row-level security, role-based access, and audit trails protect every student record and transaction.',
  },
  {
    icon: Zap,
    title: 'Real-time Everything',
    description:
      'Live attendance, instant grading, and real-time collaboration keep your institution in sync.',
  },
  {
    icon: Globe2,
    title: 'Scales to Any Size',
    description:
      'From a single classroom to a multi-campus university — the same platform grows with you.',
  },
  {
    icon: BarChart3,
    title: 'Intelligent Analytics',
    description:
      'AI-driven insights surface at-risk students, predict outcomes, and recommend interventions.',
  },
  {
    icon: Plug,
    title: 'Integrations Ready',
    description:
      'Connect Stripe, Google Workspace, Microsoft 365, and 200+ tools through a unified API.',
  },
];

export function Features() {
  return (
    <section id="platform" className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />
      <div className="container relative">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="text-eyebrow">
            Built for the next 50 years
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-headline text-foreground">
            An architecture that evolves with you
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground">
            Shemixs is engineered as a true operating system — modular, secure, and
            ready for whatever education becomes next.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
