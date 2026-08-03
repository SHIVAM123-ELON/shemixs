'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { Logo } from '@/components/site/logo';
import { mainNav, portalNav } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav
        className="container flex h-16 items-center justify-between gap-4"
        aria-label="Primary navigation"
      >
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.title}
                  {item.title === 'Portals' && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.title === 'Portals' && (
                  <div className="invisible absolute left-0 top-full w-[420px] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="surface-card grid grid-cols-2 gap-1 p-3 shadow-xl">
                      {portalNav.map((portal) => (
                        <Link
                          key={portal.title}
                          href={portal.href}
                          className="rounded-lg p-3 transition-colors hover:bg-muted"
                        >
                          <div className="text-sm font-semibold text-foreground">
                            {portal.title}
                          </div>
                          {portal.description && (
                            <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                              {portal.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden lg:inline-flex">
            <Link href="/portal/student">Sign in</Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link href="#pricing">Get Started</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="container space-y-1 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
              <div className="pt-2">
                <div className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Portals
                </div>
                {portalNav.map((portal) => (
                  <Link
                    key={portal.title}
                    href={portal.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {portal.title}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3">
                <ThemeToggle />
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href="/portal/student" onClick={() => setMobileOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <Link href="#pricing" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
