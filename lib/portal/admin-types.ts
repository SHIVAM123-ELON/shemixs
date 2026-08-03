/**
 * SHEMIXS Admin Panel — Shared Types
 * Centralized type definitions for all admin panel modules.
 */

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  lastLogin: string;
}

export interface AdminStudent {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  grade: string;
  section: string;
  batch: string;
  guardian: string;
  attendance: number;
  feeStatus: 'paid' | 'pending' | 'overdue';
  academicScore: number;
  status: 'active' | 'inactive' | 'suspended';
  enrolledAt: string;
}

export interface AdminTeacher {
  id: string;
  name: string;
  avatar: string;
  email: string;
  department: string;
  subjects: string[];
  assignedClasses: number;
  assignedCourses: number;
  attendance: number;
  performance: number;
  salary: number;
  status: 'active' | 'on_leave' | 'inactive';
  joinedAt: string;
}

export interface AdminParent {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  relation: string;
  linkedStudents: { name: string; rollNumber: string }[];
  feeSummary: { total: number; paid: number; pending: number };
  status: 'active' | 'inactive';
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  avatar: string;
  appliedGrade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'verification';
  documents: string[];
}

export interface AdminCourse {
  id: string;
  title: string;
  category: string;
  instructor: string;
  students: number;
  chapters: number;
  lessons: number;
  price: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
}

export interface AdminBatch {
  id: string;
  name: string;
  course: string;
  students: number;
  capacity: number;
  teachers: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface AdminClass {
  id: string;
  name: string;
  grade: string;
  section: string;
  students: number;
  capacity: number;
  classTeacher: string;
  room: string;
  status: 'active' | 'inactive';
}

export interface AdminSection {
  id: string;
  name: string;
  class: string;
  students: number;
  capacity: number;
  teacher: string;
  status: 'active' | 'inactive';
}

export interface FeeStructure {
  id: string;
  category: string;
  grade: string;
  amount: number;
  frequency: 'one_time' | 'monthly' | 'quarterly' | 'annually';
  dueDate: string;
  status: 'active' | 'inactive';
}

export interface FeeRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  invoiceId: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  studentName: string;
  rollNumber: string;
  amount: number;
  method: 'card' | 'bank_transfer' | 'cash' | 'upi' | 'cheque';
  status: 'success' | 'pending' | 'failed' | 'refunded';
  date: string;
  transactionId: string;
}

export interface AdminAssignment {
  id: string;
  title: string;
  course: string;
  teacher: string;
  batch: string;
  dueDate: string;
  totalMarks: number;
  submitted: number;
  total: number;
  status: 'active' | 'graded' | 'expired';
}

export interface AdminHomework {
  id: string;
  title: string;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
  submissionRate: number;
  status: 'active' | 'completed' | 'expired';
}

export interface AdminExam {
  id: string;
  title: string;
  type: 'unit_test' | 'mid_term' | 'final' | 'quiz' | 'mock';
  grade: string;
  section: string;
  date: string;
  duration: number;
  totalMarks: number;
  room: string;
  invigilator: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

export interface AdminTest {
  id: string;
  title: string;
  subject: string;
  type: 'MCQ' | 'Subjective' | 'Practice' | 'Mock' | 'Online' | 'Offline';
  duration: number;
  totalMarks: number;
  questions: number;
  date: string;
  status: 'upcoming' | 'active' | 'completed' | 'draft';
  submissions: number;
  totalStudents: number;
}

export interface AdminResult {
  id: string;
  examTitle: string;
  grade: string;
  section: string;
  studentName: string;
  rollNumber: string;
  marks: number;
  totalMarks: number;
  grade_letter: string;
  rank: number;
  published: boolean;
}

export interface AdminCertificate {
  id: string;
  studentName: string;
  rollNumber: string;
  certificateType: string;
  issueDate: string;
  template: string;
  status: 'issued' | 'pending' | 'revoked';
  verificationCode: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  class: string;
  room: string;
}

export interface AdminNotice {
  id: string;
  title: string;
  category: 'academic' | 'event' | 'holiday' | 'urgent' | 'general';
  content: string;
  author: string;
  publishedAt: string;
  pinned: boolean;
  status: 'published' | 'draft';
  attachments: number;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  audience: 'all' | 'students' | 'teachers' | 'parents' | 'staff';
  channel: 'push' | 'email' | 'sms';
  sentAt: string;
  status: 'sent' | 'scheduled' | 'draft';
  recipients: number;
}

export interface AdminEvent {
  id: string;
  title: string;
  type: 'academic' | 'meeting' | 'exam' | 'holiday' | 'workshop' | 'cultural';
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface AdminCalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'class' | 'exam' | 'meeting' | 'holiday' | 'event' | 'deadline';
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
  sections: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  status: 'active' | 'inactive';
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  publishedAt: string;
  views: number;
  seoTitle: string;
  seoDescription: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: string;
  imageCount: number;
  videoCount: number;
  coverImage: string;
  featured: boolean;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  folder: string;
  uploadedAt: string;
  usage: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  status: 'published' | 'pending' | 'archived';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'published' | 'draft';
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: string[];
  isSystem: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  avatar: string;
  action: string;
  module: string;
  target: string;
  timestamp: string;
  ip: string;
  status: 'success' | 'failed' | 'warning';
}

export interface RecentPayment {
  id: string;
  studentName: string;
  amount: number;
  method: string;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

export interface AdminActivity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timestamp: string;
  icon: string;
}

export interface LoginActivity {
  id: string;
  user: string;
  avatar: string;
  role: string;
  ip: string;
  device: string;
  loginTime: string;
  status: 'success' | 'failed';
}

export interface SystemHealth {
  service: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  icon: string;
  trend?: { value: string; positive: boolean };
  accent: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive';
}

export interface ChartData {
  label: string;
  value: number;
}
