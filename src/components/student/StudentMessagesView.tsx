import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { ChatMessage } from '../../types';
import {
  MessageSquare,
  Send,
  User,
  Paperclip,
  Search,
  CheckCheck,
  Sparkles,
  Bot
} from 'lucide-react';

export const StudentMessagesView: React.FC = () => {
  const { studentMessages, sendStudentMessage, teachers, currentUser, addToast } = useLms();
  const [selectedContactId, setSelectedContactId] = useState('usr_tch_01');
  const [inputMessage, setInputMessage] = useState('');

  const activeContact = teachers.find((t) => t.id === selectedContactId || t.name.includes('Sunita')) || teachers[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendStudentMessage(activeContact.id, inputMessage.trim());
    setInputMessage('');
  };

  return (
    <div id="student-messages-view" className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            Teacher Connect & Subject Messages
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Direct communication with subject faculty, homework assistance, and batch discussions
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
          <Bot className="w-4 h-4 text-indigo-600" />
          <span>Faculty Office Hours Active</span>
        </div>
      </div>

      {/* Main Chat Layout: Contacts list on left, Chat conversation on right */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-3 min-h-[550px]">
        {/* Left 1 Col: Faculty Contacts */}
        <div className="border-r border-slate-100 flex flex-col justify-between">
          <div className="p-4 border-b border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Faculty & Group Contacts</h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search teacher..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {teachers.map((tch) => {
              const isSelected = tch.id === selectedContactId || (tch.name.includes('Sunita') && selectedContactId === 'usr_tch_01');
              return (
                <div
                  key={tch.id}
                  onClick={() => setSelectedContactId(tch.id)}
                  className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-50/70 text-indigo-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <img
                    src={tch.avatar}
                    alt={tch.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{tch.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{tch.department}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Active Chat Conversation */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{activeContact.name}</h4>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {activeContact.department} • Online
                </p>
              </div>
            </div>

            <button
              onClick={() => addToast('Attachment Upload', 'Ready to attach homework file.', 'info')}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {studentMessages.map((msg) => {
              const isMe = msg.senderRole === 'student' || msg.senderName.includes('Aarav');
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 max-w-lg ${
                    isMe ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover mt-0.5 shrink-0"
                  />
                  <div
                    className={`p-3.5 rounded-2xl space-y-1 shadow-xs ${
                      isMe
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px] opacity-80">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${activeContact.name}...`}
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
