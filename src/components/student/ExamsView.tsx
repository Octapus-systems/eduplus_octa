import React, { useState, useEffect } from 'react';
import { useLms } from '../../context/LmsContext';
import { Exam, QuizQuestion } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Flag,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const ExamsView: React.FC = () => {
  const {
    exams,
    activeExamId,
    setActiveExamId,
    isTakingExam,
    setIsTakingExam,
    submitExamAnswers,
    addToast
  } = useLms();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(45 * 60);
  const [examResult, setExamResult] = useState<{ score: number; total: number; percentage: number } | null>(null);

  const activeExam = exams.find((e) => e.id === activeExamId) || exams[0];

  // Countdown timer for ongoing exam
  useEffect(() => {
    let timer: any;
    if (isTakingExam && !examResult) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTakingExam, examResult]);

  const handleStartExam = (exam: Exam) => {
    setActiveExamId(exam.id);
    setIsTakingExam(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setTimeLeftSeconds(exam.durationMinutes * 60);
    setExamResult(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmitQuiz = () => {
    if (!activeExam) return;
    const result = submitExamAnswers(activeExam.id, selectedAnswers);
    setExamResult(result);

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    addToast(
      'Exam Submitted',
      `You scored ${result.score}/${result.total} (${result.percentage}%)`,
      'success'
    );
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // If student is currently taking an exam
  if (isTakingExam && activeExam && activeExam.questions.length > 0) {
    const question: QuizQuestion = activeExam.questions[currentQuestionIndex];
    const totalQuestions = activeExam.questions.length;
    const isAnswered = selectedAnswers[question.id] !== undefined;

    return (
      <div id="active-quiz-engine" className="space-y-6">
        {/* Top Test Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase">
              {activeExam.subject} • {activeExam.examType}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {activeExam.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer countdown */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-mono text-sm font-bold">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              <span>{formatTime(timeLeftSeconds)} Remaining</span>
            </div>

            <button
              id="btn-submit-exam-early"
              onClick={handleSubmitQuiz}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Result Summary Card if submitted */}
        {examResult ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-5 max-w-xl mx-auto shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Quiz Completed!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your answers have been graded against the official rubric.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-[11px] text-slate-500">Points</p>
                <p className="text-xl font-extrabold text-indigo-600">
                  {examResult.score} / {examResult.total}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Percentage</p>
                <p className="text-xl font-extrabold text-emerald-600">
                  {examResult.percentage}%
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Result</p>
                <p className="text-xl font-extrabold text-purple-600">
                  {examResult.percentage >= 50 ? 'Passed' : 'Needs Review'}
                </p>
              </div>
            </div>

            <button
              id="btn-return-exams-list"
              onClick={() => {
                setIsTakingExam(false);
                setExamResult(null);
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Return to Exams List
            </button>
          </div>
        ) : (
          /* Question View & Question Palette Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Question & Options */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
                  <span className="font-bold text-slate-700">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-indigo-600">{question.points} Points</span>
                    <button
                      onClick={() => toggleFlag(question.id)}
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                        flaggedQuestions[question.id]
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      {flaggedQuestions[question.id] ? 'Flagged' : 'Flag for Review'}
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <h3 className="text-base font-bold text-slate-900 mt-4 leading-snug">
                  {question.question}
                </h3>

                {/* Multiple Choice Options */}
                <div className="mt-6 space-y-3">
                  {question.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[question.id] === idx;
                    return (
                      <div
                        key={idx}
                        id={`quiz-option-${idx}`}
                        onClick={() => handleSelectOption(question.id, idx)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-500'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-xs font-medium text-slate-800">{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation bottom buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Finish & Submit Test
                  </button>
                )}
              </div>
            </div>

            {/* Right 1 Col: Question Navigator Palette */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Question Palette
              </h4>

              <div className="grid grid-cols-5 gap-2">
                {activeExam.questions.map((q, idx) => {
                  const answered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = currentQuestionIndex === idx;
                  const flagged = flaggedQuestions[q.id];

                  let style = 'bg-slate-100 text-slate-600 border-slate-200';
                  if (answered) style = 'bg-indigo-600 text-white border-indigo-600';
                  if (flagged) style = 'bg-amber-500 text-white border-amber-500';
                  if (isCurrent) style += ' ring-2 ring-indigo-300 ring-offset-1';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-10 rounded-xl text-xs font-bold border transition-all flex items-center justify-center cursor-pointer ${style}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-indigo-600" /> Answered
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-500" /> Flagged for Review
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300" /> Unanswered
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular Exams Directory View
  return (
    <div id="student-exams-view" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Online Exams & Quizzes
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access proctored term assessments, scheduled unit tests, and performance scorecards
          </p>
        </div>
      </div>

      {/* Upcoming & Graded Tests list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam) => {
          const isUpcoming = exam.status === 'upcoming';
          return (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {exam.subject} • {exam.grade}
                  </span>
                  <StatusBadge status={exam.status} size="sm" />
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{exam.title}</h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Schedule</span>
                    <span className="font-semibold text-slate-700">{exam.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Duration & Marks</span>
                    <span className="font-semibold text-slate-700">
                      {exam.durationMinutes} mins • {exam.totalMarks} Marks
                    </span>
                  </div>
                </div>

                {exam.score !== undefined && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-emerald-900">
                        Score: {exam.score} / {exam.totalMarks} ({exam.percentage}%)
                      </p>
                      <p className="text-[10px] text-emerald-700 mt-0.5">{exam.feedback}</p>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-800 bg-white px-2 py-1 rounded-lg shadow-xs">
                      Rank #{exam.rank}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {exam.questions.length} Objective Questions
                </span>

                {isUpcoming ? (
                  <button
                    id={`btn-take-quiz-${exam.id}`}
                    onClick={() => handleStartExam(exam)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Start Test Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartExam(exam)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Practice
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
