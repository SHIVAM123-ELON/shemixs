'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    description: 'For individual educators and small classrooms.',
    monthly: 0,
    yearly: 0,
    cta: 'Start free',
    href: '#',
    features: [
      'Up to 50 students',
      'Student & Teacher portals',
      'Basic AI tutoring (100 sessions/mo)',
      'Assignment & grading tools',
      'Community support',
    ],
    highlighted: false,
  },
  {
    name: 'Institution',
    description: 'For schools, colleges, and tutoring centers.',
    monthly: 299,
    yearly: 2990,
    cta: 'Start 30-day trial',
    href: '#',
    features: [
      'Up to 2,000 students',
      'All four portals',
      'Unlimited AI tutoring & auto-grading',
      'Advanced analytics & predictions',
      'Parent communication tools',
      'Stripe payments & billing',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For universities and multi-campus systems.',
    monthly: null,
    yearly: null,
    cta: 'Contact sales',
    href: '#',
    features: [
      'Unlimited students & campuses',
      'Custom AI model training',
      'Dedicated infrastructure',
      'SSO & advanced security controls',
      'Custom integrations & API access',
      'Dedicated success manager',
      '99.9% uptime SLA',
    ],
    highlighted: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="text-eyebrow">
            Simple, transparent pricing
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-headline text-foreground">
            Plans that scale with your institution
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you're ready. Cancel anytime.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 inline-flex items-center rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setYearly(false)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                !yearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                yearly ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              )}
            >
              Yearly
              <span className="ml-1.5 text-xs text-success">Save 2 months</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-card p-8 transition-all',
                plan.highlighted
                  ? 'border-primary/40 shadow-xl lg:scale-[1.03]'
                  : 'border-border hover:shadow-lg'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    Most popular
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{plan.description}</p>

              <div className="mt-6">
                {plan.monthly === null ? (
                  <div className="text-4xl font-bold text-foreground font-display">Custom</div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground font-display">
                      ${yearly ? plan.yearly : plan.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{yearly ? 'year' : 'month'}
                    </span>
                  </div>
                )}
              </div>

              <Button
                className="mt-6"
                variant={plan.highlighted ? 'default' : 'outline'}
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
