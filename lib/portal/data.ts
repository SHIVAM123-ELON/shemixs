/**
 * SHEMIXS Student Portal — Dummy Data
 * Placeholder data for all portal modules. No backend connection.
 */
import type {
  Course,
  Lesson,
  Note,
  Homework,
  Assignment,
  Test,
  TestResult,
  Certificate,
  AttendanceRecord,
  NotificationItem,
  FeeRecord,
  Download,
  Activity,
  TimetableEntry,
  CalendarEvent,
  StudentProfile,
} from './types';

export const studentProfile: StudentProfile = {
  id: 'stu-001',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@shemixs.edu',
  phone: '+91 98765 43210',
  avatar: 'https://i.pravatar.cc/150?img=12',
  rollNumber: 'SHE-2024-0142',
  grade: 'Grade 11',
  section: 'Science — PCM',
  institution: 'Shemixs International School',
  enrolledCourses: 8,
  joinedAt: '2024-04-15',
  bio: 'Aspiring engineer passionate about physics and mathematics. Currently preparing for competitive entrance examinations.',
  address: '42 Lotus Residency, Bengaluru, KA 560001',
  parentName: 'Rajesh Sharma',
  parentPhone: '+91 98765 11111',
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Advanced Physics: Mechanics & Thermodynamics',
    subject: 'Physics',
    instructor: 'Dr. Priya Menon',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600',
    progress: 72,
    chapters: 24,
    completedChapters: 17,
    duration: '42h 30m',
    level: 'Advanced',
    lastWatched: 'Laws of Thermodynamics — Part 3',
  },
  {
    id: 'c2',
    title: 'Organic Chemistry Mastery',
    subject: 'Chemistry',
    instructor: 'Prof. Karan Verma',
    thumbnail: 'https://images.unsplash.com/photo-1532634922-c9a9999c1a45?w=600',
    progress: 54,
    chapters: 18,
    completedChapters: 10,
    duration: '28h 15m',
    level: 'Intermediate',
    lastWatched: 'Reaction Mechanisms — SN1 vs SN2',
  },
  {
    id: 'c3',
    title: 'Calculus & Differential Equations',
    subject: 'Mathematics',
    instructor: 'Dr. Anjali Rao',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600',
    progress: 88,
    chapters: 20,
    completedChapters: 18,
    duration: '35h 00m',
    level: 'Advanced',
    lastWatched: 'Integration by Parts — Advanced',
  },
  {
    id: 'c4',
    title: 'Biology: Human Physiology',
    subject: 'Biology',
    instructor: 'Dr. Meera Nair',
    thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f13901345?w=600',
    progress: 35,
    chapters: 16,
    completedChapters: 6,
    duration: '24h 45m',
    level: 'Intermediate',
    lastWatched: 'The Nervous System — Overview',
  },
  {
    id: 'c5',
    title: 'English Literature & Comprehension',
    subject: 'English',
    instructor: 'Ms. Sophie Clarke',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a6b52a57?w=600',
    progress: 100,
    chapters: 12,
    completedChapters: 12,
    duration: '18h 00m',
    level: 'Beginner',
    lastWatched: 'Completed',
  },
  {
    id: 'c6',
    title: 'Computer Science: Python Programming',
    subject: 'Computer Science',
    instructor: 'Mr. Arjun Kapoor',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd018945?w=600',
    progress: 60,
    chapters: 22,
    completedChapters: 13,
    duration: '30h 20m',
    level: 'Intermediate',
    lastWatched: 'Object-Oriented Programming — Classes',
  },
];

