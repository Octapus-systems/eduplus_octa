import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Bookmark,
  Users,
  Radio
} from 'lucide-react';

export const ParentEventsTimetableComponents: React.FC = () => {
  const { selectedChild, addToast } = useLms();
  const [activeSubTab, setActiveSubTab] = useState<'events' | 'timetable'>('events');
  const [rsvpedEvents, setRsvpedEvents] = useState<string[]>([]);

  const schoolEvents = [
    {
      id: 'ev-1',
      title: 'Annual Parent-Teacher Association (PTA) Conference',
      date: 'Sep 25, 2026',
      time: '02:00 PM - 05:00 PM',
      location: 'School Main Auditorium',
      category: 'PTA Meeting',
      description: 'Quarterly review of academic curriculum, midterm datesheets, and student wellness.'
    },
    {
      id: 'ev-2',
      title: 'Inter-House Sports Meet & Athletics',
      date: 'Oct 05, 2026',
      time: '08:30 AM - 02:00 PM',
      location: 'School Sports Complex Track',
      category: 'Sports Event',
      description: 'Track events, relay races, and house trophy ceremonies.'
    },
    {
      id: 'ev-3',
      title: 'Annual Science & Robotics Exhibition 2026',
      date: 'Oct 15, 2026',
      time: '10:00 AM - 03:00 PM',
      location: 'Science Block Bay A',
      category: 'Academic Fair',
      description: 'Student project displays, physics experiments, and AI model demonstrations.'
    }
  ];

  const childTimetable = [
    { period: 'Period 1', time: '08:30 AM - 09:15 AM', subject: 'Physics & Lab', teacher: 'Dr. Sunita Rao', room: 'Lab 302' },
    { period: 'Period 2', time: '09:15 AM - 10:00 AM', subject: 'Mathematics', teacher: 'Prof. David Miller', room: 'Room 301' },
    { period: 'Period 3', time: '10:00 AM - 10:45 AM', subject: 'English Literature', teacher: 'Elena Rostova', room: 'Room 301' },
    { period: 'Recess Break', time: '10:45 AM - 11:15 AM', subject: 'Cafeteria & Sports Field', teacher: 'House Duty', room: 'Campus Court' },
    { period: 'Period 4', time: '11:15 AM - 12:00 PM', subject: 'Computer Science', teacher: 'Vikram Sharma', room: 'Comp Lab 2' },
    { period: 'Period 5', time: '12:00 PM - 12:45 PM', subject: 'Social Studies', teacher: 'Maria Garcia', room: 'Room 204' }
  ];

  const handleRsvp = (eventId: string, title: string) => {
    if (rsvpedEvents.includes(eventId)) {
      setRsvpedEvents((prev) => prev.filter((id) => id !== eventId));
      addToast('RSVP Cancelled', `Removed RSVP for ${title}`, 'info');
    } else {
      setRsvpedEvents((prev) => [...prev, eventId]);
      addToast('RSVP Confirmed', `Seat reserved for ${title}`, 'success');
    }
  };

  return (
    <div id="parent-events-timetable" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            School Calendar, Events & Timetable
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            View upcoming PTA events, academic fairs, and inspect {selectedChild.name}'s daily class timetable.
          </p>
        </div>

        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('events')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'events' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            School Events ({schoolEvents.length})
          </button>
          <button
            onClick={() => setActiveSubTab('timetable')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'timetable' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            Class Timetable
          </button>
        </div>
      </div>

      {activeSubTab === 'events' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Upcoming School & PTA Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schoolEvents.map((ev) => {
              const isRsvped = rsvpedEvents.includes(ev.id);
              return (
                <div key={ev.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase">
                      {ev.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                    <p className="text-xs text-slate-500">{ev.description}</p>

                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>Date: <strong>{ev.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Time: <strong>{ev.time}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Location: <strong>{ev.location}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRsvp(ev.id, ev.title)}
                    className={`w-full py-2 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isRsvped
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isRsvped ? '✓ RSVP Confirmed (Attend)' : 'Confirm RSVP Seat'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === 'timetable' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              Daily Class Schedule — {selectedChild.name} ({selectedChild.grade})
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl">
              Monday to Friday
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Period</th>
                  <th className="p-3">Time Slot</th>
                  <th className="p-3">Subject / Activity</th>
                  <th className="p-3">Faculty</th>
                  <th className="p-3 text-right">Venue / Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {childTimetable.map((row) => (
                  <tr key={row.period} className={row.period === 'Recess Break' ? 'bg-amber-50/40' : ''}>
                    <td className="p-3 text-slate-900 font-bold">{row.period}</td>
                    <td className="p-3 font-mono text-slate-500">{row.time}</td>
                    <td className="p-3 text-indigo-700 font-bold">{row.subject}</td>
                    <td className="p-3 text-slate-700">{row.teacher}</td>
                    <td className="p-3 text-right font-bold text-slate-900">{row.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
