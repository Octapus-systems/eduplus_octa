import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Course, GradeLevel } from '../../types';
import { allGradesList } from '../../data/mockData';
import { Modal } from '../common/Modal';
import {
  Layers,
  BookOpen,
  Users,
  UserCheck,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  School,
  Sparkles,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface ClassCohort {
  id: string;
  grade: GradeLevel;
  section: string;
  classTeacherName: string;
  classTeacherAvatar: string;
  roomNumber: string;
  studentCount: number;
  maxCapacity: number;
  activeSubjects: string[];
}

const DEMO_CLASSES: ClassCohort[] = [
  {
    id: 'cls-10a',
    grade: 'Class 10',
    section: 'A',
    classTeacherName: 'Dr. Robert Chen',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Room 301',
    studentCount: 38,
    maxCapacity: 40,
    activeSubjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science']
  },
  {
    id: 'cls-10b',
    grade: 'Class 10',
    section: 'B',
    classTeacherName: 'Prof. Sarah Jenkins',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Room 302',
    studentCount: 35,
    maxCapacity: 40,
    activeSubjects: ['Biology', 'Chemistry', 'Mathematics', 'English', 'History']
  },
  {
    id: 'cls-9a',
    grade: 'Class 9',
    section: 'A',
    classTeacherName: 'David Miller',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Room 201',
    studentCount: 36,
    maxCapacity: 40,
    activeSubjects: ['Science', 'Mathematics', 'English', 'Social Studies']
  },
  {
    id: 'cls-11a',
    grade: 'Class 11',
    section: 'A',
    classTeacherName: 'Elena Rostova',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Room 401',
    studentCount: 32,
    maxCapacity: 35,
    activeSubjects: ['Advanced Physics', 'Calculus', 'Computer Science', 'English']
  },
  {
    id: 'cls-12a',
    grade: 'Class 12',
    section: 'A',
    classTeacherName: 'Dr. Marcus Vance',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Room 501',
    studentCount: 30,
    maxCapacity: 35,
    activeSubjects: ['Organic Chemistry', 'Calculus II', 'Physics Lab', 'English']
  },
  {
    id: 'cls-8a',
    grade: 'Class 8',
    section: 'A',
    classTeacherName: 'Maria Garcia',
    classTeacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    roomNumber: 'Room 105',
    studentCount: 34,
    maxCapacity: 40,
    activeSubjects: ['General Science', 'Pre-Algebra', 'English', 'Geography']
  }
];

export const ClassesCoursesView: React.FC = () => {
  const { courses, students, teachers, addCourse, addToast } = useLms();
  const [activeSubTab, setActiveSubTab] = useState<'classes' | 'courses'>('classes');
  const [gradeFilter, setGradeFilter] = useState('All Grades');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedClass, setSelectedClass] = useState<ClassCohort | null>(null);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);

  // New Class Form State
  const [newGrade, setNewGrade] = useState<GradeLevel>('Class 10');
  const [newSection, setNewSection] = useState('A');
  const [newTeacherId, setNewTeacherId] = useState('');
  const [newRoom, setNewRoom] = useState('Room 305');
  const [newCapacity, setNewCapacity] = useState('40');

  // New Course Form State
  const [courseTitle, setCourseTitle] = useState('');
  const [courseSubject, setCourseSubject] = useState('Science');
  const [courseGrade, setCourseGrade] = useState<GradeLevel>('Class 10');
  const [courseCategory, setCourseCategory] = useState<'Science' | 'Mathematics' | 'Languages' | 'Social Studies' | 'Computer Science' | 'Arts'>('Science');
  const [courseInstructorId, setCourseInstructorId] = useState('');

  const filteredClasses = DEMO_CLASSES.filter((c) => {
    const matchGrade = gradeFilter === 'All Grades' || c.grade === gradeFilter;
    const matchSearch =
      c.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.classTeacherName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSearch;
  });

  const filteredCourses = courses.filter((crs) => {
    const matchGrade = gradeFilter === 'All Grades' || crs.grade === gradeFilter;
    const matchSearch =
      crs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crs.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crs.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSearch;
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = teachers.find((t) => t.id === newTeacherId) || teachers[0];

    addToast(`Successfully created ${newGrade} - Section ${newSection} assigned to ${teacher.name}!`, 'success');
    setIsAddClassOpen(false);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    const teacher = teachers.find((t) => t.id === courseInstructorId) || teachers[0];

    addCourse({
      title: courseTitle.trim(),
      subject: courseSubject,
      grade: courseGrade,
      instructorName: teacher.name,
      instructorAvatar: teacher.avatar,
      instructorId: teacher.id,
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
      progress: 0,
      totalLessons: 12,
      completedLessons: 0,
      chapters: [
        {
          id: 'ch-1',
          title: 'Introduction & Core Foundations',
          lessons: [
            { id: 'l-1', title: 'Chapter Overview & Key Objectives', duration: '15:00', description: 'Foundational principles.' },
            { id: 'l-2', title: 'Core Concepts & Demonstration', duration: '22:30', description: 'In-depth analysis.' }
          ]
        }
      ],
      category: courseCategory,
      description: `Comprehensive institutional curriculum for ${courseGrade} students.`,
      color: 'bg-indigo-600'
    });

    setCourseTitle('');
    setIsAddCourseOpen(false);
  };

  return (
    <div id="classes-courses-view" className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Classes & Course Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage grade cohorts, section capacities, subject allocations, and faculty assignments
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeSubTab === 'classes' ? (
            <button
              onClick={() => setIsAddClassOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Create New Class
            </button>
          ) : (
            <button
              onClick={() => setIsAddCourseOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Add New Course
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveSubTab('classes')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'classes'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Class Cohorts ({DEMO_CLASSES.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('courses')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'courses'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curriculum Courses ({courses.length})</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          >
            <option value="All Grades">All Grades (1–12)</option>
            {allGradesList.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search class, section, teacher..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs w-56"
            />
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'classes' ? (
        /* Class Cohorts Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((cls) => {
            const enrolledStudents = students.filter(
              (s) => s.grade === cls.grade && s.section === cls.section
            );

            return (
              <div
                key={cls.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-100">
                      {cls.grade} — Section {cls.section}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      {cls.roomNumber}
                    </span>
                  </div>

                  {/* Class Teacher Info */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <img
                      src={cls.classTeacherAvatar}
                      alt={cls.classTeacherName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Class Teacher
                      </p>
                      <p className="text-xs font-extrabold text-slate-900">{cls.classTeacherName}</p>
                    </div>
                  </div>

                  {/* Capacity Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-600">Student Enrollment</span>
                      <span className="text-indigo-600 font-mono">
                        {cls.studentCount} / {cls.maxCapacity} Seats
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all"
                        style={{ width: `${(cls.studentCount / cls.maxCapacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Active Subjects Pills */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Active Subjects ({cls.activeSubjects.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cls.activeSubjects.map((sbj, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200/60"
                        >
                          {sbj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <button
                  onClick={() => setSelectedClass(cls)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-extrabold rounded-xl border border-slate-200/80 hover:border-indigo-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Roster & Curriculum</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Courses Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((crs) => (
            <div
              key={crs.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={crs.thumbnail}
                  alt={crs.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider">
                  {crs.grade}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                  {crs.category}
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-sm font-extrabold text-white leading-snug truncate">
                    {crs.title}
                  </h4>
                  <p className="text-[11px] text-slate-300">{crs.subject}</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={crs.instructorAvatar}
                      alt={crs.instructorName}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="font-semibold text-slate-800">{crs.instructorName}</span>
                  </div>
                  <span className="font-mono text-indigo-600 font-bold">
                    {crs.totalLessons} Modules
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                  {crs.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Enrolled Cohort: {crs.grade}</span>
                  <span className="text-emerald-600 font-bold">Active Curriculum</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inspect Class Roster & Curriculum Modal */}
      {selectedClass && (
        <Modal
          isOpen={!!selectedClass}
          onClose={() => setSelectedClass(null)}
          title={`Class Roster: ${selectedClass.grade} - Section ${selectedClass.section}`}
          subtitle={`Class Teacher: ${selectedClass.classTeacherName} • ${selectedClass.roomNumber}`}
        >
          <div className="space-y-5">
            {/* Header Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                  Total Enrolled
                </span>
                <span className="text-xl font-extrabold text-indigo-700 font-mono">
                  {selectedClass.studentCount}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Capacity
                </span>
                <span className="text-xl font-extrabold text-emerald-700 font-mono">
                  {selectedClass.maxCapacity}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                  Subjects
                </span>
                <span className="text-xl font-extrabold text-purple-700 font-mono">
                  {selectedClass.activeSubjects.length}
                </span>
              </div>
            </div>

            {/* Enrolled Students Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Enrolled Student Roster
              </h4>
              <div className="max-h-56 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-2.5 px-4">Student</th>
                      <th className="py-2.5 px-3">Roll No.</th>
                      <th className="py-2.5 px-3">GPA</th>
                      <th className="py-2.5 px-3">Attendance</th>
                      <th className="py-2.5 px-3">Fees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {students
                      .filter((s) => s.grade === selectedClass.grade)
                      .slice(0, 8)
                      .map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50/70">
                          <td className="py-2.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                            <img
                              src={st.avatar}
                              alt={st.name}
                              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                            />
                            <span>{st.name}</span>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-500">{st.rollNumber}</td>
                          <td className="py-2.5 px-3 font-bold text-indigo-600 font-mono">{st.gpa}</td>
                          <td className="py-2.5 px-3 font-medium text-emerald-600">
                            {st.attendancePercentage}%
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                st.feeStatus === 'paid'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {st.feeStatus.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Roster
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create New Class Modal */}
      {isAddClassOpen && (
        <Modal
          isOpen={isAddClassOpen}
          onClose={() => setIsAddClassOpen(false)}
          title="Create New Academic Class Cohort"
          subtitle="Configure grade, section, capacity, and assign class teacher"
        >
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Grade Level</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value as GradeLevel)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {allGradesList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                <select
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assign Class Teacher</label>
                <select
                  value={newTeacherId}
                  onChange={(e) => setNewTeacherId(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Room Allocation</label>
                <input
                  type="text"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  placeholder="e.g. Room 305"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddClassOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Create Class Cohort
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Create New Course Modal */}
      {isAddCourseOpen && (
        <Modal
          isOpen={isAddCourseOpen}
          onClose={() => setIsAddCourseOpen(false)}
          title="Add New Institutional Course"
          subtitle="Publish curriculum subject for grade cohorts"
        >
          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title</label>
              <input
                type="text"
                required
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g. Advanced Quantum Mechanics & Physics Lab"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={courseSubject}
                  onChange={(e) => setCourseSubject(e.target.value)}
                  placeholder="e.g. Physics"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Grade</label>
                <select
                  value={courseGrade}
                  onChange={(e) => setCourseGrade(e.target.value as GradeLevel)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {allGradesList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Languages">Languages</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Faculty Lead</label>
              <select
                value={courseInstructorId}
                onChange={(e) => setCourseInstructorId(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddCourseOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Publish Course
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
