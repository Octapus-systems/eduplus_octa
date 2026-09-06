import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  Award,
  Trophy,
  Medal,
  Star,
  Download,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const ParentAchievementsView: React.FC = () => {
  const { selectedChild, addToast } = useLms();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const achievements = [
    {
      id: 'ach-1',
      title: 'Inter-School Science Olympiad Gold Medalist',
      category: 'Academic Excellence',
      date: 'Jul 14, 2026',
      issuedBy: 'National Science Foundation & EduPulse Academy',
      description: 'Secured 1st rank across 42 participating schools in Class 10 Physics & Mechanics.',
      iconColor: 'bg-amber-100 text-amber-700 border-amber-200',
      badge: '🏆 Gold Trophy'
    },
    {
      id: 'ach-2',
      title: 'Class 10 Term 1 Academic Distinction Honors',
      category: 'Institutional Honor',
      date: 'Aug 30, 2026',
      issuedBy: 'Principal Vikram Sharma',
      description: 'Achieved an overall score of 91% (Grade A+) with exemplary conduct.',
      iconColor: 'bg-purple-100 text-purple-700 border-purple-200',
      badge: '⭐ Honor Roll'
    },
    {
      id: 'ach-3',
      title: 'Annual Inter-House Debate Championship Winner',
      category: 'Extracurricular & Public Speaking',
      date: 'Jun 10, 2026',
      issuedBy: 'Ruby House Masters',
      description: 'Awarded Best Speaker in the senior wing debate competition.',
      iconColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      badge: '🥇 1st Place'
    }
  ];

  return (
    <div id="parent-achievements-view" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Achievements, Awards & Certificates
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Explore {selectedChild.name}'s trophy cabinet, extracurricular accolades, and download verified digital certificates.
          </p>
        </div>
      </div>

      {/* Trophy Cabinet Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-700 rounded-3xl p-6 text-slate-950 shadow-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-slate-950" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900">
              Student Accolades Cabinet
            </span>
          </div>
          <h3 className="text-2xl font-black tracking-tight">{selectedChild.name}</h3>
          <p className="text-xs font-medium text-slate-900/90 mt-1">
            3 Major Institutional Trophies • 100% Conduct Rating
          </p>
        </div>
      </div>

      {/* Achievements Cards Stream */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${item.iconColor}`}>
                  {item.badge}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">{item.date}</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-500">{item.description}</p>
              <p className="text-[11px] text-indigo-700 font-semibold pt-1">Issued by: {item.issuedBy}</p>
            </div>

            <button
              onClick={() => {
                setSelectedCert(item);
                addToast('Certificate View', `Opening official certificate for ${item.title}`, 'info');
              }}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-3"
            >
              <Award className="w-4 h-4 text-amber-400" /> View Digital Certificate
            </button>
          </div>
        ))}
      </div>

      {/* Digital Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Verifiable Digital Honor Certificate</h3>
              <button onClick={() => setSelectedCert(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/50 border-2 border-amber-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black mx-auto">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-amber-800">Certificate of Achievement</h4>
              <h3 className="text-xl font-black text-slate-900">{selectedChild.name}</h3>
              <p className="text-xs text-slate-600">
                Has been awarded <strong className="text-slate-900">{selectedCert.title}</strong> for exceptional performance.
              </p>
              <span className="text-[10px] text-slate-400 font-mono block">Certificate Hash ID: EDP-CERT-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToast('Download Started', `Certificate_${selectedCert.title}.pdf downloaded.`, 'success');
                  setSelectedCert(null);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Download PDF Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
