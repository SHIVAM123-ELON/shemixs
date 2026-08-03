/**
 * SHEMIXS Teacher Portal — Dummy Data
 * Placeholder data for all teacher portal modules. No backend connection.
 */
import type {
  TeacherProfile,
  TeacherCourse,
  TodayClass,
  LiveClass,
  StudentRecord,
  Assignment,
  AssignmentSubmission,
  TestRecord,
  TestQuestion,
  ResultEntry,
  TeacherNotification,
  TeacherCalendarEvent,
  TeacherActivity,
  RecentUpload,
  WeeklyTeaching,
  StudentPerformanceData,
  CourseCompletionData,
  AssignmentCompletionData,
  TestPerformanceData,
  TopStudent,
  AttentionStudent,
} from './teacher-types';

export const teacherProfile: TeacherProfile = {
  id: 'tch-001',
  name: 'Dr. Priya Menon',
  email: 'priya.menon@shemixs.edu',
  phone: '+91 98765 33333',
  avatar: 'https://i.pravatar.cc/150?img=45',
  department: 'Science — Physics',
  subjects: ['Physics', 'Applied Mathematics'],
  experience: 12,
  qualification: 'Ph.D. in Physics, IIT Bombay',
  joinedAt: '2023-06-01',
  bio: 'Physics educator with 12 years of experience teaching Grades 11-12. Passionate about making complex concepts accessible through interactive experiments and real-world applications.',
};

export const teacherCourses: TeacherCourse[] = [
  { id: 'c1', title: 'Mechanics & Kinematics', subject: 'Physics', grade: 'Grade 11', batch: 'PCM-A', students: 42, progress: 75, chapters: 12, completedChapters: 9, thumbnail: 'https://i.pravatar.cc/150?img=1', status: 'active' },
  { id: 'c2', title: 'Thermodynamics', subject: 'Physics', grade: 'Grade 11', batch: 'PCM-A', students: 42, progress: 50, chapters: 8, completedChapters: 4, thumbnail: 'https://i.pravatar.cc/150?img=2', status: 'active' },
  { id: 'c3', title: 'Waves & Optics', subject: 'Physics', grade: 'Grade 12', batch: 'PCM-B', students: 38, progress: 90, chapters: 10, completedChapters: 9, thumbnail: 'https://i.pravatar.cc/150?img=3', status: 'active' },
  { id: 'c4', title: 'Electromagnetism', subject: 'Physics', grade: 'Grade 12', batch: 'PCM-B', students: 38, progress: 30, chapters: 14, completedChapters: 4, thumbnail: 'https://i.pravatar.cc/150?img=4', status: 'active' },
  { id: 'c5', title: 'Modern Physics', subject: 'Physics', grade: 'Grade 12', batch: 'PCM-B', students: 38, progress: 0, chapters: 6, completedChapters: 0, thumbnail: 'https://i.pravatar.cc/150?img=5', status: 'draft' },
];

export const todayClasses: TodayClass[] = [
  { id: 'tc1', subject: 'Physics', topic: 'Newton\'s Laws of Motion', time: '08:00 - 09:00', room: '204', batch: 'PCM-A', status: 'completed' },
  { id: 'tc2', subject: 'Physics', topic: 'Thermodynamics — Entropy', time: '09:15 - 10:15', room: '205', batch: 'PCM-B', status: 'live' },
  { id: 'tc3', subject: 'Applied Mathematics', topic: 'Differential Equations', time: '11:30 - 12:30', room: '108', batch: 'PCM-A', status: 'upcoming' },
  { id: 'tc4', subject: 'Physics', topic: 'Lab: Projectile Motion', time: '14:00 - 15:30', room: 'Lab 3', batch: 'PCM-A', status: 'upcoming' },
];

