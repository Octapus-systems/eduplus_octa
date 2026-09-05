import React from 'react';
import { useLms } from '../../context/LmsContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line
} from 'recharts';
import {
  Award,
  Download,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const ResultsView: React.FC = () => {
  const { currentUser, addToast } = useLms();

  const performanceData = [
    { subject: 'Mathematics', score: 96, classAverage: 78, max: 100 },
    { subject: 'Physics', score: 92, classAverage: 74, max: 100 },
    { subject: 'Chemistry', score: 88, classAverage: 72, max: 100 },
    { subject: 'Computer Sci', score: 95, classAverage: 82, max: 100 },
    { subject: 'English', score: 91, classAverage: 80, max: 100 },
    { subject: 'Social Sci', score: 87, classAverage: 75, max: 100 }
  ];

  const gpaTrendData = [
    { term: 'Term 1 Mid', gpa: 3.75 },
    { term: 'Term 1 End', gpa: 3.82 },
    { term: 'Unit Test 1', gpa: 3.88 },
    { term: 'Pre-Midterm', gpa: 3.92 }
  ];

  const scorecardTable = [
    { subject: 'Class 10 Advanced Mathematics', code: 'MTH-101', teacher: 'Prof. Ramesh Nambiar', marks: '96 / 100', grade: 'A+', credits: 4 },
    { subject: 'Class 10 Physics (Mechanics & Optics)', code: 'PHY-102', teacher: 'Dr. Sunita Rao', marks: '92 / 100', grade: 'A+', credits: 4 },
    { subject: 'Class 10 Chemistry (Reactions & Carbon)', code: 'CHM-103', teacher: 'Dr. Meenakshi Joshi', marks: '88 / 100', grade: 'A', credits: 4 },
    { subject: 'Class 10 Computer Science (Python)', code: 'CSC-104', teacher: 'Anand Kothari', marks: '95 / 100', grade: 'A+', credits: 3 },
    { subject: 'Class 10 English Literature', code: 'ENG-105', teacher: 'Sarah Jenkins', marks: '91 / 100', grade: 'A', credits: 3 }
  ];

  return (
    <div id="student-results-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Performance & Report Card
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Grade 10 • Section A • Comprehensive term analytics and percentile rank
          </p>
        </div>

        <button
          onClick={() => addToast('Report Card Generated', 'Official PDF exported to downloads.', 'success')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Download Official Transcript (PDF)
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cumulative GPA</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">3.92 / 4.00</h3>
          <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +0.10 from Term 1
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Aggregate Percentage</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">92.4%</h3>
          <p className="text-xs text-slate-500 mt-1">Distinction Honors Category</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Class Standing</span>
          <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">Rank #2</h3>
          <p className="text-xs text-slate-500 mt-1">Out of 42 Students in 10-A</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attendance Integrity</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">96.4%</h3>
          <p className="text-xs text-slate-500 mt-1">Meets board eligibility (≥75%)</p>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Score vs Class Average Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Subject-Wise Marks vs Class Average</h3>
              <p className="text-xs text-slate-400">Benchmarked across Class 10</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
              Term 1
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', borderColor: '#e2e8f0' }} />
                <Bar dataKey="score" name="Your Score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="classAverage" name="Class Average" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GPA Progression Trend Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">GPA Progression Across Assessments</h3>
              <p className="text-xs text-slate-400">Track academic improvement trajectory</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              Upward Trend
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gpaTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="term" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[3.5, 4.0]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', borderColor: '#e2e8f0' }} />
                <Line type="monotone" dataKey="gpa" name="GPA" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: '#4f46e5' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Official Scorecard Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Subject Breakdown & Coursework Credits</h3>
          <span className="text-xs font-semibold text-slate-500">18 Total Credits</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Subject & Code</th>
                <th className="py-3 px-4">Faculty</th>
                <th className="py-3 px-4">Credits</th>
                <th className="py-3 px-4">Marks Obtained</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {scorecardTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-slate-900">
                    <div>{row.subject}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{row.code}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{row.teacher}</td>
                  <td className="py-3.5 px-4 font-mono">{row.credits}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.marks}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700">
                      {row.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
