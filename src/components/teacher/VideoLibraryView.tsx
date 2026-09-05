import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { allGradesList } from '../../data/mockData';
import { Modal } from '../common/Modal';
import {
  Video,
  UploadCloud,
  Play,
  Eye,
  Calendar,
  Search,
  Filter,
  Plus,
  Clock,
  Sparkles
} from 'lucide-react';

export const VideoLibraryView: React.FC = () => {
  const { videoLibrary, uploadVideoLecture, currentUser, addToast } = useLms();
  const [selectedGrade, setSelectedGrade] = useState('All Classes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload modal form states
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newGrade, setNewGrade] = useState('Class 10');
  const [newDuration, setNewDuration] = useState('25:00');
  const [newTags, setNewTags] = useState('Class 10, Lab Experiment, Optics');

  const filteredVideos = videoLibrary.filter((v) => {
    const matchGrade = selectedGrade === 'All Classes' || v.grade === selectedGrade;
    const matchSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    uploadVideoLecture({
      title: newTitle.trim(),
      subject: newSubject,
      grade: newGrade as any,
      duration: newDuration || '20:00',
      dateRecorded: 'Today',
      instructorName: currentUser.name,
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80',
      tags: newTags.split(',').map((t) => t.trim())
    });

    setNewTitle('');
    setIsUploadModalOpen(false);
  };

  return (
    <div id="teacher-video-library-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Recorded Video Lectures & Repository
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish asynchronous classroom recordings, laboratory walkthroughs, and revision clips
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Grade filter */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
          >
            <option value="All Classes">All Grades (1–12)</option>
            {allGradesList.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Upload Recording
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
          >
            {/* Thumbnail */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-emerald-800">
                {video.grade} • {video.subject}
              </span>

              <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/75 text-white flex items-center gap-1">
                <Clock className="w-3 h-3" /> {video.duration}
              </span>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Video Meta */}
            <div className="p-4 space-y-2.5">
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                {video.title}
              </h3>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 text-slate-500">
                  <Eye className="w-3.5 h-3.5" /> {video.views} Student Views
                </span>
                <span>{video.dateRecorded}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {video.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload Recorded Lecture"
          subtitle="Publish class footage to student course video library"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            {/* File selector dropzone */}
            <div className="border-2 border-dashed border-emerald-200 hover:border-emerald-400 bg-emerald-50/20 rounded-2xl p-6 text-center transition-colors">
              <UploadCloud className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">
                Drag and drop MP4 / WebM lecture file
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Supports 1080p video up to 2GB</p>
              <button
                type="button"
                className="mt-3 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-lg shadow-xs hover:bg-slate-50"
              >
                Choose Local Video File
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lecture Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Demonstration of Magnetic Lines of Force in Solenoids"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Grade</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  {allGradesList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Physics"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  required
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="e.g. 28:15"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. Physics, Optics, Class 10"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Publish Recording
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