export const liveClasses: LiveClass[] = [
  { id: 'lc1', title: 'Thermodynamics — Live Problem Solving', course: 'Thermodynamics', batch: 'PCM-A', date: '2025-08-02', time: '09:15', duration: 60, meetingLink: 'https://meet.shemixs.com/room/abc123', agenda: 'Solve numerical problems on entropy and heat engines. Q&A session at the end.', status: 'live', attendees: 38 },
  { id: 'lc2', title: 'Waves — Interference & Diffraction', course: 'Waves & Optics', batch: 'PCM-B', date: '2025-08-04', time: '10:00', duration: 90, meetingLink: 'https://meet.shemixs.com/room/def456', agenda: 'Live demonstration of interference patterns. Interactive quiz on diffraction gratings.', status: 'upcoming' },
  { id: 'lc3', title: 'Electromagnetism — Faraday\'s Law', course: 'Electromagnetism', batch: 'PCM-B', date: '2025-08-06', time: '14:00', duration: 60, meetingLink: 'https://meet.shemixs.com/room/ghi789', agenda: 'Conceptual lecture on electromagnetic induction with virtual lab simulations.', status: 'upcoming' },
  { id: 'lc4', title: 'Mechanics — Revision Session', course: 'Mechanics & Kinematics', batch: 'PCM-A', date: '2025-07-30', time: '15:00', duration: 90, meetingLink: 'https://meet.shemixs.com/room/jkl012', agenda: 'Full chapter revision with practice problems. Recording available.', status: 'completed', attendees: 40 },
  { id: 'lc5', title: 'Optics — Lens Combinations', course: 'Waves & Optics', batch: 'PCM-B', date: '2025-07-25', time: '10:00', duration: 60, meetingLink: 'https://meet.shemixs.com/room/mno345', agenda: 'Worked examples on compound lens systems. Recording available.', status: 'completed', attendees: 36 },
];

