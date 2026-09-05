import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Announcement } from '../../types';
import { Modal } from './Modal';
import {
  Bell,
  Plus,
  Calendar,
  User,
  AlertCircle,
  Megaphone,
  CheckCircle2,
  Filter
} from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const { announcements, createAnnouncement, currentRole, currentUser, addToast } = useLms();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState<'All' | 'Students' | 'Teachers' | 'Parents'>('All');
  const [priority, setPriority] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [content, setContent] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createAnnouncement({
      title: title.trim(),
      content: content.trim(),
      date: 'Today',
      author: currentUser.name,
      targetAudience,
      priority
    });

    setTitle('');
    setContent('');
    setIsModalOpen(false);
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'urgent':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div id="announcements-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Campus Notices & Circulars
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official broadcasts regarding academic deadlines, holidays, and examination schedules
          </p>
        </div>

        {(currentRole === 'teacher' || currentRole === 'admin') && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Broadcast Announcement
          </button>
        )}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs hover:border-indigo-200 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Target: {item.targetAudience}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getPriorityBadge(
                    item.priority
                  )}`}
                >
                  {item.priority} Priority
                </span>
              </div>

              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {item.date}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" /> Issued by {item.author}
              </span>

              <button
                onClick={() => addToast('Notice Acknowledged', 'Logged to your read history.', 'info')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Mark as Read ✓
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Broadcast Campus Announcement"
          subtitle="Publish instant notice across web app and parent alerts"
        >
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Schedule of Term 1 Science Practical Lab Exams"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Audience</label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="All">All School (Students, Teachers, Parents)</option>
                  <option value="Students">Students Only</option>
                  <option value="Teachers">Faculty / Teachers Only</option>
                  <option value="Parents">Parents Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High Importance</option>
                  <option value="urgent">Urgent Circular</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Content</label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write full circular instructions, reporting times, required stationery..."
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Publish Notice
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
