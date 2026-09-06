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
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Institutional Admin Settings (Admin Only) */}
      {currentRole === 'admin' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Institutional Roles & LMS Preferences</h3>
              <p className="text-xs text-slate-500">Configure global academic policies, grading scales, and access matrices</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-extrabold border border-purple-100 uppercase tracking-wider">
              Admin Privilege
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Academic Year Session</label>
              <select className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                <option value="2026-2027">2026 – 2027 (Active Term)</option>
                <option value="2025-2026">2025 – 2026 (Archived)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Grading Scale System</label>
              <select className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                <option value="letter">Letter Grades (A+, A, B, C, D, F)</option>
                <option value="cgpa">4.0 CGPA Cumulative Scale</option>
                <option value="percentage">Percentage (0% - 100%)</option>
              </select>
            </div>
          </div>

          {/* Roles & Access Matrix */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Role Access & Permission Matrix
            </h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Role</th>
                    <th className="py-2.5 px-3 text-center">Manage Students</th>
                    <th className="py-2.5 px-3 text-center">Assign Grades</th>
                    <th className="py-2.5 px-3 text-center">Collect Fees</th>
                    <th className="py-2.5 px-3 text-center">Publish Notices</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900">Institutional Admin</td>
                    <td className="py-2.5 px-3 text-center text-emerald-600 font-bold">Full Access</td>
                    <td className="py-2.5 px-3 text-center text-emerald-600 font-bold">Full Access</td>
                    <td className="py-2.5 px-3 text-center text-emerald-600 font-bold">Full Access</td>
                    <td className="py-2.5 px-3 text-center text-emerald-600 font-bold">Full Access</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900">Faculty / Teacher</td>
                    <td className="py-2.5 px-3 text-center text-slate-400">View Only</td>
                    <td className="py-2.5 px-3 text-center text-emerald-600 font-bold">Full Access</td>
                    <td className="py-2.5 px-3 text-center text-slate-300">No Access</td>
                    <td className="py-2.5 px-3 text-center text-indigo-600 font-bold">Class Scope</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900">Student & Parent</td>
                    <td className="py-2.5 px-3 text-center text-slate-300">No Access</td>
                    <td className="py-2.5 px-3 text-center text-slate-400">View Only</td>
                    <td className="py-2.5 px-3 text-center text-indigo-600 font-bold">Pay Own Dues</td>
                    <td className="py-2.5 px-3 text-center text-slate-400">Read Only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* System Audit Log */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                System Security & Activity Audit Log
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">Live Sync</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">[Security Log] Administrator Logged In</span>
                  <p className="text-[11px] text-slate-500">IP: 192.168.1.104 • Auth Method: OAuth 2.0 2FA</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Today, 12:04 PM</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">[Financial Log] Fee Invoice #INV-2026-001 Cleared</span>
                  <p className="text-[11px] text-slate-500">Student: Aarav Patel • Amount: $2,400 • TXN-849201</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Today, 10:15 AM</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">[Academic Log] Class 10 Physics Midterm Published</span>
                  <p className="text-[11px] text-slate-500">Publisher: Dr. Sunita Rao • Enrolled: 42 Students</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Yesterday, 4:30 PM</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => addToast('Institutional Preferences Saved', 'Global school settings updated.', 'success')}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
            >
              Save Institutional Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
