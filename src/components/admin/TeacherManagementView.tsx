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
  CheckCircle2,
  Eye,
  UserCheck,
  UserX,
  Award,
  Layers
} from 'lucide-react';

export const TeacherManagementView: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, addToast } = useLms();
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deactivatedTeacherIds, setDeactivatedTeacherIds] = useState<string[]>([]);

  // Add Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Physics & STEM');
  const [qualification, setQualification] = useState('M.Sc., B.Ed');
  const [phone, setPhone] = useState('+1 (555) 345-6789');
  const [subjectsStr, setSubjectsStr] = useState('Physics, Electronics');
  const [assignedGradesStr, setAssignedGradesStr] = useState('Class 10, Class 12');

  const filtered = teachers.filter((t) => {
    const matchDept = departmentFilter === 'All Departments' || (t.department && t.department.toLowerCase().includes(departmentFilter.toLowerCase()));
    const subjects = t.subjects || [];
    const matchSearch =
      (t.name && t.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.department && t.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDept && matchSearch;
  });

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
      rating: 4.9,
      workloadHoursPerWeek: 18,
      totalCourses: 3
    });

    setName('');
    setEmail('');
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    updateTeacher(editingTeacher.id, {
      name: editingTeacher.name,
      email: editingTeacher.email,
      department: editingTeacher.department,
      qualification: editingTeacher.qualification,
      workloadHoursPerWeek: editingTeacher.workloadHoursPerWeek
    });

    addToast(`Successfully updated faculty record for ${editingTeacher.name}!`, 'success');
    setEditingTeacher(null);
  };

  const handleToggleDeactivate = (id: string, nameStr: string) => {
    setDeactivatedTeacherIds((prev) => {
      const isDeactivated = prev.includes(id);
      if (isDeactivated) {
        addToast(`Re-activated teaching credentials for ${nameStr}.`, 'success');
        return prev.filter((item) => item !== id);
      } else {
        addToast(`Deactivated faculty status for ${nameStr}.`, 'info');
        return [...prev, id];
      }
    });
  };

  return (
    <div id="teacher-management-view" className="space-y-6">
      {/* Header Banner */}
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
          >
            <option value="All Departments">All Departments</option>
            <option value="Physics">Physics & Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Computer">Computer Science & AI</option>
            <option value="Humanities">Humanities & Social Studies</option>
            <option value="Language">Languages & Literature</option>
          </select>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filtered.length} of {teachers.length} accredited faculty
          </span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty name or subject..."
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs w-64"
          />
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => {
          const isDeactivated = deactivatedTeacherIds.includes(t.id);

          return (
            <div
              key={t.id}
              className={`bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between ${
                isDeactivated ? 'opacity-50 bg-slate-50/50' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{t.name}</h3>
                      <p className="text-[11px] text-emerald-700 font-semibold">{t.department}</p>
                      <span className="text-[10px] text-slate-400">{t.qualification}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-xl border border-amber-100">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{t.rating}</span>
                  </div>
                </div>

                {/* Workload and Courses */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Weekly Load</span>
                    <span className="font-extrabold text-slate-800 font-mono">
                      {t.workloadHoursPerWeek || (t as any).classesPerWeek || 20} hrs/wk
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Active Courses</span>
                    <span className="font-extrabold text-slate-800 font-mono">
                      {t.totalCourses || 3} Courses
                    </span>
                  </div>
                </div>

                {/* Assigned Subjects & Grades */}
                <div className="mt-3 space-y-1 text-xs">
                  <div className="text-[11px] text-slate-600">
                    <span className="text-slate-400 font-medium">Subjects: </span>
                    <span className="font-semibold text-slate-800">
                      {(t.subjects || [t.department || 'Science']).join(', ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <span className="text-slate-400 font-medium">Assigned Cohorts: </span>
                    <span className="font-bold text-indigo-600">
                      {(t.assignedGrades || (t as any).grades || ['Class 10']).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer action buttons */}
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 truncate max-w-[130px] font-medium">{t.email}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedTeacher(t)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                    title="View Detailed Faculty Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingTeacher(t)}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                    title="Edit Faculty Record"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleDeactivate(t.id, t.name)}
                    className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                    title={isDeactivated ? 'Activate Faculty' : 'Deactivate Faculty'}
                  >
                    {isDeactivated ? <UserCheck className="w-4 h-4 text-emerald-600" /> : <UserX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteTeacher(t.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspect Faculty Profile Modal */}
      {selectedTeacher && (
        <Modal
          isOpen={!!selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          title={`Faculty Profile: ${selectedTeacher.name}`}
          subtitle={`${selectedTeacher.department} • ${selectedTeacher.qualification}`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-900 text-white rounded-2xl">
              <img
                src={selectedTeacher.avatar}
                alt={selectedTeacher.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-400/50"
              />
              <div className="space-y-1">
                <h4 className="text-base font-extrabold">{selectedTeacher.name}</h4>
                <p className="text-xs text-emerald-300 font-medium">{selectedTeacher.department}</p>
                <p className="text-[11px] text-slate-300 font-mono">{selectedTeacher.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-[10px] text-emerald-600 font-bold uppercase block">Student Rating</span>
                <span className="text-xl font-extrabold text-emerald-700">{selectedTeacher.rating || 4.8} / 5.0</span>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                <span className="text-[10px] text-indigo-600 font-bold uppercase block">Weekly Period Load</span>
                <span className="text-xl font-extrabold text-indigo-700 font-mono">{selectedTeacher.workloadHoursPerWeek || (selectedTeacher as any).classesPerWeek || 20} hrs</span>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <span className="text-[10px] text-purple-600 font-bold uppercase block">Assigned Batches</span>
                <span className="text-xl font-extrabold text-purple-700">{(selectedTeacher.assignedGrades || (selectedTeacher as any).grades || []).length} Cohorts</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                Departmental Subject Postings
              </h5>
              <div className="flex flex-wrap gap-2 pt-1">
                {(selectedTeacher.subjects || [selectedTeacher.department || 'Science']).map((sbj, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-bold border border-slate-200">
                    {sbj}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Faculty Profile
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Faculty Record Modal */}
      {editingTeacher && (
        <Modal
          isOpen={!!editingTeacher}
          onClose={() => setEditingTeacher(null)}
          title={`Edit Faculty Record: ${editingTeacher.name}`}
          subtitle="Update workload and departmental credentials"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingTeacher.name}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editingTeacher.email}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={editingTeacher.department}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, department: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Weekly Period Hours</label>
                <input
                  type="number"
                  value={editingTeacher.workloadHoursPerWeek}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, workloadHoursPerWeek: Number(e.target.value) })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingTeacher(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Save Record Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

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
