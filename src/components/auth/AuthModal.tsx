import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Modal } from '../common/Modal';
import { UserRole } from '../../types';
import { mockUsers } from '../../data/mockData';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentRole,
    setRole,
    addToast
  } = useLms();

  const [activeTab, setActiveTab] = useState<'demo' | 'login' | 'register'>('demo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleDemoSwitch = (role: UserRole) => {
    setRole(role);
    setIsAuthModalOpen(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    addToast('Authentication Successful', `Welcome back, ${mockUsers[selectedRole].name}!`, 'success');
    setIsAuthModalOpen(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;
    setRole(selectedRole);
    addToast('Account Created', `Welcome to EduPulse LMS, ${fullName}!`, 'success');
    setIsAuthModalOpen(false);
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      title="EduPulse LMS • Access Portal"
      subtitle="Role-based Learning Management System for Classes 1 to 12"
      maxWidth="md"
    >
      {/* Navigation tabs */}
      <div className="flex border-b border-slate-200 mb-6 -mt-2">
        <button
          id="tab-auth-demo"
          onClick={() => setActiveTab('demo')}
          className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'demo'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Quick Demo Roles
        </button>
        <button
          id="tab-auth-login"
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'login'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Sign In
        </button>
        <button
          id="tab-auth-register"
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'register'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Register
        </button>
      </div>

      {activeTab === 'demo' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600 mb-2">
            Select a verified persona to test the complete, dedicated role workflow:
          </p>

          {/* Student option */}
          <div
            id="role-select-student"
            onClick={() => handleDemoSwitch('student')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              currentRole === 'student'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <img
                src={mockUsers.student.avatar}
                alt="Student"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{mockUsers.student.name}</h4>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                    Student
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Class 10 - Section A • Roll No. {mockUsers.student.rollNumber}
                </p>
              </div>
            </div>
            {currentRole === 'student' ? (
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <span className="text-xs text-indigo-600 font-medium flex items-center gap-1">
                Enter <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          {/* Teacher option */}
          <div
            id="role-select-teacher"
            onClick={() => handleDemoSwitch('teacher')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              currentRole === 'teacher'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <img
                src={mockUsers.teacher.avatar}
                alt="Teacher"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{mockUsers.teacher.name}</h4>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-700 rounded-full">
                    Faculty
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {mockUsers.teacher.designation} • {mockUsers.teacher.department}
                </p>
              </div>
            </div>
            {currentRole === 'teacher' ? (
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <span className="text-xs text-indigo-600 font-medium flex items-center gap-1">
                Enter <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          {/* Admin option */}
          <div
            id="role-select-admin"
            onClick={() => handleDemoSwitch('admin')}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
              currentRole === 'admin'
                ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <img
                src={mockUsers.admin.avatar}
                alt="Admin"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{mockUsers.admin.name}</h4>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-100 text-purple-700 rounded-full">
                    Management / Admin
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {mockUsers.admin.designation} • Institutional Oversight
                </p>
              </div>
            </div>
            {currentRole === 'admin' ? (
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <span className="text-xs text-indigo-600 font-medium flex items-center gap-1">
                Enter <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      )}

      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'teacher', 'admin'] as UserRole[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 text-xs font-semibold rounded-lg capitalize border transition-all ${
                    selectedRole === r
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email || mockUsers[selectedRole].email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@school.edu"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password || '••••••••'}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            id="btn-login-submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            Sign In as {selectedRole.toUpperCase()}
          </button>
        </form>
      )}

      {activeTab === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Registration Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'teacher', 'admin'] as UserRole[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`py-2 text-xs font-semibold rounded-lg capitalize border transition-all ${
                    selectedRole === r
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rohan Verma"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Institutional Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.edu"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            id="btn-register-submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            Create {selectedRole.toUpperCase()} Account
          </button>
        </form>
      )}
    </Modal>
  );
};
