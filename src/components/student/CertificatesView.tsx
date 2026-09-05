import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { Certificate } from '../../types';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  School,
  Sparkles
} from 'lucide-react';

export const CertificatesView: React.FC = () => {
  const { certificates, currentUser, addToast } = useLms();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleOpenCertificate = (cert: Certificate) => {
    setSelectedCert(cert);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  return (
    <div id="student-certificates-view" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Verified Certificates & Accreditations
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official academic credentials awarded upon coursework completion and olympiads
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Institutional Verification Enabled</span>
        </div>
      </div>

      {/* Certificate cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => handleOpenCertificate(cert)}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            {/* Certificate banner graphic */}
            <div className="h-32 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-5 flex flex-col justify-between text-white relative">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {cert.gradeAchieved}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {cert.grade} • {cert.subject}
                </span>
                <h3 className="text-xs font-bold text-white leading-snug line-clamp-1 mt-0.5">
                  {cert.title}
                </h3>
              </div>
            </div>

            {/* Certificate card details */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Awarded to:</span>
                <span className="font-bold text-slate-800">{currentUser.name}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Issued on:</span>
                <span className="font-medium text-slate-700">{cert.issueDate}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Instructor:</span>
                <span className="font-medium text-slate-700">{cert.instructorName}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                  {cert.certificateNumber}
                </span>
                <span className="font-bold text-indigo-600 group-hover:underline flex items-center gap-1">
                  View Full <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Certificate Preview */}
      {selectedCert && (
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title="Official Certificate of Achievement"
          subtitle={`Credential ID: ${selectedCert.certificateNumber}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Elegant Framed Certificate Sheet */}
            <div className="p-8 rounded-2xl border-4 border-amber-300/60 bg-gradient-to-br from-amber-50/20 via-white to-amber-50/10 text-center relative overflow-hidden shadow-inner">
              {/* Watermark seal */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <School className="w-64 h-64 text-slate-900" />
              </div>

              {/* School branding */}
              <div className="flex items-center justify-center gap-2 text-indigo-900 mb-2">
                <School className="w-6 h-6 text-indigo-600" />
                <span className="text-base font-extrabold tracking-tight">
                  EduPulse Academy • K–12
                </span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Board of Academic Accreditation
              </p>

              <div className="my-6">
                <p className="text-xs italic text-slate-500">This is proudly presented to</p>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1 border-b border-slate-200 pb-2 inline-block px-8">
                  {currentUser.name}
                </h2>
                <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                  For exemplary academic proficiency in{' '}
                  <span className="font-bold text-slate-800">{selectedCert.title}</span> ({selectedCert.grade}), attaining distinction standing with honors.
                </p>
              </div>

              {/* Signatures & Seal */}
              <div className="grid grid-cols-3 items-end pt-6 border-t border-slate-200/80 text-xs">
                <div className="text-center">
                  <p className="font-serif italic text-slate-700 text-sm">Sunita Rao</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 border-t border-slate-200 pt-1">
                    {selectedCert.instructorName}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full border-2 border-amber-400 bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm">
                    <Award className="w-7 h-7" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-serif italic text-slate-700 text-sm">Vikram Sharma</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 border-t border-slate-200 pt-1">
                    Head of School / Principal
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-mono">
                Issued: {selectedCert.issueDate}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToast('Link Copied', 'Public verification link copied to clipboard.', 'info')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share Credential
                </button>
                <button
                  onClick={() => addToast('PDF Exported', 'High-resolution certificate downloaded.', 'success')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
