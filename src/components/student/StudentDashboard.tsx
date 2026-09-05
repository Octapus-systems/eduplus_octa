import React from 'react';
import { useLms } from '../../context/LmsContext';
import { MetricCard } from '../common/MetricCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Play,
  GraduationCap,
  TrendingUp,
  FileText,
  AlertCircle,
  Award,
  Sparkles
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    assignments,
    exams,
    setActiveTab,
    setActiveCourseId,
    setActiveLessonId,
    setActiveExamId,
    setIsTakingExam
  } = useLms();

  const enrolledCourses = courses.filter((c) => c.grade === (currentUser.grade || 'Class 10'));
  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const upcomingExams = exams.filter((e) => e.status === 'upcoming');
  const physicsCourse = courses.find((c) => c.id === 'crs_10_phy') || courses[0];

  const handleResumePhysics = () => {
    setActiveCourseId(physicsCourse.id);
    setActiveLessonId('les_6');
    setActiveTab('course-player');
  };

  const handleStartExam = (examId: string) => {
    setActiveExamId(examId);
    setIsTakingExam(true);
    setActiveTab('exams');
  };

  return (
    <div id="student-dashboard" className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-lg shadow-indigo-100">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Academic Year 2026–2027 • Term 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-indigo-100 leading-relaxed">
            You have made steady progress this week. 2 assignments are pending review, and your
            Class 10 Physics Midterm begins in 10 days.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              id="btn-resume-learning"
              onClick={handleResumePhysics}
              className="px-5 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              Continue: Physics Ch 2 (Resistors)
            </button>
            <button
              id="btn-view-schedule"
              onClick={() => setActiveTab('exams')}
              className="px-4 py-2.5 bg-indigo-800/60 hover:bg-indigo-800/80 text-white font-semibold text-xs rounded-xl border border-indigo-400/30 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Exam Datesheet
            </button>
          </div>
        </div>

        {/* Decorative background visual */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-6 hidden lg:block opacity-20 pointer-events-none">
          <GraduationCap className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          id="metric-enrolled-courses"
          title="Active Courses"
          value={enrolledCourses.length}
          subtext="Grade 10 Curriculum"
          icon={BookOpen}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          trend={{ value: '4 Subjects', isPositive: true }}
          onClick={() => setActiveTab('courses')}
        />
        <MetricCard
          id="metric-attendance"
          title="Attendance"
          value="96.4%"
          subtext="48 of 50 Days Present"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={{ value: '+1.8% vs Term Avg', isPositive: true }}
        />
        <MetricCard
          id="metric-pending-tasks"
          title="Pending Tasks"
          value={pendingAssignments.length}
          subtext="Next due tomorrow"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          onClick={() => setActiveTab('assignments')}
        />
        <MetricCard
          id="metric-academic-gpa"
          title="Academic Rank"
          value="#2 in Class"
          subtext="GPA 3.92 / 4.00"
          icon={Award}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          trend={{ value: 'Top 5%', isPositive: true }}
          onClick={() => setActiveTab('results')}
        />
      </div>

      {/* Main Two-Column Bento Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Continue Learning & Enrolled Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Featured Bento Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Play className="w-4 h-4 fill-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Continue Learning
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">Pick up right where you paused</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                All Courses <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 relative group cursor-pointer shadow-xs border border-slate-200">
                  <img
                    src={physicsCourse.thumbnail}
                    alt={physicsCourse.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-indigo-950/40 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-indigo-100/80 text-indigo-700 tracking-wider">
                    {physicsCourse.subject}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Lesson 2.3: Series and Parallel Resistors
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dr. Sunita Rao • 31 mins • 74% Course Completed
                  </p>
                </div>
              </div>
              <button
                id="btn-quick-resume-player"
                onClick={handleResumePhysics}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                Resume Video
              </button>
            </div>
          </div>

          {/* Enrolled Courses Bento Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Current Enrolled Courses</h3>
                <p className="text-xs text-slate-400 font-medium">Curriculum for {currentUser.grade || 'Class 10'}</p>
              </div>
              <button
                id="btn-view-all-courses"
                onClick={() => setActiveTab('courses')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                View Syllabus
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrolledCourses.slice(0, 4).map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    setActiveCourseId(course.id);
                    setActiveTab('course-player');
                  }}
                  className="p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-slate-50/40 hover:bg-white group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100/60 px-2.5 py-0.5 rounded-full">
                        {course.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{course.progress}%</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    {/* Progress bar */}
                    <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden mb-2">
                      <div
                        className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                      <span className="text-indigo-600 font-bold group-hover:underline flex items-center gap-0.5">
                        Continue <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Upcoming Exams & Pending Tasks */}
        <div className="space-y-6">
          {/* Upcoming Exams Bento Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Upcoming Exams
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('exams')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                All Exams
              </button>
            </div>

            <div className="space-y-3">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 flex flex-col gap-2 transition-all hover:border-indigo-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {exam.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {exam.subject} • {exam.durationMinutes} mins • {exam.totalMarks} Marks
                      </p>
                    </div>
                    <StatusBadge status={exam.status} size="sm" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2.5 border-t border-indigo-100/70">
                    <span className="text-slate-600 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {exam.date}
                    </span>
                    <button
                      id={`btn-dashboard-exam-${exam.id}`}
                      onClick={() => handleStartExam(exam.id)}
                      className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      Take Quiz <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Homework & Tasks Bento Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Pending Tasks
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('assignments')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Submit Work
              </button>
            </div>

            <div className="space-y-3">
              {pendingAssignments.slice(0, 3).map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => setActiveTab('assignments')}
                  className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {asg.title}
                    </h4>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full shrink-0">
                      Due {asg.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
                    <span>{asg.courseName}</span>
                    <span className="font-bold text-slate-700">{asg.maxScore} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notice Dark Bento Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <AlertCircle className="w-4 h-4" />
              Institutional Notice
            </div>
            <h4 className="text-xs font-bold mt-2 leading-snug text-slate-100">
              Inter-School STEM Fair abstracts deadline is approaching.
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Submit your project abstract to Dr. Sunita Rao by September 20.
            </p>
            <button
              onClick={() => setActiveTab('announcements')}
              className="mt-3.5 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              Read Bulletin <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
