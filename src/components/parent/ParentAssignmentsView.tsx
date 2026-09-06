import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';

export const ParentAssignmentsView: React.FC = () => {
  const { selectedChild, assignments, addToast } = useLms();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const demoChildAssignments = [
    {
      id: 'asg-101',
      title: 'Numerical Problem Set 3: Ohm\'s Law & Parallel Resistance',
      courseName: 'Class 10 Physics',
      instructorName: 'Dr. Sunita Rao',
      dueDate: 'Sep 10, 2026',
      status: 'pending',
      maxScore: 50,
      description: 'Solve problems 1 through 15 on page 142 of textbook.'
    },
    {
      id: 'asg-102',
      title: 'Trigonometric Identities & Proofs Worksheet',
      courseName: 'Class 10 Mathematics',
      instructorName: 'Prof. David Miller',
      dueDate: 'Aug 30, 2026',
      status: 'evaluated',
      score: 48,
      maxScore: 50,
      teacherFeedback: 'Outstanding work! Very neat step-by-step proofs.',
      description: 'Complete all section B proof questions.'
    },
    {
      id: 'asg-103',
      title: 'Shakespearean Sonnet Critical Analysis Essay',
      courseName: 'Class 10 English',
      instructorName: 'Elena Rostova',
      dueDate: 'Aug 25, 2026',
      status: 'evaluated',
      score: 45,
      maxScore: 50,
      teacherFeedback: 'Great imagery analysis in Sonnet 18.',
      description: 'Write a 500-word critical review.'
    }
  ];

  const filteredAssignments = demoChildAssignments.filter((asg) => {
    const matchStatus = filterStatus === 'all' || asg.status === filterStatus;
    const matchSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div id="parent-assignments-view" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Assignments & Homework Monitoring
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track pending homework, submission dates, evaluated scores, and teacher comments for {selectedChild.name}.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 text-xs font-semibold border border-slate-200 rounded-xl bg-white focus:outline-none"
          >
            <option value="all">All Assignments</option>
            <option value="pending">Pending Homework</option>
            <option value="evaluated">Evaluated & Graded</option>
          </select>
        </div>
      </div>

      {/* Assignment Cards Stream */}
      <div className="space-y-3">
        {filteredAssignments.map((asg) => (
          <div key={asg.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                    {asg.courseName}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      asg.status === 'evaluated'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {asg.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{asg.title}</h3>
                <p className="text-xs text-slate-500">Assigned by {asg.instructorName} • Due: {asg.dueDate}</p>
              </div>

              {asg.status === 'evaluated' && (
                <div className="text-right">
                  <span className="text-xl font-extrabold text-emerald-600">
                    {asg.score} / {asg.maxScore}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400">Score Recorded</p>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600">{asg.description}</p>

            {asg.teacherFeedback && (
              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 border border-slate-200/60">
                <span className="font-bold text-indigo-700">Teacher Remarks: </span>
                <span>"{asg.teacherFeedback}"</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
