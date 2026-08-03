'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

export function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center lg:px-16 lg:py-20"
        >
          <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
          <div className="relative">
            <motion.h2 variants={fadeUp} className="text-headline text-foreground">
              Ready to transform your institution?
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Join thousands of schools, colleges, and universities running on
              Shemixs. Set up in minutes, scale for decades.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button size="lg" asChild className="group">
                <Link href="#pricing">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">Book a demo</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
