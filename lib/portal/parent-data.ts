/**
 * SHEMIXS Parent Portal — Dummy Data
 * Placeholder data for all parent portal modules. No backend connection.
 */
import type {
  ParentProfile,
  ChildSummary,
  SubjectAttendance,
  MonthlyAttendance,
  AttendanceDay,
  ExamResult,
  FeeSummary,
  FeePaymentRecord,
  WeeklyProgress,
  MonthlyProgress,
  ProgressReport,
  TeacherFeedback,
  ParentNotification,
  ParentActivity,
  ParentCalendarEvent,
  ChildProfile,
} from './parent-types';

export const parentProfile: ParentProfile = {
  id: 'par-001',
  name: 'Rajesh Sharma',
  email: 'rajesh.sharma@email.com',
  phone: '+91 98765 11111',
  avatar: 'https://i.pravatar.cc/150?img=33',
  relation: 'Father',
  occupation: 'Software Engineer',
  address: '42 Lotus Residency, Bengaluru, KA 560001',
  joinedAt: '2024-04-15',
};

export const childSummary: ChildSummary = {
  id: 'stu-001',
  name: 'Aarav Sharma',
  avatar: 'https://i.pravatar.cc/150?img=12',
  rollNumber: 'SHE-2024-0142',
  grade: 'Grade 11',
  section: 'Science — PCM',
  institution: 'Shemixs International School',
  attendance: 91,
  overallScore: 88,
  rank: 3,
  totalStudents: 42,
  enrolledCourses: 8,
  pendingHomework: 3,
  pendingFees: 2,
  upcomingExams: 2,
};

export const subjectAttendance: SubjectAttendance[] = [
  { subject: 'Physics', attended: 38, total: 42, percentage: 90 },
  { subject: 'Chemistry', attended: 40, total: 42, percentage: 95 },
  { subject: 'Mathematics', attended: 41, total: 42, percentage: 98 },
  { subject: 'Biology', attended: 35, total: 42, percentage: 83 },
  { subject: 'English', attended: 39, total: 42, percentage: 93 },
  { subject: 'Computer Science', attended: 37, total: 42, percentage: 88 },
];

export const monthlyAttendance: MonthlyAttendance[] = [
  { month: 'Feb', percentage: 92 },
  { month: 'Mar', percentage: 88 },
  { month: 'Apr', percentage: 95 },
  { month: 'May', percentage: 90 },
  { month: 'Jun', percentage: 93 },
  { month: 'Jul', percentage: 91 },
];

export const attendanceCalendar: AttendanceDay[] = [
  { date: '2025-08-01', status: 'present' },
  { date: '2025-07-31', status: 'present' },
  { date: '2025-07-30', status: 'late' },
  { date: '2025-07-29', status: 'present' },
  { date: '2025-07-28', status: 'absent' },
  { date: '2025-07-25', status: 'present' },
  { date: '2025-07-24', status: 'present' },
  { date: '2025-07-23', status: 'excused' },
  { date: '2025-07-22', status: 'present' },
  { date: '2025-07-21', status: 'present' },
];

export const examResults: ExamResult[] = [
  {
    id: 'exam1',
    examName: 'Mid-Term Examination',
    date: '2025-07-25',
    overallPercentage: 88,
    overallGrade: 'A',
    overallRank: 3,
    totalStudents: 42,
    subjects: [
      { subject: 'Physics', scored: 78, total: 100, percentage: 78, grade: 'B+', rank: 8, totalStudents: 42 },
      { subject: 'Chemistry', scored: 82, total: 100, percentage: 82, grade: 'A', rank: 6, totalStudents: 42 },
      { subject: 'Mathematics', scored: 91, total: 100, percentage: 91, grade: 'A', rank: 4, totalStudents: 42 },
      { subject: 'Biology', scored: 87, total: 100, percentage: 87, grade: 'A', rank: 3, totalStudents: 42 },
      { subject: 'English', scored: 96, total: 100, percentage: 96, grade: 'A+', rank: 1, totalStudents: 42 },
      { subject: 'Computer Science', scored: 94, total: 100, percentage: 94, grade: 'A', rank: 2, totalStudents: 38 },
    ],
  },
  {
    id: 'exam2',
    examName: 'Unit Test Series 1',
    date: '2025-06-28',
    overallPercentage: 84,
    overallGrade: 'A',
    overallRank: 5,
    totalStudents: 42,
    subjects: [
      { subject: 'Physics', scored: 75, total: 100, percentage: 75, grade: 'B+', rank: 10, totalStudents: 42 },
      { subject: 'Chemistry', scored: 82, total: 100, percentage: 82, grade: 'A', rank: 6, totalStudents: 42 },
      { subject: 'Mathematics', scored: 88, total: 100, percentage: 88, grade: 'A', rank: 5, totalStudents: 42 },
      { subject: 'Biology', scored: 85, total: 100, percentage: 85, grade: 'A', rank: 4, totalStudents: 42 },
      { subject: 'English', scored: 92, total: 100, percentage: 92, grade: 'A+', rank: 2, totalStudents: 42 },
      { subject: 'Computer Science', scored: 90, total: 100, percentage: 90, grade: 'A', rank: 3, totalStudents: 38 },
    ],
  },
];

