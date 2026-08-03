/**
 * SHEMIXS Admin Panel — Dummy Data
 * Placeholder data for all admin panel modules. No backend connection.
 */
import type {
  AdminProfile,
  AdminStudent,
  AdminTeacher,
  AdminParent,
  AdmissionApplication,
  AdminCourse,
  AdminBatch,
  AdminClass,
  AdminSection,
  FeeStructure,
  FeeRecord,
  PaymentRecord,
  AdminAssignment,
  AdminHomework,
  AdminExam,
  AdminTest,
  AdminResult,
  AdminCertificate,
  TimetableEntry,
  AdminNotice,
  AdminNotification,
  AdminEvent,
  AdminCalendarEvent,
  CMSPage,
  HeroSlide,
  BlogPost,
  GalleryAlbum,
  MediaItem,
  Testimonial,
  FAQItem,
  AdminRole,
  AuditLog,
  RecentPayment,
  AdminActivity,
  LoginActivity,
  SystemHealth,
} from './admin-types';

export const adminProfile: AdminProfile = {
  id: 'adm-001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@shemixs.edu',
  phone: '+91 98765 00001',
  avatar: 'https://i.pravatar.cc/150?img=68',
  role: 'Super Admin',
  lastLogin: '2025-08-02T08:00:00',
};

