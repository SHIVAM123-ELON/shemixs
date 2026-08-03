/**
 * SHEMIXS Teacher Portal — Shared Types
 * Centralized type definitions for all teacher portal modules.
 */

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  subjects: string[];
  experience: number;
  qualification: string;
  joinedAt: string;
  bio: string;
}

export interface TeacherCourse {
  id: string;
  title: string;
  subject: string;
  grade: string;
  batch: string;
  students: number;
  progress: number;
  chapters: number;
  completedChapters: number;
  thumbnail: string;
  status: 'active' | 'completed' | 'draft';
}

export interface TodayClass {
  id: string;
  subject: string;
  topic: string;
  time: string;
  room: string;
  batch: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface LiveClass {
  id: string;
  title: string;
  course: string;
  batch: string;
  date: string;
  time: string;
  duration: number;
  meetingLink: string;
  agenda: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  attendees?: number;
}

export interface StudentRecord {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  batch: string;
  attendance: number;
  assignmentCompletion: number;
  testScore: number;
  overallPerformance: number;
  status: 'excellent' | 'good' | 'average' | 'needs_attention';
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  batch: string;
  dueDate: string;
  totalMarks: number;
  submitted: number;
  total: number;
  status: 'active' | 'graded' | 'expired';
  description: string;
  attachments: string[];
}

export interface AssignmentSubmission {
  id: string;
  studentName: string;
  studentAvatar: string;
  rollNumber: string;
  submittedAt: string;
  status: 'submitted' | 'late' | 'graded' | 'pending';
  marks?: number;
}

export interface TestRecord {
  id: string;
  title: string;
  subject: string;
  type: 'MCQ' | 'Subjective' | 'Practice' | 'Mock';
  duration: number;
  totalMarks: number;
  questions: number;
  date: string;
  status: 'upcoming' | 'active' | 'completed' | 'draft';
  submissions: number;
  totalStudents: number;
}

export interface TestQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'subjective';
  options?: string[];
  marks: number;
}

export interface ResultEntry {
  id: string;
  studentName: string;
  studentAvatar: string;
  rollNumber: string;
  marks: number;
  totalMarks: number;
  grade: string;
  rank: number;
  published: boolean;
}

export interface TeacherNotification {
  id: string;
  category: 'classes' | 'assignments' | 'tests' | 'results' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface TeacherCalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'class' | 'assignment' | 'test' | 'meeting' | 'event';
}

export interface TeacherActivity {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  icon: string;
}

export interface RecentUpload {
  id: string;
  title: string;
  type: 'video' | 'notes';
  course: string;
  uploadedAt: string;
  size: string;
}

export interface WeeklyTeaching {
  day: string;
  hours: number;
  classes: number;
}

export interface StudentPerformanceData {
  month: string;
  avgScore: number;
  attendance: number;
}

export interface CourseCompletionData {
  subject: string;
  completion: number;
}

export interface AssignmentCompletionData {
  week: string;
  submitted: number;
  pending: number;
}

export interface TestPerformanceData {
  test: string;
  avgScore: number;
  highestScore: number;
}

export interface TopStudent {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
}

export interface AttentionStudent {
  id: string;
  name: string;
  avatar: string;
  issue: string;
  score: number;
  attendance: number;
}
