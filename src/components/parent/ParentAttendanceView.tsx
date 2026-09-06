import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  CalendarCheck2,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Send,
  AlertTriangle
} from 'lucide-react';

export const ParentAttendanceView: React.FC = () => {
  const { selectedChild, leaveRequests, submitLeaveRequest, addToast } = useLms();
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Leave Request Form state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reasonCategory, setReasonCategory] = useState<'sick_leave' | 'family_event' | 'medical_appointment' | 'personal'>('sick_leave');
  const [reasonDetails, setReasonDetails] = useState('');

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reasonDetails.trim()) return;

    submitLeaveRequest({
      studentId: selectedChild.id,
      studentName: selectedChild.name,
      startDate,
      endDate,
      reasonCategory,
      reasonDetails
    });

    setIsLeaveModalOpen(false);
    setReasonDetails('');
  };

  return (
    <div id="parent-attendance-view" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Attendance Record & Leave Requests
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor daily roll-call status, monthly calendar logs, and submit absence excuse notes for {selectedChild.name}.
          </p>
        </div>

        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Submit Absence Excuse Note
        </button>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Total Attendance</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">{selectedChild.attendancePercentage}%</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">142 / 150 Days Present</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Absent Days</span>
          <h3 className="text-2xl font-black text-rose-600 mt-1">5 Days</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">4 Excused • 1 Unexcused</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Late Arrivals</span>
          <h3 className="text-2xl font-black text-amber-600 mt-1">3 Days</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Bus Delay Recorded</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Leave Requests</span>
          <h3 className="text-2xl font-black text-indigo-600 mt-1">{leaveRequests.length} Submitted</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Class Teacher Approved</p>
        </div>
      </div>

      {/* Submitted Absence Notes Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Submitted Leave Requests & Excuse Notes</h3>

        <div className="space-y-3">
          {leaveRequests.map((req) => (
            <div key={req.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Dates: {req.startDate} to {req.endDate}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold uppercase text-[10px]">
                    {req.reasonCategory.replace('_', ' ')}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold capitalize text-[10px]">
                  {req.status}
                </span>
              </div>
              <p className="text-xs text-slate-600">"{req.reasonDetails}"</p>
              {req.teacherRemarks && (
                <p className="text-[11px] text-indigo-700 font-semibold">Teacher Remark: {req.teacherRemarks}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leave Request Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Submit Absence Excuse Note</h3>
              <button onClick={() => setIsLeaveModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason Category</label>
                <select
                  value={reasonCategory}
                  onChange={(e) => setReasonCategory(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none"
                >
                  <option value="sick_leave">Medical / Sick Leave</option>
                  <option value="family_event">Family Event</option>
                  <option value="medical_appointment">Doctor Appointment</option>
                  <option value="personal">Personal Reason</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason Details & Notes</label>
                <textarea
                  required
                  rows={3}
                  value={reasonDetails}
                  onChange={(e) => setReasonDetails(e.target.value)}
                  placeholder="Explain reason for absence..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Submit Excuse Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
