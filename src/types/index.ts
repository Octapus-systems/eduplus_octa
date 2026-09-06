export type UserRole = 'student' | 'teacher' | 'admin';

export type GradeLevel = 
  | 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5'
  | 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10'
  | 'Class 11' | 'Class 12';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  grade?: GradeLevel;
  section?: string;
  rollNumber?: string;
  department?: string;
  designation?: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  address?: string;
}

export interface Student extends User {
  attendancePercentage: number;
  gpa: number;
  feeStatus: 'paid' | 'pending' | 'overdue';
  parentEmail?: string;
}

export interface Teacher extends User {
  qualification: string;
  department: string;
  subjects: string[];
  assignedGrades: string[];
  rating: number;
  workloadHoursPerWeek: number;
  totalCourses: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "18:45"
  videoUrl?: string;
  completed?: boolean;
  notesUrl?: string;
  description: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  grade: GradeLevel;
  section?: string;
  instructorName: string;
  instructorAvatar: string;
  instructorId: string;
  thumbnail: string;
  progress: number; // 0 - 100 for student
  totalLessons: number;
  completedLessons: number;
  chapters: Chapter[];
  category: 'Science' | 'Mathematics' | 'Languages' | 'Social Studies' | 'Computer Science' | 'Arts';
  description: string;
  color: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentGrade: GradeLevel;
  studentSection: string;
  submittedAt: string;
  fileUrl?: string;
  fileName?: string;
  notes?: string;
  status: 'pending' | 'evaluated' | 'late';
  score?: number;
  maxScore: number;
  teacherFeedback?: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  subject: string;
  grade: GradeLevel;
  dueDate: string;
  maxScore: number;
  description: string;
  instructions: string[];
  attachments?: { name: string; size: string; type: string }[];
  status?: 'pending' | 'submitted' | 'evaluated' | 'overdue';
  mySubmission?: AssignmentSubmission;
  totalSubmissions?: number;
  totalStudents?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number; // 0-based index
  correctOptionIndex?: number;
  explanation?: string;
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  grade: GradeLevel;
  date: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'graded';
  questions: QuizQuestion[];
  score?: number;
  percentage?: number;
  rank?: number;
  feedback?: string;
  examType: 'Midterm' | 'Final' | 'Unit Test' | 'Weekly Quiz';
}

export interface AttendanceStudent {
  studentId: string;
  name: string;
  rollNumber: string;
  avatar: string;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceSession {
  id: string;
  grade: GradeLevel;
  section: string;
  subject: string;
  date: string;
  records: AttendanceStudent[];
}

export interface FeeRecord {
  id: string;
  invoiceNumber?: string;
  studentId: string;
  studentName: string;
  grade: GradeLevel;
  studentGrade?: GradeLevel;
  section?: string;
  feeType?: string;
  amount?: number;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
  lastPaymentDate?: string;
  paidAt?: string;
  paymentMethod?: string;
}

export interface Certificate {
  id: string;
  title: string;
  subject: string;
  grade: GradeLevel;
  issueDate: string;
  certificateNumber: string;
  gradeAchieved: string;
  instructorName: string;
  verificationUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  targetRole: 'all' | 'students' | 'teachers';
  targetGrade?: GradeLevel;
  priority: 'normal' | 'important' | 'urgent';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assignment' | 'exam' | 'announcement' | 'fee' | 'grade';
  linkTab?: string;
}

export interface VideoLecture {
  id: string;
  title: string;
  subject: string;
  grade: GradeLevel;
  duration: string;
  dateRecorded: string;
  views: number;
  instructorName: string;
  thumbnail: string;
  tags: string[];
}