export const adminStudents: AdminStudent[] = [
  { id: 's1', name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?img=12', rollNumber: 'SHE-2024-0142', grade: 'Grade 11', section: 'A', batch: 'PCM-A', guardian: 'Rohit Sharma', attendance: 91, feeStatus: 'paid', academicScore: 88, status: 'active', enrolledAt: '2024-06-15' },
  { id: 's2', name: 'Diya Patel', avatar: 'https://i.pravatar.cc/150?img=13', rollNumber: 'SHE-2024-0143', grade: 'Grade 11', section: 'A', batch: 'PCM-A', guardian: 'Meera Patel', attendance: 95, feeStatus: 'paid', academicScore: 92, status: 'active', enrolledAt: '2024-06-15' },
  { id: 's3', name: 'Vivaan Gupta', avatar: 'https://i.pravatar.cc/150?img=14', rollNumber: 'SHE-2024-0144', grade: 'Grade 11', section: 'A', batch: 'PCM-A', guardian: 'Suresh Gupta', attendance: 88, feeStatus: 'pending', academicScore: 78, status: 'active', enrolledAt: '2024-06-16' },
  { id: 's4', name: 'Ananya Reddy', avatar: 'https://i.pravatar.cc/150?img=15', rollNumber: 'SHE-2024-0145', grade: 'Grade 11', section: 'A', batch: 'PCM-A', guardian: 'Lakshmi Reddy', attendance: 72, feeStatus: 'overdue', academicScore: 65, status: 'active', enrolledAt: '2024-06-16' },
  { id: 's5', name: 'Arjun Nair', avatar: 'https://i.pravatar.cc/150?img=16', rollNumber: 'SHE-2024-0146', grade: 'Grade 12', section: 'B', batch: 'PCM-B', guardian: 'Devika Nair', attendance: 90, feeStatus: 'paid', academicScore: 85, status: 'active', enrolledAt: '2023-06-15' },
  { id: 's6', name: 'Ishita Kumar', avatar: 'https://i.pravatar.cc/150?img=17', rollNumber: 'SHE-2024-0147', grade: 'Grade 12', section: 'B', batch: 'PCM-B', guardian: 'Amit Kumar', attendance: 85, feeStatus: 'paid', academicScore: 80, status: 'active', enrolledAt: '2023-06-15' },
  { id: 's7', name: 'Kabir Singh', avatar: 'https://i.pravatar.cc/150?img=18', rollNumber: 'SHE-2024-0148', grade: 'Grade 12', section: 'B', batch: 'PCM-B', guardian: 'Gurpreet Singh', attendance: 68, feeStatus: 'overdue', academicScore: 58, status: 'suspended', enrolledAt: '2023-06-16' },
  { id: 's8', name: 'Saanvi Joshi', avatar: 'https://i.pravatar.cc/150?img=19', rollNumber: 'SHE-2024-0149', grade: 'Grade 12', section: 'B', batch: 'PCM-B', guardian: 'Kavita Joshi', attendance: 93, feeStatus: 'paid', academicScore: 90, status: 'active', enrolledAt: '2023-06-15' },
  { id: 's9', name: 'Reyansh Das', avatar: 'https://i.pravatar.cc/150?img=20', rollNumber: 'SHE-2024-0150', grade: 'Grade 11', section: 'A', batch: 'PCM-A', guardian: 'Priya Das', attendance: 80, feeStatus: 'pending', academicScore: 72, status: 'active', enrolledAt: '2024-06-17' },
  { id: 's10', name: 'Myra Iyer', avatar: 'https://i.pravatar.cc/150?img=21', rollNumber: 'SHE-2024-0151', grade: 'Grade 12', section: 'B', batch: 'PCM-B', guardian: 'Sridhar Iyer', attendance: 87, feeStatus: 'paid', academicScore: 81, status: 'active', enrolledAt: '2023-06-15' },
];

export const adminTeachers: AdminTeacher[] = [
  { id: 't1', name: 'Dr. Priya Menon', avatar: 'https://i.pravatar.cc/150?img=45', email: 'priya.menon@shemixs.edu', department: 'Science — Physics', subjects: ['Physics', 'Applied Mathematics'], assignedClasses: 4, assignedCourses: 5, attendance: 96, performance: 4.8, salary: 85000, status: 'active', joinedAt: '2023-06-01' },
  { id: 't2', name: 'Prof. Vikram Rao', avatar: 'https://i.pravatar.cc/150?img=46', email: 'vikram.rao@shemixs.edu', department: 'Science — Chemistry', subjects: ['Chemistry'], assignedClasses: 3, assignedCourses: 4, attendance: 94, performance: 4.6, salary: 78000, status: 'active', joinedAt: '2023-07-01' },
  { id: 't3', name: 'Dr. Anjali Verma', avatar: 'https://i.pravatar.cc/150?img=47', email: 'anjali.verma@shemixs.edu', department: 'Mathematics', subjects: ['Mathematics', 'Statistics'], assignedClasses: 5, assignedCourses: 6, attendance: 98, performance: 4.9, salary: 90000, status: 'active', joinedAt: '2022-06-01' },
  { id: 't4', name: 'Prof. Karthik Iyer', avatar: 'https://i.pravatar.cc/150?img=48', email: 'karthik.iyer@shemixs.edu', department: 'Biology', subjects: ['Biology', 'Biotechnology'], assignedClasses: 3, assignedCourses: 3, attendance: 91, performance: 4.5, salary: 72000, status: 'on_leave', joinedAt: '2023-08-01' },
  { id: 't5', name: 'Ms. Sneha Kapoor', avatar: 'https://i.pravatar.cc/150?img=49', email: 'sneha.kapoor@shemixs.edu', department: 'English', subjects: ['English Literature'], assignedClasses: 4, assignedCourses: 2, attendance: 95, performance: 4.7, salary: 68000, status: 'active', joinedAt: '2024-01-01' },
];

export const adminParents: AdminParent[] = [
  { id: 'p1', name: 'Rohit Sharma', avatar: 'https://i.pravatar.cc/150?img=51', email: 'rohit.s@email.com', phone: '+91 98765 11111', relation: 'Father', linkedStudents: [{ name: 'Aarav Sharma', rollNumber: 'SHE-2024-0142' }], feeSummary: { total: 120000, paid: 120000, pending: 0 }, status: 'active' },
  { id: 'p2', name: 'Meera Patel', avatar: 'https://i.pravatar.cc/150?img=52', email: 'meera.p@email.com', phone: '+91 98765 22222', relation: 'Mother', linkedStudents: [{ name: 'Diya Patel', rollNumber: 'SHE-2024-0143' }], feeSummary: { total: 120000, paid: 120000, pending: 0 }, status: 'active' },
  { id: 'p3', name: 'Suresh Gupta', avatar: 'https://i.pravatar.cc/150?img=53', email: 'suresh.g@email.com', phone: '+91 98765 33333', relation: 'Father', linkedStudents: [{ name: 'Vivaan Gupta', rollNumber: 'SHE-2024-0144' }], feeSummary: { total: 120000, paid: 60000, pending: 60000 }, status: 'active' },
  { id: 'p4', name: 'Lakshmi Reddy', avatar: 'https://i.pravatar.cc/150?img=54', email: 'lakshmi.r@email.com', phone: '+91 98765 44444', relation: 'Mother', linkedStudents: [{ name: 'Ananya Reddy', rollNumber: 'SHE-2024-0145' }], feeSummary: { total: 120000, paid: 30000, pending: 90000 }, status: 'active' },
  { id: 'p5', name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/150?img=55', email: 'amit.k@email.com', phone: '+91 98765 55555', relation: 'Father', linkedStudents: [{ name: 'Ishita Kumar', rollNumber: 'SHE-2024-0147' }, { name: 'Vivaan Gupta', rollNumber: 'SHE-2024-0144' }], feeSummary: { total: 240000, paid: 240000, pending: 0 }, status: 'active' },
];

export const admissionApplications: AdmissionApplication[] = [
  { id: 'app1', studentName: 'Tara Krishnan', avatar: 'https://i.pravatar.cc/150?img=22', appliedGrade: 'Grade 11', parentName: 'Krishnan R', parentEmail: 'krishnan@email.com', parentPhone: '+91 99000 11111', submittedAt: '2025-07-28', status: 'pending', documents: ['Birth Certificate', 'Previous Report Card', 'Transfer Certificate'] },
  { id: 'app2', studentName: 'Aditya Joshi', avatar: 'https://i.pravatar.cc/150?img=23', appliedGrade: 'Grade 9', parentName: 'Manoj Joshi', parentEmail: 'manoj@email.com', parentPhone: '+91 99000 22222', submittedAt: '2025-07-25', status: 'verification', documents: ['Birth Certificate', 'Aadhaar Card', 'Previous Report Card'] },
  { id: 'app3', studentName: 'Zara Ahmed', avatar: 'https://i.pravatar.cc/150?img=24', appliedGrade: 'Grade 10', parentName: 'Faisal Ahmed', parentEmail: 'faisal@email.com', parentPhone: '+91 99000 33333', submittedAt: '2025-07-20', status: 'approved', documents: ['Birth Certificate', 'Previous Report Card', 'Transfer Certificate', 'Medical Record'] },
  { id: 'app4', studentName: 'Vihaan Mehta', avatar: 'https://i.pravatar.cc/150?img=25', appliedGrade: 'Grade 11', parentName: 'Rahul Mehta', parentEmail: 'rahul@email.com', parentPhone: '+91 99000 44444', submittedAt: '2025-07-18', status: 'approved', documents: ['Birth Certificate', 'Previous Report Card'] },
  { id: 'app5', studentName: 'Kiara Bhatia', avatar: 'https://i.pravatar.cc/150?img=26', appliedGrade: 'Grade 8', parentName: 'Sanjay Bhatia', parentEmail: 'sanjay@email.com', parentPhone: '+91 99000 55555', submittedAt: '2025-07-15', status: 'rejected', documents: ['Birth Certificate'] },
  { id: 'app6', studentName: 'Aryan Khanna', avatar: 'https://i.pravatar.cc/150?img=27', appliedGrade: 'Grade 12', parentName: 'Deepak Khanna', parentEmail: 'deepak@email.com', parentPhone: '+91 99000 66666', submittedAt: '2025-07-30', status: 'pending', documents: ['Birth Certificate', 'Previous Report Card', 'Transfer Certificate', 'Character Certificate'] },
];

export const adminCourses: AdminCourse[] = [
  { id: 'c1', title: 'Mechanics & Kinematics', category: 'Physics', instructor: 'Dr. Priya Menon', students: 42, chapters: 12, lessons: 48, price: 0, status: 'published', createdAt: '2024-06-01' },
  { id: 'c2', title: 'Thermodynamics', category: 'Physics', instructor: 'Dr. Priya Menon', students: 42, chapters: 8, lessons: 32, price: 0, status: 'published', createdAt: '2024-06-15' },
  { id: 'c3', title: 'Waves & Optics', category: 'Physics', instructor: 'Dr. Priya Menon', students: 38, chapters: 10, lessons: 40, price: 0, status: 'published', createdAt: '2023-06-01' },
  { id: 'c4', title: 'Organic Chemistry Basics', category: 'Chemistry', instructor: 'Prof. Vikram Rao', students: 35, chapters: 6, lessons: 24, price: 0, status: 'published', createdAt: '2024-07-01' },
  { id: 'c5', title: 'Calculus Mastery', category: 'Mathematics', instructor: 'Dr. Anjali Verma', students: 50, chapters: 14, lessons: 56, price: 0, status: 'published', createdAt: '2023-06-01' },
  { id: 'c6', title: 'Modern Physics', category: 'Physics', instructor: 'Dr. Priya Menon', students: 0, chapters: 6, lessons: 0, price: 0, status: 'draft', createdAt: '2025-07-15' },
];

export const adminBatches: AdminBatch[] = [
  { id: 'b1', name: 'PCM-A (2024-25)', course: 'Physics — Grade 11', students: 42, capacity: 50, teachers: 2, startDate: '2024-06-15', endDate: '2025-03-31', status: 'active' },
  { id: 'b2', name: 'PCM-B (2023-24)', course: 'Physics — Grade 12', students: 38, capacity: 50, teachers: 2, startDate: '2023-06-15', endDate: '2024-03-31', status: 'completed' },
  { id: 'b3', name: 'Chem-A (2024-25)', course: 'Chemistry — Grade 11', students: 35, capacity: 45, teachers: 1, startDate: '2024-06-15', endDate: '2025-03-31', status: 'active' },
  { id: 'b4', name: 'Math-A (2024-25)', course: 'Mathematics — Grade 11', students: 50, capacity: 50, teachers: 1, startDate: '2024-06-15', endDate: '2025-03-31', status: 'active' },
  { id: 'b5', name: 'PCM-C (2025-26)', course: 'Physics — Grade 11', students: 0, capacity: 50, teachers: 0, startDate: '2025-06-15', endDate: '2026-03-31', status: 'upcoming' },
];

export const adminClasses: AdminClass[] = [
  { id: 'cl1', name: 'Class 11-A', grade: 'Grade 11', section: 'A', students: 42, capacity: 50, classTeacher: 'Dr. Priya Menon', room: '204', status: 'active' },
  { id: 'cl2', name: 'Class 12-B', grade: 'Grade 12', section: 'B', students: 38, capacity: 50, classTeacher: 'Dr. Priya Menon', room: '205', status: 'active' },
  { id: 'cl3', name: 'Class 11-C', grade: 'Grade 11', section: 'C', students: 35, capacity: 45, classTeacher: 'Prof. Vikram Rao', room: '108', status: 'active' },
  { id: 'cl4', name: 'Class 10-A', grade: 'Grade 10', section: 'A', students: 40, capacity: 45, classTeacher: 'Ms. Sneha Kapoor', room: '102', status: 'active' },
  { id: 'cl5', name: 'Class 9-B', grade: 'Grade 9', section: 'B', students: 0, capacity: 40, classTeacher: 'Unassigned', room: '103', status: 'inactive' },
];

export const adminSections: AdminSection[] = [
  { id: 'sec1', name: 'Section A', class: 'Class 11-A', students: 42, capacity: 50, teacher: 'Dr. Priya Menon', status: 'active' },
  { id: 'sec2', name: 'Section B', class: 'Class 12-B', students: 38, capacity: 50, teacher: 'Dr. Priya Menon', status: 'active' },
  { id: 'sec3', name: 'Section C', class: 'Class 11-C', students: 35, capacity: 45, teacher: 'Prof. Vikram Rao', status: 'active' },
  { id: 'sec4', name: 'Section A', class: 'Class 10-A', students: 40, capacity: 45, teacher: 'Ms. Sneha Kapoor', status: 'active' },
];

export const feeStructures: FeeStructure[] = [
  { id: 'fs1', category: 'Tuition Fee', grade: 'Grade 11-12', amount: 80000, frequency: 'annually', dueDate: '2024-07-31', status: 'active' },
  { id: 'fs2', category: 'Lab Fee', grade: 'Grade 11-12', amount: 15000, frequency: 'annually', dueDate: '2024-07-31', status: 'active' },
  { id: 'fs3', category: 'Library Fee', grade: 'All', amount: 5000, frequency: 'annually', dueDate: '2024-07-31', status: 'active' },
  { id: 'fs4', category: 'Examination Fee', grade: 'All', amount: 10000, frequency: 'quarterly', dueDate: '2024-09-30', status: 'active' },
  { id: 'fs5', category: 'Transport Fee', grade: 'Optional', amount: 12000, frequency: 'quarterly', dueDate: '2024-07-31', status: 'active' },
  { id: 'fs6', category: 'Tuition Fee', grade: 'Grade 9-10', amount: 60000, frequency: 'annually', dueDate: '2024-07-31', status: 'active' },
];

export const feeRecords: FeeRecord[] = [
  { id: 'fr1', studentName: 'Aarav Sharma', rollNumber: 'SHE-2024-0142', category: 'Tuition Fee', amount: 80000, dueDate: '2024-07-31', status: 'paid', paidDate: '2024-07-15', invoiceId: 'INV-2024-001' },
  { id: 'fr2', studentName: 'Diya Patel', rollNumber: 'SHE-2024-0143', category: 'Tuition Fee', amount: 80000, dueDate: '2024-07-31', status: 'paid', paidDate: '2024-07-10', invoiceId: 'INV-2024-002' },
  { id: 'fr3', studentName: 'Vivaan Gupta', rollNumber: 'SHE-2024-0144', category: 'Tuition Fee', amount: 80000, dueDate: '2024-07-31', status: 'pending', invoiceId: 'INV-2024-003' },
  { id: 'fr4', studentName: 'Ananya Reddy', rollNumber: 'SHE-2024-0145', category: 'Tuition Fee', amount: 80000, dueDate: '2024-07-31', status: 'overdue', invoiceId: 'INV-2024-004' },
  { id: 'fr5', studentName: 'Arjun Nair', rollNumber: 'SHE-2024-0146', category: 'Tuition Fee', amount: 80000, dueDate: '2024-07-31', status: 'paid', paidDate: '2024-07-20', invoiceId: 'INV-2024-005' },
  { id: 'fr6', studentName: 'Kabir Singh', rollNumber: 'SHE-2024-0148', category: 'Lab Fee', amount: 15000, dueDate: '2024-07-31', status: 'overdue', invoiceId: 'INV-2024-008' },
];

export const paymentRecords: PaymentRecord[] = [
  { id: 'pay1', invoiceId: 'INV-2024-001', studentName: 'Aarav Sharma', rollNumber: 'SHE-2024-0142', amount: 80000, method: 'bank_transfer', status: 'success', date: '2024-07-15', transactionId: 'TXN-001' },
  { id: 'pay2', invoiceId: 'INV-2024-002', studentName: 'Diya Patel', rollNumber: 'SHE-2024-0143', amount: 80000, method: 'upi', status: 'success', date: '2024-07-10', transactionId: 'TXN-002' },
  { id: 'pay3', invoiceId: 'INV-2024-003', studentName: 'Vivaan Gupta', rollNumber: 'SHE-2024-0144', amount: 40000, method: 'card', status: 'pending', date: '2024-08-01', transactionId: 'TXN-003' },
  { id: 'pay4', invoiceId: 'INV-2024-005', studentName: 'Arjun Nair', rollNumber: 'SHE-2024-0146', amount: 80000, method: 'cheque', status: 'success', date: '2024-07-20', transactionId: 'TXN-005' },
  { id: 'pay5', invoiceId: 'INV-2024-006', studentName: 'Ishita Kumar', rollNumber: 'SHE-2024-0147', amount: 80000, method: 'bank_transfer', status: 'success', date: '2024-07-12', transactionId: 'TXN-006' },
  { id: 'pay6', invoiceId: 'INV-2024-007', studentName: 'Saanvi Joshi', rollNumber: 'SHE-2024-0149', amount: 95000, method: 'upi', status: 'success', date: '2024-07-08', transactionId: 'TXN-007' },
];

export const adminAssignments: AdminAssignment[] = [
  { id: 'a1', title: 'Solve 15 Problems on Projectile Motion', course: 'Mechanics & Kinematics', teacher: 'Dr. Priya Menon', batch: 'PCM-A', dueDate: '2025-08-05', totalMarks: 50, submitted: 35, total: 42, status: 'active' },
  { id: 'a2', title: 'Lab Report: Acid-Base Titration', course: 'Thermodynamics', teacher: 'Dr. Priya Menon', batch: 'PCM-A', dueDate: '2025-08-07', totalMarks: 30, submitted: 28, total: 42, status: 'active' },
  { id: 'a3', title: 'Build a Simple Calculator in Python', course: 'Applied Mathematics', teacher: 'Dr. Priya Menon', batch: 'PCM-A', dueDate: '2025-08-10', totalMarks: 40, submitted: 20, total: 42, status: 'active' },
  { id: 'a4', title: 'Wave Optics — Numerical Set', course: 'Waves & Optics', teacher: 'Dr. Priya Menon', batch: 'PCM-B', dueDate: '2025-07-28', totalMarks: 40, submitted: 38, total: 38, status: 'graded' },
];

export const adminHomework: AdminHomework[] = [
  { id: 'h1', title: 'Read Chapter 4 and solve exercise 4.1', subject: 'Physics', class: 'Class 11-A', teacher: 'Dr. Priya Menon', dueDate: '2025-08-04', submissionRate: 85, status: 'active' },
  { id: 'h2', title: 'Write an essay on Climate Change', subject: 'English', class: 'Class 10-A', teacher: 'Ms. Sneha Kapoor', dueDate: '2025-08-06', submissionRate: 72, status: 'active' },
  { id: 'h3', title: 'Solve integration problems 1-20', subject: 'Mathematics', class: 'Class 12-B', teacher: 'Dr. Anjali Verma', dueDate: '2025-08-03', submissionRate: 90, status: 'active' },
  { id: 'h4', title: 'Lab manual: Experiment 3', subject: 'Chemistry', class: 'Class 11-C', teacher: 'Prof. Vikram Rao', dueDate: '2025-07-30', submissionRate: 100, status: 'completed' },
];

export const adminExams: AdminExam[] = [
  { id: 'e1', title: 'Mid-Term Examination', type: 'mid_term', grade: 'Grade 11', section: 'A', date: '2025-08-15', duration: 180, totalMarks: 100, room: 'Hall 1', invigilator: 'Dr. Priya Menon', status: 'scheduled' },
  { id: 'e2', title: 'Unit Test 1 — Physics', type: 'unit_test', grade: 'Grade 12', section: 'B', date: '2025-08-08', duration: 90, totalMarks: 50, room: '205', invigilator: 'Dr. Priya Menon', status: 'scheduled' },
  { id: 'e3', title: 'Quiz — Organic Chemistry', type: 'quiz', grade: 'Grade 11', section: 'C', date: '2025-08-05', duration: 30, totalMarks: 20, room: '108', invigilator: 'Prof. Vikram Rao', status: 'scheduled' },
  { id: 'e4', title: 'Final Examination', type: 'final', grade: 'Grade 12', section: 'B', date: '2025-03-01', duration: 180, totalMarks: 100, room: 'Hall 1', invigilator: 'Dr. Anjali Verma', status: 'completed' },
  { id: 'e5', title: 'Mock Test — Full Syllabus', type: 'mock', grade: 'Grade 12', section: 'B', date: '2025-08-20', duration: 180, totalMarks: 200, room: 'Hall 2', invigilator: 'Dr. Priya Menon', status: 'scheduled' },
];

export const adminTests: AdminTest[] = [
  { id: 'at1', title: 'Mechanics Unit Test', subject: 'Physics', type: 'MCQ', duration: 90, totalMarks: 100, questions: 40, date: '2025-08-08', status: 'upcoming', submissions: 0, totalStudents: 42 },
  { id: 'at2', title: 'Thermodynamics Quiz', subject: 'Physics', type: 'MCQ', duration: 30, totalMarks: 40, questions: 20, date: '2025-08-12', status: 'upcoming', submissions: 0, totalStudents: 42 },
  { id: 'at3', title: 'Calculus Practice Test', subject: 'Mathematics', type: 'Practice', duration: 60, totalMarks: 50, questions: 25, date: '2025-07-28', status: 'active', submissions: 30, totalStudents: 50 },
  { id: 'at4', title: 'Mid-Term Examination', subject: 'Physics', type: 'Offline', duration: 180, totalMarks: 100, questions: 10, date: '2025-07-25', status: 'completed', submissions: 42, totalStudents: 42 },
  { id: 'at5', title: 'Differential Equations Test', subject: 'Mathematics', type: 'Online', duration: 90, totalMarks: 80, questions: 8, date: '', status: 'draft', submissions: 0, totalStudents: 42 },
];

export const adminResults: AdminResult[] = [
  { id: 'r1', examTitle: 'Mid-Term Examination', grade: 'Grade 12', section: 'B', studentName: 'Diya Patel', rollNumber: 'SHE-2024-0143', marks: 92, totalMarks: 100, grade_letter: 'A', rank: 1, published: true },
  { id: 'r2', examTitle: 'Mid-Term Examination', grade: 'Grade 12', section: 'B', studentName: 'Saanvi Joshi', rollNumber: 'SHE-2024-0149', marks: 90, totalMarks: 100, grade_letter: 'A', rank: 2, published: true },
  { id: 'r3', examTitle: 'Mid-Term Examination', grade: 'Grade 12', section: 'B', studentName: 'Aarav Sharma', rollNumber: 'SHE-2024-0142', marks: 88, totalMarks: 100, grade_letter: 'A', rank: 3, published: true },
  { id: 'r4', examTitle: 'Mid-Term Examination', grade: 'Grade 12', section: 'B', studentName: 'Myra Iyer', rollNumber: 'SHE-2024-0151', marks: 85, totalMarks: 100, grade_letter: 'B+', rank: 4, published: false },
  { id: 'r5', examTitle: 'Mid-Term Examination', grade: 'Grade 12', section: 'B', studentName: 'Arjun Nair', rollNumber: 'SHE-2024-0146', marks: 82, totalMarks: 100, grade_letter: 'B+', rank: 5, published: false },
  { id: 'r6', examTitle: 'Mid-Term Examination', grade: 'Grade 12', section: 'B', studentName: 'Kabir Singh', rollNumber: 'SHE-2024-0148', marks: 58, totalMarks: 100, grade_letter: 'F', rank: 8, published: false },
];

export const adminCertificates: AdminCertificate[] = [
  { id: 'cert1', studentName: 'Diya Patel', rollNumber: 'SHE-2024-0143', certificateType: 'Academic Excellence', issueDate: '2025-07-15', template: 'Gold Template', status: 'issued', verificationCode: 'SHE-CERT-001' },
  { id: 'cert2', studentName: 'Aarav Sharma', rollNumber: 'SHE-2024-0142', certificateType: '100% Attendance', issueDate: '2025-07-15', template: 'Blue Template', status: 'issued', verificationCode: 'SHE-CERT-002' },
  { id: 'cert3', studentName: 'Saanvi Joshi', rollNumber: 'SHE-2024-0149', certificateType: 'Course Completion', issueDate: '', template: 'Standard Template', status: 'pending', verificationCode: '' },
  { id: 'cert4', studentName: 'Arjun Nair', rollNumber: 'SHE-2024-0146', certificateType: 'Sports Achievement', issueDate: '2025-06-20', template: 'Green Template', status: 'issued', verificationCode: 'SHE-CERT-003' },
];

export const timetableEntries: TimetableEntry[] = [
  { id: 'tt1', day: 'Monday', time: '08:00 - 09:00', subject: 'Physics', teacher: 'Dr. Priya Menon', class: 'Class 11-A', room: '204' },
  { id: 'tt2', day: 'Monday', time: '09:15 - 10:15', subject: 'Physics', teacher: 'Dr. Priya Menon', class: 'Class 12-B', room: '205' },
  { id: 'tt3', day: 'Monday', time: '11:30 - 12:30', subject: 'Mathematics', teacher: 'Dr. Anjali Verma', class: 'Class 11-A', room: '204' },
  { id: 'tt4', day: 'Tuesday', time: '08:00 - 09:00', subject: 'Chemistry', teacher: 'Prof. Vikram Rao', class: 'Class 11-C', room: '108' },
  { id: 'tt5', day: 'Tuesday', time: '09:15 - 10:15', subject: 'English', teacher: 'Ms. Sneha Kapoor', class: 'Class 10-A', room: '102' },
  { id: 'tt6', day: 'Wednesday', time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Dr. Anjali Verma', class: 'Class 12-B', room: '205' },
  { id: 'tt7', day: 'Wednesday', time: '09:15 - 10:15', subject: 'Physics', teacher: 'Dr. Priya Menon', class: 'Class 11-A', room: '204' },
  { id: 'tt8', day: 'Thursday', time: '08:00 - 09:00', subject: 'Biology', teacher: 'Prof. Karthik Iyer', class: 'Class 11-C', room: '108' },
  { id: 'tt9', day: 'Friday', time: '08:00 - 09:00', subject: 'Physics', teacher: 'Dr. Priya Menon', class: 'Class 12-B', room: '205' },
  { id: 'tt10', day: 'Friday', time: '14:00 - 15:30', subject: 'Lab: Physics', teacher: 'Dr. Priya Menon', class: 'Class 11-A', room: 'Lab 3' },
];

export const adminNotices: AdminNotice[] = [
  { id: 'n1', title: 'Mid-Term Examination Schedule Released', category: 'academic', content: 'The mid-term examination schedule for all grades has been published. Students can check their exam dates on the portal.', author: 'Rajesh Kumar', publishedAt: '2025-08-01', pinned: true, status: 'published', attachments: 1 },
  { id: 'n2', title: 'Parent-Teacher Meeting on August 10', category: 'event', content: 'PTM is scheduled for August 10 from 10:00 AM to 1:00 PM. All parents are requested to attend.', author: 'Rajesh Kumar', publishedAt: '2025-07-31', pinned: true, status: 'published', attachments: 0 },
  { id: 'n3', title: 'Independence Day Holiday', category: 'holiday', content: 'The institution will remain closed on August 15 in observance of Independence Day.', author: 'Admin Office', publishedAt: '2025-07-30', pinned: false, status: 'published', attachments: 0 },
  { id: 'n4', title: 'New Library Timings', category: 'general', content: 'The library will now remain open until 8:00 PM on weekdays.', author: 'Admin Office', publishedAt: '2025-07-28', pinned: false, status: 'published', attachments: 0 },
  { id: 'n5', title: 'Science Fair Registration Open', category: 'event', content: 'Registrations for the annual science fair are now open. Last date: August 20.', author: 'Rajesh Kumar', publishedAt: '', pinned: false, status: 'draft', attachments: 0 },
];

export const adminNotifications: AdminNotification[] = [
  { id: 'an1', title: 'Exam Schedule Published', message: 'Mid-term examination schedule has been published for all grades.', audience: 'all', channel: 'push', sentAt: '2025-08-01T10:00:00', status: 'sent', recipients: 450 },
  { id: 'an2', title: 'Fee Payment Reminder', message: 'This is a reminder for pending fee payments. Due date: August 15.', audience: 'parents', channel: 'email', sentAt: '2025-07-31T09:00:00', status: 'sent', recipients: 120 },
  { id: 'an3', title: 'Holiday Notice — Independence Day', message: 'Institution will remain closed on August 15.', audience: 'all', channel: 'sms', sentAt: '2025-07-30T12:00:00', status: 'sent', recipients: 450 },
  { id: 'an4', title: 'PTM Reminder', message: 'Parent-Teacher Meeting on August 10 at 10:00 AM.', audience: 'parents', channel: 'push', sentAt: '', status: 'scheduled', recipients: 120 },
  { id: 'an5', title: 'Science Fair Registration', message: 'Register now for the annual science fair. Last date: August 20.', audience: 'students', channel: 'push', sentAt: '', status: 'draft', recipients: 0 },
];

export const adminEvents: AdminEvent[] = [
  { id: 'ev1', title: 'Parent-Teacher Meeting', type: 'meeting', date: '2025-08-10', time: '10:00', location: 'Main Auditorium', description: 'Quarterly PTM for all grades.', status: 'upcoming' },
  { id: 'ev2', title: 'Mid-Term Examinations', type: 'exam', date: '2025-08-15', time: '09:00', location: 'Examination Halls', description: 'Mid-term exams for Grades 11-12.', status: 'upcoming' },
  { id: 'ev3', title: 'Independence Day', type: 'holiday', date: '2025-08-15', time: '', location: 'N/A', description: 'Institution closed.', status: 'upcoming' },
  { id: 'ev4', title: 'Science Fair 2025', type: 'workshop', date: '2025-08-22', time: '10:00', location: 'Science Block', description: 'Annual science exhibition and fair.', status: 'upcoming' },
  { id: 'ev5', title: 'Annual Day Celebration', type: 'cultural', date: '2025-09-05', time: '17:00', location: 'Main Auditorium', description: 'Annual cultural event and awards ceremony.', status: 'upcoming' },
  { id: 'ev6', title: 'Career Counseling Workshop', type: 'workshop', date: '2025-07-25', time: '14:00', location: 'Seminar Hall', description: 'Career guidance for Grade 12 students.', status: 'completed' },
];

export const adminCalendarEvents: AdminCalendarEvent[] = [
  { id: 'ace1', title: 'PTM', date: '2025-08-10', time: '10:00', type: 'meeting' },
  { id: 'ace2', title: 'Mid-Term Exams', date: '2025-08-15', time: '09:00', type: 'exam' },
  { id: 'ace3', title: 'Independence Day', date: '2025-08-15', type: 'holiday' },
  { id: 'ace4', title: 'Science Fair', date: '2025-08-22', time: '10:00', type: 'event' },
  { id: 'ace5', title: 'Annual Day', date: '2025-09-05', time: '17:00', type: 'event' },
  { id: 'ace6', title: 'Fee Due Date', date: '2025-08-15', type: 'deadline' },
  { id: 'ace7', title: 'Unit Test — Physics', date: '2025-08-08', time: '10:00', type: 'exam' },
  { id: 'ace8', title: 'Chemistry Quiz', date: '2025-08-05', time: '09:00', type: 'exam' },
];

export const cmsPages: CMSPage[] = [
  { id: 'p1', title: 'Homepage', slug: '/', status: 'published', lastModified: '2025-08-01', author: 'Rajesh Kumar', sections: 8 },
  { id: 'p2', title: 'About Us', slug: '/about', status: 'published', lastModified: '2025-07-20', author: 'Rajesh Kumar', sections: 4 },
  { id: 'p3', title: 'Courses', slug: '/courses', status: 'published', lastModified: '2025-07-15', author: 'Rajesh Kumar', sections: 6 },
  { id: 'p4', title: 'Contact', slug: '/contact', status: 'published', lastModified: '2025-07-10', author: 'Rajesh Kumar', sections: 3 },
  { id: 'p5', title: 'Admissions', slug: '/admissions', status: 'draft', lastModified: '2025-07-28', author: 'Rajesh Kumar', sections: 5 },
  { id: 'p6', title: 'Privacy Policy', slug: '/privacy', status: 'published', lastModified: '2025-06-01', author: 'Admin', sections: 2 },
];

export const heroSlides: HeroSlide[] = [
  { id: 'hs1', title: 'AI-Powered Education Operating System', subtitle: 'Unifying Student, Teacher, Parent, and Admin portals with intelligent modules.', buttonText: 'Explore Platform', buttonHref: '#platform', image: 'https://i.pravatar.cc/150?img=1', status: 'active', order: 1 },
  { id: 'hs2', title: 'Personalized Learning Paths', subtitle: 'AI-driven course recommendations and adaptive learning for every student.', buttonText: 'For Students', buttonHref: '#portals', image: 'https://i.pravatar.cc/150?img=2', status: 'active', order: 2 },
  { id: 'hs3', title: 'Real-time Insights for Educators', subtitle: 'Lesson planning, grading automation, and classroom analytics at your fingertips.', buttonText: 'For Teachers', buttonHref: '#portals', image: 'https://i.pravatar.cc/150?img=3', status: 'active', order: 3 },
  { id: 'hs4', title: 'Stay Connected, Stay Informed', subtitle: 'Real-time attendance, grades, and communication for parents.', buttonText: 'For Parents', buttonHref: '#portals', image: 'https://i.pravatar.cc/150?img=4', status: 'inactive', order: 4 },
];

export const blogPosts: BlogPost[] = [
  { id: 'bp1', title: 'How AI is Transforming Education in 2025', author: 'Rajesh Kumar', category: 'Technology', tags: ['AI', 'EdTech', 'Innovation'], status: 'published', publishedAt: '2025-08-01', views: 1240, seoTitle: 'AI in Education 2025', seoDescription: 'Explore how AI is reshaping the education landscape.' },
  { id: 'bp2', title: '10 Study Tips for Board Exam Success', author: 'Dr. Priya Menon', category: 'Academic', tags: ['Study Tips', 'Exams', 'Students'], status: 'published', publishedAt: '2025-07-25', views: 2150, seoTitle: 'Board Exam Study Tips', seoDescription: 'Proven study strategies for board exam success.' },
  { id: 'bp3', title: 'The Role of Parents in Student Achievement', author: 'Ms. Sneha Kapoor', category: 'Parenting', tags: ['Parents', 'Education', 'Support'], status: 'published', publishedAt: '2025-07-20', views: 890, seoTitle: 'Parent Role in Education', seoDescription: 'How parents can support student success.' },
  { id: 'bp4', title: 'Why STEM Education Matters More Than Ever', author: 'Dr. Anjali Verma', category: 'Academic', tags: ['STEM', 'Science', 'Future'], status: 'draft', publishedAt: '', views: 0, seoTitle: 'STEM Education Importance', seoDescription: 'The growing importance of STEM in the modern world.' },
  { id: 'bp5', title: 'Building a Growth Mindset in Students', author: 'Rajesh Kumar', category: 'Academic', tags: ['Mindset', 'Psychology', 'Students'], status: 'archived', publishedAt: '2025-06-15', views: 1560, seoTitle: 'Growth Mindset Guide', seoDescription: 'How to foster a growth mindset in students.' },
];

export const galleryAlbums: GalleryAlbum[] = [
  { id: 'ga1', title: 'Annual Day 2025', category: 'Cultural', imageCount: 45, videoCount: 3, coverImage: 'https://i.pravatar.cc/150?img=5', featured: true, createdAt: '2025-07-15' },
  { id: 'ga2', title: 'Science Fair 2025', category: 'Academic', imageCount: 32, videoCount: 1, coverImage: 'https://i.pravatar.cc/150?img=6', featured: true, createdAt: '2025-07-10' },
  { id: 'ga3', title: 'Sports Day', category: 'Sports', imageCount: 58, videoCount: 2, coverImage: 'https://i.pravatar.cc/150?img=7', featured: false, createdAt: '2025-06-20' },
  { id: 'ga4', title: 'Independence Day Celebration', category: 'Cultural', imageCount: 28, videoCount: 0, coverImage: 'https://i.pravatar.cc/150?img=8', featured: false, createdAt: '2025-08-15' },
];

export const mediaItems: MediaItem[] = [
  { id: 'mi1', name: 'annual-day-banner.jpg', type: 'image', size: '2.4 MB', folder: 'Events', uploadedAt: '2025-07-15', usage: 3 },
  { id: 'mi2', name: 'science-fair-poster.png', type: 'image', size: '1.8 MB', folder: 'Events', uploadedAt: '2025-07-10', usage: 2 },
  { id: 'mi3', name: 'campus-tour.mp4', type: 'video', size: '145 MB', folder: 'Videos', uploadedAt: '2025-06-01', usage: 1 },
  { id: 'mi4', name: 'prospectus-2025.pdf', type: 'document', size: '5.2 MB', folder: 'Documents', uploadedAt: '2025-05-15', usage: 5 },
  { id: 'mi5', name: 'logo-white.png', type: 'image', size: '120 KB', folder: 'Branding', uploadedAt: '2024-01-01', usage: 12 },
  { id: 'mi6', name: 'hero-bg-1.jpg', type: 'image', size: '3.1 MB', folder: 'Hero', uploadedAt: '2025-07-01', usage: 1 },
];

export const testimonials: Testimonial[] = [
  { id: 'tm1', name: 'Dr. Suresh Pillai', role: 'Principal, Greenfield Academy', avatar: 'https://i.pravatar.cc/150?img=60', content: 'Shemixs has transformed how we manage our institution. The unified portal system saves us hours every week.', rating: 5, status: 'published', createdAt: '2025-07-20' },
  { id: 'tm2', name: 'Meera Nair', role: 'Parent', avatar: 'https://i.pravatar.cc/150?img=61', content: 'I can track my son\'s progress in real-time. The parent portal is intuitive and keeps me informed.', rating: 5, status: 'published', createdAt: '2025-07-15' },
  { id: 'tm3', name: 'Arjun Krishnan', role: 'Student, Grade 12', avatar: 'https://i.pravatar.cc/150?img=62', content: 'The student portal makes learning fun. I love the AI-powered recommendations and progress tracking.', rating: 4, status: 'published', createdAt: '2025-07-10' },
  { id: 'tm4', name: 'Priya Saxena', role: 'Teacher', avatar: 'https://i.pravatar.cc/150?img=63', content: 'Grading automation and analytics have made my job so much easier. Highly recommended.', rating: 5, status: 'pending', createdAt: '2025-07-25' },
];

export const faqItems: FAQItem[] = [
  { id: 'faq1', question: 'What is Shemixs?', answer: 'Shemixs is an AI-powered Education Operating System that unifies Student, Teacher, Parent, and Admin portals with intelligent modules, payments, and a learning marketplace.', category: 'General', order: 1, status: 'published' },
  { id: 'faq2', question: 'How do I enroll my child?', answer: 'You can submit an admission application through the Admissions page on our portal. Our team will review and contact you within 3-5 business days.', category: 'Admissions', order: 2, status: 'published' },
  { id: 'faq3', question: 'What are the fee payment options?', answer: 'We accept bank transfers, UPI, credit/debit cards, and cheques. You can pay through the Parent Portal under Fee Status.', category: 'Fees', order: 3, status: 'published' },
  { id: 'faq4', question: 'How can teachers upload content?', answer: 'Teachers can upload videos and PDF notes through the Teacher Portal. Navigate to Upload Videos or Upload Notes from the sidebar.', category: 'Teachers', order: 4, status: 'published' },
  { id: 'faq5', question: 'Is there a mobile app?', answer: 'The Shemixs platform is fully responsive and works on all devices. A native mobile app is coming soon.', category: 'General', order: 5, status: 'draft' },
];

export const adminRoles: AdminRole[] = [
  { id: 'role1', name: 'Super Admin', description: 'Full access to all modules and settings', users: 2, permissions: ['*'], isSystem: true },
  { id: 'role2', name: 'Admin', description: 'Administrative access to most modules', users: 5, permissions: ['students', 'teachers', 'parents', 'courses', 'fees', 'reports', 'analytics'], isSystem: true },
  { id: 'role3', name: 'Principal', description: 'Oversight of academic and staff management', users: 1, permissions: ['students', 'teachers', 'attendance', 'results', 'reports', 'analytics'], isSystem: true },
  { id: 'role4', name: 'Coordinator', description: 'Manage batches, classes, and schedules', users: 3, permissions: ['batches', 'classes', 'sections', 'timetable', 'attendance'], isSystem: false },
  { id: 'role5', name: 'Teacher', description: 'Manage courses, assignments, and tests', users: 25, permissions: ['courses', 'assignments', 'tests', 'attendance'], isSystem: true },
  { id: 'role6', name: 'Accountant', description: 'Manage fees, payments, and invoices', users: 2, permissions: ['fees', 'payments', 'reports'], isSystem: false },
  { id: 'role7', name: 'Receptionist', description: 'Manage admissions and front desk', users: 2, permissions: ['admissions', 'students'], isSystem: false },
  { id: 'role8', name: 'Parent', description: 'View child progress and pay fees', users: 120, permissions: ['view_child'], isSystem: true },
  { id: 'role9', name: 'Student', description: 'Access courses, tests, and results', users: 450, permissions: ['view_courses', 'view_results'], isSystem: true },
];

export const auditLogs: AuditLog[] = [
  { id: 'log1', user: 'Rajesh Kumar', avatar: 'https://i.pravatar.cc/150?img=68', action: 'Published notice', module: 'Notice Board', target: 'Mid-Term Examination Schedule', timestamp: '2025-08-02T09:30:00', ip: '192.168.1.10', status: 'success' },
  { id: 'log2', user: 'Dr. Priya Menon', avatar: 'https://i.pravatar.cc/150?img=45', action: 'Created test', module: 'Tests', target: 'Mechanics Unit Test', timestamp: '2025-08-01T16:00:00', ip: '192.168.1.25', status: 'success' },
  { id: 'log3', user: 'Admin Office', avatar: 'https://i.pravatar.cc/150?img=70', action: 'Updated fee structure', module: 'Fees', target: 'Tuition Fee — Grade 11-12', timestamp: '2025-08-01T14:00:00', ip: '192.168.1.15', status: 'success' },
  { id: 'log4', user: 'Unknown', avatar: 'https://i.pravatar.cc/150?img=99', action: 'Login attempt', module: 'Auth', target: 'admin@shemixs.edu', timestamp: '2025-08-01T03:00:00', ip: '10.0.0.5', status: 'failed' },
  { id: 'log5', user: 'Rajesh Kumar', avatar: 'https://i.pravatar.cc/150?img=68', action: 'Approved admission', module: 'Admissions', target: 'Zara Ahmed', timestamp: '2025-07-31T11:00:00', ip: '192.168.1.10', status: 'success' },
  { id: 'log6', user: 'Accountant', avatar: 'https://i.pravatar.cc/150?img=71', action: 'Generated invoice', module: 'Payments', target: 'INV-2024-009', timestamp: '2025-07-31T15:30:00', ip: '192.168.1.30', status: 'success' },
  { id: 'log7', user: 'Dr. Anjali Verma', avatar: 'https://i.pravatar.cc/150?img=47', action: 'Published results', module: 'Results', target: 'Mid-Term — Grade 12', timestamp: '2025-07-31T18:00:00', ip: '192.168.1.35', status: 'warning' },
];

export const recentPayments: RecentPayment[] = [
  { id: 'rp1', studentName: 'Aarav Sharma', amount: 80000, method: 'Bank Transfer', date: '2025-08-01', status: 'success' },
  { id: 'rp2', studentName: 'Diya Patel', amount: 80000, method: 'UPI', date: '2025-07-31', status: 'success' },
  { id: 'rp3', studentName: 'Vivaan Gupta', amount: 40000, method: 'Card', date: '2025-08-01', status: 'pending' },
  { id: 'rp4', studentName: 'Arjun Nair', amount: 80000, method: 'Cheque', date: '2025-07-30', status: 'success' },
  { id: 'rp5', studentName: 'Saanvi Joshi', amount: 95000, method: 'UPI', date: '2025-07-29', status: 'success' },
];

export const adminActivities: AdminActivity[] = [
  { id: 'act1', user: 'Rajesh Kumar', avatar: 'https://i.pravatar.cc/150?img=68', action: 'Published', target: 'Mid-Term Exam Schedule', timestamp: '2025-08-02T09:30:00', icon: 'Megaphone' },
  { id: 'act2', user: 'Dr. Priya Menon', avatar: 'https://i.pravatar.cc/150?img=45', action: 'Created', target: 'Mechanics Unit Test', timestamp: '2025-08-01T16:00:00', icon: 'Timer' },
  { id: 'act3', user: 'Accountant', avatar: 'https://i.pravatar.cc/150?img=71', action: 'Generated', target: 'Invoice INV-2024-009', timestamp: '2025-07-31T15:30:00', icon: 'Receipt' },
  { id: 'act4', user: 'Rajesh Kumar', avatar: 'https://i.pravatar.cc/150?img=68', action: 'Approved', target: 'Admission — Zara Ahmed', timestamp: '2025-07-31T11:00:00', icon: 'UserCheck' },
  { id: 'act5', user: 'Dr. Anjali Verma', avatar: 'https://i.pravatar.cc/150?img=47', action: 'Published', target: 'Results — Grade 12 Mid-Term', timestamp: '2025-07-31T18:00:00', icon: 'Award' },
];

export const loginActivities: LoginActivity[] = [
  { id: 'la1', user: 'Rajesh Kumar', avatar: 'https://i.pravatar.cc/150?img=68', role: 'Super Admin', ip: '192.168.1.10', device: 'Chrome — macOS', loginTime: '2025-08-02T08:00:00', status: 'success' },
  { id: 'la2', user: 'Dr. Priya Menon', avatar: 'https://i.pravatar.cc/150?img=45', role: 'Teacher', ip: '192.168.1.25', device: 'Safari — iOS', loginTime: '2025-08-02T07:45:00', status: 'success' },
  { id: 'la3', user: 'Admin Office', avatar: 'https://i.pravatar.cc/150?img=70', role: 'Admin', ip: '192.168.1.15', device: 'Edge — Windows', loginTime: '2025-08-01T09:00:00', status: 'success' },
  { id: 'la4', user: 'Unknown', avatar: 'https://i.pravatar.cc/150?img=99', role: '—', ip: '10.0.0.5', device: 'Unknown', loginTime: '2025-08-01T03:00:00', status: 'failed' },
];

export const systemHealth: SystemHealth[] = [
  { service: 'Web Application', status: 'operational', uptime: '99.98%', latency: '45ms' },
  { service: 'Database', status: 'operational', uptime: '99.99%', latency: '12ms' },
  { service: 'File Storage', status: 'operational', uptime: '99.95%', latency: '28ms' },
  { service: 'Email Service', status: 'degraded', uptime: '99.50%', latency: '320ms' },
  { service: 'SMS Gateway', status: 'operational', uptime: '99.90%', latency: '180ms' },
  { service: 'Video Streaming', status: 'operational', uptime: '99.97%', latency: '85ms' },
];

export const dashboardStats = {
  totalStudents: 450,
  totalTeachers: 25,
  totalParents: 380,
  totalCourses: 48,
  totalBatches: 12,
  todayAttendance: 428,
  todayRevenue: 245000,
  pendingAdmissions: 8,
  pendingFees: 12,
  assignmentsPending: 15,
  upcomingExams: 5,
};

export const enrollmentTrendData = [
  { month: 'Jan', students: 380 },
  { month: 'Feb', students: 395 },
  { month: 'Mar', students: 410 },
  { month: 'Apr', students: 420 },
  { month: 'May', students: 425 },
  { month: 'Jun', students: 430 },
  { month: 'Jul', students: 445 },
  { month: 'Aug', students: 450 },
];

export const revenueData = [
  { month: 'Jan', revenue: 1800000 },
  { month: 'Feb', revenue: 1950000 },
  { month: 'Mar', revenue: 2100000 },
  { month: 'Apr', revenue: 2050000 },
  { month: 'May', revenue: 2200000 },
  { month: 'Jun', revenue: 2350000 },
  { month: 'Jul', revenue: 2480000 },
  { month: 'Aug', revenue: 2520000 },
];

export const attendanceTrendData = [
  { month: 'Feb', percentage: 91 },
  { month: 'Mar', percentage: 89 },
  { month: 'Apr', percentage: 93 },
  { month: 'May', percentage: 90 },
  { month: 'Jun', percentage: 92 },
  { month: 'Jul', percentage: 94 },
];

export const coursePopularityData = [
  { subject: 'Physics', students: 80 },
  { subject: 'Chemistry', students: 65 },
  { subject: 'Math', students: 90 },
  { subject: 'Biology', students: 55 },
  { subject: 'English', students: 70 },
];

export const studentGrowthData = [
  { month: 'Jan', newStudents: 12, total: 380 },
  { month: 'Feb', newStudents: 15, total: 395 },
  { month: 'Mar', newStudents: 15, total: 410 },
  { month: 'Apr', newStudents: 10, total: 420 },
  { month: 'May', newStudents: 5, total: 425 },
  { month: 'Jun', newStudents: 5, total: 430 },
  { month: 'Jul', newStudents: 15, total: 445 },
  { month: 'Aug', newStudents: 5, total: 450 },
];

export const gradeDistributionData = [
  { name: 'A+', value: 45 },
  { name: 'A', value: 120 },
  { name: 'B+', value: 150 },
  { name: 'B', value: 90 },
  { name: 'C', value: 35 },
  { name: 'F', value: 10 },
];

export const websiteVisitsData = [
  { day: 'Mon', visits: 1200 },
  { day: 'Tue', visits: 1450 },
  { day: 'Wed', visits: 1380 },
  { day: 'Thu', visits: 1600 },
  { day: 'Fri', visits: 1750 },
  { day: 'Sat', visits: 980 },
  { day: 'Sun', visits: 820 },
];

export const systemUsageData = [
  { name: 'Storage', value: 68 },
  { name: 'Database', value: 45 },
  { name: 'Bandwidth', value: 72 },
  { name: 'CPU', value: 38 },
];

export const activeUsersData = [
  { hour: '08:00', users: 45 },
  { hour: '10:00', users: 120 },
  { hour: '12:00', users: 180 },
  { hour: '14:00', users: 165 },
  { hour: '16:00', users: 140 },
  { hour: '18:00', users: 95 },
  { hour: '20:00', users: 50 },
];

export const reportTypes = [
  { id: 'rpt1', title: 'Admissions Report', icon: 'UserPlus', description: 'Application status, approval rates, enrollment trends', accent: 'primary' as const },
  { id: 'rpt2', title: 'Attendance Report', icon: 'CalendarCheck', description: 'Daily, monthly, class-wise attendance summaries', accent: 'success' as const },
  { id: 'rpt3', title: 'Fee Collection Report', icon: 'CreditCard', description: 'Collected, pending, overdue fees by category', accent: 'warning' as const },
  { id: 'rpt4', title: 'Payment Transaction Report', icon: 'Receipt', description: 'All transactions, methods, and refund history', accent: 'secondary' as const },
  { id: 'rpt5', title: 'Results Report', icon: 'Award', description: 'Grade distribution, merit lists, performance analytics', accent: 'destructive' as const },
  { id: 'rpt6', title: 'Student Report', icon: 'GraduationCap', description: 'Enrollment, demographics, academic performance', accent: 'primary' as const },
  { id: 'rpt7', title: 'Teacher Report', icon: 'Users', description: 'Performance, attendance, course assignments', accent: 'accent' as const },
  { id: 'rpt8', title: 'Course Report', icon: 'BookOpen', description: 'Enrollment, completion, popularity metrics', accent: 'success' as const },
];

export const permissionModules = [
  'Dashboard', 'Students', 'Teachers', 'Parents', 'Admissions', 'Courses', 'Batches', 'Classes', 'Sections',
  'Timetable', 'Attendance', 'Homework', 'Assignments', 'Exams', 'Tests', 'Results', 'Certificates',
  'Fees', 'Payments', 'Notices', 'Notifications', 'Events', 'Calendar', 'CMS', 'Blog', 'Gallery',
  'Media', 'Testimonials', 'FAQs', 'Analytics', 'Reports', 'Roles', 'Audit Logs', 'Settings',
];

export const permissionActions = ['View', 'Create', 'Edit', 'Delete', 'Export', 'Approve'];
