import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Exam } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import {
  Calendar,
  Plus,
  Clock,
  Award,
  FileSpreadsheet,
  CheckCircle2,
  Ticket,
  Printer,
  Download,
  AlertCircle
} from 'lucide-react';

export const ExamManagementView: React.FC = () => {
  const { exams, addToast } = useLms();
  const [isDatesheetModalOpen, setIsDatesheetModalOpen] = useState(false);
  const [selectedHallTicket, setSelectedHallTicket] = useState<Exam | null>(null);

  return (
    <div id="exam-management-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Exam Schedules & Datesheets
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Conduct centralized examinations, issue student admit cards, and configure grading rubrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast('Datesheet Exported', 'Term 1 datesheet generated as printable PDF.', 'success')}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" /> Export Datesheet
          </button>

          <button
            onClick={() => setIsDatesheetModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Schedule Term Exam
          </button>
        </div>
      </div>

      {/* Grading Rules Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-950">
        <div>
          <span className="font-bold text-indigo-900 uppercase tracking-wider text-[10px] block">
            Academic Board Standard:
          </span>
          <p className="mt-0.5 text-indigo-800">
            A+: 90–100% • A: 80–89% • B: 70–79% • C: 60–69% • Passing Cutoff: 40% (Proctored)
          </p>
        </div>
        <span className="px-2.5 py-1 bg-white text-indigo-700 font-bold rounded-lg shadow-xs self-start sm:self-auto shrink-0">
          CBSE / ICSE Compliant
        </span>
      </div>

      {/* Scheduled Exams Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Term Datesheet & Results Status</h3>
          <span className="text-xs text-slate-500">{exams.length} Scheduled Papers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Assessment Title</th>
                <th className="py-3 px-4">Subject & Class</th>
                <th className="py-3 px-4">Exam Date</th>
                <th className="py-3 px-4">Duration & Marks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Hall Ticket & Results</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {exams.map((ex) => (
                <tr key={ex.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-slate-900">
                    <div>{ex.title}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{ex.examType}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {ex.grade} • {ex.subject}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{ex.date}</td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {ex.durationMinutes} mins • {ex.totalMarks} Marks
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={ex.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedHallTicket(ex)}
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Ticket className="w-3.5 h-3.5" /> Admit Card
                      </button>

                      <button
                        onClick={() =>
                          addToast(
                            'Results Published',
                            `Official grade cards for ${ex.title} synced to student portal.`,
                            'success'
                          )
                        }
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs rounded-lg transition-colors"
                      >
                        Publish
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hall Ticket Modal */}
      {selectedHallTicket && (
        <Modal
          isOpen={!!selectedHallTicket}
          onClose={() => setSelectedHallTicket(null)}
          title="Official Candidate Hall Ticket / Admit Card"
          subtitle={`Examination: ${selectedHallTicket.title}`}
        >
          <div className="space-y-4">
            <div className="p-6 rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-indigo-50/20 space-y-4">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">EduPulse Board Examinations</h4>
                  <p className="text-[10px] text-slate-500">Admit Card • Term 1 Assessment</p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-white px-2 py-1 rounded-lg border border-indigo-200">
                  ROLL: 10A-102
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Candidate Name</span>
                  <span className="font-bold text-slate-900">Aarav Patel</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Class & Cohort</span>
                  <span className="font-bold text-slate-900">{selectedHallTicket.grade} - Sec A</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Subject & Code</span>
                  <span className="font-bold text-slate-900">{selectedHallTicket.subject}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Examination Hall</span>
                  <span className="font-bold text-slate-900">Block B • Hall #204</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
                <span>Date: {selectedHallTicket.date}</span>
                <span className="font-mono font-bold text-indigo-700">
                  Duration: {selectedHallTicket.durationMinutes} Minutes
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => addToast('Admit Card Downloaded', 'PDF copy generated.', 'success')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Download Printable Card
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Schedule Exam Modal */}
      {isDatesheetModalOpen && (
        <Modal
          isOpen={isDatesheetModalOpen}
          onClose={() => setIsDatesheetModalOpen(false)}
          title="Schedule New Term Assessment"
          subtitle="Define syllabus, duration, marks, and candidate cohorts"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsDatesheetModalOpen(false);
              addToast('Assessment Scheduled', 'Entry added to campus datesheet.', 'success');
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Paper Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Class 10 Chemistry Midterm Theoretical Assessment"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                <input
                  type="text"
                  defaultValue="Class 10"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  defaultValue="Chemistry"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="text"
                  defaultValue="Sep 28, 2026"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  defaultValue={50}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsDatesheetModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Save Schedule
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
