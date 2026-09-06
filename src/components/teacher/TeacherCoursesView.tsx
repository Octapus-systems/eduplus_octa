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
  Play,
  Upload,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';

export const TeacherCoursesView: React.FC = () => {
  const {
    courses,
    lessonPlans,
    teachingMaterials,
    saveLessonPlan,
    uploadTeachingMaterial,
    addToast
  } = useLms();

  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [activeSubTab, setActiveSubTab] = useState<'syllabus' | 'planner' | 'materials'>('syllabus');

  // Modal states
  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isLessonPlanModalOpen, setIsLessonPlanModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [targetChapterId, setTargetChapterId] = useState<string>('');

  // Form states
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('20:00');
  const [newLessonDesc, setNewLessonDesc] = useState('');

  // Lesson Plan Form
  const [lpTopic, setLpTopic] = useState('');
  const [lpChapter, setLpChapter] = useState('Chapter 2: Electricity');
  const [lpDuration, setLpDuration] = useState(45);
  const [lpObjectives, setLpObjectives] = useState('Derive Kirchhoff voltage law\nDemonstrate multi-loop circuit');
  const [lpMethod, setLpMethod] = useState('Interactive Board Work + Live Multimeter');

  // Teaching Material Form
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState<'pdf' | 'slides' | 'worksheet' | 'lab_guide'>('slides');
  const [matVisibility, setMatVisibility] = useState<'class' | 'draft'>('class');

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

  const handleSaveLessonPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lpTopic.trim()) return;
    saveLessonPlan({
      courseId: selectedCourse.id,
      subject: selectedCourse.subject,
      grade: selectedCourse.grade,
      chapterTitle: lpChapter,
      topicName: lpTopic,
      durationMins: Number(lpDuration),
      objectives: lpObjectives.split('\n').filter((s) => s.trim().length > 0),
      teachingMethod: lpMethod,
      status: 'completed'
    });
    setLpTopic('');
    setIsLessonPlanModalOpen(false);
  };

  const handleUploadMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;
    uploadTeachingMaterial({
      title: matTitle,
      subject: selectedCourse.subject,
      grade: selectedCourse.grade,
      type: matType,
      fileSize: '3.4 MB',
      visibility: matVisibility
    });
    setMatTitle('');
    setIsMaterialModalOpen(false);
  };

  return (
    <div id="teacher-courses-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" /> Curriculum & Pedagogy Studio
          </div>
          <h1 className="text-2xl font-black tracking-tight">Courses, Lessons & Resource Library</h1>
          <p className="text-sm text-slate-300 mt-1">
            Structure syllabus chapters, build detailed lesson plans, and distribute class teaching materials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <select
            value={selectedCourse.id}
            onChange={(e) => {
              const crs = courses.find((c) => c.id === e.target.value);
              if (crs) setSelectedCourse(crs);
            }}
            className="text-xs font-bold bg-slate-800 text-white border border-slate-700 py-2.5 px-3 rounded-2xl focus:ring-2 focus:ring-indigo-500 shadow-xs"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.grade} • {c.subject} ({c.title})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsLessonPlanModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Lesson Plan Builder
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('syllabus')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeSubTab === 'syllabus'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Syllabus & Chapters ({selectedCourse.chapters.length})
        </button>

        <button
          onClick={() => setActiveSubTab('planner')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeSubTab === 'planner'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Lesson Plans ({lessonPlans.length})
        </button>

        <button
          onClick={() => setActiveSubTab('materials')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            activeSubTab === 'materials'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Teaching Resources ({teachingMaterials.length})
        </button>
      </div>

      {/* Syllabus Tab */}
      {activeSubTab === 'syllabus' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddChapterModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Chapter
            </button>
          </div>

          {selectedCourse.chapters.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200/80 text-xs text-slate-400">
              No chapters configured yet for this course. Click "Add Chapter" above.
            </div>
          ) : (
            selectedCourse.chapters.map((ch, idx) => (
              <div
                key={ch.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs"
              >
                <div className="p-5 bg-slate-50/60 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">{ch.title}</h4>
                      <p className="text-[11px] font-semibold text-slate-500">{ch.lessons.length} Lessons registered</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTargetChapterId(ch.id);
                      setIsAddLessonModalOpen(true);
                    }}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-center"
                  >
                    <Plus className="w-3.5 h-3.5 text-indigo-600" /> Add Lesson
                  </button>
                </div>

                <div className="divide-y divide-slate-100 p-3 sm:p-5">
                  {ch.lessons.map((les) => (
                    <div
                      key={les.id}
                      className="p-3 hover:bg-slate-50 rounded-2xl transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 mt-0.5">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{les.title}</h5>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{les.description}</p>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-slate-500 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {les.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Lesson Plans Tab */}
      {activeSubTab === 'planner' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-extrabold text-slate-900">Pedagogical Lesson Plans</h2>
            <button
              onClick={() => setIsLessonPlanModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> New Lesson Plan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessonPlans.map((lp) => (
              <div key={lp.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-700 uppercase">
                    {lp.grade} • {lp.subject}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{lp.durationMins} mins</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">{lp.topicName}</h3>
                <p className="text-xs text-slate-600 font-semibold">{lp.chapterTitle}</p>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs text-slate-700">
                  <p className="font-bold text-slate-900">Learning Objectives:</p>
                  <ul className="list-disc list-inside text-[11px] space-y-0.5 text-slate-600">
                    {lp.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] font-semibold text-indigo-600">Method: {lp.teachingMethod}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teaching Materials Tab */}
      {activeSubTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-extrabold text-slate-900">Classroom Resource Library</h2>
            <button
              onClick={() => setIsMaterialModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4" /> Upload Material
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teachingMaterials.map((mat) => (
              <div key={mat.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900">{mat.title}</h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {mat.grade} • {mat.type.toUpperCase()} • {mat.fileSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    mat.visibility === 'class' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {mat.visibility === 'class' ? 'Class Visible' : 'Draft'}
                  </span>
                  <button
                    onClick={() => addToast('Downloading', `Downloading ${mat.title}`, 'info')}
                    className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Chapter Title</label>
              <input
                type="text"
                required
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                placeholder="e.g. Chapter 4: Sources of Energy & Conservation"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
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
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
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
          title="Add New Lesson Lecture"
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
                className="w-full p-2.5 text-xs border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                required
                value={newLessonDuration}
                onChange={(e) => setNewLessonDuration(e.target.value)}
                placeholder="e.g. 24:30"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
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
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Attach Lesson
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Lesson Plan Builder Modal */}
      {isLessonPlanModalOpen && (
        <Modal
          isOpen={isLessonPlanModalOpen}
          onClose={() => setIsLessonPlanModalOpen(false)}
          title="Lesson Plan Builder"
          subtitle="Design structured learning objectives and teaching methodology"
        >
          <form onSubmit={handleSaveLessonPlanSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Topic Name</label>
              <input
                type="text"
                required
                value={lpTopic}
                onChange={(e) => setLpTopic(e.target.value)}
                placeholder="e.g. Right Hand Thumb Rule & Field Vector"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-2xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chapter</label>
                <input
                  type="text"
                  value={lpChapter}
                  onChange={(e) => setLpChapter(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (mins)</label>
                <input
                  type="number"
                  value={lpDuration}
                  onChange={(e) => setLpDuration(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Learning Objectives (One per line)</label>
              <textarea
                rows={3}
                value={lpObjectives}
                onChange={(e) => setLpObjectives(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Teaching Method</label>
              <input
                type="text"
                value={lpMethod}
                onChange={(e) => setLpMethod(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsLessonPlanModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-xs"
              >
                Save Lesson Plan
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Teaching Material Modal */}
      {isMaterialModalOpen && (
        <Modal
          isOpen={isMaterialModalOpen}
          onClose={() => setIsMaterialModalOpen(false)}
          title="Upload Teaching Resource"
          subtitle="Distribute slides, lab manuals, and worksheets to students"
        >
          <form onSubmit={handleUploadMaterialSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Resource Title</label>
              <input
                type="text"
                required
                value={matTitle}
                onChange={(e) => setMatTitle(e.target.value)}
                placeholder="e.g. Chapter 3 Formula Reference Sheet & Solenoid Handout"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-2xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Type</label>
                <select
                  value={matType}
                  onChange={(e) => setMatType(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="slides">Presentation Slides</option>
                  <option value="pdf">PDF Document</option>
                  <option value="worksheet">Worksheet</option>
                  <option value="lab_guide">Lab Guide</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Visibility</label>
                <select
                  value={matVisibility}
                  onChange={(e) => setMatVisibility(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="class">Class Visible</option>
                  <option value="draft">Private Draft</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsMaterialModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-xs"
              >
                Publish Material
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
