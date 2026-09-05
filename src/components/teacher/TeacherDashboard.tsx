import React from 'react';
import { useLms } from '../../context/LmsContext';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  Users,
  BookOpen,
  ClipboardCheck,
  Calendar,
  Clock,
  ArrowRight,
  Plus,
  Video,
  FileCheck2,
  TrendingUp,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    teacherSubmissions,
    attendance,
    setActiveTab,
    setIsTakingExam
  } = useLms();

  const myCourses = courses.filter((c) => c.instructorId === currentUser.id || c.grade === 'Class 10');
  const pendingEvaluations = teacherSubmissions.filter((s) => s.status === 'pending');

  const presentCount = attendance.records.filter((r) => r.status === 'present').length;
  const attendancePercent = Math.round((presentCount / attendance.records.length) * 100);

  return (
    <div id="teacher-dashboard" className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 p-6 sm:p-8 text-white shadow-lg shadow-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-sm border border-white/20">
            Faculty Portal • {currentUser.department}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            You have {pendingEvaluations.length} student submissions waiting for evaluation today.
            Your next live laboratory lecture for Class 10-A starts at 2:00 PM.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-teacher-create-asg"
            onClick={() => setActiveTab('teacher-assignments')}
            className="px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Assignment
          </button>
          <button
            id="btn-teacher-roll-call"
            onClick={() => setActiveTab('attendance')}
            className="px-4 py-2.5 bg-emerald-700/60 hover:bg-emerald-700/80 text-white font-semibold text-xs rounded-xl border border-emerald-400/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" /> Roll Call Register
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          id="metric-total-students"
          title="Total Students"
          value="148"
          subtext="Across Classes 9, 10 & 12"
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={{ value: '4 Batches', isPositive: true }}
          onClick={() => setActiveTab('attendance')}
        />
        <MetricCard
          id="metric-active-courses"
          title="Active Courses"
          value={myCourses.length}
          subtext="Physics & STEM Curriculum"
          icon={BookOpen}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          onClick={() => setActiveTab('teacher-courses')}
        />
        <MetricCard
          id="metric-pending-evals"
          title="Pending Evaluations"
          value={pendingEvaluations.length}
          subtext="Needs grading"
          icon={ClipboardCheck}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          trend={{ value: '2 Overdue', isPositive: false }}
          onClick={() => setActiveTab('teacher-assignments')}
        />
        <MetricCard
          id="metric-today-attendance"
          title="Class 10-A Attendance"
          value={`${attendancePercent}%`}
          subtext="7 of 8 Present Today"
          icon={Calendar}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          onClick={() => setActiveTab('attendance')}
        />
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Submissions to Evaluate & Active Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submissions Queue Bento Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recent Student Submissions</h3>
                <p className="text-xs text-slate-400 font-medium">Submissions awaiting score and feedback</p>
              </div>
              <button
                onClick={() => setActiveTab('teacher-assignments')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                Grade All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {teacherSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setActiveTab('teacher-assignments')}
                  className="p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={sub.studentAvatar}
                      alt={sub.studentName}
                      className="w-10 h-10 rounded-2xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{sub.studentName}</h4>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {sub.studentGrade}-{sub.studentSection}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">{sub.fileName}</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                        Submitted: {sub.submittedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <StatusBadge status={sub.status} size="sm" />
                    {sub.status === 'evaluated' ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-xl">
                        {sub.score}/{sub.maxScore}
                      </span>
                    ) : (
                      <button className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer">
                        Grade Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Courses / Chapters Management Bento Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Your Assigned Batches & Courses</h3>
                <p className="text-xs text-slate-400 font-medium">Class curriculum and syllabus pacing</p>
              </div>
              <button
                onClick={() => setActiveTab('teacher-courses')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Manage Syllabi
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myCourses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  onClick={() => setActiveTab('teacher-courses')}
                  className="p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all cursor-pointer bg-slate-50/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 rounded-full">
                      {course.grade} • {course.subject}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {course.chapters.length} Chapters
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {course.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2.5 border-t border-slate-200/70 font-medium">
                    <span>{course.totalLessons} Lessons Total</span>
                    <span className="text-emerald-700 font-bold">View Coursework →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Upcoming Schedule & Quick Tools */}
        <div className="space-y-6">
          {/* Today's Schedule Bento Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Today's Teaching Schedule
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 border-l-4 border-l-emerald-500 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Class 10-A • Physics Lab</span>
                  <span className="text-emerald-700 font-mono">09:00 - 10:30 AM</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Ohm's Law Verification & Voltmeter Setup</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 border-l-4 border-l-indigo-500 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Class 12-Science • Modern Physics</span>
                  <span className="text-indigo-700 font-mono">11:15 - 12:45 PM</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Photoelectric Effect & Quantum Emission</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 border-l-4 border-l-amber-500 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Faculty Dept Meeting</span>
                  <span className="text-amber-700 font-mono">03:30 - 04:30 PM</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Midterm Question Paper Finalization</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Bento Shortcuts */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-2.5">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-3">Quick Faculty Actions</h3>

            <button
              onClick={() => setActiveTab('video-library')}
              className="w-full p-3 rounded-2xl border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-between text-xs font-semibold text-slate-700 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Video className="w-3.5 h-3.5" />
                </div>
                Upload Class Recording
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('question-bank')}
              className="w-full p-3 rounded-2xl border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-between text-xs font-semibold text-slate-700 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ClipboardCheck className="w-3.5 h-3.5" />
                </div>
                Create Midterm Quiz
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className="w-full p-3 rounded-2xl border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-between text-xs font-semibold text-slate-700 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                Post Batch Notice
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
