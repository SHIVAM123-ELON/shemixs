/**
 * SHEMIXS Parent Portal — Navigation Config
 * Single source of truth for sidebar and breadcrumb navigation.
 */
import type { NavItem } from '@/lib/site-config';

export type ParentNavItem = NavItem & {
  icon: string;
};

export const parentNavGroups: { title: string; items: ParentNavItem[] }[] = [
  {
    title: 'Dashboard',
    items: [
      { title: 'Overview', href: '/portal/parent', icon: 'LayoutDashboard' },
    ],
  },
  {
    title: 'Academic',
    items: [
      { title: 'Attendance', href: '/portal/parent/attendance', icon: 'CalendarCheck' },
      { title: 'Results', href: '/portal/parent/results', icon: 'Award' },
      { title: 'Progress Reports', href: '/portal/parent/progress-reports', icon: 'TrendingUp' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { title: 'Teacher Feedback', href: '/portal/parent/teacher-feedback', icon: 'MessageSquare' },
      { title: 'Notifications', href: '/portal/parent/notifications', icon: 'Bell' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { title: 'Fee Status', href: '/portal/parent/fees', icon: 'CreditCard' },
    ],
  },
  {
    title: 'Account',
    items: [
      { title: 'Student Profile', href: '/portal/parent/student-profile', icon: 'User' },
      { title: 'Settings', href: '/portal/parent/settings', icon: 'Settings' },
    ],
  },
];

export const allParentNavItems: ParentNavItem[] = parentNavGroups.flatMap(
  (g) => g.items
);
