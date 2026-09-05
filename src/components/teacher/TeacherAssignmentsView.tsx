import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Assignment, AssignmentSubmission } from '../../types';
import { allGradesList } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import {
  FileCheck2,
  Plus,
  Clock,
  CheckCircle2,
  Users,
  Award,
  Download,
  Search,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export const TeacherAssignmentsView: React.FC = () => {
  const {
    assignments,
    teacherSubmissions,
    createAssignment,
    evaluateSubmission,
    currentUser,
    addToast
  } = useLms();

  const [activeTab, setActiveTab] = useState<'submissions' | 'manage'>('submissions');
  const [selectedSubmissionToGrade, setSelectedSubmissionToGrade] = useState<AssignmentSubmission | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Grade evaluation inputs
  const [gradeScore, setGradeScore] = useState<number>(24);
  const [teacherFeedback, setTeacherFeedback] = useState<string>('');

  // Create Assignment inputs
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newGrade, setNewGrade] = useState('Class 10');
  const [newDueDate, setNewDueDate] = useState('Sep 22, 2026');
  const [newMaxScore, setNewMaxScore] = useState(25);
  const [newDescription, setNewDescription] = useState('');
  const [newInstructions, setNewInstructions] = useState('Show all formulas.\nDraw circuit schematics.\nUpload clear PDF.');

  const handleOpenGradeModal = (sub: AssignmentSubmission) => {
    setSelectedSubmissionToGrade(sub);
    setGradeScore(sub.score || sub.maxScore - 2);
    setTeacherFeedback(sub.teacherFeedback || 'Well-structured solutions with clear formulas and diagrams.');
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmissionToGrade) return;
    evaluateSubmission(selectedSubmissionToGrade.id, Number(gradeScore), teacherFeedback);
    setSelectedSubmissionToGrade(null);
  };

  const handleCreateAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createAssignment({
      title: newTitle.trim(),
      courseId: 'crs_10_phy',
      courseName: `${newGrade} ${newSubject}`,
      subject: newSubject,
      grade: newGrade as any,
      dueDate: newDueDate,
      maxScore: Number(newMaxScore),
      description: newDescription || 'Standard homework task for classroom review.',
      instructions: newInstructions.split('\n').filter((s) => s.trim().length > 0)
    });

    setNewTitle('');
    setNewDescription('');
    setIsCreateModalOpen(false);
  };

  return (
    <div id="teacher-assignments-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Assignments & Student Submissions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish homework tasks and evaluate submitted student solution files
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-tab switcher */}
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'submissions'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Evaluation Queue ({teacherSubmissions.filter((s) => s.status === 'pending').length} Pending)
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'manage'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Created Tasks ({assignments.length})
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Create Task
          </button>
        </div>
      </div>

      {/* Evaluation Queue Table Tab */}
      {activeTab === 'submissions' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Student Solution Submissions</h3>
            <span className="text-xs text-slate-500">{teacherSubmissions.length} Total Submissions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5">Student</th>
                  <th className="py-3 px-4">Class & Batch</th>
                  <th className="py-3 px-4">Uploaded Solution</th>
                  <th className="py-3 px-4">Turned In</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {teacherSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={sub.studentAvatar}
                          alt={sub.studentName}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <span>{sub.studentName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {sub.studentGrade} - {sub.studentSection}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => addToast('File Downloaded', sub.fileName || 'Solution.pdf', 'info')}
                        className="text-xs font-mono text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        {sub.fileName}
                        <Download className="w-3 h-3 text-slate-400" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{sub.submittedAt}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {sub.score !== undefined ? `${sub.score} / ${sub.maxScore}` : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={sub.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        id={`btn-grade-sub-${sub.id}`}
                        onClick={() => handleOpenGradeModal(sub)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          sub.status === 'pending'
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {sub.status === 'pending' ? 'Evaluate' : 'Edit Grade'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manage Created Tasks Tab */}
      {activeTab === 'manage' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map((asg) => (
            <div
              key={asg.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {asg.grade} • {asg.subject}
                  </span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Due {asg.dueDate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{asg.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{asg.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  {asg.totalSubmissions} of {asg.totalStudents} Submitted
                </span>
                <span className="font-bold text-indigo-600">{asg.maxScore} Max Marks</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grade Evaluation Modal */}
      {selectedSubmissionToGrade && (
        <Modal
          isOpen={!!selectedSubmissionToGrade}
          onClose={() => setSelectedSubmissionToGrade(null)}
          title={`Evaluate Submission: ${selectedSubmissionToGrade.studentName}`}
          subtitle={`${selectedSubmissionToGrade.studentGrade}-${selectedSubmissionToGrade.studentSection} • Max Score: ${selectedSubmissionToGrade.maxScore} pts`}
        >
          <form onSubmit={handleGradeSubmit} className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 block text-[10px]">Student Solution Attachment:</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono font-bold text-slate-800">
                  {selectedSubmissionToGrade.fileName}
                </span>
                <button
                  type="button"
                  onClick={() => addToast('Opening preview', 'Displaying solution document.', 'info')}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Preview File
                </button>
              </div>
              {selectedSubmissionToGrade.notes && (
                <p className="mt-2 text-slate-600 italic">
                  "{selectedSubmissionToGrade.notes}"
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Awarded Marks (Out of {selectedSubmissionToGrade.maxScore})
              </label>
              <input
                type="number"
                required
                min={0}
                max={selectedSubmissionToGrade.maxScore}
                value={gradeScore}
                onChange={(e) => setGradeScore(Number(e.target.value))}
                className="w-full p-2.5 text-xs font-bold font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teacher Feedback & Guidance
              </label>
              <textarea
                rows={3}
                required
                value={teacherFeedback}
                onChange={(e) => setTeacherFeedback(e.target.value)}
                placeholder="Give constructive feedback on working steps, derivations, diagrams..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedSubmissionToGrade(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Save Evaluation
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Class Assignment"
          subtitle="Publish homework and assign rubric grading parameters"
        >
          <form onSubmit={handleCreateAssignmentSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Problems on Series-Parallel Resistors and Joule's Heating"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class / Grade</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="text"
                  required
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="e.g. Sep 25, 2026, 5:00 PM"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Max Marks</label>
                <input
                  type="number"
                  required
                  value={newMaxScore}
                  onChange={(e) => setNewMaxScore(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Description</label>
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Give an overview of the chapter problems assigned..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Guidelines / Instructions (One per line)
              </label>
              <textarea
                rows={3}
                value={newInstructions}
                onChange={(e) => setNewInstructions(e.target.value)}
                placeholder="Guidelines for students..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Publish Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
