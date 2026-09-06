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
  AlertCircle,
  RefreshCw,
  Percent,
  Send,
  Layers
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
  const [applyLatePenalty, setApplyLatePenalty] = useState(false);

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
    setApplyLatePenalty(sub.status === 'late');
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmissionToGrade) return;

    let finalScore = Number(gradeScore);
    if (applyLatePenalty) {
      finalScore = Math.max(0, Math.round(finalScore * 0.9)); // 10% late deduction
    }

    evaluateSubmission(selectedSubmissionToGrade.id, finalScore, teacherFeedback);
    setSelectedSubmissionToGrade(null);
  };

  const handleRequestResubmission = () => {
    if (!selectedSubmissionToGrade) return;
    evaluateSubmission(
      selectedSubmissionToGrade.id,
      0,
      `RESUBMISSION REQUESTED: ${teacherFeedback || 'Please review steps 3 and 4 and upload an updated solution PDF.'}`
    );
    addToast(
      'Resubmission Requested',
      `Sent revision request to ${selectedSubmissionToGrade.studentName}.`,
      'info'
    );
    setSelectedSubmissionToGrade(null);
  };

  const handleBulkPublishGrades = () => {
    addToast(
      'Grades Published',
      'All evaluated assignment scores published to student and parent gradebooks.',
      'success'
    );
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <FileCheck2 className="w-4 h-4" /> Coursework & Homework Evaluator
          </div>
          <h1 className="text-2xl font-black tracking-tight">Assignments & Submissions Engine</h1>
          <p className="text-sm text-slate-300 mt-1">
            Publish homework tasks, grade student solutions, request resubmissions, and bulk publish grades.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleBulkPublishGrades}
            className="px-4 py-2.5 bg-indigo-500/20 border border-indigo-400/30 hover:bg-indigo-500/30 text-indigo-200 font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-4 h-4 text-indigo-400" /> Bulk Publish Grades
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Task
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeTab === 'submissions'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Evaluation Queue ({teacherSubmissions.filter((s) => s.status === 'pending').length} Pending)
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeTab === 'manage'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Published Tasks ({assignments.length})
        </button>
      </div>

      {/* Evaluation Queue Table Tab */}
      {activeTab === 'submissions' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Student Solution Submissions</h3>
            <span className="text-xs text-slate-500">{teacherSubmissions.length} Total Submissions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">Student</th>
                  <th className="py-3.5 px-4">Class & Batch</th>
                  <th className="py-3.5 px-4">Uploaded Solution</th>
                  <th className="py-3.5 px-4">Turned In</th>
                  <th className="py-3.5 px-4">Score</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {teacherSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={sub.studentAvatar}
                          alt={sub.studentName}
                          className="w-8 h-8 rounded-2xl object-cover ring-2 ring-slate-100"
                        />
                        <span>{sub.studentName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      {sub.studentGrade} - {sub.studentSection}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => addToast('File Downloaded', sub.fileName || 'Solution.pdf', 'info')}
                        className="text-xs font-mono font-bold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        {sub.fileName}
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] font-medium">{sub.submittedAt}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {sub.score !== undefined ? `${sub.score} / ${sub.maxScore}` : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={sub.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleOpenGradeModal(sub)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          sub.status === 'pending'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
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
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {asg.grade} • {asg.subject}
                  </span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Due {asg.dueDate}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{asg.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{asg.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  {asg.totalSubmissions} of {asg.totalStudents} Submitted
                </span>
                <span className="font-extrabold text-indigo-600">{asg.maxScore} Max Marks</span>
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
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Student Solution File:</span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-slate-800">
                  {selectedSubmissionToGrade.fileName}
                </span>
                <button
                  type="button"
                  onClick={() => addToast('Opening Preview', 'Displaying solution document.', 'info')}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Preview Document
                </button>
              </div>
              {selectedSubmissionToGrade.notes && (
                <p className="text-slate-600 italic">
                  "{selectedSubmissionToGrade.notes}"
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Marks Awarded (Max: {selectedSubmissionToGrade.maxScore})
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  max={selectedSubmissionToGrade.maxScore}
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full p-2.5 text-xs font-bold font-mono border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 w-full">
                  <input
                    type="checkbox"
                    checked={applyLatePenalty}
                    onChange={(e) => setApplyLatePenalty(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600"
                  />
                  <span>Apply 10% Late Penalty</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teacher Feedback & Guidance
              </label>
              <textarea
                rows={3}
                required
                value={teacherFeedback}
                onChange={(e) => setTeacherFeedback(e.target.value)}
                placeholder="Give constructive feedback on working steps, derivations, diagrams..."
                className="w-full p-3 text-xs border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleRequestResubmission}
                className="px-4 py-2 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Request Resubmission</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubmissionToGrade(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Save Evaluation
                </button>
              </div>
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
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class / Grade</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
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
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
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
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Max Marks</label>
                <input
                  type="number"
                  required
                  value={newMaxScore}
                  onChange={(e) => setNewMaxScore(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>
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
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-xs"
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
