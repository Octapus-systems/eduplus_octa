import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import {
  FileCheck2,
  Clock,
  UploadCloud,
  FileText,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
  Paperclip,
  Download
} from 'lucide-react';

export const AssignmentsView: React.FC = () => {
  const { assignments, submitAssignment, saveAssignmentDraft, addToast } = useLms();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'draft' | 'submitted' | 'evaluated' | 'overdue'>('all');
  const [selectedAsgForSubmission, setSelectedAsgForSubmission] = useState<any | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');

  const filtered = assignments.filter((a) => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  const handleOpenSubmitModal = (asg: any) => {
    setSelectedAsgForSubmission(asg);
    setUploadedFileName(asg.draftFileName || '');
    setSubmissionNotes(asg.draftNotes || '');
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsgForSubmission) return;
    const finalFileName = uploadedFileName || `${selectedAsgForSubmission.title.replace(/\s+/g, '_')}_Solution.pdf`;
    submitAssignment(selectedAsgForSubmission.id, finalFileName, submissionNotes);
    setSelectedAsgForSubmission(null);
  };

  const handleSaveDraft = () => {
    if (!selectedAsgForSubmission) return;
    const finalFileName = uploadedFileName || `${selectedAsgForSubmission.title.replace(/\s+/g, '_')}_Draft.pdf`;
    saveAssignmentDraft(selectedAsgForSubmission.id, finalFileName, submissionNotes);
    setSelectedAsgForSubmission(null);
  };

  return (
    <div id="student-assignments-view" className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Assignments & Coursework Tasks
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Submit homework, save drafts, track deadlines, and view faculty feedback
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
          {(['all', 'pending', 'draft', 'submitted', 'evaluated', 'overdue'] as const).map((st) => (
            <button
              key={st}
              id={`filter-asg-${st}`}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filtered.map((asg) => (
          <div
            key={asg.id}
            id={`asg-card-${asg.id}`}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs hover:border-indigo-200 transition-all flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {asg.subject} • {asg.grade}
                  </span>
                  <StatusBadge status={asg.status || 'pending'} size="sm" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{asg.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                  {asg.description}
                </p>
              </div>

              <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0 text-right">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">{asg.maxScore}</span> Maximum Points
                </div>
                <div className={`text-xs font-bold flex items-center gap-1 ${asg.status === 'overdue' ? 'text-rose-600' : 'text-amber-600'}`}>
                  <Clock className="w-3.5 h-3.5" /> {asg.status === 'overdue' ? 'Expired' : `Due ${asg.dueDate}`}
                </div>
              </div>
            </div>

            {/* Draft Banner if draft */}
            {asg.status === 'draft' && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-800 flex items-center justify-between">
                <div>
                  <span className="font-bold">Draft Saved locally: </span>
                  <span>{asg.draftFileName || 'Solution_Draft.pdf'}</span>
                </div>
                <button
                  onClick={() => handleOpenSubmitModal(asg)}
                  className="font-bold underline hover:text-amber-900 text-xs"
                >
                  Resume & Turn In
                </button>
              </div>
            )}

            {/* Instructions checklist */}
            {asg.instructions && asg.instructions.length > 0 && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-600">
                <p className="font-semibold text-slate-800 mb-1">Submission Guidelines:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  {asg.instructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Attachments & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {asg.attachments?.map((att, i) => (
                  <button
                    key={i}
                    onClick={() => addToast('Downloading Attachment', att.name, 'info')}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                    <span>{att.name}</span>
                    <Download className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {(asg.status === 'pending' || asg.status === 'draft') && (
                  <button
                    id={`btn-submit-work-${asg.id}`}
                    onClick={() => handleOpenSubmitModal(asg)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4" />
                    {asg.status === 'draft' ? 'Resume & Submit' : 'Submit Homework'}
                  </button>
                )}

                {asg.status === 'submitted' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Submitted for evaluation
                    </span>
                    <button
                      onClick={() => handleOpenSubmitModal(asg)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Resubmit
                    </button>
                  </div>
                )}

                {asg.status === 'evaluated' && asg.mySubmission && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 font-extrabold text-sm">
                        {asg.mySubmission.score} / {asg.mySubmission.maxScore}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-900">Graded by Faculty</p>
                        <p className="text-[11px] text-emerald-800 mt-0.5 italic">
                          "{asg.mySubmission.teacherFeedback}"
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      Evaluated on {asg.mySubmission.submittedAt}
                    </span>
                  </div>
                )}

                {asg.status === 'overdue' && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
                    Submission Window Closed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {selectedAsgForSubmission && (
        <Modal
          isOpen={!!selectedAsgForSubmission}
          onClose={() => setSelectedAsgForSubmission(null)}
          title={`Submit Assignment: ${selectedAsgForSubmission.title}`}
          subtitle={`${selectedAsgForSubmission.subject} • Max Score: ${selectedAsgForSubmission.maxScore} pts`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 rounded-2xl p-6 text-center cursor-pointer transition-colors"
            >
              <UploadCloud className="w-10 h-10 text-indigo-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">
                {uploadedFileName ? uploadedFileName : 'Drag & drop your solution PDF or documents'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports PDF, DOCX, PNG up to 25MB
              </p>
              <label className="mt-3 inline-block px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-lg shadow-xs cursor-pointer hover:bg-slate-50">
                Browse Files
                <input type="file" className="hidden" onChange={handleFileSelect} />
              </label>
            </div>

            {/* Solution / Student Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notes for Teacher (Optional)
              </label>
              <textarea
                rows={3}
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="Mention any questions, specific problem approaches, or clarifications..."
                className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Save as Draft
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAsgForSubmission(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-confirm-submit-asg"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Turn In Assignment
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