export const feeSummary: FeeSummary = {
  totalFees: 108500,
  totalPaid: 53000,
  totalPending: 53000,
  totalOverdue: 2500,
  nextDueDate: '2025-08-15',
  nextDueAmount: 53000,
};

export const feePaymentRecords: FeePaymentRecord[] = [
  { id: 'f1', title: 'Term 1 Tuition Fee', amount: 45000, dueDate: '2025-04-15', status: 'paid', paidDate: '2025-04-10', invoiceId: 'INV-2025-T1-0142', method: 'Credit Card' },
  { id: 'f2', title: 'Term 1 Lab Fee', amount: 8000, dueDate: '2025-04-15', status: 'paid', paidDate: '2025-04-10', invoiceId: 'INV-2025-L1-0142', method: 'Credit Card' },
  { id: 'f3', title: 'Term 2 Tuition Fee', amount: 45000, dueDate: '2025-08-15', status: 'pending', invoiceId: 'INV-2025-T2-0142' },
  { id: 'f4', title: 'Term 2 Lab Fee', amount: 8000, dueDate: '2025-08-15', status: 'pending', invoiceId: 'INV-2025-L2-0142' },
  { id: 'f5', title: 'Examination Fee', amount: 2500, dueDate: '2025-07-01', status: 'overdue', invoiceId: 'INV-2025-EX-0142' },
];

export const weeklyProgress: WeeklyProgress[] = [
  { week: 'W1', studyHours: 28, testsTaken: 2, assignmentsCompleted: 3 },
  { week: 'W2', studyHours: 32, testsTaken: 3, assignmentsCompleted: 4 },
  { week: 'W3', studyHours: 25, testsTaken: 1, assignmentsCompleted: 2 },
  { week: 'W4', studyHours: 35, testsTaken: 4, assignmentsCompleted: 5 },
];

export const monthlyProgress: MonthlyProgress[] = [
  { month: 'Feb', score: 82, attendance: 92 },
  { month: 'Mar', score: 85, attendance: 88 },
  { month: 'Apr', score: 87, attendance: 95 },
  { month: 'May', score: 84, attendance: 90 },
  { month: 'Jun', score: 86, attendance: 93 },
  { month: 'Jul', score: 88, attendance: 91 },
];

