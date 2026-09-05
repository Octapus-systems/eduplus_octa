import React, { useState, useRef, useEffect } from 'react';
import { useLms } from '../../context/LmsContext';
import { allGradesList } from '../../data/mockData';
import {
  Search,
  Bell,
  GraduationCap,
  Briefcase,
  Shield,
  Menu,
  Check,
  ExternalLink,
  Filter,
  CheckCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setRole,
    currentUser,
    searchQuery,
    setSearchQuery,
    selectedGradeFilter,
    setSelectedGradeFilter,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    setIsAuthModalOpen,
    setIsMobileSidebarOpen,
    setActiveTab
  } = useLms();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      id="top-header"
      className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4"
    >
      {/* Mobile Hamburger & Brand for Small Screens */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          id="btn-mobile-menu"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-extrabold text-sm text-indigo-600 tracking-tight">
          EduPulse
        </span>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md relative hidden sm:block">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          id="global-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search courses, lessons, assignments, faculty..."
          className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grade / Class Filter Dropdown */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            id="select-grade-filter"
            value={selectedGradeFilter}
            onChange={(e) => setSelectedGradeFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 py-1.5 px-3 rounded-xl border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors"
          >
            <option value="All Classes">All Grades (1–12)</option>
            {allGradesList.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Role Switcher Pill */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
          <button
            id="switch-role-student"
            onClick={() => setRole('student')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              currentRole === 'student'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student
          </button>
          <button
            id="switch-role-teacher"
            onClick={() => setRole('teacher')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              currentRole === 'teacher'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Teacher
          </button>
          <button
            id="switch-role-admin"
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              currentRole === 'admin'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {/* Notifications dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            id="btn-notifications-toggle"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-colors"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div
              id="notifications-popover"
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkTab) setActiveTab(n.linkTab);
                        setIsNotifOpen(false);
                      }}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 ${
                        !n.read ? 'bg-indigo-50/30' : ''
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          !n.read ? 'bg-indigo-600' : 'bg-transparent'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          {n.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                          {n.message}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {n.timestamp}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50/50 text-center">
                <button
                  onClick={() => {
                    setActiveTab('announcements');
                    setIsNotifOpen(false);
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  View All Announcements & Notices
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User profile avatar / Switch modal button */}
        <button
          id="btn-user-avatar-switch"
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 p-1 pl-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-all"
          title="Switch Role or Account"
        >
          <span className="text-xs font-semibold text-slate-700 hidden lg:inline max-w-[100px] truncate">
            {currentUser.name}
          </span>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
          />
        </button>
      </div>
    </header>
  );
};
