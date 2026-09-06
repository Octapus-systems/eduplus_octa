import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Save,
  Search,
  Filter,
  Users,
  Bell,
  MessageSquare,
  AlertTriangle,
  Award,
  Sparkles
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { attendance, toggleAttendanceStatus, markAllAttendancePresent, addToast } = useLms();
  const [selectedDate, setSelectedDate] = useState('2026-09-05');
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [studentSearch, setStudentSearch] = useState('');
  const [studentRemarks, setStudentRemarks] = useState<Record<string, string>>({
    std_01: 'Active Class Participation',
    std_03: 'Arrived 18 mins late - Bus delay'
  });
  const [notifiedParents, setNotifiedParents] = useState<Record<string, boolean>>({
    std_05: true
  });

  const records = attendance.records.filter((r) =>
    r.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    r.rollNumber.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const presentCount = attendance.records.filter((r) => r.status === 'present').length;
  const absentCount = attendance.records.filter((r) => r.status === 'absent').length;
  const lateCount = attendance.records.filter((r) => r.status === 'late').length;
  const totalCount = attendance.records.length;
  const attendanceRate = Math.round((presentCount / (totalCount || 1)) * 100);

  const handleSaveRegister = () => {
    addToast(
      'Attendance & Remarks Saved',
      `Class 10-A register saved for ${selectedDate}. Notifications synced with parent portal.`,
      'success'
    );
  };

  const toggleNotifyParent = (studentId: string, studentName: string) => {
    const isCurrentlyNotified = !!notifiedParents[studentId];
    setNotifiedParents((prev) => ({
      ...prev,
      [studentId]: !isCurrentlyNotified
    }));
    if (!isCurrentlyNotified) {
      addToast(
        'Parent Alert Sent',
        `SMS & Portal alert dispatched to ${studentName}'s parent.`,
        'info'
      );
    }
  };

  const handleRemarkChange = (studentId: string, remarkText: string) => {
    setStudentRemarks((prev) => ({
      ...prev,
      [studentId]: remarkText
    }));
  };

  return (
    <div id="teacher-attendance-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <UserCheck className="w-4 h-4" /> Student Attendance & Conduct Audit
          </div>
          <h1 className="text-2xl font-black tracking-tight">Daily Roll Call & Student Remarks</h1>
          <p className="text-sm text-slate-300 mt-1">
            Record period attendance, log conduct & academic remarks, and trigger instant SMS alerts to parents.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={markAllAttendancePresent}
            className="px-4 py-2.5 bg-emerald-500/20 border border-emerald-400/30 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mark All Present
          </button>

          <button
            onClick={handleSaveRegister}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-emerald-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Register & Alert Parents
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Present Today</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">
            {presentCount} / {totalCount}
          </h3>
          <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">{attendanceRate}% Rate</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Absent</span>
          <h3 className="text-2xl font-black text-rose-600 mt-1">{absentCount}</h3>
          <p className="text-[11px] font-semibold text-rose-600 mt-0.5">Parent SMS ready</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Tardy / Late</span>
          <h3 className="text-2xl font-black text-amber-600 mt-1">{lateCount}</h3>
          <p className="text-[11px] font-semibold text-amber-600 mt-0.5">Logged with excuse</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Low Attendance Alert</span>
          <h3 className="text-2xl font-black text-indigo-600 mt-1">1 Student</h3>
          <p className="text-[11px] font-semibold text-indigo-600 mt-0.5">Ishaan Verma (&lt; 85%)</p>
        </div>
      </div>

      {/* Register Controls & Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
        {/* Filters bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs font-bold bg-white border border-slate-200 py-2.5 px-3 rounded-2xl focus:ring-2 focus:ring-emerald-500 shadow-xs text-slate-800"
            >
              <option value="Class 10-A">Class 10 • Section A (Physics)</option>
              <option value="Class 10-B">Class 10 • Section B (Physics)</option>
              <option value="Class 12-A">Class 12 • Section A (Science)</option>
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-bold bg-white border border-slate-200 py-2 px-3 rounded-2xl focus:ring-2 focus:ring-emerald-500 shadow-xs text-slate-800"
            />
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              placeholder="Search student or roll no..."
              className="pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 shadow-xs w-60 text-slate-800"
            />
          </div>
        </div>

        {/* Attendance Register Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5">Roll No.</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4 text-center">Status Toggles</th>
                <th className="py-3.5 px-4">Behavior / Academic Remark</th>
                <th className="py-3.5 px-5 text-right">Parent Notification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {records.map((student) => {
                const isNotified = !!notifiedParents[student.studentId];
                return (
                  <tr key={student.studentId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-mono font-extrabold text-slate-500">
                      {student.rollNumber}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-2xl object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <span>{student.name}</span>
                          {student.name === 'Ishaan Verma' && (
                            <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-100 text-amber-700">
                              Low Attendance
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => toggleAttendanceStatus(student.studentId, 'present')}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                            student.status === 'present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Present
                        </button>

                        <button
                          onClick={() => toggleAttendanceStatus(student.studentId, 'absent')}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                            student.status === 'absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-rose-50'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" /> Absent
                        </button>

                        <button
                          onClick={() => toggleAttendanceStatus(student.studentId, 'late')}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                            student.status === 'late'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" /> Late
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <input
                        type="text"
                        placeholder="Add behavior or academic remark..."
                        value={studentRemarks[student.studentId] || ''}
                        onChange={(e) => handleRemarkChange(student.studentId, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => toggleNotifyParent(student.studentId, student.name)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-all ${
                          isNotified
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>{isNotified ? 'Alert Dispatched' : 'Notify Parent'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
