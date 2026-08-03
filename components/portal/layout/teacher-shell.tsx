'use client';

import { useState } from 'react';
import { TeacherSidebar } from './teacher-sidebar';
import { TeacherTopNav } from './teacher-top-nav';
import { TeacherMobileNav } from './teacher-mobile-nav';

export function TeacherShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TeacherSidebar />
      <TeacherMobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
      <div className="lg:pl-64">
        <TeacherTopNav onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
