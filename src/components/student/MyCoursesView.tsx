import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { allGradesList } from '../../data/mockData';
import {
  Search,
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Filter,
  User
} from 'lucide-react';

export const MyCoursesView: React.FC = () => {
  const {
    courses,
    setActiveCourseId,
    setActiveTab,
    selectedGradeFilter,
    setSelectedGradeFilter
  } = useLms();

  const [subjectFilter, setSubjectFilter] = useState('All');
  const [courseSearch, setCourseSearch] = useState('');

  const subjects = ['All', 'Science', 'Mathematics', 'Languages', 'Computer Science'];

  const filteredCourses = courses.filter((c) => {
    const matchesGrade =
      selectedGradeFilter === 'All Classes' || c.grade === selectedGradeFilter;
    const matchesSubject =
      subjectFilter === 'All' || c.category === subjectFilter || c.subject === subjectFilter;
    const matchesSearch =
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.subject.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(courseSearch.toLowerCase());
    return matchesGrade && matchesSubject && matchesSearch;
  });

  const handleOpenCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setActiveTab('course-player');
  };

  return (
    <div id="my-courses-view" className="space-y-6">
      {/* Top Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Curriculum & Courses
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Classes 1 to 12 academic syllabi, video lectures, and study modules
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Grade filter */}
          <select
            value={selectedGradeFilter}
            onChange={(e) => setSelectedGradeFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          >
            <option value="All Classes">All Grades (1–12)</option>
            {allGradesList.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              placeholder="Search course or topic..."
              className="pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => setSubjectFilter(subj)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              subjectFilter === subj
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Courses Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No courses match your filter</h3>
          <p className="text-xs text-slate-400 mt-1">Try selecting another grade or subject category.</p>
          <button
            onClick={() => {
              setSubjectFilter('All');
              setSelectedGradeFilter('All Classes');
              setCourseSearch('');
            }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold text-xs rounded-xl hover:bg-indigo-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group"
            >
              {/* Thumbnail header */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-xs text-indigo-700 shadow-xs">
                    {course.grade}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-xs text-white">
                    {course.subject}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {course.progress}% Completed
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {course.instructorName}
                    </span>
                  </div>
                </div>

                {/* Progress bar and button */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span>
                      {course.completedLessons}/{course.totalLessons} Lessons
                    </span>
                    <span>{course.chapters.length} Chapters</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-3">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <button
                    id={`btn-open-course-${course.id}`}
                    onClick={() => handleOpenCourse(course.id)}
                    className="w-full py-2 px-3 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Enter Classroom & Video Player
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
