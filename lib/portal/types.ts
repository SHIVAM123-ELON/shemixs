/**
 * SHEMIXS Student Portal — Shared Types
 * Centralized type definitions for all portal modules.
 */

export type Progress = number;

export interface Course {
  id: string;
  title: string;
  subject: string;
  instructor: string;
  instructorAvatar?: string;
  thumbnail: string;
  progress: Progress;
  chapters: number;
  completedChapters: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lastWatched?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  completed: boolean;
  order: number;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'slides' | 'zip';
  size: string;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  thumbnail: string;
  pages: number;
  uploadedAt: string;
  bookmarked: boolean;
  favorite: boolean;
}

export interface Homework {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  description: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'not-started' | 'in-progress' | 'submitted' | 'graded';
  grade?: number;
  maxGrade: number;
  description: string;
}

export type TestType = 'upcoming' | 'previous' | 'mock' | 'practice';

export interface Test {
  id: string;
  title: string;
  subject: string;
  type: TestType;
  date: string;
  duration: string;
  totalMarks: number;
  scoredMarks?: number;
  status: 'scheduled' | 'completed' | 'in-progress';
  questions: number;
}

export interface TestResult {
  id: string;
  testId: string;
  title: string;
  subject: string;
  date: string;
  scoredMarks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
  totalStudents?: number;
}

export interface Certificate {
  id: string;
  title: string;
  courseId: string;
  issuedAt: string;
  credentialId: string;
  grade: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export interface NotificationItem {
  id: string;
  category: 'classes' | 'homework' | 'payments' | 'exams' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface FeeRecord {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  invoiceId: string;
}

export interface Download {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'slides' | 'zip';
  size: string;
  subject: string;
  downloadedAt?: string;
}

export interface Activity {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  icon: string;
}

export interface TimetableEntry {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  subject: string;
  instructor: string;
  room: string;
  color: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'test' | 'class' | 'assignment' | 'event';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  rollNumber: string;
  grade: string;
  section: string;
  institution: string;
  enrolledCourses: number;
  joinedAt: string;
  bio: string;
  address: string;
  parentName: string;
  parentPhone: string;
}
