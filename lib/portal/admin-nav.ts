/**
 * SHEMIXS Admin Panel — Navigation Config
 * Single source of truth for sidebar and breadcrumb navigation.
 */
import type { NavItem } from '@/lib/site-config';

export type AdminNavItem = NavItem & {
  icon: string;
};

export const adminNavGroups: { title: string; items: AdminNavItem[] }[] = [
  {
    title: 'Dashboard',
    items: [
      { title: 'Overview', href: '/portal/admin', icon: 'LayoutDashboard' },
    ],
  },
  {
    title: 'People',
    items: [
      { title: 'Students', href: '/portal/admin/students', icon: 'GraduationCap' },
      { title: 'Teachers', href: '/portal/admin/teachers', icon: 'Users' },
      { title: 'Parents', href: '/portal/admin/parents', icon: 'HeartHandshake' },
      { title: 'Admissions', href: '/portal/admin/admissions', icon: 'UserPlus' },
    ],
  },
  {
    title: 'Academic',
    items: [
      { title: 'Courses', href: '/portal/admin/courses', icon: 'BookOpen' },
      { title: 'Batches', href: '/portal/admin/batches', icon: 'Layers' },
      { title: 'Classes', href: '/portal/admin/classes', icon: 'School' },
      { title: 'Sections', href: '/portal/admin/sections', icon: 'Columns3' },
      { title: 'Timetable', href: '/portal/admin/timetable', icon: 'CalendarDays' },
      { title: 'Attendance', href: '/portal/admin/attendance', icon: 'CalendarCheck' },
      { title: 'Homework', href: '/portal/admin/homework', icon: 'Pencil' },
      { title: 'Assignments', href: '/portal/admin/assignments', icon: 'FileText' },
    ],
  },
  {
    title: 'Assessment',
    items: [
      { title: 'Exams', href: '/portal/admin/exams', icon: 'ClipboardList' },
      { title: 'Tests', href: '/portal/admin/tests', icon: 'Timer' },
      { title: 'Results', href: '/portal/admin/results', icon: 'Award' },
      { title: 'Certificates', href: '/portal/admin/certificates', icon: 'ScrollText' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { title: 'Fee Management', href: '/portal/admin/fees', icon: 'CreditCard' },
      { title: 'Payments', href: '/portal/admin/payments', icon: 'Receipt' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { title: 'Notice Board', href: '/portal/admin/notices', icon: 'Megaphone' },
      { title: 'Notifications', href: '/portal/admin/notifications', icon: 'Bell' },
      { title: 'Events', href: '/portal/admin/events', icon: 'CalendarPlus' },
      { title: 'Calendar', href: '/portal/admin/calendar', icon: 'CalendarDays' },
    ],
  },
  {
    title: 'Website CMS',
    items: [
      { title: 'Pages', href: '/portal/admin/cms', icon: 'Globe' },
      { title: 'Hero Slides', href: '/portal/admin/hero', icon: 'Image' },
      { title: 'Blog', href: '/portal/admin/blog', icon: 'PenLine' },
      { title: 'Gallery', href: '/portal/admin/gallery', icon: 'Images' },
      { title: 'Media Library', href: '/portal/admin/media', icon: 'FolderOpen' },
      { title: 'Testimonials', href: '/portal/admin/testimonials', icon: 'Quote' },
      { title: 'FAQs', href: '/portal/admin/faqs', icon: 'HelpCircle' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { title: 'Analytics', href: '/portal/admin/analytics', icon: 'BarChart3' },
      { title: 'Reports', href: '/portal/admin/reports', icon: 'FileBarChart' },
    ],
  },
  {
    title: 'Administration',
    items: [
      { title: 'Roles & Permissions', href: '/portal/admin/roles', icon: 'ShieldCheck' },
      { title: 'Audit Logs', href: '/portal/admin/audit-logs', icon: 'Scroll' },
      { title: 'Settings', href: '/portal/admin/settings', icon: 'Settings' },
      { title: 'Profile', href: '/portal/admin/profile', icon: 'User' },
    ],
  },
];

export const allAdminNavItems: AdminNavItem[] = adminNavGroups.flatMap(
  (g) => g.items
);
