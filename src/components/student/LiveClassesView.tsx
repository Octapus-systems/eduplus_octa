import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { LiveClass } from '../../types';
import { Modal } from '../common/Modal';
import {
  Video,
  Clock,
  User,
  CheckCircle2,
  Play,
  MessageSquare,
  Hand,
  Mic,
  MicOff,
  VideoOff,
  Send,
  Users,
  Sparkles,
  Calendar,
  Layers,
  Radio,
  FileText
} from 'lucide-react';

export const LiveClassesView: React.FC = () => {
  const { liveClasses, addToast } = useLms();
  const [activeClassModal, setActiveClassModal] = useState<LiveClass | null>(null);
  const [liveChatMessages, setLiveChatMessages] = useState([
    { sender: 'Dr. Sunita Rao (Teacher)', text: 'Welcome batch 10-A! Today we demonstrate solenoid electromagnetic induction.', time: '11:00 AM', isTeacher: true },
    { sender: 'Ananya Sharma', text: 'Good morning ma\'am! Excited for the live experiment.', time: '11:01 AM', isTeacher: false },
    { sender: 'Rohan Gupta', text: 'Can we ask questions via audio or chat?', time: '11:02 AM', isTeacher: false }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setLiveChatMessages((prev) => [
      ...prev,
      {
        sender: 'Aarav Patel (You)',
        text: chatInput.trim(),
        time: 'Just now',
        isTeacher: false
      }
    ]);
    setChatInput('');
  };

  const handleToggleHand = () => {
    setIsHandRaised(!isHandRaised);
    addToast(
      !isHandRaised ? 'Hand Raised' : 'Hand Lowered',
      !isHandRaised ? 'Dr. Sunita Rao has been notified.' : 'Hand state reset.',
      'info'
    );
  };

  return (
    <div id="student-live-classes-view" className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Radio className="w-6 h-6 text-rose-500 animate-pulse" />
            Live Digital Classroom & Timetable
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Attend live interactive lectures, participate in real-time Q&A, and stream lecture recordings
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span>1 Live Lecture Running Now</span>
        </div>
      </div>

      {/* Live & Scheduled Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {liveClasses.map((item) => {
          const isLive = item.status === 'live';
          const isStartingSoon = item.status === 'starting_soon';
          const isCompleted = item.status === 'completed';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border p-6 shadow-xs transition-all flex flex-col justify-between ${
                isLive
                  ? 'border-rose-300 ring-2 ring-rose-500/20 bg-gradient-to-br from-white via-rose-50/20 to-white'
                  : 'border-slate-200/80 hover:border-indigo-200'
              }`}
            >
              <div className="space-y-4">
                {/* Status bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                    {item.subject} • {item.grade} ({item.section})
                  </span>

                  {isLive && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-rose-600 text-white tracking-wider animate-pulse flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-white" /> LIVE STREAM
                    </span>
                  )}
                  {isStartingSoon && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      Starting Soon
                    </span>
                  )}
                  {item.status === 'upcoming' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      Upcoming
                    </span>
                  )}
                  {isCompleted && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Completed
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {item.topic}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{item.startTime}</span>
                    <span>•</span>
                    <span>{item.durationMinutes} Minutes Session</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src={item.instructorAvatar}
                    alt={item.instructorName}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{item.instructorName}</p>
                    <p className="text-[10px] text-slate-400">Subject Faculty</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {isLive ? `${item.attendeesCount} Students Online` : `${item.durationMinutes} mins`}
                </span>

                {isLive && (
                  <button
                    onClick={() => setActiveClassModal(item)}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-200 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Video className="w-4 h-4 fill-current" /> Join Live Classroom
                  </button>
                )}

                {isStartingSoon && (
                  <button
                    onClick={() => addToast('Class Reminder Set', 'We will alert you 5 mins before start.', 'info')}
                    className="px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Set Reminder
                  </button>
                )}

                {isCompleted && (
                  <button
                    onClick={() => setActiveClassModal(item)}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Watch Recording
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Classroom Interactive Modal */}
      {activeClassModal && (
        <Modal
          isOpen={!!activeClassModal}
          onClose={() => setActiveClassModal(null)}
          title={`Live Session: ${activeClassModal.topic}`}
          subtitle={`${activeClassModal.subject} • Faculty: ${activeClassModal.instructorName}`}
          maxWidth="4xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left 2 Cols: Video Stream Simulation */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl relative aspect-video flex flex-col justify-between p-4">
                {/* Simulated live video canvas */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-rose-950/70 flex items-center justify-center p-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-rose-600/30 border border-rose-500 flex items-center justify-center text-white mx-auto animate-pulse">
                      <Radio className="w-8 h-8 text-rose-400" />
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider">
                        STREAM ACTIVE
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {activeClassModal.topic}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Presenter: {activeClassModal.instructorName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Top overlay pills */}
                <div className="relative z-10 flex items-center justify-between text-xs text-white">
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs font-mono text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    HD 1080p • 60 FPS
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-[11px] font-semibold">
                    Room: {activeClassModal.roomCode || 'ROOM-101'}
                  </span>
                </div>

                {/* Bottom Stream Controls Bar */}
                <div className="relative z-10 flex items-center justify-between bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        isMuted ? 'bg-rose-600/80 text-white' : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      <span>{isMuted ? 'Muted' : 'Unmuted'}</span>
                    </button>
                    <button
                      onClick={handleToggleHand}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        isHandRaised ? 'bg-amber-500 text-white' : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      <Hand className="w-4 h-4" />
                      <span>{isHandRaised ? 'Hand Raised!' : 'Raise Hand'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveClassModal(null)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Leave Class
                  </button>
                </div>
              </div>

              {/* Presentation Slide Navigator */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-slate-800">Presentation Deck: Solenoid_Field_3D.pdf</span>
                </div>
                <button
                  onClick={() => addToast('Slide Downloaded', 'Deck saved to local storage.', 'success')}
                  className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg"
                >
                  Download Slides
                </button>
              </div>
            </div>

            {/* Right 1 Col: Live Chat Feed */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between h-[360px] shadow-xs">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" /> Live Batch Chat
                </h4>
                <span className="text-[10px] text-slate-400 font-medium">38 Online</span>
              </div>

              {/* Chat list */}
              <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
                {liveChatMessages.map((msg, idx) => (
                  <div key={idx} className={`space-y-0.5 ${msg.isTeacher ? 'bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-100' : ''}`}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={`font-bold ${msg.isTeacher ? 'text-indigo-800' : 'text-slate-700'}`}>
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-slate-600 leading-snug">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Send Chat input */}
              <form onSubmit={handleSendChat} className="pt-2 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
