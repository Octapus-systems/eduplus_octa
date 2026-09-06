import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  GraduationCap,
  BarChart3,
  BookOpen,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ParentAcademicsView: React.FC = () => {
  const { selectedChild, addToast } = useLms();
  const [selectedTerm, setSelectedTerm] = useState('Term 1 (Active)');
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);

  const subjectScores = [
    { subject: 'Physics & Science', score: 92, grade: 'A+', classAvg: 78, teacher: 'Dr. Sunita Rao', trend: '+4%' },
    { subject: 'Mathematics', score: 88, grade: 'A', classAvg: 74, teacher: 'Prof. David Miller', trend: '+6%' },
    { subject: 'English Literature', score: 95, grade: 'A+', classAvg: 81, teacher: 'Elena Rostova', trend: '+2%' },
    { subject: 'Computer Science', score: 94, grade: 'A+', classAvg: 83, teacher: 'Vikram Sharma', trend: '+5%' },
    { subject: 'Social Studies', score: 86, grade: 'A', classAvg: 76, teacher: 'Maria Garcia', trend: '+1%' }
  ];

  return (
    <div id="parent-academics-view" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Performance & Report Cards
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Subject-wise score metrics, class average comparisons, term-wise progress, and printable report cards for {selectedChild.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="p-2 text-xs font-semibold border border-slate-200 rounded-xl bg-white focus:outline-none"
          >
            <option value="Term 1 (Active)">Term 1 (2026–2027)</option>
            <option value="Term 2 (Upcoming)">Term 2 (Upcoming)</option>
          </select>

          <button
            onClick={() => {
              setIsReportCardOpen(true);
              addToast('Report Card Generated', `Opening official report card for ${selectedChild.name}`, 'info');
            }}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" /> Download Report Card
          </button>
        </div>
      </div>

      {/* Top Academic Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-lg">
            {selectedChild.gpa}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cumulative GPA</span>
            <h4 className="text-base font-extrabold text-slate-900">Rank #3 in Class {selectedChild.grade}</h4>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Top 5% Academic Standing</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-lg">
            91%
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Term Weighted Score</span>
            <h4 className="text-base font-extrabold text-slate-900">+5.2% vs Class Avg</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Evaluated across 5 Core Subjects</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-extrabold text-lg">
            A+
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Grade Rating</span>
            <h4 className="text-base font-extrabold text-slate-900">Distinction Honors</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Conduct: {selectedChild.conductRating}</p>
          </div>
        </div>
      </div>

      {/* Subject-Wise Performance Table & Progress */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Subject Breakdown & Class Comparisons</h3>

        <div className="space-y-4">
          {subjectScores.map((item) => (
            <div key={item.subject} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm">{item.subject}</span>
                  <span className="text-slate-500 ml-2">• Instructor: {item.teacher}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-500">Class Avg: {item.classAvg}%</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                    {item.score}% ({item.grade})
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden flex">
                  <div
                    style={{ width: `${item.score}%` }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0%</span>
                  <span>Class Average: {item.classAvg}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Drawer for Official Report Card */}
      {isReportCardOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  EP
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">EduPulse Academy • Official Progress Report</h3>
                  <p className="text-xs text-slate-500">Academic Session 2026–2027 • Term 1 Evaluation</p>
                </div>
              </div>
              <button
                onClick={() => setIsReportCardOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Student Meta */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500">Student Name:</span> <strong className="text-slate-900">{selectedChild.name}</strong>
              </div>
              <div>
                <span className="text-slate-500">Roll Number:</span> <strong className="text-slate-900">{selectedChild.rollNumber}</strong>
              </div>
              <div>
                <span className="text-slate-500">Grade & Section:</span> <strong className="text-slate-900">{selectedChild.grade} - {selectedChild.section}</strong>
              </div>
              <div>
                <span className="text-slate-500">Class Teacher:</span> <strong className="text-slate-900">{selectedChild.classTeacherName}</strong>
              </div>
            </div>

            {/* Report Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5 text-center">Marks</th>
                    <th className="p-2.5 text-center">Grade</th>
                    <th className="p-2.5 text-center">Class Avg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {subjectScores.map((s) => (
                    <tr key={s.subject}>
                      <td className="p-2.5 text-slate-900 font-bold">{s.subject}</td>
                      <td className="p-2.5 text-center text-emerald-600 font-bold">{s.score}</td>
                      <td className="p-2.5 text-center font-bold">{s.grade}</td>
                      <td className="p-2.5 text-center text-slate-500">{s.classAvg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsReportCardOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToast('Download Started', `Downloading Report_Card_${selectedChild.name}.pdf`, 'success');
                  setIsReportCardOpen(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Save PDF Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
