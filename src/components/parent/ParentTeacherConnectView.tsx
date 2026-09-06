import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  MessageSquare,
  Calendar,
  Star,
  Send,
  User,
  Plus,
  CheckCircle2,
  Video,
  MapPin,
  Clock
} from 'lucide-react';

export const ParentTeacherConnectView: React.FC = () => {
  const {
    selectedChild,
    teachers,
    parentMeetings,
    bookParentTeacherMeeting,
    submitTeacherReview,
    addToast
  } = useLms();

  const [activeTab, setActiveTab] = useState<'teachers' | 'meetings' | 'reviews'>('teachers');
  const [isBookMeetingOpen, setIsBookMeetingOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Selected teacher for meeting/review
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || '');
  const [meetingDate, setMeetingDate] = useState('2026-09-18');
  const [meetingTime, setMeetingTime] = useState('03:30 PM - 03:50 PM');
  const [meetingMode, setMeetingMode] = useState<'video_call' | 'in_person'>('video_call');
  const [meetingAgenda, setMeetingAgenda] = useState('');

  // Review Form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const targetTeacher = teachers.find((t) => t.id === selectedTeacherId) || teachers[0];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookParentTeacherMeeting({
      studentId: selectedChild.id,
      teacherId: targetTeacher.id,
      teacherName: targetTeacher.name,
      teacherAvatar: targetTeacher.avatar,
      subject: targetTeacher.department,
      requestedDate: meetingDate,
      requestedTime: meetingTime,
      mode: meetingMode,
      agenda: meetingAgenda || 'Quarterly academic review'
    });
    setIsBookMeetingOpen(false);
    setMeetingAgenda('');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    submitTeacherReview({
      teacherId: targetTeacher.id,
      teacherName: targetTeacher.name,
      subject: targetTeacher.department,
      rating: reviewRating,
      feedbackText: reviewText,
      category: 'teaching_quality',
      anonymous: false
    });
    setIsReviewModalOpen(false);
    setReviewText('');
  };

  return (
    <div id="parent-teacher-connect-view" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Teacher Communication & PTA Meetings
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Connect with subject faculty, schedule parent-teacher meetings, and provide feedback for {selectedChild.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookMeetingOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" /> Book PTA Meeting Slot
          </button>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Star className="w-4 h-4" /> Submit Teacher Feedback
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold text-slate-600 gap-4">
        <button
          onClick={() => setActiveTab('teachers')}
          className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'teachers' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
          }`}
        >
          Child Faculty Directory ({teachers.length})
        </button>
        <button
          onClick={() => setActiveTab('meetings')}
          className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'meetings' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
          }`}
        >
          Scheduled PTA Meetings ({parentMeetings.length})
        </button>
      </div>

      {/* Faculty Cards */}
      {activeTab === 'teachers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((tch) => (
            <div key={tch.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <img src={tch.avatar} alt={tch.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-200" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{tch.name}</h4>
                  <p className="text-xs text-slate-500">{tch.designation}</p>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                    {tch.department}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    setSelectedTeacherId(tch.id);
                    setIsBookMeetingOpen(true);
                  }}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg transition-colors cursor-pointer text-xs"
                >
                  Book Slot
                </button>
                <button
                  onClick={() => {
                    setSelectedTeacherId(tch.id);
                    setIsReviewModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg transition-colors cursor-pointer text-xs"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Meetings Tab */}
      {activeTab === 'meetings' && (
        <div className="space-y-3">
          {parentMeetings.map((mtg) => (
            <div key={mtg.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={mtg.teacherAvatar} alt={mtg.teacherName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">{mtg.teacherName}</h4>
                    <p className="text-[11px] text-slate-500">{mtg.subject}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
                  {mtg.status}
                </span>
              </div>
              <p className="text-xs text-slate-600">Agenda: "{mtg.agenda}"</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>🗓️ {mtg.requestedDate} • {mtg.requestedTime}</span>
                <span>Location: {mtg.venue || 'Video Call Link'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book PTA Meeting Modal */}
      {isBookMeetingOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Schedule Parent-Teacher Meeting</h3>
              <button onClick={() => setIsBookMeetingOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Faculty Member</label>
                <select
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.department})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meeting Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingMode('video_call')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      meetingMode === 'video_call' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    📹 Video Call Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingMode('in_person')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      meetingMode === 'in_person' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    🏫 In-Person at Campus
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Discussion Agenda / Topic</label>
                <textarea
                  rows={3}
                  value={meetingAgenda}
                  onChange={(e) => setMeetingAgenda(e.target.value)}
                  placeholder="e.g., Discussion on Physics lab performance and Midterm preparation..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookMeetingOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
                >
                  Request Meeting Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Submit Teacher Feedback</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`text-xl cursor-pointer ${star <= reviewRating ? 'text-amber-500' : 'text-slate-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Feedback Comments</label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share feedback on teaching quality, clarity, and support..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
