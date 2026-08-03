'use client';

import { useState } from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminTopNav } from './admin-top-nav';
import { AdminMobileNav } from './admin-mobile-nav';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <AdminMobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
      <div className="lg:pl-64">
        <AdminTopNav onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
