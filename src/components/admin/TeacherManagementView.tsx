import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Teacher } from '../../types';
import { Modal } from '../common/Modal';
import {
  Users,
  UserPlus,
  BookOpen,
  Mail,
  Phone,
  Search,
  Star,
  Clock,
  Trash2,
  Edit2,
  CheckCircle2
} from 'lucide-react';

export const TeacherManagementView: React.FC = () => {
  const { teachers, addTeacher, deleteTeacher, addToast } = useLms();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Physics & STEM');
  const [qualification, setQualification] = useState('M.Sc., B.Ed');
  const [phone, setPhone] = useState('+1 (555) 345-6789');
  const [subjectsStr, setSubjectsStr] = useState('Physics, Electronics');
  const [assignedGradesStr, setAssignedGradesStr] = useState('Class 10, Class 12');

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addTeacher({
      name: name.trim(),
      email: email.trim(),
      department: department,
      qualification: qualification,
      phone: phone,
      subjects: subjectsStr.split(',').map((s) => s.trim()),
      assignedGrades: assignedGradesStr.split(',').map((s) => s.trim()),
      rating: 4.8,
      workloadHoursPerWeek: 18,
      totalCourses: 3
    });

    setName('');
    setEmail('');
    setIsAddModalOpen(false);
  };

  return (
    <div id="teacher-management-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Faculty Directory & Workload Allocation
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage teacher profiles, assign instructional batches, and monitor weekly period hours
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" /> Appoint Faculty Member
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} accredited teaching faculty
        </span>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by faculty name or subject..."
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs w-64"
          />
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                    <p className="text-[11px] text-emerald-700 font-medium">{t.department}</p>
                    <span className="text-[10px] text-slate-400">{t.qualification}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{t.rating}</span>
                </div>
              </div>

              {/* Workload and Courses */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] text-slate-400 block">Weekly Workload</span>
                  <span className="font-bold text-slate-800 font-mono">
                    {t.workloadHoursPerWeek} hrs/week
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50">
                  <span className="text-[10px] text-slate-400 block">Active Courses</span>
                  <span className="font-bold text-slate-800 font-mono">
                    {t.totalCourses} Courses
                  </span>
                </div>
              </div>

              {/* Assigned Subjects & Grades */}
              <div className="mt-3 space-y-1 text-xs">
                <div className="text-[11px] text-slate-600">
                  <span className="text-slate-400">Subjects: </span>
                  <span className="font-semibold text-slate-800">{t.subjects.join(', ')}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <span className="text-slate-400">Assigned Batches: </span>
                  <span className="font-semibold text-indigo-600">{t.assignedGrades.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Footer contact & action buttons */}
            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 truncate max-w-[150px]">{t.email}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => addToast('Workload Adjusted', `Opened planner for ${t.name}`, 'info')}
                  className="px-2.5 py-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg font-semibold text-[11px]"
                >
                  Adjust Load
                </button>
                <button
                  onClick={() => deleteTeacher(t.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appoint Faculty Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Appoint New Faculty Member"
          subtitle="Configure instructor credentials, departmental posting, and course loads"
        >
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Raghav Singhania"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. r.singhania@school.edu"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Mathematics"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Qualification</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. Ph.D, Pure Mathematics"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Teaching Subjects</label>
                <input
                  type="text"
                  value={subjectsStr}
                  onChange={(e) => setSubjectsStr(e.target.value)}
                  placeholder="e.g. Calculus, Algebra"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Classes</label>
                <input
                  type="text"
                  value={assignedGradesStr}
                  onChange={(e) => setAssignedGradesStr(e.target.value)}
                  placeholder="e.g. Class 11, Class 12"
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
                Save Faculty Member
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
