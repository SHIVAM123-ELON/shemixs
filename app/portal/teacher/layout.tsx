import type { Metadata } from 'next';
import { TeacherShell } from '@/components/portal/layout/teacher-shell';

export const metadata: Metadata = {
  title: { default: 'Teacher Portal', template: '%s — Teacher Portal — Shemixs' },
  description: 'Manage courses, assignments, tests, and student performance.',
};

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <TeacherShell>{children}</TeacherShell>;
}