export const lessons: Lesson[] = [
  { id: 'l1', courseId: 'c1', title: 'Introduction to Mechanics', duration: '12:30', completed: true, order: 1 },
  { id: 'l2', courseId: 'c1', title: 'Newton\'s Laws of Motion', duration: '18:45', completed: true, order: 2 },
  { id: 'l3', courseId: 'c1', title: 'Work, Energy & Power', duration: '22:10', completed: true, order: 3 },
  { id: 'l4', courseId: 'c1', title: 'Rotational Dynamics', duration: '26:30', completed: true, order: 4 },
  { id: 'l5', courseId: 'c1', title: 'Gravitation', duration: '19:55', completed: false, order: 5 },
  { id: 'l6', courseId: 'c1', title: 'Laws of Thermodynamics — Part 1', duration: '24:00', completed: false, order: 6 },
  { id: 'l7', courseId: 'c1', title: 'Laws of Thermodynamics — Part 2', duration: '21:15', completed: false, order: 7 },
  { id: 'l8', courseId: 'c1', title: 'Laws of Thermodynamics — Part 3', duration: '23:40', completed: false, order: 8 },
  { id: 'l9', courseId: 'c1', title: 'Heat Transfer Mechanisms', duration: '17:20', completed: false, order: 9 },
  { id: 'l10', courseId: 'c1', title: 'Kinetic Theory of Gases', duration: '20:05', completed: false, order: 10 },
];

