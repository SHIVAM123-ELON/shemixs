import type { Metadata } from 'next';
import { ParentShell } from '@/components/portal/layout/parent-shell';

export const metadata: Metadata = {
  title: { default: 'Parent Portal', template: '%s — Parent Portal — Shemixs' },
  description: 'Monitor your child\'s academic progress, attendance, results, and fees.',
};

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <ParentShell>{children}</ParentShell>;
}