export const studentRecords: StudentRecord[] = [
  { id: 's1', name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?img=12', rollNumber: 'SHE-2024-0142', batch: 'PCM-A', attendance: 91, assignmentCompletion: 95, testScore: 88, overallPerformance: 91, status: 'excellent' },
  { id: 's2', name: 'Diya Patel', avatar: 'https://i.pravatar.cc/150?img=13', rollNumber: 'SHE-2024-0143', batch: 'PCM-A', attendance: 95, assignmentCompletion: 90, testScore: 92, overallPerformance: 92, status: 'excellent' },
  { id: 's3', name: 'Vivaan Gupta', avatar: 'https://i.pravatar.cc/150?img=14', rollNumber: 'SHE-2024-0144', batch: 'PCM-A', attendance: 88, assignmentCompletion: 85, testScore: 78, overallPerformance: 83, status: 'good' },
  { id: 's4', name: 'Ananya Reddy', avatar: 'https://i.pravatar.cc/150?img=15', rollNumber: 'SHE-2024-0145', batch: 'PCM-A', attendance: 72, assignmentCompletion: 60, testScore: 65, overallPerformance: 65, status: 'needs_attention' },
  { id: 's5', name: 'Arjun Nair', avatar: 'https://i.pravatar.cc/150?img=16', rollNumber: 'SHE-2024-0146', batch: 'PCM-B', attendance: 90, assignmentCompletion: 88, testScore: 85, overallPerformance: 87, status: 'excellent' },
  { id: 's6', name: 'Ishita Kumar', avatar: 'https://i.pravatar.cc/150?img=17', rollNumber: 'SHE-2024-0147', batch: 'PCM-B', attendance: 85, assignmentCompletion: 82, testScore: 80, overallPerformance: 82, status: 'good' },
  { id: 's7', name: 'Kabir Singh', avatar: 'https://i.pravatar.cc/150?img=18', rollNumber: 'SHE-2024-0148', batch: 'PCM-B', attendance: 68, assignmentCompletion: 55, testScore: 58, overallPerformance: 60, status: 'needs_attention' },
  { id: 's8', name: 'Saanvi Joshi', avatar: 'https://i.pravatar.cc/150?img=19', rollNumber: 'SHE-2024-0149', batch: 'PCM-B', attendance: 93, assignmentCompletion: 92, testScore: 90, overallPerformance: 91, status: 'excellent' },
  { id: 's9', name: 'Reyansh Das', avatar: 'https://i.pravatar.cc/150?img=20', rollNumber: 'SHE-2024-0150', batch: 'PCM-A', attendance: 80, assignmentCompletion: 75, testScore: 72, overallPerformance: 75, status: 'average' },
  { id: 's10', name: 'Myra Iyer', avatar: 'https://i.pravatar.cc/150?img=21', rollNumber: 'SHE-2024-0151', batch: 'PCM-B', attendance: 87, assignmentCompletion: 80, testScore: 76, overallPerformance: 81, status: 'good' },
];

export const assignments: Assignment[] = [
  { id: 'a1', title: 'Solve 15 Problems on Projectile Motion', course: 'Mechanics & Kinematics', batch: 'PCM-A', dueDate: '2025-08-05', totalMarks: 50, submitted: 35, total: 42, status: 'active', description: 'Solve problems 1-15 from Chapter 4. Show all working steps clearly.', attachments: ['projectile-problems.pdf'] },
  { id: 'a2', title: 'Lab Report: Acid-Base Titration', course: 'Thermodynamics', batch: 'PCM-A', dueDate: '2025-08-07', totalMarks: 30, submitted: 28, total: 42, status: 'active', description: 'Write a complete lab report based on the titration experiment conducted in class.', attachments: ['lab-template.pdf', 'titration-guide.png'] },
  { id: 'a3', title: 'Build a Simple Calculator in Python', course: 'Applied Mathematics', batch: 'PCM-A', dueDate: '2025-08-10', totalMarks: 40, submitted: 20, total: 42, status: 'active', description: 'Create a calculator program using Python that supports basic arithmetic operations.', attachments: [] },
  { id: 'a4', title: 'Wave Optics — Numerical Set', course: 'Waves & Optics', batch: 'PCM-B', dueDate: '2025-07-28', totalMarks: 40, submitted: 38, total: 38, status: 'graded', description: 'Solve numerical problems on interference, diffraction, and polarization.', attachments: ['wave-optics-numericals.pdf'] },
  { id: 'a5', title: 'Electromagnetic Induction — Concept Map', course: 'Electromagnetism', batch: 'PCM-B', dueDate: '2025-07-20', totalMarks: 20, submitted: 30, total: 38, status: 'graded', description: 'Create a concept map linking all key ideas in electromagnetic induction.', attachments: [] },
];

export const assignmentSubmissions: AssignmentSubmission[] = [
  { id: 'sub1', studentName: 'Aarav Sharma', studentAvatar: 'https://i.pravatar.cc/150?img=12', rollNumber: 'SHE-2024-0142', submittedAt: '2025-08-03T10:30:00', status: 'submitted' },
  { id: 'sub2', studentName: 'Diya Patel', studentAvatar: 'https://i.pravatar.cc/150?img=13', rollNumber: 'SHE-2024-0143', submittedAt: '2025-08-03T09:15:00', status: 'graded', marks: 48 },
  { id: 'sub3', studentName: 'Vivaan Gupta', studentAvatar: 'https://i.pravatar.cc/150?img=14', rollNumber: 'SHE-2024-0144', submittedAt: '2025-08-04T22:00:00', status: 'late' },
  { id: 'sub4', studentName: 'Ananya Reddy', studentAvatar: 'https://i.pravatar.cc/150?img=15', rollNumber: 'SHE-2024-0145', submittedAt: '', status: 'pending' },
  { id: 'sub5', studentName: 'Reyansh Das', studentAvatar: 'https://i.pravatar.cc/150?img=20', rollNumber: 'SHE-2024-0150', submittedAt: '2025-08-03T14:20:00', status: 'submitted' },
];

export const testRecords: TestRecord[] = [
  { id: 't1', title: 'Mechanics Unit Test', subject: 'Physics', type: 'MCQ', duration: 90, totalMarks: 100, questions: 40, date: '2025-08-08', status: 'upcoming', submissions: 0, totalStudents: 42 },
  { id: 't2', title: 'Thermodynamics Quiz', subject: 'Physics', type: 'MCQ', duration: 30, totalMarks: 40, questions: 20, date: '2025-08-12', status: 'upcoming', submissions: 0, totalStudents: 42 },
  { id: 't3', title: 'Waves & Optics Mock Test', subject: 'Physics', type: 'Mock', duration: 180, totalMarks: 200, questions: 60, date: '2025-08-15', status: 'upcoming', submissions: 0, totalStudents: 38 },
  { id: 't4', title: 'Electromagnetism Practice', subject: 'Physics', type: 'Practice', duration: 60, totalMarks: 50, questions: 25, date: '2025-07-28', status: 'active', submissions: 30, totalStudents: 38 },
  { id: 't5', title: 'Mid-Term Examination', subject: 'Physics', type: 'Subjective', duration: 180, totalMarks: 100, questions: 10, date: '2025-07-25', status: 'completed', submissions: 42, totalStudents: 42 },
  { id: 't6', title: 'Calculus Quick Test', subject: 'Applied Mathematics', type: 'MCQ', duration: 45, totalMarks: 50, questions: 25, date: '2025-07-20', status: 'completed', submissions: 42, totalStudents: 42 },
  { id: 't7', title: 'Differential Equations Test', subject: 'Applied Mathematics', type: 'Subjective', duration: 90, totalMarks: 80, questions: 8, date: '', status: 'draft', submissions: 0, totalStudents: 42 },
  { id: 't8', title: 'Optics Subjective Test', subject: 'Physics', type: 'Subjective', duration: 120, totalMarks: 100, questions: 12, date: '', status: 'draft', submissions: 0, totalStudents: 38 },
];

export const testQuestions: TestQuestion[] = [
  { id: 'q1', question: 'A body is projected with velocity 20 m/s at 30 degrees. Find the maximum height.', type: 'subjective', marks: 5 },
  { id: 'q2', question: 'The SI unit of entropy is:', type: 'mcq', options: ['Joule/Kelvin', 'Joule', 'Watt', 'Newton'], marks: 2 },
  { id: 'q3', question: 'State the first law of thermodynamics and give one example.', type: 'subjective', marks: 5 },
  { id: 'q4', question: 'In an isothermal process, the change in internal energy is:', type: 'mcq', options: ['Positive', 'Negative', 'Zero', 'Infinite'], marks: 2 },
  { id: 'q5', question: 'Derive the expression for efficiency of a Carnot engine.', type: 'subjective', marks: 10 },
];

export const resultEntries: ResultEntry[] = [
  { id: 'r1', studentName: 'Aarav Sharma', studentAvatar: 'https://i.pravatar.cc/150?img=12', rollNumber: 'SHE-2024-0142', marks: 78, totalMarks: 100, grade: 'B+', rank: 8, published: true },
  { id: 'r2', studentName: 'Diya Patel', studentAvatar: 'https://i.pravatar.cc/150?img=13', rollNumber: 'SHE-2024-0143', marks: 92, totalMarks: 100, grade: 'A', rank: 1, published: true },
  { id: 'r3', studentName: 'Vivaan Gupta', studentAvatar: 'https://i.pravatar.cc/150?img=14', rollNumber: 'SHE-2024-0144', marks: 75, totalMarks: 100, grade: 'B+', rank: 12, published: false },
  { id: 'r4', studentName: 'Ananya Reddy', studentAvatar: 'https://i.pravatar.cc/150?img=15', rollNumber: 'SHE-2024-0145', marks: 65, totalMarks: 100, grade: 'B', rank: 25, published: false },
  { id: 'r5', studentName: 'Reyansh Das', studentAvatar: 'https://i.pravatar.cc/150?img=20', rollNumber: 'SHE-2024-0150', marks: 82, totalMarks: 100, grade: 'A', rank: 5, published: false },
  { id: 'r6', studentName: 'Myra Iyer', studentAvatar: 'https://i.pravatar.cc/150?img=21', rollNumber: 'SHE-2024-0151', marks: 88, totalMarks: 100, grade: 'A', rank: 3, published: false },
];

export const teacherNotifications: TeacherNotification[] = [
  { id: 'tn1', category: 'assignments', title: 'New submission received', message: 'Aarav Sharma submitted "Solve 15 Problems on Projectile Motion". Please review.', timestamp: '2025-08-02T09:30:00', read: false },
  { id: 'tn2', category: 'tests', title: 'Test scheduled', message: 'Mechanics Unit Test is scheduled for August 8. 42 students enrolled.', timestamp: '2025-08-01T16:00:00', read: false },
  { id: 'tn3', category: 'classes', title: 'Live class starting soon', message: 'Thermodynamics live class starts at 9:15 AM today. Meeting link is ready.', timestamp: '2025-08-02T08:45:00', read: false },
  { id: 'tn4', category: 'results', title: 'Results pending publication', message: '4 student results for Mid-Term Examination are awaiting your review and publication.', timestamp: '2025-08-01T14:00:00', read: true },
  { id: 'tn5', category: 'general', title: 'PTM reminder', message: 'Parent-Teacher Meeting is scheduled for August 10 at 10:00 AM. Please prepare student progress notes.', timestamp: '2025-07-31T12:00:00', read: true },
  { id: 'tn6', category: 'assignments', title: 'Late submission', message: 'Vivaan Gupta submitted "Lab Report: Acid-Base Titration" 2 hours after the deadline.', timestamp: '2025-08-04T22:00:00', read: false },
  { id: 'tn7', category: 'tests', title: 'Test auto-graded', message: 'Electromagnetism Practice Test has been auto-graded. 30/38 submissions evaluated.', timestamp: '2025-07-28T18:00:00', read: true },
  { id: 'tn8', category: 'general', title: 'New student enrolled', message: 'Saanvi Joshi has been added to your PCM-B batch for Waves & Optics.', timestamp: '2025-07-25T10:00:00', read: true },
];

export const teacherCalendarEvents: TeacherCalendarEvent[] = [
  { id: 'tce1', title: 'Mechanics Unit Test', date: '2025-08-08', time: '10:00', type: 'test' },
  { id: 'tce2', title: 'Thermodynamics Live Class', date: '2025-08-02', time: '09:15', type: 'class' },
  { id: 'tce3', title: 'Assignment: Projectile Motion Due', date: '2025-08-05', type: 'assignment' },
  { id: 'tce4', title: 'Waves — Live Class', date: '2025-08-04', time: '10:00', type: 'class' },
  { id: 'tce5', title: 'Thermodynamics Quiz', date: '2025-08-12', time: '09:00', type: 'test' },
  { id: 'tce6', title: 'Parent-Teacher Meeting', date: '2025-08-10', time: '10:00', type: 'meeting' },
  { id: 'tce7', title: 'Assignment: Python Calculator Due', date: '2025-08-10', type: 'assignment' },
  { id: 'tce8', title: 'Waves & Optics Mock Test', date: '2025-08-15', time: '09:00', type: 'test' },
  { id: 'tce9', title: 'Electromagnetism Live Class', date: '2025-08-06', time: '14:00', type: 'class' },
];

export const teacherActivities: TeacherActivity[] = [
  { id: 'ta1', action: 'Uploaded', target: 'Video: Newton\'s Laws — Part 3', timestamp: '2025-08-02T11:00:00', icon: 'Video' },
  { id: 'ta2', action: 'Created', target: 'Assignment: Projectile Motion Problems', timestamp: '2025-08-01T15:00:00', icon: 'Pencil' },
  { id: 'ta3', action: 'Published', target: 'Results: Mid-Term Examination', timestamp: '2025-07-31T18:00:00', icon: 'Award' },
  { id: 'ta4', action: 'Conducted', target: 'Live Class: Mechanics Revision', timestamp: '2025-07-30T15:00:00', icon: 'Radio' },
  { id: 'ta5', action: 'Uploaded', target: 'Notes: Thermodynamics Formula Sheet', timestamp: '2025-07-29T12:00:00', icon: 'FileText' },
];

export const recentUploads: RecentUpload[] = [
  { id: 'ru1', title: 'Newton\'s Laws of Motion — Part 3', type: 'video', course: 'Mechanics & Kinematics', uploadedAt: '2025-08-02T11:00:00', size: '245 MB' },
  { id: 'ru2', title: 'Thermodynamics Formula Sheet', type: 'notes', course: 'Thermodynamics', uploadedAt: '2025-07-29T12:00:00', size: '1.2 MB' },
  { id: 'ru3', title: 'Wave Optics — Interference Patterns', type: 'video', course: 'Waves & Optics', uploadedAt: '2025-07-28T10:00:00', size: '198 MB' },
  { id: 'ru4', title: 'Electromagnetism — Key Concepts', type: 'notes', course: 'Electromagnetism', uploadedAt: '2025-07-27T14:00:00', size: '2.1 MB' },
];

export const weeklyTeaching: WeeklyTeaching[] = [
  { day: 'Mon', hours: 5, classes: 3 },
  { day: 'Tue', hours: 4, classes: 2 },
  { day: 'Wed', hours: 6, classes: 4 },
  { day: 'Thu', hours: 4, classes: 2 },
  { day: 'Fri', hours: 5, classes: 3 },
  { day: 'Sat', hours: 3, classes: 2 },
];

export const studentPerformanceData: StudentPerformanceData[] = [
  { month: 'Feb', avgScore: 78, attendance: 90 },
  { month: 'Mar', avgScore: 82, attendance: 88 },
  { month: 'Apr', avgScore: 85, attendance: 92 },
  { month: 'May', avgScore: 83, attendance: 89 },
  { month: 'Jun', avgScore: 86, attendance: 91 },
  { month: 'Jul', avgScore: 88, attendance: 93 },
];

export const courseCompletionData: CourseCompletionData[] = [
  { subject: 'Mechanics', completion: 75 },
  { subject: 'Thermo', completion: 50 },
  { subject: 'Waves', completion: 90 },
  { subject: 'EM', completion: 30 },
];

export const assignmentCompletionData: AssignmentCompletionData[] = [
  { week: 'W1', submitted: 38, pending: 4 },
  { week: 'W2', submitted: 40, pending: 2 },
  { week: 'W3', submitted: 35, pending: 7 },
  { week: 'W4', submitted: 42, pending: 0 },
];

export const testPerformanceData: TestPerformanceData[] = [
  { test: 'Unit Test 1', avgScore: 75, highestScore: 96 },
  { test: 'Quiz 1', avgScore: 82, highestScore: 100 },
  { test: 'Mid-Term', avgScore: 78, highestScore: 94 },
  { test: 'Practice 1', avgScore: 80, highestScore: 98 },
];

export const topStudents: TopStudent[] = [
  { id: 'ts1', name: 'Diya Patel', avatar: 'https://i.pravatar.cc/150?img=13', score: 92, rank: 1, trend: 'stable' },
  { id: 'ts2', name: 'Saanvi Joshi', avatar: 'https://i.pravatar.cc/150?img=19', score: 90, rank: 2, trend: 'up' },
  { id: 'ts3', name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?img=12', score: 88, rank: 3, trend: 'up' },
  { id: 'ts4', name: 'Myra Iyer', avatar: 'https://i.pravatar.cc/150?img=21', score: 86, rank: 4, trend: 'down' },
  { id: 'ts5', name: 'Arjun Nair', avatar: 'https://i.pravatar.cc/150?img=16', score: 85, rank: 5, trend: 'stable' },
];

export const attentionStudents: AttentionStudent[] = [
  { id: 'as1', name: 'Kabir Singh', avatar: 'https://i.pravatar.cc/150?img=18', issue: 'Low attendance & test scores', score: 58, attendance: 68 },
  { id: 'as2', name: 'Ananya Reddy', avatar: 'https://i.pravatar.cc/150?img=15', issue: 'Missing assignments', score: 65, attendance: 72 },
  { id: 'as3', name: 'Reyansh Das', avatar: 'https://i.pravatar.cc/150?img=20', issue: 'Inconsistent performance', score: 72, attendance: 80 },
];

export const attendanceHistoryData = [
  { date: '2025-08-01', present: 40, absent: 1, late: 1 },
  { date: '2025-07-31', present: 38, absent: 2, late: 2 },
  { date: '2025-07-30', present: 41, absent: 1, late: 0 },
  { date: '2025-07-29', present: 39, absent: 3, late: 0 },
];
