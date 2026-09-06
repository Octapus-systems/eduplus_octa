import React from 'react';
import { useLms } from '../../context/LmsContext';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  GraduationCap,
  Award,
  Video,
  ClipboardList,
  BarChart3,
  CalendarCheck2,
  Users,
  UserCheck,
  CreditCard,
  FileSpreadsheet,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  School,
  Sparkles,
  Layers,
  Radio,
  MessageSquare
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    currentRole,
    activeTab,
    setActiveTab,
    currentUser,
    setIsAuthModalOpen,
    setIsTakingExam
  } = useLms();

  const handleNavClick = (tabKey: string) => {
    setIsTakingExam(false);
    setActiveTab(tabKey);
  };

  // Nav configurations tailored per role
  const studentNavItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'courses', label: 'My Courses', icon: BookOpen },
    { key: 'live-classes', label: 'Live Classes & Timetable', icon: Radio },
    { key: 'assignments', label: 'Assignments', icon: FileCheck2 },
    { key: 'exams', label: 'Exams & Quizzes', icon: GraduationCap },
    { key: 'results', label: 'Results & Analytics', icon: BarChart3 },
    { key: 'student-attendance', label: 'Attendance Record', icon: CalendarCheck2 },
    { key: 'student-messages', label: 'Teacher Connect', icon: MessageSquare },
    { key: 'certificates', label: 'Certificates', icon: Award },
    { key: 'announcements', label: 'Notice Board', icon: Bell },
    { key: 'settings', label: 'Profile & Settings', icon: Settings }
  ];

  const teacherNavItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'teacher-courses', label: 'Courses & Lessons', icon: BookOpen },
    { key: 'teacher-assignments', label: 'Assignments & Homework', icon: FileCheck2 },
    { key: 'question-bank', label: 'Question Bank & Quizzes', icon: ClipboardList },
    { key: 'teacher-live-classes', label: 'Live Class Studio', icon: Radio },
    { key: 'attendance', label: 'Attendance & Remarks', icon: CalendarCheck2 },
    { key: 'teacher-doubts', label: 'Student Doubts & Q&A', icon: MessageSquare },
    { key: 'teacher-performance', label: 'Performance & Gradebook', icon: BarChart3 },
    { key: 'video-library', label: 'Video Library', icon: Video },
    { key: 'announcements', label: 'Announcements', icon: Bell },
    { key: 'settings', label: 'Profile & Settings', icon: Settings }
  ];

  const adminNavItems = [
    { key: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { key: 'student-mgmt', label: 'Student Directory', icon: Users },
    { key: 'teacher-mgmt', label: 'Teacher Directory', icon: UserCheck },
    { key: 'course-mgmt', label: 'Classes & Courses', icon: Layers },
    { key: 'exam-mgmt', label: 'Exam Management', icon: ClipboardList },
    { key: 'fees-mgmt', label: 'Fees & Finance', icon: CreditCard },
    { key: 'reports', label: 'Reports & Analytics', icon: FileSpreadsheet },
    { key: 'announcements', label: 'Notifications', icon: Bell },
    { key: 'admin-settings', label: 'Roles & Settings', icon: Settings }
  ];

  const parentNavItems = [
    { key: 'parent-dashboard', label: 'Parent Dashboard', icon: LayoutDashboard },
    { key: 'parent-children', label: 'My Children', icon: Users },
    { key: 'parent-academics', label: 'Academic Performance', icon: BarChart3 },
    { key: 'parent-attendance', label: 'Attendance Record', icon: CalendarCheck2 },
    { key: 'parent-assignments', label: 'Assignments', icon: FileCheck2 },
    { key: 'parent-exams', label: 'Exams & Results', icon: GraduationCap },
    { key: 'parent-fees', label: 'Fees & Finance', icon: CreditCard },
    { key: 'parent-teachers', label: 'Teacher Connect & PTA', icon: MessageSquare },
    { key: 'parent-ai', label: 'AI Parent Companion', icon: Sparkles },
    { key: 'parent-achievements', label: 'Achievements & Badges', icon: Award },
    { key: 'parent-events', label: 'Events & Timetable', icon: CalendarCheck2 },
    { key: 'parent-documents', label: 'Documents & Support', icon: HelpCircle },
    { key: 'parent-settings', label: 'Parent Settings', icon: Settings }
  ];

  const navItems =
    currentRole === 'student'
      ? studentNavItems
      : currentRole === 'teacher'
      ? teacherNavItems
      : currentRole === 'admin'
      ? adminNavItems
      : parentNavItems;

  const roleColors = {
    student: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
    teacher: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    admin: 'bg-purple-500/10 text-purple-600 border-purple-200',
    parent: 'bg-amber-500/10 text-amber-600 border-amber-200'
  }[currentRole];

  return (
    <aside
      id="desktop-sidebar"
      className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/80 h-screen sticky top-0 shrink-0 z-30 select-none"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <School className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                EduPulse
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                LMS
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Classes 1–12 Platform</p>
          </div>
        </div>
      </div>

      {/* Role Pill Banner */}
      <div className="px-4 pt-4 pb-2">
        <div
          onClick={() => setIsAuthModalOpen(true)}
          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer hover:opacity-95 transition-all shadow-xs ${roleColors}`}
          title="Click to switch role"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider font-sans">
              {currentRole} Portal
            </span>
          </div>
          <span className="text-[11px] font-semibold underline opacity-80">Switch</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 pb-1 pt-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.key ||
            (item.key === 'courses' && activeTab === 'course-player');

          return (
            <button
              key={item.key}
              id={`nav-item-${item.key}`}
              onClick={() => handleNavClick(item.key)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 group cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
            </button>
          );
        })}
      </div>

      {/* Bottom User Profile card */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60">
        <div
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white border border-transparent hover:border-slate-200/80 transition-all cursor-pointer shadow-xs"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-2xl object-cover ring-1 ring-slate-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
            <p className="text-[11px] text-slate-500 truncate font-medium">
              {currentUser.grade ? `${currentUser.grade}-${currentUser.section}` : currentUser.designation || currentUser.role}
            </p>
          </div>
          <button
            id="btn-sidebar-logout"
            onClick={(e) => {
              e.stopPropagation();
              setIsAuthModalOpen(true);
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl transition-colors cursor-pointer"
            title="Switch User / Logout"
            aria-label="Switch User or Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
