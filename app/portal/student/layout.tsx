import type { Metadata } from 'next';
import { PortalShell } from '@/components/portal/layout/portal-shell';

export const metadata: Metadata = {
  title: { default: 'Student Portal', template: '%s — Student Portal — Shemixs' },
  description: 'Your personalized learning dashboard with courses, tests, assignments, and progress tracking.',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
