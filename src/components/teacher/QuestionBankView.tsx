import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { QuizQuestion, Exam } from '../../types';
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
  Send,
  ClipboardList,
  Clock,
  Shuffle,
  AlertCircle,
  Award,
  Layers
} from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const { exams, createExam, addToast } = useLms();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQuizWizardOpen, setIsQuizWizardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'bank' | 'wizard' | 'analysis'>('bank');

  // Collect questions with difficulty tags
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    ...exams.flatMap((e) => e.questions),
    {
      id: 'qb_1',
      question: 'Which of the following materials is typically classified as an ohmic conductor under standard conditions?',
      options: ['Copper wire at constant temp', 'Silicon diode in forward bias', 'Neon gas discharge tube', 'Filament bulb at high heat'],
      correctOptionIndex: 0,
      points: 2,
      difficulty: 'Easy',
      subject: 'Physics',
      negativeMarks: 0.5
    },
    {
      id: 'qb_2',
      question: 'When two resistors of resistance 6 Ω and 3 Ω are connected in parallel, what is the equivalent resistance?',
      options: ['9.0 Ω', '2.0 Ω', '18.0 Ω', '4.5 Ω'],
      correctOptionIndex: 1,
      points: 3,
      difficulty: 'Medium',
      subject: 'Physics',
      negativeMarks: 0.5
    },
    {
      id: 'qb_3',
      question: 'According to Fleming’s Left Hand Rule, what direction does the middle finger represent?',
      options: ['Direction of Magnetic Field', 'Direction of Electric Current', 'Direction of Induced Force', 'Direction of Charge Velocity'],
      correctOptionIndex: 1,
      points: 2,
      difficulty: 'Easy',
      subject: 'Physics',
      negativeMarks: 0
    },
    {
      id: 'qb_4',
      question: 'In a quadratic polynomial ax² + bx + c = 0, if alpha and beta are the roots, what is alpha * beta?',
      options: ['c / a', '-b / a', 'b² - 4ac', '-c / a'],
      correctOptionIndex: 0,
      points: 4,
      difficulty: 'Difficult',
      subject: 'Mathematics',
      negativeMarks: 1.0
    }
  ]);

  // Question Form states
  const [newQuestionText, setNewQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [newPoints, setNewPoints] = useState(2);
  const [newDifficulty, setNewDifficulty] = useState<'Easy' | 'Medium' | 'Difficult'>('Medium');

  // Quiz Wizard states
  const [quizTitle, setQuizTitle] = useState('');
  const [quizSubject, setQuizSubject] = useState('Physics');
  const [quizGrade, setQuizGrade] = useState<'Class 10'>('Class 10');
  const [quizType, setQuizType] = useState<'Weekly Quiz' | 'Unit Test' | 'Midterm' | 'Final'>('Weekly Quiz');
  const [quizDuration, setQuizDuration] = useState(30);
  const [quizPassMarks, setQuizPassMarks] = useState(12);
  const [randomizeQs, setRandomizeQs] = useState(true);
  const [showInstantScore, setShowInstantScore] = useState(true);
  const [selectedQIds, setSelectedQIds] = useState<string[]>([]);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !optA.trim() || !optB.trim()) return;

    const newQ: QuizQuestion = {
      id: 'q_' + Date.now(),
      question: newQuestionText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim() || 'Option C', optD.trim() || 'Option D'],
      correctOptionIndex: Number(correctIndex),
      points: Number(newPoints),
      difficulty: newDifficulty,
      subject: quizSubject
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

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle.trim()) {
      addToast('Input Required', 'Please enter a quiz title.', 'warning');
      return;
    }

    const quizQuestions = questions.filter((q) => selectedQIds.includes(q.id));
    const totalM = quizQuestions.reduce((acc, curr) => acc + curr.points, 0) || 20;

    createExam({
      title: quizTitle,
      subject: quizSubject,
      grade: quizGrade,
      date: 'Tomorrow, 10:00 AM',
      durationMinutes: quizDuration,
      totalMarks: totalM,
      passingMarks: quizPassMarks,
      status: 'upcoming',
      questions: quizQuestions.length > 0 ? quizQuestions : questions.slice(0, 3),
      examType: quizType,
      randomizeQuestions: randomizeQs,
      showScoreImmediately: showInstantScore
    });

    setIsQuizWizardOpen(false);
    setQuizTitle('');
    setSelectedQIds([]);
  };

  const toggleSelectQ = (id: string) => {
    setSelectedQIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div id="teacher-question-bank-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-1">
            <ClipboardList className="w-4 h-4" /> Assessment & Question Repository
          </div>
          <h1 className="text-2xl font-black tracking-tight">Question Bank & Quiz Creator</h1>
          <p className="text-sm text-slate-300 mt-1">
            Curate verified questions, build timed online quizzes, set negative marking rules, and analyze item difficulty.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsQuizWizardOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Create New Quiz
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Question
          </button>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('bank')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeTab === 'bank'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Question Bank Repository ({questions.length})
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeTab === 'analysis'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Item Difficulty & Accuracy Analysis
        </button>
      </div>

      {/* Questions List */}
      {activeTab === 'bank' && (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3 hover:border-emerald-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 leading-snug">{q.question}</h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        {q.points} Points
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                        q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {q.difficulty || 'Medium'} Difficulty
                      </span>
                      {q.negativeMarks && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                          -{q.negativeMarks} Neg. Mark
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shrink-0">
                  Key: Option {String.fromCharCode(65 + (q.correctOptionIndex ?? 0))}
                </span>
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                {q.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-2.5 rounded-2xl border flex items-center justify-between ${
                      oIdx === (q.correctOptionIndex ?? 0)
                        ? 'bg-emerald-50/70 border-emerald-300 font-bold text-emerald-900'
                        : 'bg-slate-50/50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[11px] text-slate-400">
                        {String.fromCharCode(65 + oIdx)}.
                      </span>
                      <span>{opt}</span>
                    </div>
                    {oIdx === (q.correctOptionIndex ?? 0) && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-slate-900">Question Item & Class Accuracy Statistics</h2>
          <p className="text-xs text-slate-500">
            Psychometric analytics evaluating question clarity and student discrimination index.
          </p>

          <div className="space-y-4 pt-2">
            {questions.map((q, idx) => {
              const accuracyPct = idx === 0 ? 88 : idx === 1 ? 64 : idx === 2 ? 92 : 45;
              return (
                <div key={q.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Q{idx + 1}: {q.question.slice(0, 75)}...</span>
                    <span className="text-xs font-extrabold text-indigo-600">{accuracyPct}% Correct</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        accuracyPct >= 80 ? 'bg-emerald-500' : accuracyPct >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${accuracyPct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Difficulty: {q.difficulty || 'Medium'}</span>
                    <span>Discrimination Index: 0.74 (Strong)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Question to Bank"
          subtitle="Set question text, 4 choices, and correct key"
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
                placeholder="e.g. Calculate the total power dissipated in a 12V circuit..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Four Choices</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Option A"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl"
                />
                <input
                  type="text"
                  required
                  placeholder="Option B"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Option C"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Correct Key</label>
                <select
                  value={correctIndex}
                  onChange={(e) => setCorrectIndex(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                <select
                  value={newDifficulty}
                  onChange={(e) => setNewDifficulty(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Difficult">Difficult</option>
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
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
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
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Add Question
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Quiz Creation Wizard Modal */}
      {isQuizWizardOpen && (
        <Modal
          isOpen={isQuizWizardOpen}
          onClose={() => setIsQuizWizardOpen(false)}
          title="Create Online Quiz / Exam"
          subtitle="Configure assessment settings, select questions, and publish to class"
        >
          <form onSubmit={handleCreateQuiz} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">Quiz Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Unit Quiz: Electricity & Current Calculations"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full p-3 text-xs border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <select
                  value={quizSubject}
                  onChange={(e) => setQuizSubject(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="Physics">Physics</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Class</label>
                <select
                  value={quizGrade}
                  onChange={(e) => setQuizGrade(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="Class 10">Class 10</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="Weekly Quiz">Weekly Quiz</option>
                  <option value="Unit Test">Unit Test</option>
                  <option value="Midterm">Midterm</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Limit (mins)</label>
                <input
                  type="number"
                  value={quizDuration}
                  onChange={(e) => setQuizDuration(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Passing Score</label>
                <input
                  type="number"
                  value={quizPassMarks}
                  onChange={(e) => setQuizPassMarks(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            {/* Quiz Rules Toggles */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-slate-800">Randomize Question Order for Students</span>
                <input
                  type="checkbox"
                  checked={randomizeQs}
                  onChange={(e) => setRandomizeQs(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-slate-800">Show Score Immediately Upon Submission</span>
                <input
                  type="checkbox"
                  checked={showInstantScore}
                  onChange={(e) => setShowInstantScore(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600"
                />
              </label>
            </div>

            {/* Select Questions from Bank */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-slate-800">
                Select Questions from Repository ({selectedQIds.length} Selected)
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
                {questions.map((q) => (
                  <label
                    key={q.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedQIds.includes(q.id)
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={selectedQIds.includes(q.id)}
                        onChange={() => toggleSelectQ(q.id)}
                        className="w-4 h-4 rounded text-indigo-600"
                      />
                      <span>{q.question.slice(0, 60)}...</span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-slate-100 px-2 py-0.5 rounded-md">
                      {q.points} pts
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsQuizWizardOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-indigo-200"
              >
                Schedule & Publish Quiz
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
