import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  User,
  Course,
  Assignment,
  AssignmentSubmission,
  Exam,
  AttendanceSession,
  FeeRecord,
  Certificate,
  Announcement,
  NotificationItem,
  VideoLecture,
  GradeLevel
} from '../types';
import {
  mockUsers,
  mockCourses,
  mockAssignments,
  mockExams,
  mockTeacherSubmissions,
  mockAttendanceRoster,
  mockCertificates,
  mockAnnouncements,
  mockNotifications,
  mockVideoLibrary,
  mockFeeRecords,
  mockStudentsList,
  mockTeachersList
} from '../data/mockData';

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface LmsContextType {
  // Current state
  currentRole: UserRole;
  currentUser: User;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedGradeFilter: string;
  setSelectedGradeFilter: (grade: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Active view states
  activeCourseId: string | null;
  setActiveCourseId: (id: string | null) => void;
  activeLessonId: string | null;
  setActiveLessonId: (id: string | null) => void;
  activeExamId: string | null;
  setActiveExamId: (id: string | null) => void;
  isTakingExam: boolean;
  setIsTakingExam: (taking: boolean) => void;

  // Data collections
  courses: Course[];
  assignments: Assignment[];
  exams: Exam[];
  teacherSubmissions: AssignmentSubmission[];
  attendance: AttendanceSession;
  certificates: Certificate[];
  announcements: Announcement[];
  notifications: NotificationItem[];
  videoLibrary: VideoLecture[];
  feeRecords: FeeRecord[];
  students: typeof mockStudentsList;
  teachers: typeof mockTeachersList;

  // Interactive mutations
  submitAssignment: (assignmentId: string, fileName: string, notes: string) => void;
  evaluateSubmission: (submissionId: string, score: number, feedback: string) => void;
  createAssignment: (newAsg: Omit<Assignment, 'id' | 'totalSubmissions'>) => void;
  createExam: (newExam: Omit<Exam, 'id'>) => void;
  submitExamAnswers: (examId: string, answers: Record<string, number>) => { score: number; total: number; percentage: number };
  toggleAttendanceStatus: (studentId: string, status: 'present' | 'absent' | 'late') => void;
  markAllAttendancePresent: () => void;
  uploadVideoLecture: (video: Omit<VideoLecture, 'id' | 'views'>) => void;
  createAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  addStudent: (studentData: any) => void;
  addTeacher: (teacherData: any) => void;
  toggleLessonCompleted: (courseId: string, lessonId: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // UI state
  toasts: Toast[];
  addToast: (title: string, message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

const LmsContext = createContext<LmsContextType | undefined>(undefined);

export const LmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers.student);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('All Classes');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeCourseId, setActiveCourseId] = useState<string | null>('crs_10_phy');
  const [activeLessonId, setActiveLessonId] = useState<string | null>('les_1');
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [isTakingExam, setIsTakingExam] = useState<boolean>(false);

  // Modals & UI
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // State data
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [teacherSubmissions, setTeacherSubmissions] = useState<AssignmentSubmission[]>(mockTeacherSubmissions);
  const [attendance, setAttendance] = useState<AttendanceSession>(mockAttendanceRoster);
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [videoLibrary, setVideoLibrary] = useState<VideoLecture[]>(mockVideoLibrary);
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>(mockFeeRecords);
  const [students, setStudents] = useState(mockStudentsList);
  const [teachers, setTeachers] = useState(mockTeachersList);

  const addToast = (title: string, message: string, type: Toast['type'] = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync user profile when role changes
  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(mockUsers[role]);
    setActiveTab('dashboard');
    setIsTakingExam(false);
    setActiveExamId(null);
    addToast(
      `Role Switched`,
      `Now logged in as ${mockUsers[role].name} (${role.toUpperCase()})`,
      'info'
    );
  };

  const submitAssignment = (assignmentId: string, fileName: string, notes: string) => {
    const targetAsg = assignments.find((a) => a.id === assignmentId);
    const submissionId = 'sub_' + Date.now();
    const newSubmission: AssignmentSubmission = {
      id: submissionId,
      assignmentId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      studentGrade: currentUser.grade || 'Class 10',
      studentSection: currentUser.section || 'A',
      submittedAt: 'Just now',
      fileName,
      notes,
      status: 'pending',
      maxScore: targetAsg ? targetAsg.maxScore : 25
    };

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? { ...a, status: 'submitted', mySubmission: newSubmission }
          : a
      )
    );

    setTeacherSubmissions((prev) => [newSubmission, ...prev]);

    addToast(
      'Assignment Submitted',
      `"${targetAsg?.title || 'Assignment'}" submitted successfully for grading.`,
      'success'
    );
  };

  const evaluateSubmission = (submissionId: string, score: number, feedback: string) => {
    setTeacherSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, status: 'evaluated', score, teacherFeedback: feedback }
          : s
      )
    );

    setAssignments((prev) =>
      prev.map((a) => {
        if (a.mySubmission && a.mySubmission.id === submissionId) {
          return {
            ...a,
            status: 'evaluated',
            mySubmission: {
              ...a.mySubmission,
              status: 'evaluated',
              score,
              teacherFeedback: feedback
            }
          };
        }
        return a;
      })
    );

    addToast('Submission Evaluated', `Grade (${score}) and feedback recorded.`, 'success');
  };

  const createAssignment = (newAsg: Omit<Assignment, 'id' | 'totalSubmissions'>) => {
    const created: Assignment = {
      ...newAsg,
      id: 'asg_' + Date.now(),
      status: 'pending',
      totalSubmissions: 0,
      totalStudents: 42
    };
    setAssignments((prev) => [created, ...prev]);
    addToast('Assignment Created', `"${created.title}" published to ${created.grade}.`, 'success');
  };

  const createExam = (newExam: Omit<Exam, 'id'>) => {
    const created: Exam = {
      ...newExam,
      id: 'ex_' + Date.now(),
      status: 'upcoming'
    };
    setExams((prev) => [created, ...prev]);
    addToast('Exam Scheduled', `"${created.title}" scheduled successfully.`, 'success');
  };

  const submitExamAnswers = (examId: string, answers: Record<string, number>) => {
    const exam = exams.find((e) => e.id === examId);
    if (!exam) return { score: 0, total: 0, percentage: 0 };

    let totalPoints = 0;
    let earnedPoints = 0;

    exam.questions.forEach((q) => {
      totalPoints += q.points;
      if (answers[q.id] === q.correctAnswer) {
        earnedPoints += q.points;
      }
    });

    const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

    setExams((prev) =>
      prev.map((e) =>
        e.id === examId
          ? {
              ...e,
              status: 'graded',
              score: earnedPoints,
              percentage,
              rank: percentage >= 90 ? 1 : percentage >= 75 ? 3 : 8,
              feedback:
                percentage >= 80
                  ? 'Excellent command over concepts!'
                  : 'Fair attempt. Revise incorrect questions below.'
            }
          : e
      )
    );

    return { score: earnedPoints, total: totalPoints, percentage };
  };

  const toggleAttendanceStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance((prev) => ({
      ...prev,
      records: prev.records.map((r) =>
        r.studentId === studentId ? { ...r, status } : r
      )
    }));
  };

  const markAllAttendancePresent = () => {
    setAttendance((prev) => ({
      ...prev,
      records: prev.records.map((r) => ({ ...r, status: 'present' }))
    }));
    addToast('Attendance Updated', 'All students marked Present for today.', 'info');
  };

  const uploadVideoLecture = (video: Omit<VideoLecture, 'id' | 'views'>) => {
    const created: VideoLecture = {
      ...video,
      id: 'vid_' + Date.now(),
      views: 1
    };
    setVideoLibrary((prev) => [created, ...prev]);
    addToast('Video Uploaded', `"${created.title}" added to video library.`, 'success');
  };

  const createAnnouncement = (ann: Omit<Announcement, 'id' | 'date'>) => {
    const created: Announcement = {
      ...ann,
      id: 'ann_' + Date.now(),
      date: 'Today'
    };
    setAnnouncements((prev) => [created, ...prev]);
    addToast('Announcement Broadcast', `Notice published to ${created.targetRole}.`, 'success');
  };

  const addStudent = (studentData: any) => {
    const created = {
      id: 'std_' + Date.now(),
      name: studentData.name,
      rollNumber: studentData.rollNumber,
      grade: studentData.grade,
      section: studentData.section || 'A',
      attendance: '100%',
      gpa: 'N/A',
      feeStatus: studentData.feeStatus || 'Pending',
      parentContact: studentData.parentContact || '+1 (555) 000-0000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setStudents((prev) => [created, ...prev]);
    addToast('Student Enrolled', `${created.name} registered in ${created.grade}.`, 'success');
  };

  const addTeacher = (teacherData: any) => {
    const created = {
      id: 'tch_' + Date.now(),
      name: teacherData.name,
      department: teacherData.department,
      grades: teacherData.grades || ['Class 10'],
      experience: teacherData.experience || '3 Years',
      rating: 5.0,
      classesPerWeek: Number(teacherData.classesPerWeek) || 18,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: teacherData.email
    };
    setTeachers((prev) => [created, ...prev]);
    addToast('Faculty Added', `${created.name} appointed to ${created.department}.`, 'success');
  };

  const toggleLessonCompleted = (courseId: string, lessonId: string) => {
    setCourses((prev) =>
      prev.map((crs) => {
        if (crs.id !== courseId) return crs;
        let completedCount = 0;
        let totalCount = 0;

        const updatedChapters = crs.chapters.map((ch) => ({
          ...ch,
          lessons: ch.lessons.map((les) => {
            totalCount++;
            const isTarget = les.id === lessonId;
            const updated = isTarget ? { ...les, completed: !les.completed } : les;
            if (updated.completed) completedCount++;
            return updated;
          })
        }));

        const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : crs.progress;

        return {
          ...crs,
          chapters: updatedChapters,
          completedLessons: completedCount,
          progress: newProgress
        };
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All marked as read.', 'info');
  };

  return (
    <LmsContext.Provider
      value={{
        currentRole,
        currentUser,
        setRole,
        activeTab,
        setActiveTab,
        selectedGradeFilter,
        setSelectedGradeFilter,
        searchQuery,
        setSearchQuery,
        activeCourseId,
        setActiveCourseId,
        activeLessonId,
        setActiveLessonId,
        activeExamId,
        setActiveExamId,
        isTakingExam,
        setIsTakingExam,
        courses,
        assignments,
        exams,
        teacherSubmissions,
        attendance,
        certificates,
        announcements,
        notifications,
        videoLibrary,
        feeRecords,
        students,
        teachers,
        submitAssignment,
        evaluateSubmission,
        createAssignment,
        createExam,
        submitExamAnswers,
        toggleAttendanceStatus,
        markAllAttendancePresent,
        uploadVideoLecture,
        createAnnouncement,
        addStudent,
        addTeacher,
        toggleLessonCompleted,
        markNotificationRead,
        clearAllNotifications,
        toasts,
        addToast,
        removeToast,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen
      }}
    >
      {children}
    </LmsContext.Provider>
  );
};

export const useLms = () => {
  const context = useContext(LmsContext);
  if (!context) {
    throw new Error('useLms must be used within an LmsProvider');
  }
  return context;
};
