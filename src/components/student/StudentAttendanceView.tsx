import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  CalendarCheck2,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar as CalendarIcon,
  TrendingUp,
  AlertCircle,
  Download,
  Filter
} from 'lucide-react';

export const StudentAttendanceView: React.FC = () => {
  const { studentAttendanceLog, addToast } = useLms();
  const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'absent' | 'late'>('all');

  const filteredLog = studentAttendanceLog.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  const subjectBreakdown = [
    { subject: 'Class 10 Physics', present: 24, total: 25, percentage: 96.0 },
    { subject: 'Class 10 Mathematics', present: 29, total: 30, percentage: 96.7 },
    { subject: 'Class 10 Chemistry', present: 19, total: 20, percentage: 95.0 },
    { subject: 'Class 10 Computer Science', present: 22, total: 22, percentage: 100.0 },
    { subject: 'Class 10 English', present: 17, total: 18, percentage: 94.4 }
  ];

  return (
    <div id="student-attendance-view" className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarCheck2 className="w-6 h-6 text-emerald-600" />
            Attendance Record & Audit Trail
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Academic Year 2026–2027 • Term 1 daily attendance status and subject breakdown
          </p>
        </div>

        <button
          onClick={() => addToast('Attendance Log Exported', 'Monthly attendance summary saved as PDF.', 'success')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Download Attendance Statement
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overall Rate</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">96.4%</h3>
          <p className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Exceeds 75% threshold
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Days Present</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">48 Days</h3>
          <p className="text-xs text-slate-500 mt-1">Out of 50 Working Days</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Approved Leave</span>
          <h3 className="text-2xl font-extrabold text-rose-600 mt-1">1 Day</h3>
          <p className="text-xs text-slate-500 mt-1">Medical leave verified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tardy / Late</span>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-1">1 Instance</h3>
          <p className="text-xs text-slate-500 mt-1">Bus delay excused</p>
        </div>
      </div>

      {/* Main Grid: Subject breakdown on left, Daily log on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Subject breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Subject-Wise Attendance Breakdown</h3>

          <div className="space-y-4">
            {subjectBreakdown.map((subj, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{subj.subject}</span>
                  <span className="font-bold text-emerald-700">{subj.percentage}%</span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${subj.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{subj.present} / {subj.total} sessions</span>
                  <span>Minimum req. 75%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Cols: Detailed Daily Log */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Daily Attendance History Log</h3>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              {(['all', 'present', 'absent', 'late'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    statusFilter === st
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredLog.map((log, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2 hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">{log.date}</span>
                    <span className="text-xs text-slate-400">({log.dayOfWeek})</span>
                  </div>

                  {log.status === 'present' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Present
                    </span>
                  )}
                  {log.status === 'absent' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Absent
                    </span>
                  )}
                  {log.status === 'late' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Tardy / Late
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 italic">{log.remark}</p>

                {/* Session pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60">
                  {log.subjectSessions.map((sess: any, sIdx: number) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 font-medium"
                    >
                      {sess.subject}: <span className="font-bold text-slate-900">{sess.time}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
