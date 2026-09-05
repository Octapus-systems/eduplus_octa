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
  Download
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { attendance, updateStudentAttendance, markAllPresent, addToast } = useLms();
  const [selectedDate, setSelectedDate] = useState('2026-09-05');
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [studentSearch, setStudentSearch] = useState('');

  const records = attendance.records.filter((r) =>
    r.studentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    r.rollNumber.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const presentCount = attendance.records.filter((r) => r.status === 'present').length;
  const absentCount = attendance.records.filter((r) => r.status === 'absent').length;
  const lateCount = attendance.records.filter((r) => r.status === 'late').length;
  const totalCount = attendance.records.length;
  const attendanceRate = Math.round((presentCount / (totalCount || 1)) * 100);

  const handleSaveRegister = () => {
    addToast(
      'Attendance Saved',
      `Class 10-A register saved for ${selectedDate}. Notification sent to parent portal.`,
      'success'
    );
  };

  return (
    <div id="teacher-attendance-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Daily Roll Call & Attendance Register
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Record period attendance, log tardiness, and synchronize with parent SMS/alerts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-mark-all-present"
            onClick={markAllPresent}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Mark All Present
          </button>

          <button
            id="btn-save-attendance"
            onClick={handleSaveRegister}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Register
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Present Today</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
            {presentCount} / {totalCount}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">{attendanceRate}% Rate</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Absent</span>
          <h3 className="text-2xl font-extrabold text-rose-600 mt-1">{absentCount}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Parent alert pending</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Tardy / Late</span>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-1">{lateCount}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Recorded with excuse</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Class Term Average</span>
          <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">94.8%</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Class 10-A Overall</p>
        </div>
      </div>

      {/* Register Controls & Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        {/* Filters bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
            >
              <option value="Class 10-A">Class 10 • Section A (Physics)</option>
              <option value="Class 10-B">Class 10 • Section B (Physics)</option>
              <option value="Class 12-A">Class 12 • Section A (Science)</option>
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs text-slate-700"
            />
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              placeholder="Search student or roll no..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs w-52"
            />
          </div>
        </div>

        {/* Attendance Register Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Roll No.</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Term Attendance</th>
                <th className="py-3 px-5 text-center">Status Toggles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {records.map((student) => (
                <tr key={student.studentId} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-500">
                    {student.rollNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.studentAvatar}
                        alt={student.studentName}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <span>{student.studentName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="font-semibold text-slate-800">
                      {student.status === 'absent' ? '91.2%' : '96.5%'}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateStudentAttendance(student.studentId, 'present')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          student.status === 'present'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Present
                      </button>

                      <button
                        onClick={() => updateStudentAttendance(student.studentId, 'absent')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          student.status === 'absent'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" /> Absent
                      </button>

                      <button
                        onClick={() => updateStudentAttendance(student.studentId, 'late')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          student.status === 'late'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" /> Late
                      </button>
                    </div>
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