export const progressReports: ProgressReport[] = [
  {
    id: 'pr1',
    period: 'July 2025',
    date: '2025-07-31',
    overallGrade: 'A',
    overallPercentage: 88,
    aiSummary:
      'Aarav has shown consistent improvement this month, particularly in Mathematics and English. Study hours are up 12% compared to last month. Attendance remains strong at 91%. Focus on Biology is recommended as the score has dipped slightly below class average.',
    teacherRemarks: [
      { teacher: 'Dr. Priya Menon', subject: 'Physics', remark: 'Good understanding of mechanics. Needs to work on thermodynamics problem-solving speed.' },
      { teacher: 'Dr. Anjali Rao', subject: 'Mathematics', remark: 'Excellent performance in calculus. Keep up the consistent effort.' },
      { teacher: 'Dr. Meera Nair', subject: 'Biology', remark: 'Needs to improve diagram accuracy and revise human physiology chapters.' },
    ],
    strengthAreas: ['Mathematics', 'English', 'Computer Science', 'Calculus', 'Logical Reasoning'],
    improvementAreas: ['Biology diagrams', 'Physics problem speed', 'Time management in exams'],
  },
  {
    id: 'pr2',
    period: 'June 2025',
    date: '2025-06-30',
    overallGrade: 'A',
    overallPercentage: 84,
    aiSummary:
      'Steady progress with notable improvement in Chemistry and Computer Science. Attendance improved by 3% from the previous month. Homework completion rate is excellent.',
    teacherRemarks: [
      { teacher: 'Prof. Karan Verma', subject: 'Chemistry', remark: 'Strong grasp of organic reaction mechanisms. Participates actively in class.' },
      { teacher: 'Mr. Arjun Kapoor', subject: 'Computer Science', remark: 'Python projects show good coding practices. Encourage exploring data structures.' },
    ],
    strengthAreas: ['Chemistry', 'Computer Science', 'Organic Reactions', 'Python Programming'],
    improvementAreas: ['Physics numericals', 'Exam time management', 'Biology vocabulary'],
  },
];

export const teacherFeedback: TeacherFeedback[] = [
  {
    id: 'tf1',
    teacherName: 'Dr. Priya Menon',
    teacherAvatar: 'https://i.pravatar.cc/150?img=45',
    subject: 'Physics',
    rating: 4,
    feedback: 'Aarav is performing well in class. He has a good conceptual understanding but needs to improve his problem-solving speed for thermodynamics. Regular practice will help significantly.',
    priority: 'high',
    date: '2025-08-01',
  },
  {
    id: 'tf2',
    teacherName: 'Dr. Anjali Rao',
    teacherAvatar: 'https://i.pravatar.cc/150?img=47',
    subject: 'Mathematics',
    rating: 5,
    feedback: 'Excellent performance in calculus this term. Aarav consistently submits high-quality work and helps peers during group discussions. Keep it up!',
    priority: 'low',
    date: '2025-07-28',
  },
  {
    id: 'tf3',
    teacherName: 'Dr. Meera Nair',
    teacherAvatar: 'https://i.pravatar.cc/150?img=48',
    subject: 'Biology',
    rating: 3,
    feedback: 'Aarav needs to focus more on diagram accuracy and revise the human physiology chapters. His test scores have dipped slightly. I recommend additional practice with labeled diagrams.',
    priority: 'high',
    date: '2025-07-25',
  },
  {
    id: 'tf4',
    teacherName: 'Prof. Karan Verma',
    teacherAvatar: 'https://i.pravatar.cc/150?img=49',
    subject: 'Chemistry',
    rating: 4,
    feedback: 'Strong grasp of organic reaction mechanisms. Active participation in lab sessions. Would benefit from more consistent revision schedules.',
    priority: 'medium',
    date: '2025-07-20',
  },
  {
    id: 'tf5',
    teacherName: 'Mr. Arjun Kapoor',
    teacherAvatar: 'https://i.pravatar.cc/150?img=50',
    subject: 'Computer Science',
    rating: 5,
    feedback: 'Outstanding Python project submission. Aarav demonstrates excellent coding practices and a natural aptitude for programming. Encourage him to explore data structures next.',
    priority: 'low',
    date: '2025-07-15',
  },
];

