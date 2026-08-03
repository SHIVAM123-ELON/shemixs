'use client';

import { useState } from 'react';
import { ParentSidebar } from './parent-sidebar';
import { ParentTopNav } from './parent-top-nav';
import { ParentMobileNav } from './parent-mobile-nav';

export function ParentShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ParentSidebar />
      <ParentMobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
      <div className="lg:pl-64">
        <ParentTopNav onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
