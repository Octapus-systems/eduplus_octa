import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Exam, GradeLevel } from '../../types';
import { allGradesList } from '../../data/mockData';
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
  AlertCircle,
  BarChart3,
  Search,
  Filter,
  Eye,
  Trash2
} from 'lucide-react';

export const ExamManagementView: React.FC = () => {
  const { exams, students, addToast } = useLms();
  const [examTypeFilter, setExamTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isDatesheetModalOpen, setIsDatesheetModalOpen] = useState(false);
  const [selectedHallTicket, setSelectedHallTicket] = useState<Exam | null>(null);
  const [selectedExamResultDetail, setSelectedExamResultDetail] = useState<Exam | null>(null);

  // New Exam Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Science');
  const [newGrade, setNewGrade] = useState<GradeLevel>('Class 10');
  const [newDate, setNewDate] = useState('Oct 15, 2026');
  const [newDuration, setNewDuration] = useState(90);
  const [newTotalMarks, setNewTotalMarks] = useState(100);
  const [newExamType, setNewExamType] = useState<'Midterm' | 'Final' | 'Unit Test' | 'Weekly Quiz'>('Midterm');

  const filteredExams = exams.filter((ex) => {
    const matchType = examTypeFilter === 'All Types' || ex.examType === examTypeFilter;
    const matchStatus = statusFilter === 'All Statuses' || ex.status === statusFilter;
    const matchSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.grade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addToast(`Scheduled ${newTitle} for ${newGrade}!`, 'success');
    setIsDatesheetModalOpen(false);
    setNewTitle('');
  };

  return (
    <div id="exam-management-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Exam Schedules & Datesheets
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Conduct centralized examinations, issue student admit cards, and inspect grade distributions
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

      {/* Grading Standard Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-950">
        <div>
          <span className="font-bold text-indigo-900 uppercase tracking-wider text-[10px] block">
            Academic Grading Scale Policy:
          </span>
          <p className="mt-0.5 text-indigo-800 font-medium">
            A+: 90–100% • A: 80–89% • B: 70–79% • C: 60–69% • Passing Cutoff: 40% (Proctored)
          </p>
        </div>
        <span className="px-2.5 py-1 bg-white text-indigo-700 font-bold rounded-lg shadow-xs self-start sm:self-auto shrink-0 border border-indigo-100">
          CBSE / ICSE Compliant
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={examTypeFilter}
            onChange={(e) => setExamTypeFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          >
            <option value="All Types">All Exam Types</option>
            <option value="Midterm">Midterm Exams</option>
            <option value="Final">Final Exams</option>
            <option value="Unit Test">Unit Tests</option>
            <option value="Weekly Quiz">Weekly Quizzes</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="graded">Graded & Published</option>
          </select>

          <span className="text-xs text-slate-400 font-medium ml-1">
            Showing {filteredExams.length} of {exams.length} papers
          </span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam, subject, grade..."
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs w-64"
          />
        </div>
      </div>

      {/* Scheduled Exams Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Assessment Title</th>
                <th className="py-3 px-4">Subject & Cohort</th>
                <th className="py-3 px-4">Exam Date</th>
                <th className="py-3 px-4">Duration & Marks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Actions & Results</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredExams.map((ex) => (
                <tr key={ex.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-slate-900">
                    <div>{ex.title}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{ex.examType}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {ex.grade} • <span className="font-bold text-indigo-600">{ex.subject}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{ex.date}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {ex.durationMinutes} mins • {ex.totalMarks} Marks
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={ex.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedHallTicket(ex)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                        title="Generate Admit Card"
                      >
                        <Ticket className="w-3.5 h-3.5 text-indigo-600" /> Admit Card
                      </button>

                      <button
                        onClick={() => setSelectedExamResultDetail(ex)}
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <BarChart3 className="w-3.5 h-3.5" /> Marks & Stats
                      </button>

                      <button
                        onClick={() =>
                          addToast(
                            'Results Published',
                            `Official grade cards for ${ex.title} synced to student portal.`,
                            'success'
                          )
                        }
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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
                  <p className="text-[10px] text-slate-500">Admit Card • Official Term Assessment</p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200">
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

              <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center justify-between text-xs font-medium">
                <span>Date: {selectedHallTicket.date}</span>
                <span className="font-mono font-bold text-indigo-700">
                  Duration: {selectedHallTicket.durationMinutes} Minutes
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => addToast('Admit Card Downloaded', 'PDF copy generated.', 'success')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Printable Card
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Marks & Performance Distribution Modal */}
      {selectedExamResultDetail && (
        <Modal
          isOpen={!!selectedExamResultDetail}
          onClose={() => setSelectedExamResultDetail(null)}
          title={`Exam Results & Score Distribution: ${selectedExamResultDetail.title}`}
          subtitle={`${selectedExamResultDetail.grade} • ${selectedExamResultDetail.subject}`}
        >
          <div className="space-y-5">
            {/* KPI Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100">
                <span className="text-[10px] font-bold text-indigo-500 uppercase block">Highest Score</span>
                <span className="text-xl font-extrabold text-indigo-700 font-mono">98 / 100</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-500 uppercase block">Class Average</span>
                <span className="text-xl font-extrabold text-emerald-700 font-mono">82.4%</span>
              </div>
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100">
                <span className="text-[10px] font-bold text-purple-500 uppercase block">Passing Rate</span>
                <span className="text-xl font-extrabold text-purple-700 font-mono">96.8%</span>
              </div>
            </div>

            {/* Candidate Result Records */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Candidate Score Breakdown
              </h4>
              <div className="max-h-56 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-2.5 px-4">Student</th>
                      <th className="py-2.5 px-3">Roll No.</th>
                      <th className="py-2.5 px-3">Score</th>
                      <th className="py-2.5 px-3">Grade Awarded</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {students
                      .filter((s) => s.grade === selectedExamResultDetail.grade)
                      .slice(0, 6)
                      .map((st, idx) => {
                        const marks = [94, 88, 76, 92, 84, 90][idx % 6];
                        const gradeLetter = marks >= 90 ? 'A+' : marks >= 80 ? 'A' : 'B';

                        return (
                          <tr key={st.id} className="hover:bg-slate-50/70">
                            <td className="py-2.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                              <img
                                src={st.avatar}
                                alt={st.name}
                                className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                              />
                              <span>{st.name}</span>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-slate-500">{st.rollNumber}</td>
                            <td className="py-2.5 px-3 font-bold text-indigo-600 font-mono">{marks} / 100</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                {gradeLetter}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedExamResultDetail(null)}
                className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Summary
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
          <form onSubmit={handleCreateExam} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Paper Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Class 10 Physics Midterm Theoretical Assessment"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Grade</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value as GradeLevel)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {allGradesList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Physics"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assessment Type</label>
                <select
                  value={newExamType}
                  onChange={(e) => setNewExamType(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Midterm">Midterm Exam</option>
                  <option value="Final">Final Exam</option>
                  <option value="Unit Test">Unit Test</option>
                  <option value="Weekly Quiz">Weekly Quiz</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Date</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. Oct 15, 2026"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Marks</label>
                <input
                  type="number"
                  value={newTotalMarks}
                  onChange={(e) => setNewTotalMarks(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono"
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
                Schedule Assessment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
