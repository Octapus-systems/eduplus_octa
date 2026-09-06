import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { ParentChild } from '../../types';
import {
  Users,
  User,
  GraduationCap,
  CalendarCheck2,
  CheckCircle2,
  Mail,
  Phone,
  Home,
  Award,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  BookOpen
} from 'lucide-react';

export const ChildrenDirectoryView: React.FC = () => {
  const { childrenList, selectedChildId, setSelectedChildId, addToast } = useLms();
  const [activeChildTab, setActiveChildTab] = useState<string>(selectedChildId);

  const currentChild = childrenList.find((c) => c.id === activeChildTab) || childrenList[0];

  return (
    <div id="children-directory-view" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            My Children & Student Profiles
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage student account details, class teacher contacts, and enrollment profiles linked to your parent portal.
          </p>
        </div>
      </div>

      {/* Children Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {childrenList.map((child) => {
          const isSelected = selectedChildId === child.id;
          return (
            <div
              key={child.id}
              onClick={() => {
                setActiveChildTab(child.id);
                setSelectedChildId(child.id);
                addToast('Active Child Selected', `Now viewing profile for ${child.name}`, 'info');
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50/50 border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">{child.name}</h3>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase">
                          Active Selection
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {child.grade} — Section {child.section} • Roll #{child.rollNumber}
                    </p>
                    <p className="text-[11px] text-amber-800 font-semibold mt-0.5">{child.house}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/80 p-2 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Attendance</span>
                  <strong className="text-emerald-600 font-extrabold text-sm">{child.attendancePercentage}%</strong>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">GPA / Grade</span>
                  <strong className="text-indigo-600 font-extrabold text-sm">{child.gpa}</strong>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Fee Status</span>
                  <strong
                    className={`font-extrabold text-xs capitalize ${
                      child.feeStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {child.feeStatus}
                  </strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Read-Only Student Dossier */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Dossier — {currentChild.name}</h3>
              <p className="text-xs text-slate-500">Official institutional record for Class 2026–2027</p>
            </div>
          </div>

          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200">
            Admission ID: <strong className="font-mono text-slate-900">{currentChild.admissionId}</strong>
          </span>
        </div>

        {/* Academic & Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Card 1: Basic Stats */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-amber-700">
              Personal & Academic Details
            </h4>
            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Date of Birth:</span>
                <strong className="text-slate-900">{currentChild.dob}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Grade:</span>
                <strong className="text-slate-900">{currentChild.grade}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Section & Roll:</span>
                <strong className="text-slate-900">Sec {currentChild.section} • Roll #{currentChild.rollNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">School House:</span>
                <strong className="text-amber-800">{currentChild.house}</strong>
              </div>
            </div>
          </div>

          {/* Card 2: Faculty Contact */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-amber-700">
              Assigned Class Teacher
            </h4>
            <div className="flex items-center gap-3">
              <img
                src={currentChild.classTeacherAvatar}
                alt={currentChild.classTeacherName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-200"
              />
              <div>
                <h5 className="font-bold text-slate-900">{currentChild.classTeacherName}</h5>
                <p className="text-[11px] text-slate-500">{currentChild.classTeacherEmail}</p>
              </div>
            </div>
            <button
              onClick={() => addToast('Faculty Contact', `Opening chat drawer for ${currentChild.classTeacherName}`, 'info')}
              className="w-full py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-colors cursor-pointer text-[11px]"
            >
              Send Direct Note
            </button>
          </div>

          {/* Card 3: Conduct & Behavioral Remarks */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-amber-700">
              Conduct & Behavioral Standing
            </h4>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                {currentChild.conductRating}
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              Punctual, highly disciplined in lab experiments, and actively participates in inter-house debating competitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
