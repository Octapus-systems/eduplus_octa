import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  User,
  Mail,
  Phone,
  Shield,
  Bell,
  Save,
  Lock,
  CheckCircle2,
  Camera,
  School
} from 'lucide-react';

export const ProfileSettingsView: React.FC = () => {
  const { currentUser, currentRole, updateProfile, addToast, setAuthModalOpen } = useLms();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || '+1 (555) 019-2834');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [examReminders, setExamReminders] = useState(true);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    addToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    setOldPassword('');
    setNewPassword('');
    addToast('Security Updated', 'Your account password was updated successfully.', 'success');
  };

  return (
    <div id="profile-settings-view" className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Account Profile & System Preferences
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal credentials, contact alerts, and authenticated role permissions
        </p>
      </div>

      {/* User Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative group">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-indigo-500/30"
          />
          <button
            onClick={() => addToast('Avatar Update', 'Select image upload feature triggered.', 'info')}
            className="absolute -bottom-1 -right-1 p-1.5 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h3 className="text-lg font-bold text-slate-900">{currentUser.name}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
              {currentRole}
            </span>
          </div>
          <p className="text-xs text-slate-500">{currentUser.email}</p>
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {currentUser.grade && (
              <span className="text-xs text-slate-600 font-medium">
                Grade: <strong className="text-slate-900">{currentUser.grade} - Sec {currentUser.section}</strong>
              </span>
            )}
            {currentUser.rollNumber && (
              <span className="text-xs text-slate-600 font-medium">
                • Roll: <strong className="text-indigo-600 font-mono">{currentUser.rollNumber}</strong>
              </span>
            )}
            {currentUser.department && (
              <span className="text-xs text-slate-600 font-medium">
                Dept: <strong className="text-emerald-700">{currentUser.department}</strong>
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setAuthModalOpen(true)}
          className="px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
        >
          Switch Role View
        </button>
      </div>

      {/* Personal Info Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Personal & Contact Information</h3>
        <form onSubmit={handleSaveInfo} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution</label>
              <input
                type="text"
                disabled
                value="EduPulse Academy K–12 Central Campus"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Communication & Notification Preferences</h3>

        <div className="divide-y divide-slate-100 text-xs text-slate-700">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">Email Grade Notifications</span>
              <p className="text-[11px] text-slate-500">Receive instant email when assignments are evaluated</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">SMS / WhatsApp Emergency Circulars</span>
              <p className="text-[11px] text-slate-500">Critical campus closure notices and weather alerts</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">Upcoming Test & Datesheet Reminders</span>
              <p className="text-[11px] text-slate-500">Remind 24 hours prior to scheduled quizzes</p>
            </div>
            <input
              type="checkbox"
              checked={examReminders}
              onChange={(e) => setExamReminders(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Password Security */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Security Credentials</h3>

        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
