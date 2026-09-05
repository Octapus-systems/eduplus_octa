import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Student } from '../../types';
import { allGradesList } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import {
  UserPlus,
  Search,
  Trash2,
  Edit2,
  Mail,
  Phone,
  Filter,
  GraduationCap,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const StudentManagementView: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent, addToast } = useLms();
  const [gradeFilter, setGradeFilter] = useState('All Classes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<Student | null>(null);

  // Form states for new student
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('Class 10');
  const [section, setSection] = useState('A');
  const [rollNumber, setRollNumber] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');

  const filtered = students.filter((st) => {
    const matchGrade = gradeFilter === 'All Classes' || st.grade === gradeFilter;
    const matchSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addStudent({
      name: name.trim(),
      email: email.trim(),
      grade: grade as any,
      section: section,
      rollNumber: rollNumber || `10A-${Math.floor(100 + Math.random() * 900)}`,
      attendancePercentage: 100,
      gpa: 4.0,
      feeStatus: 'pending',
      parentName: parentName || 'Guardian',
      parentPhone: parentPhone || '+1 (555) 019-2834',
      parentEmail: parentEmail || email.trim()
    });

    setName('');
    setEmail('');
    setParentName('');
    setParentPhone('');
    setParentEmail('');
    setIsAddModalOpen(false);
  };

  return (
    <div id="student-management-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Directory & Admissions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enroll candidates, assign academic cohorts, track dues and parent contact details
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" /> Enroll New Student
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          >
            <option value="All Classes">All Classes (1–12)</option>
            {allGradesList.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filtered.length} of {students.length} students
          </span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name or roll no..."
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs w-64"
          />
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Student</th>
                <th className="py-3 px-4">Cohort</th>
                <th className="py-3 px-4">Roll No.</th>
                <th className="py-3 px-4">GPA</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Fee Clearance</th>
                <th className="py-3 px-4">Parent Contact</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div>{st.name}</div>
                        <span className="text-[10px] text-slate-400 font-normal">{st.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {st.grade} - {st.section}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 font-bold">{st.rollNumber}</td>
                  <td className="py-3.5 px-4 font-bold text-indigo-600 font-mono">{st.gpa}</td>
                  <td className="py-3.5 px-4 font-medium text-emerald-600">
                    {st.attendancePercentage}%
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={st.feeStatus} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-slate-600">
                    <div>{st.parentName}</div>
                    <span className="text-[10px] text-slate-400">{st.parentPhone}</span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedStudentDetail(st)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteStudent(st.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Student Profile Detail Modal */}
      {selectedStudentDetail && (
        <Modal
          isOpen={!!selectedStudentDetail}
          onClose={() => setSelectedStudentDetail(null)}
          title={`Student Profile: ${selectedStudentDetail.name}`}
          subtitle={`Enrolled in ${selectedStudentDetail.grade} - Section ${selectedStudentDetail.section}`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <img
                src={selectedStudentDetail.avatar}
                alt={selectedStudentDetail.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedStudentDetail.name}</h4>
                <p className="text-xs text-slate-500">
                  Roll Number: <span className="font-mono font-bold">{selectedStudentDetail.rollNumber}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    GPA: {selectedStudentDetail.gpa}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Attendance: {selectedStudentDetail.attendancePercentage}%
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                Parent & Guardian Information
              </h5>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">Guardian Name</span>
                  <span className="font-semibold text-slate-800">{selectedStudentDetail.parentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone Number</span>
                  <span className="font-semibold text-slate-800">{selectedStudentDetail.parentPhone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">Email Address</span>
                  <span className="font-semibold text-slate-800">{selectedStudentDetail.parentEmail}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  updateStudent(selectedStudentDetail.id, {
                    feeStatus: selectedStudentDetail.feeStatus === 'paid' ? 'pending' : 'paid'
                  });
                  setSelectedStudentDetail(null);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Toggle Fee Clearance Status
              </button>

              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Enroll Student Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Enroll New Student Admission"
          subtitle="Register student and configure parental contact records"
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
                  placeholder="e.g. Arjun Mehta"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. arjun.mehta@school.edu"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
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
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number</label>
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 10A-108"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h5 className="text-xs font-bold text-slate-900 mb-2">Guardian & Contact Details</h5>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Name</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Rajiv Mehta"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 234-5678"
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
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
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Confirm Admission
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
