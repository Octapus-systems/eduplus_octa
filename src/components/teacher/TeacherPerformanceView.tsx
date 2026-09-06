import React, { useState } from 'react';
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
  CheckCircle2,
  Download,
  FileSpreadsheet
} from 'lucide-react';

export const TeacherPerformanceView: React.FC = () => {
  const { addToast } = useLms();
  const [activeTab, setActiveTab] = useState<'analytics' | 'matrix'>('analytics');

  const classDistribution = [
    { range: '90-100%', count: 8, label: 'Distinction' },
    { range: '80-89%', count: 18, label: 'First Division' },
    { range: '70-79%', count: 12, label: 'Second Division' },
    { range: '60-69%', count: 4, label: 'Average' },
    { range: '<60%', count: 2, label: 'Needs Remedial' }
  ];

  const highAchievers = [
    { name: 'Diya Sen', score: '98%', rank: '#1', note: 'Top marks in Physics derivations & Lab log' },
    { name: 'Aarav Patel', score: '96%', rank: '#2', note: 'Consistent 100% quiz turnaround' },
    { name: 'Ananya Sharma', score: '94%', rank: '#3', note: 'Exemplary performance in numerical problems' }
  ];

  const gradebookMatrix = [
    { id: '1', name: 'Aarav Patel', roll: '10-A-01', physics: '96%', math: '98%', chem: '92%', cs: '95%', gpa: '3.92' },
    { id: '2', name: 'Ananya Sharma', roll: '10-A-02', physics: '98%', math: '96%', chem: '94%', cs: '99%', gpa: '4.00' },
    { id: '3', name: 'Devendra Nair', roll: '10-A-03', physics: '84%', math: '88%', chem: '80%', cs: '86%', gpa: '3.45' },
    { id: '4', name: 'Diya Sen', roll: '10-A-04', physics: '94%', math: '92%', chem: '90%', cs: '94%', gpa: '3.80' },
    { id: '5', name: 'Ishaan Verma', roll: '10-A-05', physics: '78%', math: '75%', chem: '72%', cs: '80%', gpa: '3.20' },
    { id: '6', name: 'Kavya Pillai', roll: '10-A-06', physics: '97%', math: '96%', chem: '98%', cs: '97%', gpa: '3.95' }
  ];

  const handleExportCSV = () => {
    addToast(
      'Export Complete',
      'Class 10-A Official Gradebook exported as CSV (Class10A_Gradebook_2026.csv).',
      'success'
    );
  };

  return (
    <div id="teacher-performance-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" /> Academic Progress & Gradebook Matrix
          </div>
          <h1 className="text-2xl font-black tracking-tight">Student Performance Analytics</h1>
          <p className="text-sm text-slate-300 mt-1">
            Interactive student gradebook, percentile distribution charts, and AI learning recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-indigo-500/20 border border-indigo-400/30 hover:bg-indigo-500/30 text-indigo-200 font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-indigo-400" /> Export CSV Gradebook
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeTab === 'analytics'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Performance Analytics & AI Insights
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeTab === 'matrix'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Interactive Gradebook Matrix
        </button>
      </div>

      {activeTab === 'analytics' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Class Average</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">81.6%</h3>
              <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +3.2% vs Term 1 Baseline
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Top Score</span>
              <h3 className="text-2xl font-black text-indigo-600 mt-1">98.0%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">Diya Sen & Ananya Sharma</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Pass Rate</span>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">95.2%</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">40 of 42 Students Passing</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">AI Learning Recommendation</span>
              <h3 className="text-2xl font-black text-amber-600 mt-1">2 Practice Tests</h3>
              <p className="text-xs font-semibold text-amber-600 mt-1">Suggested for Organic Chemistry</p>
            </div>
          </div>

          {/* AI Teaching Assistant Insights Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900 text-white shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-violet-300 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-violet-400 animate-spin" /> Automated Pedagogy Intelligence
            </div>
            <h2 className="text-base font-extrabold">Faculty Recommendation: Circuit Math Clinic Recommended</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on recent Midterm and Quiz 2 responses, 88% of students mastered theoretical Ohm's Law, but 24% encountered calculation delays on multi-loop Kirchhoff networks.
            </p>
            <button
              onClick={() => addToast('Remedial Test Assigned', 'Assigned Practice Worksheet 4 to target group.', 'success')}
              className="px-4 py-2 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs transition-colors shadow-md"
            >
              Assign Targeted Practice Worksheet
            </button>
          </div>

          {/* Chart and Distribution */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Score Range Distribution (Midterm)</h3>
                <p className="text-xs text-slate-400 font-medium">Headcount per percentile bracket</p>
              </div>
              <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                Class 10-A • Physics
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', fontSize: '11px', borderColor: '#e2e8f0' }} />
                  <Bar dataKey="count" name="Student Count" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Matrix Tab */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Class 10-A Composite Subject Matrix</h3>
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Export Matrix
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">Roll No.</th>
                  <th className="py-3.5 px-4">Student Name</th>
                  <th className="py-3.5 px-4">Physics</th>
                  <th className="py-3.5 px-4">Mathematics</th>
                  <th className="py-3.5 px-4">Chemistry</th>
                  <th className="py-3.5 px-4">Computer Sci</th>
                  <th className="py-3.5 px-5 text-right">GPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {gradebookMatrix.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-slate-500">{row.roll}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{row.name}</td>
                    <td className="py-4 px-4 font-semibold text-indigo-600">{row.physics}</td>
                    <td className="py-4 px-4 font-semibold text-slate-800">{row.math}</td>
                    <td className="py-4 px-4 font-semibold text-slate-800">{row.chem}</td>
                    <td className="py-4 px-4 font-semibold text-slate-800">{row.cs}</td>
                    <td className="py-4 px-5 font-black text-emerald-600 text-right">{row.gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
