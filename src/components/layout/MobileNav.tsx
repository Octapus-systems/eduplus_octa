import React from 'react';
import { useLms } from '../../context/LmsContext';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  GraduationCap,
  Award,
  CalendarCheck2,
  Users,
  Settings,
  X,
  School,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MobileNav: React.FC = () => {
  const {
    currentRole,
    activeTab,
    setActiveTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    currentUser,
    setIsAuthModalOpen
  } = useLms();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  const studentBottomNav = [
    { key: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { key: 'courses', label: 'Courses', icon: BookOpen },
    { key: 'assignments', label: 'Tasks', icon: FileCheck2 },
    { key: 'exams', label: 'Exams', icon: GraduationCap },
    { key: 'settings', label: 'Profile', icon: Settings }
  ];

  const teacherBottomNav = [
    { key: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { key: 'teacher-courses', label: 'Courses', icon: BookOpen },
    { key: 'attendance', label: 'Roll Call', icon: CalendarCheck2 },
    { key: 'teacher-assignments', label: 'Tasks', icon: FileCheck2 },
    { key: 'settings', label: 'Profile', icon: Settings }
  ];

  const adminBottomNav = [
    { key: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { key: 'student-mgmt', label: 'Students', icon: Users },
    { key: 'course-mgmt', label: 'Curriculum', icon: BookOpen },
    { key: 'reports', label: 'Analytics', icon: GraduationCap },
    { key: 'admin-settings', label: 'Config', icon: Settings }
  ];

  const parentBottomNav = [
    { key: 'parent-dashboard', label: 'Home', icon: LayoutDashboard },
    { key: 'parent-children', label: 'Children', icon: Users },
    { key: 'parent-academics', label: 'Academics', icon: GraduationCap },
    { key: 'parent-fees', label: 'Fees', icon: FileCheck2 },
    { key: 'parent-settings', label: 'Profile', icon: Settings }
  ];

  const bottomItems =
    currentRole === 'student'
      ? studentBottomNav
      : currentRole === 'teacher'
      ? teacherBottomNav
      : currentRole === 'admin'
      ? adminBottomNav
      : parentBottomNav;

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around"
      >
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              id={`mobile-nav-${item.key}`}
              onClick={() => setActiveTab(item.key)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setIsMobileSidebarOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-4/5 max-w-xs h-full bg-white shadow-2xl flex flex-col justify-between"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <School className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">EduPulse LMS</h3>
                    <p className="text-[10px] text-slate-400 capitalize">{currentRole} Portal</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {currentRole === 'student' && (
                  <>
                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleNav('courses')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      My Courses & Videos
                    </button>
                    <button
                      onClick={() => handleNav('live-classes')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Live Classes & Timetable
                    </button>
                    <button
                      onClick={() => handleNav('assignments')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Assignments & Homework
                    </button>
                    <button
                      onClick={() => handleNav('exams')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Online Exams & Quizzes
                    </button>
                    <button
                      onClick={() => handleNav('results')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Results & Performance
                    </button>
                    <button
                      onClick={() => handleNav('student-attendance')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Attendance Record
                    </button>
                    <button
                      onClick={() => handleNav('student-messages')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Teacher Connect & Q&A
                    </button>
                    <button
                      onClick={() => handleNav('certificates')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Certificates & Honors
                    </button>
                    <button
                      onClick={() => handleNav('announcements')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Announcements & Notices
                    </button>
                  </>
                )}

                {currentRole === 'teacher' && (
                  <>
                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Teacher Dashboard
                    </button>
                    <button
                      onClick={() => handleNav('teacher-courses')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Course & Syllabus Management
                    </button>
                    <button
                      onClick={() => handleNav('teacher-live-classes')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Live Class Studio
                    </button>
                    <button
                      onClick={() => handleNav('video-library')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Video Lectures & Upload
                    </button>
                    <button
                      onClick={() => handleNav('teacher-assignments')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Assignments & Evaluation
                    </button>
                    <button
                      onClick={() => handleNav('question-bank')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Question Bank & Create Exam
                    </button>
                    <button
                      onClick={() => handleNav('attendance')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Attendance Roll Call & Remarks
                    </button>
                    <button
                      onClick={() => handleNav('teacher-doubts')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Student Doubts & Q&A
                    </button>
                    <button
                      onClick={() => handleNav('teacher-performance')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Student Performance Analytics
                    </button>
                  </>
                )}

                {currentRole === 'admin' && (
                  <>
                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Executive Dashboard
                    </button>
                    <button
                      onClick={() => handleNav('student-mgmt')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Student Management
                    </button>
                    <button
                      onClick={() => handleNav('teacher-mgmt')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Teacher Directory
                    </button>
                    <button
                      onClick={() => handleNav('course-mgmt')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Classes & Batches (1–12)
                    </button>
                    <button
                      onClick={() => handleNav('fees-mgmt')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Fee Collection & Finance
                    </button>
                    <button
                      onClick={() => handleNav('reports')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Reports & Institutional Analytics
                    </button>
                    <button
                      onClick={() => handleNav('admin-settings')}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Roles, Permissions & Settings
                    </button>
                  </>
                )}
              </div>

              {/* Bottom switch user in drawer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <button
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Switch Role / Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
