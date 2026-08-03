'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { portalNav } from '@/lib/site-config';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const portalIcons: Record<string, typeof GraduationCap> = {
  'Student Portal': GraduationCap,
  'Teacher Portal': BookOpen,
  'Parent Portal': Users,
  'Admin Dashboard': Building2,
};

const portalAccents: Record<string, string> = {
  'Student Portal': 'from-primary/20 to-primary/5 text-primary',
  'Teacher Portal': 'from-secondary/20 to-secondary/5 text-secondary',
  'Parent Portal': 'from-accent/20 to-accent/5 text-accent',
  'Admin Dashboard': 'from-success/20 to-success/5 text-success',
};

export function Portals() {
  return (
    <section id="portals" className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="text-eyebrow">
            Four portals, one platform
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-headline text-foreground">
            Every role gets a purpose-built experience
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground">
            Each portal shares the same design system and data layer, so everyone
            stays in sync without learning a new tool.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {portalNav.map((portal) => {
            const Icon = portalIcons[portal.title] ?? GraduationCap;
            const accent = portalAccents[portal.title] ?? portalAccents['Student Portal'];
            return (
              <motion.div key={portal.title} variants={fadeUp}>
                <Link
                  href={portal.href}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-xl hover:border-primary/30"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {portal.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {portal.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore portal
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div
                    className="absolute -bottom-px left-0 h-px w-0 gradient-brand transition-all duration-500 group-hover:w-full"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
