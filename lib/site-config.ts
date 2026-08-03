/**
 * SHEMIXS — Centralized Site Configuration
 * Single source of truth for brand, navigation, and metadata.
 */

export const siteConfig = {
  name: 'Shemixs',
  shortName: 'Shemixs',
  tagline: 'AI-Powered Education Operating System',
  description:
    'Shemixs is the AI-powered Education Operating System unifying Student, Teacher, Parent, and Admin portals with intelligent modules, payments, and a learning marketplace.',
  url: 'https://shemixs.com',
  ogImage: '/og.png',
  twitter: '@shemixs',
  keywords: [
    'EdTech',
    'Education OS',
    'AI Education',
    'Student Portal',
    'Teacher Portal',
    'Parent Portal',
    'School ERP',
    'College ERP',
    'University ERP',
    'Learning Management System',
    'Shemixs',
  ],
  author: 'Shemixs Inc.',
  locale: 'en_US',
};

export type NavItem = {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const mainNav: NavItem[] = [
  { title: 'Platform', href: '#platform' },
  { title: 'Portals', href: '#portals' },
  { title: 'AI Modules', href: '#ai-modules' },
  { title: 'Pricing', href: '#pricing' },
  { title: 'Resources', href: '#resources' },
];

export const portalNav: NavItem[] = [
  {
    title: 'Student Portal',
    href: '/portal/student',
    description: 'Personalized learning paths, assignments, and progress tracking.',
  },
  {
    title: 'Teacher Portal',
    href: '/portal/teacher',
    description: 'Lesson planning, grading automation, and classroom insights.',
  },
  {
    title: 'Parent Portal',
    href: '/portal/parent',
    description: 'Real-time attendance, grades, and communication with teachers.',
  },
  {
    title: 'Admin Dashboard',
    href: '/portal/admin',
    description: 'Institution-wide ERP, billing, admissions, and analytics.',
  },
];

export const footerNav: NavGroup[] = [
  {
    title: 'Platform',
    items: [
      { title: 'Overview', href: '#platform' },
      { title: 'AI Modules', href: '#ai-modules' },
      { title: 'Pricing', href: '#pricing' },
      { title: 'Security', href: '#' },
    ],
  },
  {
    title: 'Portals',
    items: [
      { title: 'Student', href: '/portal/student' },
      { title: 'Teacher', href: '/portal/teacher' },
      { title: 'Parent', href: '/portal/parent' },
      { title: 'Admin', href: '/portal/admin' },
    ],
  },
  {
    title: 'Solutions',
    items: [
      { title: 'Schools', href: '#' },
      { title: 'Colleges', href: '#' },
      { title: 'Universities', href: '#' },
      { title: 'Tutoring Centers', href: '#' },
    ],
  },
  {
    title: 'Company',
    items: [
      { title: 'About', href: '#' },
      { title: 'Careers', href: '#' },
      { title: 'Blog', href: '#' },
      { title: 'Contact', href: '#' },
    ],
  },
];

export const socialLinks: NavItem[] = [
  { title: 'Twitter', href: 'https://twitter.com', external: true },
  { title: 'LinkedIn', href: 'https://linkedin.com', external: true },
  { title: 'GitHub', href: 'https://github.com', external: true },
  { title: 'YouTube', href: 'https://youtube.com', external: true },
];