export const parentNotifications: ParentNotification[] = [
  { id: 'pn1', category: 'attendance', title: 'Absence recorded', message: 'Aarav was marked absent for Biology on July 31. Please contact the school if this is unexpected.', timestamp: '2025-08-01T09:00:00', read: false },
  { id: 'pn2', category: 'exams', title: 'Mid-term results published', message: 'Aarav scored 88% in the mid-term examination. Rank: 3 of 42. View detailed results now.', timestamp: '2025-07-30T16:00:00', read: false },
  { id: 'pn3', category: 'fees', title: 'Fee invoice generated', message: 'Term 2 fee invoice of ₹53,000 is due by August 15. Please make the payment to avoid late charges.', timestamp: '2025-08-01T12:00:00', read: false },
  { id: 'pn4', category: 'homework', title: 'Homework overdue', message: 'Aarav has 1 overdue homework assignment (English Essay on Climate Change). Please follow up.', timestamp: '2025-07-29T10:00:00', read: true },
  { id: 'pn5', category: 'general', title: 'Parent-teacher meeting scheduled', message: 'PTM is scheduled for August 10, 2025 at 10:00 AM. Please confirm your attendance.', timestamp: '2025-07-28T14:00:00', read: true },
  { id: 'pn6', category: 'attendance', title: 'Late arrival', message: 'Aarav arrived late to Chemistry class on July 30. Please ensure timely arrival.', timestamp: '2025-07-30T08:30:00', read: true },
  { id: 'pn7', category: 'exams', title: 'Physics test on August 8', message: 'Thermodynamics unit test is scheduled for August 8. 40 questions, 90 minutes. Aarav should prepare accordingly.', timestamp: '2025-08-01T16:00:00', read: false },
  { id: 'pn8', category: 'fees', title: 'Examination fee overdue', message: 'The examination fee of ₹2,500 is overdue since July 1. Please pay at the earliest to avoid penalties.', timestamp: '2025-07-25T12:00:00', read: true },
];

export const parentActivities: ParentActivity[] = [
  { id: 'pa1', action: 'Viewed', target: 'Mid-term exam results', timestamp: '2025-08-02T10:30:00', icon: 'Eye' },
  { id: 'pa2', action: 'Received feedback from', target: 'Dr. Priya Menon (Physics)', timestamp: '2025-08-01T15:00:00', icon: 'MessageSquare' },
  { id: 'pa3', action: 'Downloaded', target: 'Progress Report — July 2025', timestamp: '2025-07-31T18:00:00', icon: 'Download' },
  { id: 'pa4', action: 'Paid', target: 'Term 1 Tuition Fee', timestamp: '2025-04-10T11:00:00', icon: 'CreditCard' },
  { id: 'pa5', action: 'Attended', target: 'Parent-Teacher Meeting', timestamp: '2025-06-15T10:00:00', icon: 'Users' },
];

export const parentCalendarEvents: ParentCalendarEvent[] = [
  { id: 'pce1', title: 'Physics Unit Test', date: '2025-08-08', time: '10:00', type: 'exam' },
  { id: 'pce2', title: 'Chemistry Mock Test', date: '2025-08-12', time: '09:00', type: 'exam' },
  { id: 'pce3', title: 'Term 2 Fee Due', date: '2025-08-15', type: 'fee' },
  { id: 'pce4', title: 'Parent-Teacher Meeting', date: '2025-08-10', time: '10:00', type: 'meeting' },
  { id: 'pce5', title: 'Annual Science Fair', date: '2025-08-20', time: '11:00', type: 'event' },
];

export const childProfile: ChildProfile = {
  id: 'stu-001',
  name: 'Aarav Sharma',
  avatar: 'https://i.pravatar.cc/150?img=12',
  rollNumber: 'SHE-2024-0142',
  grade: 'Grade 11',
  section: 'Science — PCM',
  institution: 'Shemixs International School',
  email: 'aarav.sharma@shemixs.edu',
  phone: '+91 98765 43210',
  address: '42 Lotus Residency, Bengaluru, KA 560001',
  bloodGroup: 'O+',
  dateOfBirth: '2008-03-15',
  admissionDate: '2024-04-15',
  parentName: 'Rajesh Sharma',
  parentRelation: 'Father',
  parentPhone: '+91 98765 11111',
  parentEmail: 'rajesh.sharma@email.com',
  parentOccupation: 'Software Engineer',
  emergencyContact: { name: 'Sunita Sharma', relation: 'Mother', phone: '+91 98765 22222' },
  enrolledCourses: 8,
  attendance: 91,
  overallScore: 88,
  certificates: 3,
  pendingFees: 2,
};

export const feeHistoryData = [
  { month: 'Apr', paid: 53000, pending: 0 },
  { month: 'May', paid: 0, pending: 0 },
  { month: 'Jun', paid: 0, pending: 0 },
  { month: 'Jul', paid: 0, pending: 2500 },
  { month: 'Aug', paid: 0, pending: 53000 },
];
