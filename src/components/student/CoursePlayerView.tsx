import React, { useState, useEffect } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  CheckCircle2,
  Circle,
  FileText,
  Download,
  MessageSquare,
  ArrowLeft,
  BookOpen,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';

export const CoursePlayerView: React.FC = () => {
  const {
    courses,
    activeCourseId,
    activeLessonId,
    setActiveLessonId,
    setActiveTab,
    toggleLessonCompleted,
    addToast
  } = useLms();

  const course = courses.find((c) => c.id === activeCourseId) || courses[0];

  // Find active lesson
  let currentLesson =
    course.chapters.flatMap((ch) => ch.lessons).find((l) => l.id === activeLessonId) ||
    course.chapters[0]?.lessons[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(35);
  const [playbackRate, setPlaybackRate] = useState<'1x' | '1.25x' | '1.5x' | '2x'>('1x');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'notes' | 'discussion'>('overview');
  const [discussionQuestions, setDiscussionQuestions] = useState([
    {
      id: 'q_1',
      author: 'Aarav Patel',
      time: '2 days ago',
      question: 'In series circuits, why is the current identical across every resistor regardless of their individual resistance values?',
      replies: [
        {
          author: 'Dr. Sunita Rao (Teacher)',
          time: 'Yesterday',
          text: 'Because there is only one continuous path for electric charge to flow! Conservation of charge dictates that charge cannot accumulate at junctions in a single loop.'
        }
      ]
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    ch_1: true,
    ch_2: true,
    ch_3: true
  });

  // Simulated playback timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 800);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleToggleComplete = () => {
    if (currentLesson) {
      toggleLessonCompleted(course.id, currentLesson.id);
      addToast(
        currentLesson.completed ? 'Lesson Marked Incomplete' : 'Lesson Completed',
        `Progress updated for "${currentLesson.title}"`,
        'info'
      );
    }
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setDiscussionQuestions((prev) => [
      ...prev,
      {
        id: 'q_' + Date.now(),
        author: 'Aarav Patel',
        time: 'Just now',
        question: newQuestionText.trim(),
        replies: []
      }
    ]);
    setNewQuestionText('');
    addToast('Question Submitted', 'Dr. Sunita Rao and peers will be notified.', 'success');
  };

  const toggleChapterAccordion = (chId: string) => {
    setExpandedChapters((prev) => ({ ...prev, [chId]: !prev[chId] }));
  };

  return (
    <div id="course-player-view" className="space-y-6">
      {/* Back button and breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('courses')}
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Courses
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{course.grade}</span>
          <span>•</span>
          <span className="font-semibold text-indigo-600">{course.subject}</span>
        </div>
      </div>

      {/* Main Grid: Player on Left, Chapters on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Video Player & Sub-tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Simulated Video Player Box */}
          <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative select-none">
            {/* Simulated Video Canvas Frame */}
            <div className="relative aspect-video w-full flex items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/80 overflow-hidden">
              {/* Educational Simulation Graphic */}
              <div className="absolute inset-0 flex items-center justify-center p-8 opacity-90">
                <div className="w-full max-w-md h-44 rounded-2xl border border-indigo-500/30 bg-indigo-950/40 backdrop-blur-xs p-5 flex flex-col justify-between text-indigo-100 relative">
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
                    <span>CIRCUIT_SCHEMATIC_SIM_10</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE LAB
                    </span>
                  </div>

                  {/* Visual circuit graphic representation */}
                  <div className="flex items-center justify-around my-auto">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-lg bg-indigo-600/60 border border-indigo-400 flex items-center justify-center font-bold text-xs text-white">
                        R₁
                      </div>
                      <span className="text-[10px] text-slate-300 mt-1">4.0 Ω</span>
                    </div>
                    <div className="w-12 h-0.5 bg-indigo-400/80 relative">
                      <div
                        className="absolute w-2 h-2 rounded-full bg-amber-400 top-1/2 -translate-y-1/2"
                        style={{ left: `${(playbackProgress * 2) % 100}%` }}
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-lg bg-indigo-600/60 border border-indigo-400 flex items-center justify-center font-bold text-xs text-white">
                        R₂
                      </div>
                      <span className="text-[10px] text-slate-300 mt-1">6.0 Ω</span>
                    </div>
                    <div className="w-12 h-0.5 bg-indigo-400/80" />
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-lg bg-violet-600/60 border border-violet-400 flex items-center justify-center font-bold text-xs text-white">
                        R_eq
                      </div>
                      <span className="text-[10px] text-emerald-300 mt-1">10.0 Ω</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                    <span>V = 12.0 V</span>
                    <span>I_total = 1.20 A</span>
                  </div>
                </div>
              </div>

              {/* Big Play Button Overlay if paused */}
              {!isPlaying && (
                <button
                  id="btn-player-play-overlay"
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer z-10"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-white space-y-2.5">
              {/* Scrub Progress Bar */}
              <div
                className="w-full bg-slate-800 h-1.5 rounded-full cursor-pointer overflow-hidden relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = Math.round((clickX / rect.width) * 100);
                  setPlaybackProgress(newPercent);
                }}
              >
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-150"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>

              {/* Controls layout */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    id="btn-player-play-pause"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:text-indigo-400 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current" />
                    )}
                  </button>
                  <button
                    onClick={() => setPlaybackProgress(0)}
                    className="p-1 hover:text-indigo-400 transition-colors"
                    title="Rewind to start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-[11px] font-mono">
                      {Math.floor((playbackProgress * 18.5) / 100)}:15 /{' '}
                      {currentLesson?.duration || '18:20'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Speed toggle */}
                  <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-[10px] font-bold">
                    {(['1x', '1.25x', '1.5x', '2x'] as const).map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setPlaybackRate(rate)}
                        className={`px-1.5 py-0.5 rounded ${
                          playbackRate === rate ? 'bg-indigo-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        {rate}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      addToast('Theater Mode', 'Player expanded to container width', 'info');
                    }}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Header and Mark as Completed button */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                {course.title}
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                {currentLesson?.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Instructor: {course.instructorName} • Duration: {currentLesson?.duration}
              </p>
            </div>

            <button
              id="btn-mark-lesson-complete"
              onClick={handleToggleComplete}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                currentLesson?.completed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {currentLesson?.completed ? 'Completed ✓' : 'Mark as Completed'}
            </button>
          </div>

          {/* Sub-Tabs: Overview / Study Notes / Discussion */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
            <div className="flex border-b border-slate-100 bg-slate-50/60 px-5 pt-3">
              <button
                onClick={() => setActiveSubTab('overview')}
                className={`pb-3 px-3 text-xs font-bold border-b-2 transition-colors ${
                  activeSubTab === 'overview'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Key Concepts & Summary
              </button>
              <button
                onClick={() => setActiveSubTab('notes')}
                className={`pb-3 px-3 text-xs font-bold border-b-2 transition-colors ${
                  activeSubTab === 'notes'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Study Materials & PDF Notes
              </button>
              <button
                onClick={() => setActiveSubTab('discussion')}
                className={`pb-3 px-3 text-xs font-bold border-b-2 transition-colors ${
                  activeSubTab === 'discussion'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Class Q&A Discussion ({discussionQuestions.length})
              </button>
            </div>

            <div className="p-6">
              {activeSubTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentLesson?.description}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Target Learning Outcomes:
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>Derive formula for equivalent resistance in series and parallel networks.</li>
                      <li>Calculate branch currents and potential drop across individual resistors.</li>
                      <li>Apply Joule's law of heating (H = I²Rt) to household appliances.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSubTab === 'notes' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-rose-100 text-rose-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Class10_Physics_Ch2_Electricity_Formula_Sheet.pdf
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          2.4 MB • Prepared by Dr. Sunita Rao
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => addToast('Download Started', 'Formula sheet downloaded.', 'success')}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
              )}

              {activeSubTab === 'discussion' && (
                <div className="space-y-5">
                  {/* Post new question */}
                  <form onSubmit={handlePostQuestion} className="flex gap-2">
                    <input
                      type="text"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="Ask a clarifying question to the teacher or batch..."
                      className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" /> Post
                    </button>
                  </form>

                  {/* Questions thread */}
                  <div className="space-y-4">
                    {discussionQuestions.map((q) => (
                      <div key={q.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{q.author}</span>
                          <span className="text-slate-400">{q.time}</span>
                        </div>
                        <p className="text-xs text-slate-700">{q.question}</p>

                        {q.replies.map((reply, i) => (
                          <div key={i} className="pl-3 border-l-2 border-indigo-400 mt-2 space-y-1">
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="font-bold text-indigo-700">{reply.author}</span>
                              <span className="text-slate-400">{reply.time}</span>
                            </div>
                            <p className="text-xs text-slate-600">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Course Syllabus & Chapters Navigator */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Course Syllabus
              </h3>
              <span className="text-xs font-bold text-indigo-600">{course.progress}%</span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-4">
              <div
                className="bg-indigo-600 h-1.5 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            {/* Chapters Accordion */}
            <div className="space-y-3">
              {course.chapters.map((chapter) => {
                const isExpanded = expandedChapters[chapter.id] !== false;
                return (
                  <div
                    key={chapter.id}
                    className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/30"
                  >
                    <button
                      onClick={() => toggleChapterAccordion(chapter.id)}
                      className="w-full p-3 bg-slate-50 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-100/80 transition-colors"
                    >
                      <span className="line-clamp-1">{chapter.title}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="divide-y divide-slate-100 bg-white">
                        {chapter.lessons.map((lesson) => {
                          const isActive = currentLesson?.id === lesson.id;
                          return (
                            <div
                              key={lesson.id}
                              onClick={() => setActiveLessonId(lesson.id)}
                              className={`p-3 flex items-start gap-2.5 cursor-pointer transition-colors ${
                                isActive
                                  ? 'bg-indigo-50/60 text-indigo-900 font-semibold'
                                  : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLessonCompleted(course.id, lesson.id);
                                }}
                                className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                              >
                                {lesson.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                              </button>

                              <div className="flex-1 min-w-0">
                                <p className="text-xs leading-snug line-clamp-2">{lesson.title}</p>
                                <span className="text-[10px] text-slate-400 mt-1 block">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
