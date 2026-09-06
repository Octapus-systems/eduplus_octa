import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ParentExamsResultsView: React.FC = () => {
  const { selectedChild, addToast } = useLms();
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [isHallTicketOpen, setIsHallTicketOpen] = useState(false);

  const upcomingExams = [
    {
      id: 'ex-101',
      title: 'Class 10 Physics Midterm Assessment',
      subject: 'Physics',
      date: 'Sep 15, 2026',
      time: '09:30 AM - 11:30 AM',
      duration: '2 Hours',
      venue: 'Science Block - Lab Room 302',
      totalMarks: 100,
      passingMarks: 40
    },
    {
      id: 'ex-102',
      title: 'Mathematics Trigonometry & Calculus Unit Exam',
      subject: 'Mathematics',
      date: 'Sep 18, 2026',
      time: '10:00 AM - 12:00 PM',
      duration: '2 Hours',
      venue: 'Auditorium Hall B',
      totalMarks: 100,
      passingMarks: 40
    }
  ];

  const completedExams = [
    {
      id: 'ex-090',
      title: 'English Essay & Grammar Quarterly Test',
      subject: 'English',
      date: 'Aug 28, 2026',
      marksObtained: 95,
      totalMarks: 100,
      grade: 'A+',
      percentile: '98th Percentile',
      teacherRemarks: 'Excellent vocabulary, impressive essay structure and analytical reasoning.'
    },
    {
      id: 'ex-091',
      title: 'Computer Science Data Structures Assessment',
      subject: 'Computer Science',
      date: 'Aug 20, 2026',
      marksObtained: 94,
      totalMarks: 100,
      grade: 'A+',
      percentile: '96th Percentile',
      teacherRemarks: 'Flawless code logic in Python sorting algorithms.'
    }
  ];

  return (
    <div id="parent-exams-results-view" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Exams, Datesheets & Exam Hall Tickets
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Monitor exam timetables, venue allocations, score ledgers, and download official hall tickets for {selectedChild.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveSubTab('upcoming')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'upcoming' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Upcoming Datesheet ({upcomingExams.length})
            </button>
            <button
              onClick={() => setActiveSubTab('completed')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'completed' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Completed Results ({completedExams.length})
            </button>
          </div>

          <button
            onClick={() => {
              setIsHallTicketOpen(true);
              addToast('Exam Hall Ticket', 'Generating hall ticket pass...', 'info');
            }}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Hall Ticket
          </button>
        </div>
      </div>

      {activeSubTab === 'upcoming' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Upcoming Examination Datesheet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase">
                      {exam.subject}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{exam.title}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">Max Marks: {exam.totalMarks}</span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Exam Date: <strong className="text-slate-900">{exam.date}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span>Time & Duration: <strong className="text-slate-900">{exam.time} ({exam.duration})</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>Venue Allocation: <strong className="text-slate-900">{exam.venue}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'completed' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Evaluated Exam Ledger & Remarks</h3>
          <div className="space-y-3">
            {completedExams.map((exam) => (
              <div key={exam.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase">
                      {exam.subject}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{exam.title}</h4>
                    <p className="text-xs text-slate-500">Evaluated on {exam.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-600">{exam.marksObtained} / {exam.totalMarks}</span>
                    <p className="text-xs font-bold text-slate-700">Grade {exam.grade} • {exam.percentile}</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700">
                  <span className="font-bold text-indigo-700 block mb-0.5">Teacher Evaluation Remark:</span>
                  <p>"{exam.teacherRemarks}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hall Ticket Modal */}
      {isHallTicketOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Official Exam Admit Card / Hall Ticket</h3>
                <p className="text-xs text-slate-500">Midterm Examination Term 1 (2026–2027)</p>
              </div>
              <button onClick={() => setIsHallTicketOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900">Student: {selectedChild.name}</span>
                <span className="font-mono text-amber-800 font-bold">Roll #{selectedChild.rollNumber}</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Authorized for entry in Science Lab Room 302 & Auditorium Hall B. Please carry physical ID card.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsHallTicketOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToast('Downloaded', 'Hall_Ticket_Pass.pdf downloaded.', 'success');
                  setIsHallTicketOpen(false);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download PDF Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
