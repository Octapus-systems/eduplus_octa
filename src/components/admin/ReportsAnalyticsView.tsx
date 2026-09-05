import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  FileSpreadsheet,
  Download,
  TrendingUp,
  BarChart3,
  Calendar,
  CheckCircle2,
  Users,
  Award,
  DollarSign
} from 'lucide-react';

export const ReportsAnalyticsView: React.FC = () => {
  const { addToast } = useLms();
  const [selectedReportType, setSelectedReportType] = useState<'academic' | 'attendance' | 'financial' | 'faculty'>('academic');

  const academicData = [
    { grade: 'Class 9', passRate: 94, avgScore: 79 },
    { grade: 'Class 10', passRate: 96, avgScore: 82 },
    { grade: 'Class 11', passRate: 91, avgScore: 76 },
    { grade: 'Class 12', passRate: 98, avgScore: 84 }
  ];

  const feeCategoryData = [
    { name: 'Tuition', value: 68000, color: '#4f46e5' },
    { name: 'Science Lab', value: 14500, color: '#059669' },
    { name: 'Sports', value: 8500, color: '#f59e0b' },
    { name: 'Library & Tech', value: 9200, color: '#8b5cf6' }
  ];

  const facultyRatings = [
    { name: 'Dr. Sunita Rao', dept: 'Physics', rating: 4.9, completion: '94%' },
    { name: 'Prof. Ramesh Nambiar', dept: 'Mathematics', rating: 4.8, completion: '92%' },
    { name: 'Dr. Meenakshi Joshi', dept: 'Chemistry', rating: 4.9, completion: '90%' },
    { name: 'Anand Kothari', dept: 'Computer Science', rating: 4.9, completion: '96%' }
  ];

  const handleExport = () => {
    addToast('Report Exported', 'CSV analytics dataset generated and downloaded.', 'success');
  };

  return (
    <div id="reports-analytics-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Audit & Analytics Reports
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate executive compliance summaries, financial audits, and academic pass rates
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export Report (CSV / PDF)
        </button>
      </div>

      {/* Report Categories Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'academic', label: 'Academic Performance' },
          { id: 'attendance', label: 'Attendance & Cohorts' },
          { id: 'financial', label: 'Financial & Collections' },
          { id: 'faculty', label: 'Faculty Effectiveness' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedReportType(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedReportType === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Content based on selected report */}
      {selectedReportType === 'academic' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Pass Rate vs Average Marks by Tier</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={academicData} margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', borderColor: '#e2e8f0' }} />
                  <Bar dataKey="passRate" name="Pass Rate %" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avgScore" name="Average Score %" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {selectedReportType === 'financial' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Fee Income Distribution by Head</h3>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feeCategoryData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {feeCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Revenue Head Totals</h3>
            <div className="space-y-3">
              {feeCategoryData.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-slate-800">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    ${item.value.toLocaleString()}.00
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedReportType === 'faculty' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Faculty Academic Effectiveness & Syllabus Velocity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5">Faculty</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Student Feedback Rating</th>
                  <th className="py-3 px-4">Term Syllabus Completed</th>
                  <th className="py-3 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {facultyRatings.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-slate-900">{f.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{f.dept}</td>
                    <td className="py-3.5 px-4 font-bold text-amber-600">★ {f.rating} / 5.0</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-600">{f.completion}</td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        On Track
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedReportType === 'attendance' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Campus Attendance Rates by Section</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] block font-bold">Class 10-A</span>
              <h4 className="text-xl font-extrabold text-emerald-600 mt-1">96.4%</h4>
              <p className="text-[10px] text-slate-500">42 Enrolled</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] block font-bold">Class 10-B</span>
              <h4 className="text-xl font-extrabold text-emerald-600 mt-1">94.8%</h4>
              <p className="text-[10px] text-slate-500">40 Enrolled</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] block font-bold">Class 12-Science</span>
              <h4 className="text-xl font-extrabold text-emerald-600 mt-1">97.2%</h4>
              <p className="text-[10px] text-slate-500">38 Enrolled</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] block font-bold">Class 12-Commerce</span>
              <h4 className="text-xl font-extrabold text-indigo-600 mt-1">93.5%</h4>
              <p className="text-[10px] text-slate-500">35 Enrolled</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