export const notes: Note[] = [
  { id: 'n1', title: 'Mechanics — Complete Formula Sheet', subject: 'Physics', thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400', pages: 24, uploadedAt: '2025-07-20', bookmarked: true, favorite: true },
  { id: 'n2', title: 'Organic Chemistry Reaction Maps', subject: 'Chemistry', thumbnail: 'https://images.unsplash.com/photo-1532634922-c9a9999c1a45?w=400', pages: 18, uploadedAt: '2025-07-18', bookmarked: false, favorite: true },
  { id: 'n3', title: 'Calculus Integration Techniques', subject: 'Mathematics', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400', pages: 32, uploadedAt: '2025-07-15', bookmarked: true, favorite: false },
  { id: 'n4', title: 'Human Physiology Diagrams', subject: 'Biology', thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f13901345?w=400', pages: 28, uploadedAt: '2025-07-12', bookmarked: false, favorite: false },
  { id: 'n5', title: 'Python Syntax Quick Reference', subject: 'Computer Science', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd018945?w=400', pages: 15, uploadedAt: '2025-07-10', bookmarked: true, favorite: true },
  { id: 'n6', title: 'English Grammar Essentials', subject: 'English', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a6b52a57?w=400', pages: 20, uploadedAt: '2025-07-05', bookmarked: false, favorite: false },
];

export const homework: Homework[] = [
  { id: 'h1', title: 'Solve 15 Problems on Projectile Motion', subject: 'Physics', dueDate: '2025-08-05', status: 'pending', priority: 'high', description: 'Complete problems 1-15 from Chapter 4. Show all working.' },
  { id: 'h2', title: 'Write Lab Report: Acid-Base Titration', subject: 'Chemistry', dueDate: '2025-08-07', status: 'pending', priority: 'medium', description: 'Document procedure, observations, and calculations from the titration lab.' },
  { id: 'h3', title: 'Integration Practice Set 5', subject: 'Mathematics', dueDate: '2025-08-03', status: 'submitted', priority: 'high', description: 'Solve all 20 integration problems using substitution and parts.' },
  { id: 'h4', title: 'Diagram the Digestive System', subject: 'Biology', dueDate: '2025-07-30', status: 'graded', priority: 'low', description: 'Label all major organs and describe their functions.' },
  { id: 'h5', title: 'Write Essay on Climate Change', subject: 'English', dueDate: '2025-07-28', status: 'overdue', priority: 'medium', description: '500-word argumentative essay with citations.' },
  { id: 'h6', title: 'Build a Simple Calculator in Python', subject: 'Computer Science', dueDate: '2025-08-10', status: 'pending', priority: 'high', description: 'Create a CLI calculator with basic arithmetic operations.' },
];

export const assignments: Assignment[] = [
  { id: 'a1', title: 'Physics Research Paper: Renewable Energy', subject: 'Physics', dueDate: '2025-08-15', status: 'in-progress', maxGrade: 100, description: '2000-word research paper on renewable energy technologies.' },
  { id: 'a2', title: 'Chemistry Molecular Models Project', subject: 'Chemistry', dueDate: '2025-08-20', status: 'not-started', maxGrade: 50, description: 'Build and present 3D molecular models of organic compounds.' },
  { id: 'a3', title: 'Mathematical Modeling Assignment', subject: 'Mathematics', dueDate: '2025-08-01', status: 'graded', grade: 92, maxGrade: 100, description: 'Model real-world scenarios using differential equations.' },
  { id: 'a4', title: 'Biology Field Study Report', subject: 'Biology', dueDate: '2025-08-25', status: 'not-started', maxGrade: 80, description: 'Conduct a field study on local ecosystem biodiversity.' },
  { id: 'a5', title: 'Python Data Analysis Project', subject: 'Computer Science', dueDate: '2025-08-12', status: 'in-progress', maxGrade: 100, description: 'Analyze a dataset using pandas and matplotlib.' },
];

export const tests: Test[] = [
  { id: 't1', title: 'Physics Unit Test — Thermodynamics', subject: 'Physics', type: 'upcoming', date: '2025-08-08', duration: '90 min', totalMarks: 100, status: 'scheduled', questions: 40 },
  { id: 't2', title: 'Chemistry Mock Test — Full Syllabus', subject: 'Chemistry', type: 'mock', date: '2025-08-12', duration: '180 min', totalMarks: 200, status: 'scheduled', questions: 80 },
  { id: 't3', title: 'Mathematics Practice — Calculus', subject: 'Mathematics', type: 'practice', date: '2025-08-05', duration: '60 min', totalMarks: 50, status: 'scheduled', questions: 25 },
  { id: 't4', title: 'Biology Unit Test — Nervous System', subject: 'Biology', type: 'previous', date: '2025-07-25', duration: '90 min', totalMarks: 100, scoredMarks: 87, status: 'completed', questions: 40 },
  { id: 't5', title: 'English Comprehension Test', subject: 'English', type: 'previous', date: '2025-07-20', duration: '60 min', totalMarks: 50, scoredMarks: 48, status: 'completed', questions: 30 },
  { id: 't6', title: 'Python Programming Test', subject: 'Computer Science', type: 'previous', date: '2025-07-18', duration: '120 min', totalMarks: 100, scoredMarks: 94, status: 'completed', questions: 35 },
  { id: 't7', title: 'Physics Practice — Mechanics', subject: 'Physics', type: 'practice', date: '2025-08-15', duration: '45 min', totalMarks: 40, status: 'scheduled', questions: 20 },
  { id: 't8', title: 'Chemistry Practice — Organic Reactions', subject: 'Chemistry', type: 'practice', date: '2025-08-18', duration: '45 min', totalMarks: 40, status: 'scheduled', questions: 20 },
];

export const testResults: TestResult[] = [
  { id: 'r1', testId: 't4', title: 'Biology Unit Test — Nervous System', subject: 'Biology', date: '2025-07-25', scoredMarks: 87, totalMarks: 100, percentage: 87, grade: 'A', rank: 3, totalStudents: 42 },
  { id: 'r2', testId: 't5', title: 'English Comprehension Test', subject: 'English', date: '2025-07-20', scoredMarks: 48, totalMarks: 50, percentage: 96, grade: 'A+', rank: 1, totalStudents: 42 },
  { id: 'r3', testId: 't6', title: 'Python Programming Test', subject: 'Computer Science', date: '2025-07-18', scoredMarks: 94, totalMarks: 100, percentage: 94, grade: 'A', rank: 2, totalStudents: 38 },
  { id: 'r4', testId: 't-prev-1', title: 'Physics Unit Test — Mechanics', subject: 'Physics', date: '2025-07-10', scoredMarks: 78, totalMarks: 100, percentage: 78, grade: 'B+', rank: 8, totalStudents: 42 },
  { id: 'r5', testId: 't-prev-2', title: 'Mathematics Unit Test — Integration', subject: 'Mathematics', date: '2025-07-05', scoredMarks: 91, totalMarks: 100, percentage: 91, grade: 'A', rank: 4, totalStudents: 42 },
  { id: 'r6', testId: 't-prev-3', title: 'Chemistry Unit Test — Organic', subject: 'Chemistry', date: '2025-06-28', scoredMarks: 82, totalMarks: 100, percentage: 82, grade: 'A', rank: 6, totalStudents: 42 },
];

export const certificates: Certificate[] = [
  { id: 'cert1', title: 'English Literature & Comprehension', courseId: 'c5', issuedAt: '2025-07-15', credentialId: 'SHEX-CERT-2025-0142', grade: 'A+' },
  { id: 'cert2', title: 'Python Programming Fundamentals', courseId: 'c6', issuedAt: '2025-06-20', credentialId: 'SHEX-CERT-2025-0098', grade: 'A' },
  { id: 'cert3', title: 'Mathematics Excellence Award', courseId: 'c3', issuedAt: '2025-06-01', credentialId: 'SHEX-CERT-2025-0056', grade: 'A+' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'att1', date: '2025-08-01', subject: 'Physics', status: 'present' },
  { id: 'att2', date: '2025-08-01', subject: 'Mathematics', status: 'present' },
  { id: 'att3', date: '2025-08-01', subject: 'Chemistry', status: 'late' },
  { id: 'att4', date: '2025-07-31', subject: 'Biology', status: 'absent' },
  { id: 'att5', date: '2025-07-31', subject: 'Physics', status: 'present' },
  { id: 'att6', date: '2025-07-31', subject: 'English', status: 'present' },
  { id: 'att7', date: '2025-07-30', subject: 'Mathematics', status: 'present' },
  { id: 'att8', date: '2025-07-30', subject: 'Computer Science', status: 'excused' },
  { id: 'att9', date: '2025-07-30', subject: 'Chemistry', status: 'present' },
  { id: 'att10', date: '2025-07-29', subject: 'Physics', status: 'present' },
];

export const notifications: NotificationItem[] = [
  { id: 'not1', category: 'classes', title: 'Physics class rescheduled', message: 'Tomorrow\'s Mechanics lecture moved to 3:00 PM in Room 204.', timestamp: '2025-08-02T09:30:00', read: false },
  { id: 'not2', category: 'homework', title: 'Homework due tomorrow', message: 'Integration Practice Set 5 is due by 11:59 PM tomorrow.', timestamp: '2025-08-02T08:15:00', read: false },
  { id: 'not3', category: 'exams', title: 'Physics test on August 8', message: 'Thermodynamics unit test scheduled for August 8. 40 questions, 90 minutes.', timestamp: '2025-08-01T16:00:00', read: false },
  { id: 'not4', category: 'payments', title: 'Fee invoice generated', message: 'Term 2 fee invoice of ₹45,000 is due by August 15.', timestamp: '2025-08-01T12:00:00', read: true },
  { id: 'not5', category: 'general', title: 'New notes uploaded', message: 'Dr. Priya Menon uploaded new handwritten notes for Thermodynamics.', timestamp: '2025-07-31T14:30:00', read: true },
  { id: 'not6', category: 'classes', title: 'New lecture available', message: 'Laws of Thermodynamics — Part 3 is now available to watch.', timestamp: '2025-07-31T10:00:00', read: true },
  { id: 'not7', category: 'homework', title: 'Assignment graded', message: 'Your Mathematical Modeling Assignment received 92/100.', timestamp: '2025-07-30T18:45:00', read: true },
  { id: 'not8', category: 'exams', title: 'Mock test results published', message: 'Chemistry Mock Test results are now available in Test History.', timestamp: '2025-07-30T11:20:00', read: true },
];

export const feeRecords: FeeRecord[] = [
  { id: 'f1', title: 'Term 1 Tuition Fee', amount: 45000, dueDate: '2025-04-15', status: 'paid', paidDate: '2025-04-10', invoiceId: 'INV-2025-T1-0142' },
  { id: 'f2', title: 'Term 1 Lab Fee', amount: 8000, dueDate: '2025-04-15', status: 'paid', paidDate: '2025-04-10', invoiceId: 'INV-2025-L1-0142' },
  { id: 'f3', title: 'Term 2 Tuition Fee', amount: 45000, dueDate: '2025-08-15', status: 'pending', invoiceId: 'INV-2025-T2-0142' },
  { id: 'f4', title: 'Term 2 Lab Fee', amount: 8000, dueDate: '2025-08-15', status: 'pending', invoiceId: 'INV-2025-L2-0142' },
  { id: 'f5', title: 'Examination Fee', amount: 2500, dueDate: '2025-07-01', status: 'overdue', invoiceId: 'INV-2025-EX-0142' },
];

export const downloads: Download[] = [
  { id: 'd1', title: 'Mechanics Formula Sheet', type: 'pdf', size: '2.4 MB', subject: 'Physics', downloadedAt: '2025-08-01' },
  { id: 'd2', title: 'Thermodynamics Lecture 3', type: 'video', size: '145 MB', subject: 'Physics', downloadedAt: '2025-07-31' },
  { id: 'd3', title: 'Organic Chemistry Slides', type: 'slides', size: '8.1 MB', subject: 'Chemistry' },
  { id: 'd4', title: 'Calculus Problem Sets', type: 'pdf', size: '3.2 MB', subject: 'Mathematics', downloadedAt: '2025-07-28' },
  { id: 'd5', title: 'Python Project Templates', type: 'zip', size: '12.5 MB', subject: 'Computer Science' },
  { id: 'd6', title: 'Biology Diagram Pack', type: 'zip', size: '24.0 MB', subject: 'Biology' },
];

export const activities: Activity[] = [
  { id: 'act1', action: 'Completed lesson', target: 'Newton\'s Laws of Motion', timestamp: '2025-08-02T10:30:00', icon: 'CheckCircle' },
  { id: 'act2', action: 'Submitted homework', target: 'Integration Practice Set 5', timestamp: '2025-08-01T20:15:00', icon: 'Pencil' },
  { id: 'act3', action: 'Scored', target: 'Biology Unit Test — 87%', timestamp: '2025-07-25T14:00:00', icon: 'Award' },
  { id: 'act4', action: 'Downloaded', target: 'Mechanics Formula Sheet', timestamp: '2025-08-01T09:00:00', icon: 'Download' },
  { id: 'act5', action: 'Earned certificate', target: 'English Literature & Comprehension', timestamp: '2025-07-15T16:30:00', icon: 'BadgeCheck' },
  { id: 'act6', action: 'Started course', target: 'Python Programming', timestamp: '2025-06-20T11:00:00', icon: 'PlayCircle' },
];

export const timetable: TimetableEntry[] = [
  { id: 'tt1', day: 'Monday', startTime: '08:00', endTime: '09:00', subject: 'Physics', instructor: 'Dr. Priya Menon', room: '204', color: 'primary' },
  { id: 'tt2', day: 'Monday', startTime: '09:15', endTime: '10:15', subject: 'Mathematics', instructor: 'Dr. Anjali Rao', room: '108', color: 'secondary' },
  { id: 'tt3', day: 'Monday', startTime: '10:30', endTime: '11:30', subject: 'Chemistry', instructor: 'Prof. Karan Verma', room: '205', color: 'accent' },
  { id: 'tt4', day: 'Monday', startTime: '12:00', endTime: '13:00', subject: 'English', instructor: 'Ms. Sophie Clarke', room: '102', color: 'warning' },
  { id: 'tt5', day: 'Tuesday', startTime: '08:00', endTime: '09:00', subject: 'Biology', instructor: 'Dr. Meera Nair', room: '210', color: 'success' },
  { id: 'tt6', day: 'Tuesday', startTime: '09:15', endTime: '10:15', subject: 'Physics', instructor: 'Dr. Priya Menon', room: '204', color: 'primary' },
  { id: 'tt7', day: 'Tuesday', startTime: '10:30', endTime: '11:30', subject: 'Computer Science', instructor: 'Mr. Arjun Kapoor', room: 'Lab 3', color: 'chart-2' },
  { id: 'tt8', day: 'Wednesday', startTime: '08:00', endTime: '09:00', subject: 'Mathematics', instructor: 'Dr. Anjali Rao', room: '108', color: 'secondary' },
  { id: 'tt9', day: 'Wednesday', startTime: '09:15', endTime: '10:15', subject: 'Chemistry', instructor: 'Prof. Karan Verma', room: '205', color: 'accent' },
  { id: 'tt10', day: 'Wednesday', startTime: '10:30', endTime: '11:30', subject: 'Physics', instructor: 'Dr. Priya Menon', room: '204', color: 'primary' },
  { id: 'tt11', day: 'Thursday', startTime: '08:00', endTime: '09:00', subject: 'Biology', instructor: 'Dr. Meera Nair', room: '210', color: 'success' },
  { id: 'tt12', day: 'Thursday', startTime: '09:15', endTime: '10:15', subject: 'English', instructor: 'Ms. Sophie Clarke', room: '102', color: 'warning' },
  { id: 'tt13', day: 'Thursday', startTime: '10:30', endTime: '11:30', subject: 'Computer Science', instructor: 'Mr. Arjun Kapoor', room: 'Lab 3', color: 'chart-2' },
  { id: 'tt14', day: 'Friday', startTime: '08:00', endTime: '09:00', subject: 'Physics', instructor: 'Dr. Priya Menon', room: '204', color: 'primary' },
  { id: 'tt15', day: 'Friday', startTime: '09:15', endTime: '10:15', subject: 'Mathematics', instructor: 'Dr. Anjali Rao', room: '108', color: 'secondary' },
  { id: 'tt16', day: 'Friday', startTime: '10:30', endTime: '11:30', subject: 'Chemistry', instructor: 'Prof. Karan Verma', room: '205', color: 'accent' },
  { id: 'tt17', day: 'Saturday', startTime: '08:00', endTime: '09:00', subject: 'Computer Science', instructor: 'Mr. Arjun Kapoor', room: 'Lab 3', color: 'chart-2' },
  { id: 'tt18', day: 'Saturday', startTime: '09:15', endTime: '10:15', subject: 'Biology', instructor: 'Dr. Meera Nair', room: '210', color: 'success' },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 'ev1', title: 'Physics Test — Thermodynamics', date: '2025-08-08', time: '10:00', type: 'test' },
  { id: 'ev2', title: 'Math Practice Test', date: '2025-08-05', time: '14:00', type: 'test' },
  { id: 'ev3', title: 'Physics Lecture', date: '2025-08-04', time: '08:00', type: 'class' },
  { id: 'ev4', title: 'Chemistry Mock Test', date: '2025-08-12', time: '09:00', type: 'test' },
  { id: 'ev5', title: 'Research Paper Due', date: '2025-08-15', type: 'assignment' },
  { id: 'ev6', title: 'Python Project Due', date: '2025-08-12', type: 'assignment' },
  { id: 'ev7', title: 'Annual Science Fair', date: '2025-08-20', time: '11:00', type: 'event' },
];

export const performanceData = {
  weeklyProgress: [
    { day: 'Mon', hours: 3.5, target: 4 },
    { day: 'Tue', hours: 4.2, target: 4 },
    { day: 'Wed', hours: 2.8, target: 4 },
    { day: 'Thu', hours: 5.0, target: 4 },
    { day: 'Fri', hours: 3.8, target: 4 },
    { day: 'Sat', hours: 6.5, target: 5 },
    { day: 'Sun', hours: 4.5, target: 5 },
  ],
  subjectPerformance: [
    { subject: 'Physics', score: 78, average: 72 },
    { subject: 'Chemistry', score: 82, average: 75 },
    { subject: 'Mathematics', score: 91, average: 80 },
    { subject: 'Biology', score: 87, average: 78 },
    { subject: 'English', score: 96, average: 85 },
    { subject: 'CS', score: 94, average: 82 },
  ],
  attendanceTrend: [
    { month: 'Feb', percentage: 92 },
    { month: 'Mar', percentage: 88 },
    { month: 'Apr', percentage: 95 },
    { month: 'May', percentage: 90 },
    { month: 'Jun', percentage: 93 },
    { month: 'Jul', percentage: 91 },
  ],
  testScores: [
    { test: 'Bio Unit', score: 87 },
    { test: 'English', score: 96 },
    { test: 'Python', score: 94 },
    { test: 'Physics', score: 78 },
    { test: 'Math', score: 91 },
    { test: 'Chemistry', score: 82 },
  ],
};

export const attendanceSummary = {
  overall: 91,
  present: 142,
  absent: 8,
  late: 4,
  excused: 2,
  totalClasses: 156,
};
