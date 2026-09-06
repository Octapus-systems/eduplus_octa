import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  HelpCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  MessageSquare,
  Paperclip,
  Video,
  Send,
  UserCheck,
  FileText,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { StudentDoubt } from '../../types';

export const TeacherDoubtsView: React.FC = () => {
  const { studentDoubts, resolveStudentDoubt, addToast } = useLms();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [selectedDoubt, setSelectedDoubt] = useState<StudentDoubt | null>(null);
  const [replyText, setReplyText] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const filteredDoubts = studentDoubts.filter((d) => {
    const matchesSearch =
      d.studentName.toLowerCase().includes(search.toLowerCase()) ||
      d.questionText.toLowerCase().includes(search.toLowerCase()) ||
      d.topic.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    const matchesSubject = subjectFilter === 'All' || d.subject === subjectFilter;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const pendingCount = studentDoubts.filter((d) => d.status === 'pending').length;
  const resolvedCount = studentDoubts.filter((d) => d.status === 'resolved').length;

  const handleOpenDoubt = (doubt: StudentDoubt) => {
    setSelectedDoubt(doubt);
    setReplyText(doubt.teacherReply || '');
    setAttachedFile(null);
  };

  const handleSendReply = () => {
    if (!selectedDoubt) return;
    if (!replyText.trim()) {
      addToast('Input Required', 'Please enter your explanation before resolving.', 'warning');
      return;
    }
    resolveStudentDoubt(selectedDoubt.id, replyText);
    setSelectedDoubt(null);
  };

  return (
    <div id="teacher-doubts-root" className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-violet-300 font-bold text-xs uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" /> Student Support & Q&A Forum
          </div>
          <h1 className="text-2xl font-black tracking-tight">Doubt Clearing Hub</h1>
          <p className="text-sm text-slate-300 mt-1">
            Review, answer, and clear academic queries submitted by your enrolled students.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Pending Doubts</p>
              <p className="text-lg font-black text-white">{pendingCount}</p>
            </div>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-300">Resolved</p>
              <p className="text-lg font-black text-white">{resolvedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards & AI Assistant Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Urgent Doubts (&lt; 2h)</p>
            <p className="text-xl font-extrabold text-slate-900">{pendingCount} Waiting</p>
            <p className="text-[11px] font-medium text-amber-600">Requires teacher response</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Avg Resolution Speed</p>
            <p className="text-xl font-extrabold text-slate-900">18 Minutes</p>
            <p className="text-[11px] font-medium text-emerald-600">Top 5% Faculty Response</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-200">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-indigo-900">AI Suggested Responses</p>
            <p className="text-sm font-bold text-indigo-700">Auto-Generates Draft Solution</p>
            <p className="text-[11px] font-medium text-indigo-600">Click any doubt to try</p>
          </div>
        </div>
      </div>

      {/* Controls & Filters */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, topic, or question keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Status:</span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === 'pending'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === 'resolved'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Resolved ({resolvedCount})
              </button>
            </div>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {filteredDoubts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No Student Doubts Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              All student questions in this filter have been answered or no match was found.
            </p>
          </div>
        ) : (
          filteredDoubts.map((doubt) => (
            <div
              key={doubt.id}
              onClick={() => handleOpenDoubt(doubt)}
              className={`p-5 rounded-3xl bg-white border transition-all cursor-pointer hover:shadow-md ${
                doubt.status === 'pending'
                  ? 'border-amber-200 bg-amber-50/20 hover:border-amber-400'
                  : 'border-slate-200/80 hover:border-indigo-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <img
                    src={doubt.studentAvatar}
                    alt={doubt.studentName}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900">{doubt.studentName}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-600">
                        {doubt.grade}-{doubt.section}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-700">
                        {doubt.subject}
                      </span>
                      {doubt.status === 'pending' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-700 border border-amber-300 animate-pulse">
                          Pending Response
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-700 border border-emerald-300">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      Topic: <span className="text-indigo-600">{doubt.topic}</span>
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 italic">
                      "{doubt.questionText}"
                    </p>

                    {doubt.attachmentName && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-[11px] font-medium text-slate-700">
                        <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                        <span>{doubt.attachmentName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0">
                  <span className="text-[11px] font-medium text-slate-400">{doubt.submittedAt}</span>
                  <button className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs">
                    <span>{doubt.status === 'pending' ? 'Answer Doubt' : 'View Answer'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Answer Doubt Drawer / Modal */}
      {selectedDoubt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoubt.studentAvatar}
                  alt={selectedDoubt.studentName}
                  className="w-10 h-10 rounded-2xl object-cover ring-2 ring-white/20"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedDoubt.studentName}'s Question</h3>
                  <p className="text-xs text-slate-400">
                    {selectedDoubt.grade} • {selectedDoubt.subject} • Topic: {selectedDoubt.topic}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoubt(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Question Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <p className="text-[11px] font-extrabold uppercase text-indigo-600 mb-1">Student Doubt Text</p>
                <p className="text-sm text-slate-800 font-medium italic">"{selectedDoubt.questionText}"</p>
                {selectedDoubt.attachmentName && (
                  <div className="mt-3 p-2.5 rounded-xl bg-white border border-indigo-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      {selectedDoubt.attachmentName}
                    </span>
                    <button
                      onClick={() => addToast('Opening File', `Viewing ${selectedDoubt.attachmentName}`, 'info')}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      Preview Attachment
                    </button>
                  </div>
                )}
              </div>

              {/* AI Assistant Suggestion Button */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-600 animate-spin" />
                  <span className="text-xs font-bold text-violet-900">AI Teacher Assistant Recommendation</span>
                </div>
                <button
                  onClick={() => {
                    setReplyText(
                      `Here is the step-by-step resolution:\n1. Apply Ohm's Law (V = IR).\n2. Note that non-ideal batteries possess internal resistance 'r'.\n3. Terminal Voltage V_term = E - Ir. As current I increases, Ir voltage drop across internal resistance increases, causing V_term to decrease.`
                    );
                    addToast('AI Draft Applied', 'Sample explanation inserted into reply box.', 'info');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Insert Draft
                </button>
              </div>

              {/* Response Editor */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Teacher Explanation / Solution Notes
                </label>
                <textarea
                  rows={5}
                  placeholder="Type clear step-by-step explanation or formula guidance for the student..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Attachments & Link Toolbar */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setAttachedFile('Solution_Diagram_Derivation.pdf');
                    addToast('File Attached', 'Solution diagram PDF added to response.', 'info');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{attachedFile || 'Attach Solution PDF'}</span>
                </button>

                <button
                  onClick={() => {
                    addToast('Video Linked', 'Recorded Video Lecture #14 linked in reply.', 'info');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Video className="w-3.5 h-3.5 text-rose-600" />
                  <span>Link Video Lecture</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedDoubt(null)}
                className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleSendReply}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-200 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Publish Response & Resolve</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
