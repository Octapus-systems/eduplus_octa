import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  FileText,
  Bus,
  BookOpen,
  HelpCircle,
  Download,
  Plus,
  Send,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ParentDocumentsSupportView: React.FC = () => {
  const {
    selectedChild,
    studentDocuments,
    transportInfo,
    libraryBooks,
    supportTickets,
    submitSupportTicket,
    addToast
  } = useLms();

  const [activeTab, setActiveTab] = useState<'documents' | 'transport' | 'library' | 'support'>('documents');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Ticket form
  const [ticketCategory, setTicketCategory] = useState<'academic' | 'billing' | 'transport' | 'technical'>('billing');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  const childTransport = transportInfo[selectedChild.id] || transportInfo['std_arjun_10'];
  const childBooks = libraryBooks.filter((b) => b.studentId === selectedChild.id || b.studentId === 'std_arjun_10');

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDescription.trim()) return;

    submitSupportTicket({
      category: ticketCategory,
      subject: ticketSubject,
      description: ticketDescription,
      priority: 'normal'
    });

    setIsTicketModalOpen(false);
    setTicketSubject('');
    setTicketDescription('');
  };

  return (
    <div id="parent-documents-support" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Documents, Transport, Library & Support
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access official document vault, school bus route details, library catalog, and raise support requests for {selectedChild.name}.
          </p>
        </div>

        <button
          onClick={() => setIsTicketModalOpen(true)}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Raise Support Ticket
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-bold text-slate-600 gap-4">
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'documents' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
          }`}
        >
          Document Vault ({studentDocuments.length})
        </button>
        <button
          onClick={() => setActiveTab('transport')}
          className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'transport' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
          }`}
        >
          Bus Transport Details
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'library' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
          }`}
        >
          Library Issued Books ({childBooks.length})
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'support' ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:text-slate-900'
          }`}
        >
          Support Tickets ({supportTickets.length})
        </button>
      </div>

      {/* Documents View */}
      {activeTab === 'documents' && (
        <div className="space-y-3">
          {studentDocuments.map((doc) => (
            <div key={doc.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{doc.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    Category: {doc.category.replace('_', ' ').toUpperCase()} • Date: {doc.issueDate} • Size: {doc.fileSize}
                  </p>
                </div>
              </div>

              <button
                onClick={() => addToast('Download Started', `Downloading ${doc.title}`, 'success')}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Transport View */}
      {activeTab === 'transport' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4 max-w-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{childTransport.busNumber}</h3>
                <p className="text-xs text-slate-500">{childTransport.routeName}</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
              {childTransport.status.replace('_', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Morning Pickup</span>
              <strong className="text-slate-900 font-extrabold text-sm block mt-0.5">{childTransport.pickupTime}</strong>
              <p className="text-slate-500 text-[11px] mt-0.5">{childTransport.pickupLocation}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Afternoon Drop</span>
              <strong className="text-slate-900 font-extrabold text-sm block mt-0.5">{childTransport.dropTime}</strong>
              <p className="text-slate-500 text-[11px] mt-0.5">{childTransport.dropLocation}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-indigo-900">Bus Driver: {childTransport.driverName}</span>
              <p className="text-[11px] text-indigo-700">Phone: {childTransport.driverPhone}</p>
            </div>
            <button
              onClick={() => addToast('Call Initiated', `Calling bus driver ${childTransport.driverName}`, 'info')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" /> Call Driver
            </button>
          </div>
        </div>
      )}

      {/* Library View */}
      {activeTab === 'library' && (
        <div className="space-y-3">
          {childBooks.map((bk) => (
            <div key={bk.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="font-bold text-slate-900">{bk.bookTitle}</h4>
                  <p className="text-[11px] text-slate-500">Author: {bk.author} • Due Date: {bk.dueDate}</p>
                </div>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                  bk.status === 'issued' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {bk.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Support Tickets View */}
      {activeTab === 'support' && (
        <div className="space-y-3">
          {supportTickets.map((tkt) => (
            <div key={tkt.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{tkt.ticketNumber} — {tkt.subject}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                    {tkt.category}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold capitalize text-[10px]">
                  {tkt.status}
                </span>
              </div>
              <p className="text-xs text-slate-600">{tkt.description}</p>
              {tkt.response && (
                <div className="p-3 rounded-xl bg-slate-50 text-xs text-indigo-700 font-medium">
                  <strong>Resolution:</strong> "{tkt.response}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Ticket Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Raise Parent Support Ticket</h3>
              <button onClick={() => setIsTicketModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Issue Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none"
                >
                  <option value="billing">Fee Billing & Payment Query</option>
                  <option value="academic">Academic & Report Card Issue</option>
                  <option value="transport">School Bus & Route Assistance</option>
                  <option value="technical">LMS Technical Portal Support</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief summary of issue..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  required
                  rows={3}
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Explain the problem or support needed..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTicketModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
