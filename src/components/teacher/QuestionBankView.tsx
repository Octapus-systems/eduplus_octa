import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { QuizQuestion } from '../../types';
import { Modal } from '../common/Modal';
import {
  HelpCircle,
  Plus,
  Search,
  CheckCircle2,
  Filter,
  Trash2,
  Edit2,
  Sparkles,
  BookOpen,
  Send
} from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const { exams, addToast } = useLms();
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Collect all questions across existing exams or custom questions
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    ...exams.flatMap((e) => e.questions),
    {
      id: 'qb_1',
      question: 'Which of the following materials is typically classified as an ohmic conductor under standard conditions?',
      options: ['Copper wire at constant temp', 'Silicon diode in forward bias', 'Neon gas discharge tube', 'Filament bulb at high heat'],
      correctOptionIndex: 0,
      points: 2
    },
    {
      id: 'qb_2',
      question: 'When two resistors of resistance 6 Ω and 3 Ω are connected in parallel, what is the equivalent resistance?',
      options: ['9.0 Ω', '2.0 Ω', '18.0 Ω', '4.5 Ω'],
      correctOptionIndex: 1,
      points: 2
    },
    {
      id: 'qb_3',
      question: 'According to Fleming’s Left Hand Rule, what direction does the middle finger represent?',
      options: ['Direction of Magnetic Field', 'Direction of Electric Current', 'Direction of Induced Force', 'Direction of Charge Velocity'],
      correctOptionIndex: 1,
      points: 2
    }
  ]);

  // Form states
  const [newQuestionText, setNewQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [newPoints, setNewPoints] = useState(2);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !optA.trim() || !optB.trim()) return;

    const newQ: QuizQuestion = {
      id: 'q_' + Date.now(),
      question: newQuestionText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim() || 'Option C', optD.trim() || 'Option D'],
      correctOptionIndex: Number(correctIndex),
      points: Number(newPoints)
    };

    setQuestions((prev) => [newQ, ...prev]);
    setIsAddModalOpen(false);
    setNewQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    addToast('Question Saved', 'Question added to institutional bank.', 'success');
  };

  return (
    <div id="teacher-question-bank-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Question Bank & Assessment Builder
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Curate verified multiple-choice, numerical, and conceptual questions for test papers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add New Question
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Items</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{questions.length} Questions</h3>
          <p className="text-[11px] text-slate-500">Across Class 10 & 12 Science</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Assessment Sets</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{exams.length} Quizzes</h3>
          <p className="text-[11px] text-slate-500">Scheduled for this term</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Question Integrity</span>
          <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">100% Verified</h3>
          <p className="text-[11px] text-slate-500">Faculty peer-reviewed</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{q.question}</h4>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Points: {q.points} • Objective Multiple Choice
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md shrink-0">
                Correct: Option {String.fromCharCode(65 + q.correctOptionIndex)}
              </span>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
              {q.options.map((opt, oIdx) => (
                <div
                  key={oIdx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    oIdx === q.correctOptionIndex
                      ? 'bg-emerald-50/60 border-emerald-300 font-semibold text-emerald-900'
                      : 'bg-slate-50/50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[11px] text-slate-400">
                      {String.fromCharCode(65 + oIdx)}.
                    </span>
                    <span>{opt}</span>
                  </div>
                  {oIdx === q.correctOptionIndex && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Question to Question Bank"
          subtitle="Define prompt, choices, and set the designated key"
        >
          <form onSubmit={handleAddQuestion} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Question Statement
              </label>
              <textarea
                rows={2}
                required
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="e.g. State the relationship between potential difference, current, and resistance..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Four Options</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Option A"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <input
                  type="text"
                  required
                  placeholder="Option B"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <input
                  type="text"
                  placeholder="Option C"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correct Answer Key
                </label>
                <select
                  value={correctIndex}
                  onChange={(e) => setCorrectIndex(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value={0}>Option A is Correct</option>
                  <option value={1}>Option B is Correct</option>
                  <option value={2}>Option C is Correct</option>
                  <option value={3}>Option D is Correct</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Points</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={newPoints}
                  onChange={(e) => setNewPoints(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Add to Question Bank
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
