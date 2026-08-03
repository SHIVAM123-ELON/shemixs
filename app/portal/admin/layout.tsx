import type { Metadata } from 'next';
import { AdminShell } from '@/components/portal/layout/admin-shell';

export const metadata: Metadata = {
  title: { default: 'Admin Panel', template: '%s — Admin Panel — Shemixs' },
  description: 'Enterprise ERP administration for Shemixs.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
