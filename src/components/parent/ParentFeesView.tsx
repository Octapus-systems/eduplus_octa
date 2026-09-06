import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Download,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const ParentFeesView: React.FC = () => {
  const { selectedChild, payChildFee, studentDocuments, addToast } = useLms();
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card / Debit Card');
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  const feeBreakdown = [
    { category: 'Class 10 Tuition Fee (Q3)', amount: 350, status: selectedChild.feeStatus },
    { category: 'Science & Physics Laboratory Fee', amount: 60, status: selectedChild.feeStatus },
    { category: 'Annual Sports & Activity Membership', amount: 40, status: selectedChild.feeStatus }
  ];

  const totalDues = feeBreakdown.reduce((sum, item) => sum + item.amount, 0);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    payChildFee(selectedChild.id, totalDues, paymentMethod);
    setIsPayModalOpen(false);
  };

  return (
    <div id="parent-fees-view" className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Fees & Financial Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track tuition fee invoices, scholarship waivers, itemized breakdowns, and pay dues online for {selectedChild.name}.
          </p>
        </div>

        {selectedChild.feeStatus !== 'paid' && (
          <button
            onClick={() => setIsPayModalOpen(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" /> Pay Outstanding Dues (${selectedChild.pendingFeeAmount})
          </button>
        )}
      </div>

      {/* Financial Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-extrabold text-lg">
            ${selectedChild.feeStatus === 'paid' ? 0 : selectedChild.pendingFeeAmount}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Outstanding Dues</span>
            <h4 className="text-base font-extrabold text-slate-900 capitalize">{selectedChild.feeStatus}</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Due Date: Sep 15, 2026</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-lg">
            $1,850
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Paid (2026)</span>
            <h4 className="text-base font-extrabold text-slate-900">3 Invoices Cleared</h4>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Payment Verified</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-lg">
            10%
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Scholarship Waiver</span>
            <h4 className="text-base font-extrabold text-slate-900">Merit Discount Applied</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Academic Excellence Honor</p>
          </div>
        </div>
      </div>

      {/* Itemized Fee Invoice */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Itemized Fee Invoice Breakdown</h3>

        <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Fee Category</th>
                <th className="p-3 text-center">Billing Cycle</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {feeBreakdown.map((item) => (
                <tr key={item.category}>
                  <td className="p-3 text-slate-900 font-bold">{item.category}</td>
                  <td className="p-3 text-center text-slate-500">Term 1 (2026–2027)</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase capitalize ${
                        selectedChild.feeStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {selectedChild.feeStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right font-extrabold text-slate-900">${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Receipts Vault */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Payment History & Downloadable Receipts</h3>

        <div className="space-y-2.5">
          {studentDocuments
            .filter((d) => d.category === 'fee_receipt')
            .map((doc) => (
              <div key={doc.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-slate-900">{doc.title}</h4>
                    <p className="text-[11px] text-slate-500">Issued on {doc.issueDate} • Size: {doc.fileSize}</p>
                  </div>
                </div>

                <button
                  onClick={() => addToast('Downloading Receipt', `Downloading ${doc.title}`, 'success')}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Pay Fees Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Pay Outstanding Student Fees</h3>
              <button onClick={() => setIsPayModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex justify-between items-center">
                <div>
                  <span className="text-xs text-amber-800 font-semibold block">Total Payable Dues:</span>
                  <span className="text-2xl font-black text-amber-950">${totalDues}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-bold text-[11px]">
                  Student: {selectedChild.name}
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Payment Gateway / Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none"
                >
                  <option value="Credit Card / Debit Card">Credit / Debit Card (Visa, MasterCard)</option>
                  <option value="UPI / GPay">UPI Instant Gateway (Google Pay / PhonePe)</option>
                  <option value="Net Banking">Net Banking (Direct School Bank Transfer)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPayModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" /> Confirm Demo Payment (${totalDues})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
