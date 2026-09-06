import React from 'react';
import { useLms } from '../../context/LmsContext';
import {
  Users,
  GraduationCap,
  CalendarCheck2,
  CreditCard,
  FileCheck2,
  Award,
  Bell,
  MessageSquare,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  User,
  BookOpen,
  Calendar,
  DollarSign
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const {
    currentUser,
    childrenList,
    selectedChildId,
    setSelectedChildId,
    selectedChild,
    setActiveTab,
    announcements,
    parentMeetings,
    addToast
  } = useLms();

  return (
    <div id="parent-dashboard" className="space-y-6 max-w-7xl">
      {/* Top Banner & Child Selector */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                Parent Oversight Portal
              </span>
              <span className="text-xs text-amber-100 font-medium">Academic Term 2026–2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}! 👋
            </h1>
            <p className="text-xs text-amber-100/90 mt-1 max-w-xl">
              Monitor real-time academic progress, daily attendance, fee invoices, teacher remarks, and school circulars.
            </p>
          </div>

          {/* Child Switcher Pill */}
          <div className="bg-white/15 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex items-center gap-2">
            <span className="text-xs font-semibold text-white/80 pl-2">Active Child:</span>
            <div className="flex items-center gap-1.5 bg-white rounded-xl p-1 shadow-inner">
              {childrenList.map((child) => (
                <button
                  key={child.id}
                  onClick={() => {
                    setSelectedChildId(child.id);
                    addToast('Child Switched', `Viewing dashboard for ${child.name} (${child.grade})`, 'info');
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedChildId === child.id
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <img src={child.avatar} alt={child.name} className="w-5 h-5 rounded-full object-cover" />
                  <span>{child.name}</span>
                  <span className="text-[10px] opacity-80">({child.grade})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Child KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div
          onClick={() => setActiveTab('parent-attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Attendance Log</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{selectedChild.attendancePercentage}%</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                On Track
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Class {selectedChild.grade} • Roll #{selectedChild.rollNumber}</p>
          </div>
        </div>

        {/* GPA / Academic Standing */}
        <div
          onClick={() => setActiveTab('parent-academics')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">GPA / Cumulative Grade</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{selectedChild.gpa}</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Rank #3 / 40
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Conduct: {selectedChild.conductRating}</p>
          </div>
        </div>

        {/* Fees Status */}
        <div
          onClick={() => setActiveTab('parent-fees')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fee Status</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {selectedChild.feeStatus === 'paid' ? '$0' : `$${selectedChild.pendingFeeAmount}`}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${
                  selectedChild.feeStatus === 'paid'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {selectedChild.feeStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {selectedChild.feeStatus === 'paid' ? 'All dues cleared for Q3' : 'Q3 Tuition due in 5 days'}
            </p>
          </div>
        </div>

        {/* Active Homework & Exams */}
        <div
          onClick={() => setActiveTab('parent-assignments')}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Tasks</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{selectedChild.unsubmittedAssignments}</span>
              <span className="text-xs font-medium text-slate-500">Unsubmitted Assignment</span>
            </div>
            <p className="text-xs text-purple-600 font-semibold mt-1">
              {selectedChild.upcomingExamsCount} Exams Scheduled Next Week
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Quick Parent Tools & PTA Actions</h4>
            <p className="text-[11px] text-slate-400">Directly contact class teacher or request AI academic analysis</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedChild.feeStatus !== 'paid' && (
            <button
              onClick={() => setActiveTab('parent-fees')}
              className="px-3.5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <DollarSign className="w-4 h-4" /> Pay Dues (${selectedChild.pendingFeeAmount})
            </button>
          )}
          <button
            onClick={() => setActiveTab('parent-teachers')}
            className="px-3.5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" /> Message Teacher
          </button>
          <button
            onClick={() => setActiveTab('parent-ai')}
            className="px-3.5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Ask Parent AI
          </button>
          <button
            onClick={() => setActiveTab('parent-attendance')}
            className="px-3.5 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" /> Submit Absence Note
          </button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Exam Marks Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Exam Results — {selectedChild.name}</h3>
                <p className="text-xs text-slate-500">Term 1 evaluation scores & subject teacher remarks</p>
              </div>
              <button
                onClick={() => setActiveTab('parent-exams')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                Full Exam Ledger <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    PHY
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Physics Midterm Assessment</h4>
                    <p className="text-[11px] text-slate-500">Instructor: Dr. Sunita Rao • Exam Date: Aug 28, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-600">92 / 100</span>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Grade A+</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    MTH
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Mathematics Trigonometry Unit Test</h4>
                    <p className="text-[11px] text-slate-500">Instructor: Prof. David Miller • Exam Date: Aug 20, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-600">88 / 100</span>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Grade A</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                    ENG
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">English Literature Essay</h4>
                    <p className="text-[11px] text-slate-500">Instructor: Elena Rostova • Exam Date: Aug 15, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-indigo-600">95 / 100</span>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Grade A+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Child Profile Brief */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Student Profile & Academic Health</h3>
              <button
                onClick={() => setActiveTab('parent-children')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                View Full Profile <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
              <img
                src={selectedChild.avatar}
                alt={selectedChild.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-300"
              />
              <div className="flex-1 text-center sm:text-left space-y-1">
                <h4 className="text-sm font-bold text-slate-900">{selectedChild.name}</h4>
                <p className="text-xs text-slate-600">
                  {selectedChild.grade} — Section {selectedChild.section} • Roll #{selectedChild.rollNumber}
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500">
                  <span>Admission ID: <strong className="text-slate-800">{selectedChild.admissionId}</strong></span>
                  <span>House: <strong className="text-amber-800">{selectedChild.house}</strong></span>
                  <span>Class Teacher: <strong className="text-slate-800">{selectedChild.classTeacherName}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 col) */}
        <div className="space-y-6">
          {/* Scheduled Parent Meetings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">PTA Meetings</h3>
              <button
                onClick={() => setActiveTab('parent-teachers')}
                className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                Book Slot
              </button>
            </div>

            {parentMeetings.length > 0 ? (
              <div className="space-y-2.5">
                {parentMeetings.map((mtg) => (
                  <div key={mtg.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{mtg.teacherName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {mtg.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{mtg.subject}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/50">
                      <span>🗓️ {mtg.requestedDate}</span>
                      <span>⏰ {mtg.requestedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-2">No upcoming meetings scheduled.</p>
            )}
          </div>

          {/* School Announcements Feed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Important Notices</h3>
              <Bell className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="p-3 rounded-xl bg-amber-50/40 border border-amber-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900">{ann.title}</span>
                    <span className="text-[10px] text-amber-700 font-mono">{ann.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
