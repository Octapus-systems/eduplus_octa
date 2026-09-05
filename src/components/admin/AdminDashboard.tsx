import React from 'react';
import { useLms } from '../../context/LmsContext';
import { MetricCard } from '../common/MetricCard';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  UserPlus,
  FileSpreadsheet,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building,
  School
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    teachers,
    courses,
    feeRecords,
    setActiveTab,
    addToast
  } = useLms();

  const totalFeeCollected = feeRecords
    .filter((f) => f.status === 'paid')
    .reduce((acc, f) => acc + f.amount, 0);

  const pendingFeeAmount = feeRecords
    .filter((f) => f.status !== 'paid')
    .reduce((acc, f) => acc + f.amount, 0);

  const monthlyFeeData = [
    { month: 'Apr', collections: 18500, expenses: 11200 },
    { month: 'May', collections: 21400, expenses: 12000 },
    { month: 'Jun', collections: 24800, expenses: 13500 },
    { month: 'Jul', collections: 23200, expenses: 12800 },
    { month: 'Aug', collections: 26500, expenses: 14100 },
    { month: 'Sep', collections: 28900, expenses: 14600 }
  ];

  const gradeEnrollmentData = [
    { grade: 'Primary (1-5)', students: 380 },
    { grade: 'Middle (6-8)', students: 340 },
    { grade: 'Class 9-10', students: 290 },
    { grade: 'Class 11-12', students: 230 }
  ];

  return (
    <div id="admin-dashboard" className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              Institutional Admin Console
            </span>
            <span className="text-xs text-slate-400">Academic Year 2026–2027</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            EduPulse Institutional Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Overseeing 1,240 enrolled students across Classes 1–12, 68 accredited faculty members,
            and automated term operations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('student-management')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Enroll Student
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" /> Collect Fees
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          id="metric-admin-students"
          title="Total Enrollment"
          value="1,240"
          subtext="Classes 1 to 12"
          icon={GraduationCap}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          trend={{ value: '+4.2% YoY', isPositive: true }}
          onClick={() => setActiveTab('student-management')}
        />
        <MetricCard
          id="metric-admin-teachers"
          title="Faculty Members"
          value={teachers.length}
          subtext="100% Verified Credentials"
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          onClick={() => setActiveTab('teacher-management')}
        />
        <MetricCard
          id="metric-admin-fees"
          title="Fees Collected"
          value={`$${(totalFeeCollected / 1000).toFixed(1)}k`}
          subtext={`$${(pendingFeeAmount / 1000).toFixed(1)}k Outstanding`}
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={{ value: '92% Collection', isPositive: true }}
          onClick={() => setActiveTab('fees')}
        />
        <MetricCard
          id="metric-admin-attendance"
          title="Campus Attendance"
          value="95.4%"
          subtext="Institution-wide average"
          icon={School}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          onClick={() => setActiveTab('reports')}
        />
      </div>

      {/* Analytics Charts Bento Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Revenue & Fee Collections Bento Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Monthly Fee Inflows vs Operations Expense
              </h3>
              <p className="text-xs text-slate-400 font-medium">Financial Year 2026 (USD)</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              +14% Net Surplus
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFeeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', fontSize: '11px', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="collections" name="Collections" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCollections)" />
                <Area type="monotone" dataKey="expenses" name="Expenditure" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Grade Level Breakdown Bento Bar Chart */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Enrollment by Tier</h3>
              <p className="text-xs text-slate-400 font-medium">Class 1 to 12 distribution</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeEnrollmentData} margin={{ top: 10, right: 10, left: -25, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="grade" tick={{ fontSize: 10, fill: '#64748b' }} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', fontSize: '11px', borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="students" name="Students" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Action Bento Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setActiveTab('student-management')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-base font-extrabold text-slate-900 mt-5 tracking-tight">Student Registry & Records</h4>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
            Browse directory, enroll admissions, view fee clearance and parent profiles.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('teacher-management')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-base font-extrabold text-slate-900 mt-5 tracking-tight">Faculty Roster & Workload</h4>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
            Assign curriculum subjects, monitor teaching periods, and inspect departmental ratings.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('fees')}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-amber-600 group-hover:bg-amber-50 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <h4 className="text-base font-extrabold text-slate-900 mt-5 tracking-tight">Fee Structures & Receipts</h4>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
            Tuition, lab, sports dues, generate digital invoices, and record payments.
          </p>
        </div>
      </div>
    </div>
  );
};
