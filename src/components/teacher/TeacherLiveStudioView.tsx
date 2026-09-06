import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  Radio,
  Video,
  Mic,
  MicOff,
  Monitor,
  Users,
  MessageSquare,
  BarChart2,
  Calendar,
  Clock,
  Plus,
  Play,
  CheckCircle2,
  Hand,
  VolumeX,
  Share2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LiveClass } from '../../types';

export const TeacherLiveStudioView: React.FC = () => {
  const { liveClasses, scheduleLiveClass, addToast } = useLms();
  const [activeStreamClass, setActiveStreamClass] = useState<LiveClass | null>(null);

  // Teacher studio interactive states
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isPollOpen, setIsPollOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('Do you understand the Solenoid magnetic field direction?');
  const [pollVotes, setPollVotes] = useState({ yes: 28, no: 4, review: 6 });
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Aarav Patel', text: 'Sir, magnetic field lines are continuous loops inside right?', time: '11:04 AM' },
    { id: 2, sender: 'Ananya Sharma', text: 'Yes, B = μ₀nI formula derived on board is very clear!', time: '11:06 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Schedule modal
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newGrade, setNewGrade] = useState<'Class 10'>('Class 10');
  const [newSection, setNewSection] = useState('A');
  const [newTime, setNewTime] = useState('Today, 04:00 PM');
  const [newDuration, setNewDuration] = useState(45);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) {
      addToast('Input Required', 'Please enter a topic title for the live class.', 'warning');
      return;
    }
    scheduleLiveClass({
      subject: newSubject,
      topic: newTopic,
      grade: newGrade,
      section: newSection,
      instructorName: 'Dr. Sunita Rao',
      instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      startTime: newTime,
      durationMinutes: newDuration,
      status: 'upcoming'
    });
    setIsScheduleModalOpen(false);
    setNewTopic('');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'Dr. Sunita Rao (Teacher)', text: chatInput, time: 'Just now' }
    ]);
    setChatInput('');
  };

  return (
    <div id="teacher-live-studio-root" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 animate-pulse text-rose-500" /> Interactive Digital Classroom
          </div>
          <h1 className="text-2xl font-black tracking-tight">Live Class Host Studio</h1>
          <p className="text-sm text-slate-300 mt-1">
            Schedule live video lectures, host virtual stream studios, launch instant polls, and moderate live Q&A.
          </p>
        </div>
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Live Class</span>
        </button>
      </div>

      {/* Live Stream Host Studio Modal / Canvas (If active) */}
      {activeStreamClass && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white space-y-6 shadow-2xl animate-in fade-in duration-200">
          {/* Studio Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white uppercase tracking-wider">
                    BROADCASTING LIVE
                  </span>
                  <span className="text-xs text-slate-400 font-mono">00:24:18 / {activeStreamClass.durationMinutes}m</span>
                </div>
                <h2 className="text-base font-extrabold text-white mt-0.5">{activeStreamClass.topic}</h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  addToast('Muted All Students', 'All student microphones set to silent.', 'info');
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Mute all student microphones"
              >
                <VolumeX className="w-4 h-4 text-amber-400" />
                <span>Mute All</span>
              </button>

              <button
                onClick={() => setIsPollOpen(true)}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <BarChart2 className="w-4 h-4" />
                <span>Launch Poll</span>
              </button>

              <button
                onClick={() => {
                  setActiveStreamClass(null);
                  addToast('Live Broadcast Ended', 'Recording saved to Video Library.', 'success');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                End Stream
              </button>
            </div>
          </div>

          {/* Video Stream & Studio Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Broadcast Canvas */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative aspect-video rounded-3xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center group shadow-inner">
                {/* Background Stream Artwork / WebCam Simulation */}
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80"
                  alt="Teacher Live Stream"
                  className={`w-full h-full object-cover transition-opacity ${isCameraOn ? 'opacity-90' : 'opacity-20'}`}
                />

                {!isCameraOn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                    <Video className="w-12 h-12 mb-2 text-slate-600" />
                    <p className="text-xs font-bold">Camera Turned Off</p>
                  </div>
                )}

                {isScreenSharing && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md">
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Sharing Desktop Screen (1920x1080)</span>
                  </div>
                )}

                {/* Teacher Overlay Badge */}
                <div className="absolute bottom-4 left-4 p-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                    alt="Dr. Sunita Rao"
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">Dr. Sunita Rao (Host)</p>
                    <p className="text-[10px] text-indigo-400 font-semibold">{activeStreamClass.subject} • {activeStreamClass.grade}</p>
                  </div>
                </div>

                {/* Raise Hand Alert Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg animate-bounce">
                  <Hand className="w-4 h-4" />
                  <span>Aarav Patel Raised Hand!</span>
                </div>
              </div>

              {/* Bottom Control Toolbar */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setIsMicOn(!isMicOn);
                    addToast(isMicOn ? 'Microphone Muted' : 'Microphone Active', '', 'info');
                  }}
                  className={`p-3 rounded-2xl font-bold transition-all cursor-pointer ${
                    isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                  }`}
                  title="Toggle Microphone"
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => {
                    setIsCameraOn(!isCameraOn);
                    addToast(isCameraOn ? 'Camera Disabled' : 'Camera Enabled', '', 'info');
                  }}
                  className={`p-3 rounded-2xl font-bold transition-all cursor-pointer ${
                    isCameraOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                  }`}
                  title="Toggle Camera"
                >
                  <Video className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setIsScreenSharing(!isScreenSharing);
                    addToast(isScreenSharing ? 'Screen Sharing Stopped' : 'Screen Share Active', '', 'info');
                  }}
                  className={`p-3 rounded-2xl font-bold transition-all cursor-pointer ${
                    isScreenSharing ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                  title="Share Screen"
                >
                  <Monitor className="w-5 h-5" />
                </button>

                <div className="w-px h-8 bg-slate-800" />

                <button
                  onClick={() => setIsPollOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Quick Poll</span>
                </button>
              </div>
            </div>

            {/* Right Chat & Participant Tabs */}
            <div className="space-y-4 flex flex-col h-full justify-between">
              {/* Poll Container Preview */}
              {isPollOpen && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Active Live Poll
                    </span>
                    <button
                      onClick={() => setIsPollOpen(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Close Poll
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-white">{pollQuestion}</p>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Yes, clear (73%)</span>
                        <span>{pollVotes.yes} votes</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[73%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Need another example (16%)</span>
                        <span>{pollVotes.review} votes</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-500 w-[16%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Feed */}
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col h-80">
                <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-indigo-400" /> Class Q&A Stream
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">38 Online</span>
                </div>

                <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 text-xs">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-indigo-300">{msg.sender}</span>
                        <span className="text-[10px] text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-slate-200">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    placeholder="Broadcast note to class..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button type="submit" className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Live Sessions Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-extrabold text-slate-900">Scheduled & Recent Live Sessions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveClasses.map((lc) => (
            <div
              key={lc.id}
              className="p-5 rounded-3xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-700">
                      {lc.grade}-{lc.section}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-700">
                      {lc.subject}
                    </span>
                    {lc.status === 'live' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white animate-pulse">
                        LIVE NOW
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-2">{lc.topic}</h3>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{lc.startTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lc.durationMinutes} mins</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {lc.attendeesCount ? `${lc.attendeesCount} Students Attended` : 'Enrolled: 42 Students'}
                </span>
                <button
                  onClick={() => {
                    setActiveStreamClass(lc);
                    addToast('Live Studio Connected', `Hosting "${lc.topic}"`, 'success');
                  }}
                  className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{lc.status === 'live' ? 'Enter Studio' : 'Start Broadcast'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Live Class Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Schedule Interactive Live Class</h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Topic Title</label>
                <input
                  type="text"
                  placeholder="e.g. Electromagnetic Induction & Faraday's Law"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Class & Section</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  >
                    <option value="Class 10">Class 10-A</option>
                    <option value="Class 12">Class 12-B</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Start Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200"
                >
                  Schedule Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
