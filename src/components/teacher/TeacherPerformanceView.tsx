import React from 'react';
import { useLms } from '../../context/LmsContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  TrendingUp,
  AlertTriangle,
  Award,
  Users,
  Search,
  MessageSquare,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const TeacherPerformanceView: React.FC = () => {
  const { addToast } = useLms();

  const classDistribution = [
    { range: '90-100%', count: 8, label: 'Distinction' },
    { range: '80-89%', count: 18, label: 'First Division' },
    { range: '70-79%', count: 12, label: 'Second Division' },
    { range: '60-69%', count: 4, label: 'Average' },
    { range: '<60%', count: 2, label: 'Needs Remedial' }
  ];

  const highAchievers = [
    { name: 'Diya Sharma', score: '98%', rank: '#1', note: 'Top marks in Physics derivations & Lab log' },
    { name: 'Aarav Patel', score: '96%', rank: '#2', note: 'Consistent 100% quiz turnaround' },
    { name: 'Siddharth Roy', score: '94%', rank: '#3', note: 'Exemplary performance in numerical problems' }
  ];

  const studentsNeedingSupport = [
    { name: 'Rohan Mehra', score: '54%', issue: 'Missed 3 laboratory practicals, struggling with circuit math', attendance: '72%' },
    { name: 'Priya Nair', score: '58%', issue: 'Formula derivation incomplete in midterm test', attendance: '81%' }
  ];

  return (
    <div id="teacher-performance-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Class 10-A Academic Performance Insights
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Score distribution, remedial intervention tracking, and top percentiles
          </p>
        </div>

        <button
          onClick={() => addToast('Intervention Notices Sent', 'Automated study alerts sent to parents of students needing support.', 'success')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <MessageSquare className="w-4 h-4" /> Send Remedial Notices
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Class Average</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">81.6%</h3>
          <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +3.2% vs Term 1 Baseline
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Top Score</span>
          <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">98.0%</h3>
          <p className="text-xs text-slate-500 mt-1">Achieved by Diya Sharma</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Passed Rate</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">95.2%</h3>
          <p className="text-xs text-slate-500 mt-1">40 of 42 Students Passing</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Remedial Focus</span>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-1">2 Students</h3>
          <p className="text-xs text-slate-500 mt-1">Recommended for doubt clinic</p>
        </div>
      </div>

      {/* Chart and Distribution */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Score Range Distribution (Midterm)</h3>
            <p className="text-xs text-slate-400">Headcount per percentile bracket</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Class 10-A • Physics
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', borderColor: '#e2e8f0' }} />
              <Bar dataKey="count" name="Student Count" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Columns: High Achievers & Support Needed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Achievers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">High Academic Achievers</h3>
              <p className="text-xs text-slate-400">Top candidates for science olympiad nominations</p>
            </div>
          </div>

          <div className="space-y-3">
            {highAchievers.map((st, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{st.name}</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {st.rank}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{st.note}</p>
                </div>
                <span className="text-sm font-extrabold text-emerald-600 font-mono">{st.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support Needed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Students Requiring Academic Support</h3>
              <p className="text-xs text-slate-400">Identified for extra doubt resolution sessions</p>
            </div>
          </div>

          <div className="space-y-3">
            {studentsNeedingSupport.map((st, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/30 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{st.name}</span>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                      Score: {st.score}
                    </span>
                    <span className="text-[10px] text-slate-500">Attendance: {st.attendance}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{st.issue}</p>
                </div>
                <button
                  onClick={() => addToast('Appointment Scheduled', `Parent consultation booked for ${st.name}.`, 'info')}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold rounded-lg shrink-0 shadow-xs"
                >
                  Schedule Meet
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
