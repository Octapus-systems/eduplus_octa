import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { FeeRecord } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Modal } from '../common/Modal';
import {
  DollarSign,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Receipt,
  Download,
  CreditCard,
  Building,
  School
} from 'lucide-react';

export const FeesManagementView: React.FC = () => {
  const { feeRecords, markFeePaid, addFeeInvoice, addToast } = useLms();
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<FeeRecord | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // New Invoice form
  const [studentName, setStudentName] = useState('Diya Sharma');
  const [grade, setGrade] = useState('Class 10');
  const [feeType, setFeeType] = useState('Tuition Fee - Term 2');
  const [amount, setAmount] = useState(1200);
  const [dueDate, setDueDate] = useState('Oct 15, 2026');

  const filtered = feeRecords.filter((f) => {
    const matchStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchSearch =
      f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.feeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalCollected = feeRecords
    .filter((f) => f.status === 'paid')
    .reduce((a, b) => a + b.amount, 0);

  const totalPending = feeRecords
    .filter((f) => f.status !== 'paid')
    .reduce((a, b) => a + b.amount, 0);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    addFeeInvoice({
      studentName,
      studentGrade: grade,
      feeType,
      amount: Number(amount),
      dueDate
    });
    setIsInvoiceModalOpen(false);
  };

  const handleCollectPayment = (id: string) => {
    markFeePaid(id, 'Stripe Gateway Simulation');
  };

  return (
    <div id="fees-management-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Fee Structures, Invoicing & Billing
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate term invoices, track outstanding dues, and issue digital receipts
          </p>
        </div>

        <button
          onClick={() => setIsInvoiceModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Issue Fee Invoice
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Collected</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
            ${totalCollected.toLocaleString()}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Reconciled in Institutional Account</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Pending Collections</span>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-1">
            ${totalPending.toLocaleString()}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Term 1 & Term 2 Dues</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Fee Heads Active</span>
          <h3 className="text-2xl font-extrabold text-indigo-600 mt-1">4 Fee Categories</h3>
          <p className="text-xs text-slate-500 mt-1">Tuition, Science Lab, Sports, Library</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {(['all', 'paid', 'pending', 'overdue'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or invoice..."
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs w-64"
          />
        </div>
      </div>

      {/* Fee Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Invoice #</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Fee Head</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-600">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {inv.studentName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{inv.studentGrade}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{inv.feeType}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                    ${inv.amount}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">{inv.dueDate}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={inv.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedReceipt(inv)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
                        title="View Receipt"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>

                      {inv.status !== 'paid' && (
                        <button
                          onClick={() => handleCollectPayment(inv.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" /> Collect
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="Official Institutional Fee Receipt"
          subtitle={`Invoice ID: ${selectedReceipt.invoiceNumber}`}
        >
          <div className="space-y-5">
            <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <School className="w-5 h-5 text-indigo-600" />
                  <span className="font-extrabold text-sm text-slate-900">EduPulse Academy</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  Receipt #{selectedReceipt.invoiceNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Billed To</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.studentName}</span>
                  <p className="text-[11px] text-slate-500">{selectedReceipt.studentGrade}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Payment Status</span>
                  <div className="mt-0.5">
                    <StatusBadge status={selectedReceipt.status} size="sm" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{selectedReceipt.feeType}</span>
                  <span className="text-[10px] text-slate-400 block">Due Date: {selectedReceipt.dueDate}</span>
                </div>
                <span className="font-mono font-extrabold text-base text-slate-900">
                  ${selectedReceipt.amount}.00
                </span>
              </div>

              {selectedReceipt.paidAt && (
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2">
                  <span>Paid On: {selectedReceipt.paidAt}</span>
                  <span>Method: {selectedReceipt.paymentMethod}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => addToast('Receipt Downloaded', 'PDF copy generated.', 'success')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF Receipt
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Issue Invoice Modal */}
      {isInvoiceModalOpen && (
        <Modal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          title="Issue New Student Fee Invoice"
          subtitle="Add billable fee head to candidate's financial ledger"
        >
          <form onSubmit={handleCreateInvoice} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Aarav Patel"
                className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g. Class 10"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fee Category</label>
                <select
                  value={feeType}
                  onChange={(e) => setFeeType(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Tuition Fee - Term 2">Tuition Fee - Term 2</option>
                  <option value="Science Lab & Equipment Fee">Science Lab & Equipment Fee</option>
                  <option value="Sports & Physical Ed Fee">Sports & Physical Ed Fee</option>
                  <option value="Library & Technology Access">Library & Technology Access</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="e.g. Oct 20, 2026"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Issue Invoice
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
