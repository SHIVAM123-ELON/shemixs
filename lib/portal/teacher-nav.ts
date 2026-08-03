/**
 * SHEMIXS Teacher Portal — Navigation Config
 * Single source of truth for sidebar and breadcrumb navigation.
 */
import type { NavItem } from '@/lib/site-config';

export type TeacherNavItem = NavItem & {
  icon: string;
};

export const teacherNavGroups: { title: string; items: TeacherNavItem[] }[] = [
  {
    title: 'Dashboard',
    items: [
      { title: 'Overview', href: '/portal/teacher', icon: 'LayoutDashboard' },
    ],
  },
  {
    title: 'Content',
    items: [
      { title: 'My Courses', href: '/portal/teacher/courses', icon: 'BookOpen' },
      { title: 'Upload Videos', href: '/portal/teacher/upload-videos', icon: 'Video' },
      { title: 'Upload Notes', href: '/portal/teacher/upload-notes', icon: 'FileText' },
    ],
  },
  {
    title: 'Classroom',
    items: [
      { title: 'Attendance', href: '/portal/teacher/attendance', icon: 'CalendarCheck' },
      { title: 'Assignments', href: '/portal/teacher/assignments', icon: 'Pencil' },
      { title: 'Live Classes', href: '/portal/teacher/live-classes', icon: 'Radio' },
    ],
  },
  {
    title: 'Assessment',
    items: [
      { title: 'Create Tests', href: '/portal/teacher/create-test', icon: 'PlusCircle' },
      { title: 'Test Management', href: '/portal/teacher/tests', icon: 'ClipboardList' },
      { title: 'Publish Results', href: '/portal/teacher/publish-results', icon: 'Award' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { title: 'Student Analytics', href: '/portal/teacher/analytics', icon: 'BarChart3' },
      { title: 'Students', href: '/portal/teacher/students', icon: 'Users' },
      { title: 'Calendar', href: '/portal/teacher/calendar', icon: 'CalendarDays' },
    ],
  },
  {
    title: 'Account',
    items: [
      { title: 'Notifications', href: '/portal/teacher/notifications', icon: 'Bell' },
      { title: 'Profile', href: '/portal/teacher/profile', icon: 'User' },
      { title: 'Settings', href: '/portal/teacher/settings', icon: 'Settings' },
    ],
  },
];

export const allTeacherNavItems: TeacherNavItem[] = teacherNavGroups.flatMap(
  (g) => g.items
);
