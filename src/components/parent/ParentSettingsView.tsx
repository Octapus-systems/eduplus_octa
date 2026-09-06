import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  User,
  Mail,
  Phone,
  Bell,
  Lock,
  Save,
  ShieldCheck,
  Camera
} from 'lucide-react';

export const ParentSettingsView: React.FC = () => {
  const { currentUser, updateProfile, addToast, setAuthModalOpen } = useLms();

  const [parentName, setParentName] = useState(currentUser.name);
  const [parentEmail, setParentEmail] = useState(currentUser.email);
  const [parentPhone, setParentPhone] = useState(currentUser.phone || '+1 (555) 987-6543');

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [feeReminders, setFeeReminders] = useState(true);
  const [examAlerts, setExamAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: parentName, email: parentEmail, phone: parentPhone });
    addToast('Parent Account Updated', 'Personal contact information saved.', 'success');
  };

  return (
    <div id="parent-settings-view" className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Parent Account Profile & Communication Settings
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage contact details, emergency notification preferences, and portal security.
        </p>
      </div>

      {/* Parent Profile Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-20 h-20 rounded-2xl object-cover ring-2 ring-amber-400"
        />

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h3 className="text-lg font-bold text-slate-900">{currentUser.name}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
              Verified Parent / Guardian
            </span>
          </div>
          <p className="text-xs text-slate-500">{currentUser.email}</p>
          <p className="text-xs text-slate-600 pt-1">
            Linked Students: <strong className="text-slate-900">Arjun Mehta (Class 10-A), Ananya Mehta (Class 7-B)</strong>
          </p>
        </div>

        <button
          onClick={() => setAuthModalOpen(true)}
          className="px-3.5 py-2 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors cursor-pointer"
        >
          Switch Role View
        </button>
      </div>

      {/* Contact Details Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Guardian Contact Information</h3>
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Mobile Number</label>
              <input
                type="text"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
              <input
                type="text"
                disabled
                value="108 Palm Avenue, Springdale"
                className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Profile Details
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Communication & Alert Preferences</h3>

        <div className="divide-y divide-slate-100 text-xs text-slate-700">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">Instant SMS Attendance Alerts</span>
              <p className="text-[11px] text-slate-500">Receive SMS if child is marked absent at morning roll call</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">Fee Due Reminders & Receipts</span>
              <p className="text-[11px] text-slate-500">Email notice 5 days before tuition due date</p>
            </div>
            <input
              type="checkbox"
              checked={feeReminders}
              onChange={(e) => setFeeReminders(e.target.checked)}
              className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">Exam Results & Datesheet Notices</span>
              <p className="text-[11px] text-slate-500">Instant notification when report cards are published</p>
            </div>
            <input
              type="checkbox"
              checked={examAlerts}
              onChange={(e) => setExamAlerts(e.target.checked)}
              className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
