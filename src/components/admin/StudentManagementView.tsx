import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Student, GradeLevel } from '../../types';
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
  AlertCircle,
  ShieldAlert,
  UserCheck,
  UserX,
  FileSpreadsheet,
  Send,
  Calendar,
  DollarSign,
  Award,
  BookOpen
} from 'lucide-react';

export const StudentManagementView: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent, addToast } = useLms();
  
  // Filters & State
  const [gradeFilter, setGradeFilter] = useState('All Classes');
  const [feeFilter, setFeeFilter] = useState('All Fee Statuses');
  const [riskFilter, setRiskFilter] = useState('All Risk Profiles');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Selection
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<Student | null>(null);
  const [detailActiveTab, setDetailActiveTab] = useState<'overview' | 'academic' | 'attendance' | 'fees'>('overview');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [archivedStudentIds, setArchivedStudentIds] = useState<string[]>([]);

  // Add Student Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('Class 10');
  const [section, setSection] = useState('A');
  const [rollNumber, setRollNumber] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');

  // Filtering Logic
  const filtered = students.filter((st) => {
    const isArchived = archivedStudentIds.includes(st.id);
    const matchGrade = gradeFilter === 'All Classes' || st.grade === gradeFilter;
    const matchFee = feeFilter === 'All Fee Statuses' || st.feeStatus === feeFilter;
    
    // Risk status logic: gpa < 3.2 or attendance < 90% or feeStatus === overdue/pending
    const isAtRisk = st.gpa < 3.2 || st.attendancePercentage < 90 || st.feeStatus === 'overdue';
    const matchRisk =
      riskFilter === 'All Risk Profiles' ||
      (riskFilter === 'At Risk' && isAtRisk) ||
      (riskFilter === 'On Track' && !isAtRisk);

    const matchSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (st.parentName && st.parentName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchGrade && matchFee && matchRisk && matchSearch;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStudentIds(filtered.map((s) => s.id));
    } else {
      setSelectedStudentIds([]);
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addStudent({
      name: name.trim(),
      email: email.trim(),
      grade: grade,
      section: section,
      rollNumber: rollNumber || `10A-${Math.floor(100 + Math.random() * 900)}`,
      attendancePercentage: 98,
      gpa: 3.8,
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

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    updateStudent(editingStudent.id, {
      name: editingStudent.name,
      email: editingStudent.email,
      grade: editingStudent.grade,
      section: editingStudent.section,
      rollNumber: editingStudent.rollNumber,
      parentName: editingStudent.parentName,
      parentPhone: editingStudent.parentPhone,
      feeStatus: editingStudent.feeStatus
    });

    addToast(`Successfully updated student record for ${editingStudent.name}!`, 'success');
    setEditingStudent(null);
  };

  const handleToggleArchive = (id: string, currentName: string) => {
    setArchivedStudentIds((prev) => {
      const isCurrentlyArchived = prev.includes(id);
      if (isCurrentlyArchived) {
        addToast(`Restored ${currentName} to active student roster.`, 'success');
        return prev.filter((item) => item !== id);
      } else {
        addToast(`Archived record for ${currentName}.`, 'info');
        return [...prev, id];
      }
    });
  };

  const handleBulkFeeReminder = () => {
    addToast(`Dispatched automated fee reminders to ${selectedStudentIds.length} parents via SMS & Email.`, 'success');
    setSelectedStudentIds([]);
  };

  const handleBulkExportCSV = () => {
    addToast(`Exported directory records for ${selectedStudentIds.length} students to CSV.`, 'info');
    setSelectedStudentIds([]);
  };

  return (
    <div id="student-management-view" className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Directory & Admissions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enroll candidates, inspect academic transcripts, manage guardian contact records and fee clearances
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" /> Enroll New Student
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Grade Filter */}
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

            {/* Fee Filter */}
            <select
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
            >
              <option value="All Fee Statuses">All Fee Statuses</option>
              <option value="paid">Fee Paid</option>
              <option value="pending">Fee Pending</option>
              <option value="overdue">Fee Overdue</option>
            </select>

            {/* Risk Filter */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
            >
              <option value="All Risk Profiles">All Risk Profiles</option>
              <option value="At Risk">At Risk Only</option>
              <option value="On Track">On Track Only</option>
            </select>

            <span className="text-xs text-slate-400 font-medium ml-1">
              Showing {filtered.length} of {students.length} students
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, roll no, parent..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs w-full lg:w-64"
            />
          </div>
        </div>

        {/* Bulk Selection Action Bar */}
        {selectedStudentIds.length > 0 && (
          <div className="p-3 bg-indigo-50/90 border border-indigo-100 rounded-xl flex items-center justify-between gap-3 text-xs animate-in fade-in">
            <div className="flex items-center gap-2 text-indigo-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>{selectedStudentIds.length} students selected</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkFeeReminder}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Fee Reminder
              </button>
              <button
                onClick={handleBulkExportCSV}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Export CSV
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      filtered.length > 0 && selectedStudentIds.length === filtered.length
                    }
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Cohort</th>
                <th className="py-3 px-4">Roll No.</th>
                <th className="py-3 px-4">Academic Status</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Fee Clearance</th>
                <th className="py-3 px-4">Guardian Contact</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((st) => {
                const isArchived = archivedStudentIds.includes(st.id);
                const isAtRisk = st.gpa < 3.2 || st.attendancePercentage < 90 || st.feeStatus === 'overdue';

                return (
                  <tr
                    key={st.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isArchived ? 'opacity-50 bg-slate-50/40' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedStudentIds.includes(st.id)}
                        onChange={() => handleToggleSelectOne(st.id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span>{st.name}</span>
                            {isAtRisk && (
                              <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 text-[9px] font-extrabold border border-rose-100 flex items-center gap-0.5">
                                <ShieldAlert className="w-2.5 h-2.5" /> At Risk
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-normal">{st.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {st.grade} - {st.section}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 font-bold">{st.rollNumber}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-indigo-600 font-mono">GPA {st.gpa}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-emerald-600">
                      {st.attendancePercentage}%
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={st.feeStatus} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-600">
                      <div>{st.parentName || 'Guardian'}</div>
                      <span className="text-[10px] text-slate-400">{st.parentPhone || '+1 (555) 019-2834'}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedStudentDetail(st);
                            setDetailActiveTab('overview');
                          }}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title="View Complete Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingStudent(st)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title="Edit Student Record"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleArchive(st.id, st.name)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title={isArchived ? 'Activate Student' : 'Archive Student'}
                        >
                          {isArchived ? <UserCheck className="w-4 h-4 text-emerald-600" /> : <UserX className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteStudent(st.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Student Profile Detail Modal */}
      {selectedStudentDetail && (
        <Modal
          isOpen={!!selectedStudentDetail}
          onClose={() => setSelectedStudentDetail(null)}
          title={`Student Profile: ${selectedStudentDetail.name}`}
          subtitle={`Roll No: ${selectedStudentDetail.rollNumber} • ${selectedStudentDetail.grade} Section ${selectedStudentDetail.section}`}
        >
          <div className="space-y-5">
            {/* Header Hero Card */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl shadow-xs">
              <img
                src={selectedStudentDetail.avatar}
                alt={selectedStudentDetail.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-400/50"
              />
              <div className="space-y-1">
                <h4 className="text-base font-extrabold">{selectedStudentDetail.name}</h4>
                <p className="text-xs text-slate-300 font-mono">
                  {selectedStudentDetail.email}
                </p>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-400/30">
                    GPA: {selectedStudentDetail.gpa}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                    Attendance: {selectedStudentDetail.attendancePercentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Internal Detail Tabs */}
            <div className="flex border-b border-slate-200 text-xs font-semibold gap-4">
              <button
                onClick={() => setDetailActiveTab('overview')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  detailActiveTab === 'overview'
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Guardian & Details
              </button>
              <button
                onClick={() => setDetailActiveTab('academic')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  detailActiveTab === 'academic'
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Academic Performance
              </button>
              <button
                onClick={() => setDetailActiveTab('attendance')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  detailActiveTab === 'attendance'
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Attendance Log
              </button>
              <button
                onClick={() => setDetailActiveTab('fees')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  detailActiveTab === 'fees'
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Fee Clearance
              </button>
            </div>

            {/* Tab Contents */}
            {detailActiveTab === 'overview' && (
              <div className="p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                <h5 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                  Parent / Guardian Information
                </h5>
                <div className="grid grid-cols-2 gap-3 text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Primary Guardian</span>
                    <span className="font-bold text-slate-800">
                      {selectedStudentDetail.parentName || 'Rajiv Mehta'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Contact Phone</span>
                    <span className="font-bold text-slate-800">
                      {selectedStudentDetail.parentPhone || '+1 (555) 019-2834'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px]">Guardian Email</span>
                    <span className="font-bold text-slate-800">
                      {selectedStudentDetail.parentEmail || selectedStudentDetail.email}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {detailActiveTab === 'academic' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Class Rank</span>
                    <p className="text-lg font-extrabold text-indigo-600 mt-0.5">#4 of 38</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Cum. GPA</span>
                    <p className="text-lg font-extrabold text-emerald-600 mt-0.5">
                      {selectedStudentDetail.gpa} / 4.0
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Term Grade</span>
                    <p className="text-lg font-extrabold text-purple-600 mt-0.5">Grade A</p>
                  </div>
                </div>
              </div>
            )}

            {detailActiveTab === 'attendance' && (
              <div className="p-4 bg-slate-50 rounded-xl border space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Attendance Percentage</span>
                  <span className="text-emerald-600 font-mono">
                    {selectedStudentDetail.attendancePercentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${selectedStudentDetail.attendancePercentage}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-2 text-[11px] font-semibold text-slate-600">
                  <div>Present: 168 Days</div>
                  <div>Absent: 6 Days</div>
                  <div>Late: 2 Days</div>
                </div>
              </div>
            )}

            {detailActiveTab === 'fees' && (
              <div className="p-4 bg-slate-50 rounded-xl border space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Fee Status</span>
                  <StatusBadge status={selectedStudentDetail.feeStatus} size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>Total Annual Dues: $1,200</div>
                  <div>
                    Paid Amount:{' '}
                    <span className="font-bold text-emerald-600">
                      {selectedStudentDetail.feeStatus === 'paid' ? '$1,200' : '$0'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  updateStudent(selectedStudentDetail.id, {
                    feeStatus: selectedStudentDetail.feeStatus === 'paid' ? 'pending' : 'paid'
                  });
                  addToast(`Updated fee status for ${selectedStudentDetail.name}`, 'info');
                  setSelectedStudentDetail(null);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Toggle Fee Clearance Status
              </button>

              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Student Record Modal */}
      {editingStudent && (
        <Modal
          isOpen={!!editingStudent}
          onClose={() => setEditingStudent(null)}
          title={`Edit Student: ${editingStudent.name}`}
          subtitle="Update academic assignment and guardian records"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Email</label>
                <input
                  type="email"
                  required
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Grade</label>
                <select
                  value={editingStudent.grade}
                  onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value as any })}
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
                  value={editingStudent.section}
                  onChange={(e) => setEditingStudent({ ...editingStudent, section: e.target.value })}
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
                  value={editingStudent.rollNumber}
                  onChange={(e) => setEditingStudent({ ...editingStudent, rollNumber: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Name</label>
                <input
                  type="text"
                  value={editingStudent.parentName || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Clearance Status</label>
                <select
                  value={editingStudent.feeStatus}
                  onChange={(e) => setEditingStudent({ ...editingStudent, feeStatus: e.target.value as any })}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Save Record Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add New Student Modal */}
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
                  onChange={(e) => setGrade(e.target.value as any)}
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
