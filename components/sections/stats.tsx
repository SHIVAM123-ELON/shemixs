'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

const stats = [
  { value: '2.4M+', label: 'Active learners' },
  { value: '1,800+', label: 'Institutions' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '150+', label: 'Countries served' },
];

const logos = [
  'Cambridge International',
  'Stanford Online',
  'Delhi Public Schools',
  'Singapore Edutech',
  'OECD Education',
  'MIT OpenCourseWare',
];

export function Stats() {
  return (
    <section className="border-y border-border bg-background-secondary py-16 lg:py-20">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="text-4xl font-bold text-gradient-brand font-display lg:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Trusted by leading institutions worldwide
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm font-semibold text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
