import React from 'react';
import { LmsProvider, useLms } from './context/LmsContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';

// Student views
import { StudentDashboard } from './components/student/StudentDashboard';
import { MyCoursesView } from './components/student/MyCoursesView';
import { CoursePlayerView } from './components/student/CoursePlayerView';
import { AssignmentsView } from './components/student/AssignmentsView';
import { ExamsView } from './components/student/ExamsView';
import { ResultsView } from './components/student/ResultsView';
import { CertificatesView } from './components/student/CertificatesView';

// Teacher views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherCoursesView } from './components/teacher/TeacherCoursesView';
import { VideoLibraryView } from './components/teacher/VideoLibraryView';
import { TeacherAssignmentsView } from './components/teacher/TeacherAssignmentsView';
import { QuestionBankView } from './components/teacher/QuestionBankView';
import { AttendanceView } from './components/teacher/AttendanceView';
import { TeacherPerformanceView } from './components/teacher/TeacherPerformanceView';

// Admin views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentManagementView } from './components/admin/StudentManagementView';
import { TeacherManagementView } from './components/admin/TeacherManagementView';
import { ClassesCoursesView } from './components/admin/ClassesCoursesView';
import { ExamManagementView } from './components/admin/ExamManagementView';
import { FeesManagementView } from './components/admin/FeesManagementView';
import { ReportsAnalyticsView } from './components/admin/ReportsAnalyticsView';

// Shared views
import { AnnouncementsView } from './components/common/AnnouncementsView';
import { ProfileSettingsView } from './components/common/ProfileSettingsView';

const MainContent: React.FC = () => {
  const { activeTab, currentRole } = useLms();

  const renderView = () => {
    switch (activeTab) {
      // Student Tabs
      case 'student-dashboard':
      case 'dashboard':
        if (currentRole === 'student') return <StudentDashboard />;
        if (currentRole === 'teacher') return <TeacherDashboard />;
        return <AdminDashboard />;
      case 'courses':
        return <MyCoursesView />;
      case 'course-player':
        return <CoursePlayerView />;
      case 'assignments':
        return <AssignmentsView />;
      case 'exams':
        return <ExamsView />;
      case 'results':
        return <ResultsView />;
      case 'certificates':
        return <CertificatesView />;

      // Teacher Tabs
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'teacher-courses':
        return <TeacherCoursesView />;
      case 'video-library':
        return <VideoLibraryView />;
      case 'teacher-assignments':
        return <TeacherAssignmentsView />;
      case 'question-bank':
        return <QuestionBankView />;
      case 'attendance':
        return <AttendanceView />;
      case 'teacher-performance':
        return <TeacherPerformanceView />;

      // Admin Tabs
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'student-management':
      case 'student-mgmt':
        return <StudentManagementView />;
      case 'teacher-management':
      case 'teacher-mgmt':
        return <TeacherManagementView />;
      case 'admin-courses':
      case 'course-mgmt':
        return <ClassesCoursesView />;
      case 'exam-management':
      case 'exam-mgmt':
        return <ExamManagementView />;
      case 'fees':
      case 'fees-mgmt':
        return <FeesManagementView />;
      case 'reports':
        return <ReportsAnalyticsView />;
      case 'admin-settings':
        return <ProfileSettingsView />;

      // Shared Tabs
      case 'announcements':
        return <AnnouncementsView />;
      case 'profile':
      case 'settings':
        return <ProfileSettingsView />;

      default:
        if (currentRole === 'student') return <StudentDashboard />;
        if (currentRole === 'teacher') return <TeacherDashboard />;
        return <AdminDashboard />;
    }
  };

  return (
    <div id="lms-app-root" className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800 antialiased">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Mobile Nav & Drawer */}
      <MobileNav />

      {/* Auth & Role Switcher Modal */}
      <AuthModal />

      {/* Global Interactive Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <LmsProvider>
      <MainContent />
    </LmsProvider>
  );
}
