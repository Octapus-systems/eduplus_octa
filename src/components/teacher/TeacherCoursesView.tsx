import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Course, Chapter, Lesson } from '../../types';
import { Modal } from '../common/Modal';
import {
  BookOpen,
  Plus,
  Video,
  FileText,
  Clock,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Play
} from 'lucide-react';

export const TeacherCoursesView: React.FC = () => {
  const { courses, addToast } = useLms();
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [targetChapterId, setTargetChapterId] = useState<string>('');

  // Form states
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('20:00');
  const [newLessonDesc, setNewLessonDesc] = useState('');

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle.trim()) return;
    const newChapter: Chapter = {
      id: 'ch_' + Date.now(),
      title: newChapterTitle.trim(),
      lessons: []
    };
    setSelectedCourse((prev) => ({
      ...prev,
      chapters: [...prev.chapters, newChapter]
    }));
    setNewChapterTitle('');
    setIsAddChapterModalOpen(false);
    addToast('Chapter Added', `"${newChapter.title}" added to syllabus.`, 'success');
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !targetChapterId) return;
    const newLesson: Lesson = {
      id: 'les_' + Date.now(),
      title: newLessonTitle.trim(),
      duration: newLessonDuration || '15:00',
      description: newLessonDesc || 'Core concepts and problem solving session.',
      completed: false
    };

    setSelectedCourse((prev) => ({
      ...prev,
      chapters: prev.chapters.map((ch) =>
        ch.id === targetChapterId
          ? { ...ch, lessons: [...ch.lessons, newLesson] }
          : ch
      ),
      totalLessons: prev.totalLessons + 1
    }));

    setNewLessonTitle('');
    setNewLessonDesc('');
    setIsAddLessonModalOpen(false);
    addToast('Lesson Appended', `"${newLesson.title}" added to chapter.`, 'success');
  };

  return (
    <div id="teacher-courses-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Course & Chapter Syllabus Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize modular chapters, video lecture links, and resource handouts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCourse.id}
            onChange={(e) => {
              const crs = courses.find((c) => c.id === e.target.value);
              if (crs) setSelectedCourse(crs);
            }}
            className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.grade} • {c.subject} ({c.title})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsAddChapterModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Chapter
          </button>
        </div>
      </div>

      {/* Selected Course Summary Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={selectedCourse.thumbnail}
            alt={selectedCourse.title}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {selectedCourse.grade} • {selectedCourse.subject}
              </span>
              <span className="text-xs text-slate-500">Section {selectedCourse.section || 'A'}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">{selectedCourse.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedCourse.chapters.length} Chapters • {selectedCourse.totalLessons} Total Lessons
            </p>
          </div>
        </div>
      </div>

      {/* Chapters & Lessons Accordion List */}
      <div className="space-y-4">
        {selectedCourse.chapters.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 text-xs text-slate-400">
            No chapters configured yet for this course. Click "Add Chapter" above.
          </div>
        ) : (
          selectedCourse.chapters.map((ch, idx) => (
            <div
              key={ch.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs"
            >
              {/* Chapter Header */}
              <div className="p-4 sm:p-5 bg-slate-50/60 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{ch.title}</h4>
                    <p className="text-[11px] text-slate-500">{ch.lessons.length} Lessons registered</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setTargetChapterId(ch.id);
                      setIsAddLessonModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-600" /> Add Lesson
                  </button>
                </div>
              </div>

              {/* Lessons within chapter */}
              <div className="divide-y divide-slate-100 p-2 sm:p-4">
                {ch.lessons.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 px-2 italic">
                    No lessons yet in this chapter.
                  </p>
                ) : (
                  ch.lessons.map((les) => (
                    <div
                      key={les.id}
                      className="p-3 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 mt-0.5">
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{les.title}</h5>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {les.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                        <span className="font-mono flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {les.duration}
                        </span>
                        <button
                          onClick={() => addToast('Lesson Edited', `Updated ${les.title}`, 'info')}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Chapter Modal */}
      {isAddChapterModalOpen && (
        <Modal
          isOpen={isAddChapterModalOpen}
          onClose={() => setIsAddChapterModalOpen(false)}
          title="Create New Chapter"
          subtitle={`Adding chapter to ${selectedCourse.title}`}
        >
          <form onSubmit={handleAddChapter} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chapter Title
              </label>
              <input
                type="text"
                required
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                placeholder="e.g. Chapter 4: Sources of Energy & Conservation"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddChapterModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Save Chapter
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Lesson Modal */}
      {isAddLessonModalOpen && (
        <Modal
          isOpen={isAddLessonModalOpen}
          onClose={() => setIsAddLessonModalOpen(false)}
          title="Add New Lesson / Video Lecture"
          subtitle="Configure topic title, duration, and learning objectives"
        >
          <form onSubmit={handleAddLesson} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lesson Title</label>
              <input
                type="text"
                required
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                placeholder="e.g. 4.1 Nuclear Fusion and Solar Energy"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                required
                value={newLessonDuration}
                onChange={(e) => setNewLessonDuration(e.target.value)}
                placeholder="e.g. 24:30"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Topic Description & Objectives
              </label>
              <textarea
                rows={3}
                value={newLessonDesc}
                onChange={(e) => setNewLessonDesc(e.target.value)}
                placeholder="Summarize key theoretical definitions, diagrams, and numerical scope..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddLessonModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Attach Lesson
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
