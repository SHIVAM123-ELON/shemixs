/**
 * SHEMIXS Student Portal — Navigation Config
 * Single source of truth for sidebar and breadcrumb navigation.
 */
import type { NavItem } from '@/lib/site-config';

export type PortalNavItem = NavItem & {
  icon: string;
};

export const portalNavGroups: { title: string; items: PortalNavItem[] }[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', href: '/portal/student', icon: 'LayoutDashboard' },
      { title: 'My Courses', href: '/portal/student/courses', icon: 'BookOpen' },
      { title: 'Video Lectures', href: '/portal/student/lectures', icon: 'PlayCircle' },
      { title: 'Timetable', href: '/portal/student/timetable', icon: 'CalendarDays' },
    ],
  },
  {
    title: 'Learning',
    items: [
      { title: 'Handwritten Notes', href: '/portal/student/notes', icon: 'FileText' },
      { title: 'Homework', href: '/portal/student/homework', icon: 'Pencil' },
      { title: 'Assignments', href: '/portal/student/assignments', icon: 'ClipboardList' },
    ],
  },
  {
    title: 'Assessments',
    items: [
      { title: 'Online Tests', href: '/portal/student/tests', icon: 'Timer' },
      { title: 'Test History', href: '/portal/student/test-history', icon: 'History' },
      { title: 'Results', href: '/portal/student/results', icon: 'Award' },
      { title: 'Certificates', href: '/portal/student/certificates', icon: 'BadgeCheck' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { title: 'Attendance', href: '/portal/student/attendance', icon: 'CalendarCheck' },
      { title: 'Performance', href: '/portal/student/performance', icon: 'TrendingUp' },
    ],
  },
  {
    title: 'Account',
    items: [
      { title: 'Notifications', href: '/portal/student/notifications', icon: 'Bell' },
      { title: 'Fee Status', href: '/portal/student/fees', icon: 'CreditCard' },
      { title: 'Downloads', href: '/portal/student/downloads', icon: 'Download' },
      { title: 'Profile', href: '/portal/student/profile', icon: 'User' },
      { title: 'Settings', href: '/portal/student/settings', icon: 'Settings' },
    ],
  },
];

export const allPortalNavItems: PortalNavItem[] = portalNavGroups.flatMap(
  (g) => g.items
);
