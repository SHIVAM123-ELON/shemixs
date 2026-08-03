/**
 * SHEMIXS Parent Portal — Shared Types
 * Centralized type definitions for all parent portal modules.
 */

export interface ParentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  relation: 'Father' | 'Mother' | 'Guardian';
  occupation: string;
  address: string;
  joinedAt: string;
}

export interface ChildSummary {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  grade: string;
  section: string;
  institution: string;
  attendance: number;
  overallScore: number;
  rank: number;
  totalStudents: number;
  enrolledCourses: number;
  pendingHomework: number;
  pendingFees: number;
  upcomingExams: number;
}

export interface SubjectAttendance {
  subject: string;
  attended: number;
  total: number;
  percentage: number;
}

export interface MonthlyAttendance {
  month: string;
  percentage: number;
}

export interface AttendanceDay {
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'holiday';
}

export interface SubjectMark {
  subject: string;
  scored: number;
  total: number;
  percentage: number;
  grade: string;
  rank: number;
  totalStudents: number;
}

export interface ExamResult {
  id: string;
  examName: string;
  date: string;
  subjects: SubjectMark[];
  overallPercentage: number;
  overallGrade: string;
  overallRank: number;
  totalStudents: number;
}

export interface FeeSummary {
  totalFees: number;
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
  nextDueDate: string;
  nextDueAmount: number;
}

export interface FeePaymentRecord {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  invoiceId: string;
  method?: string;
}

export interface WeeklyProgress {
  week: string;
  studyHours: number;
  testsTaken: number;
  assignmentsCompleted: number;
}

export interface MonthlyProgress {
  month: string;
  score: number;
  attendance: number;
}

export interface ProgressReport {
  id: string;
  period: string;
  date: string;
  overallGrade: string;
  overallPercentage: number;
  aiSummary: string;
  teacherRemarks: { teacher: string; subject: string; remark: string }[];
  strengthAreas: string[];
  improvementAreas: string[];
}

export interface TeacherFeedback {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  subject: string;
  rating: number;
  feedback: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

export interface ParentNotification {
  id: string;
  category: 'attendance' | 'exams' | 'homework' | 'fees' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ParentActivity {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  icon: string;
}

export interface ParentCalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'exam' | 'class' | 'fee' | 'meeting' | 'event';
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
  grade: string;
  section: string;
  institution: string;
  email: string;
  phone: string;
  address: string;
  bloodGroup: string;
  dateOfBirth: string;
  admissionDate: string;
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;
  emergencyContact: EmergencyContact;
  enrolledCourses: number;
  attendance: number;
  overallScore: number;
  certificates: number;
  pendingFees: number;
}
