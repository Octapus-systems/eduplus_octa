import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { FeeRecord } from '../../types';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  ShieldCheck,
  Building2,
  QrCode,
  FileText,
  DollarSign
} from 'lucide-react';

export const StudentFeesView: React.FC = () => {
  const { feeRecords, payFeeRecord, addToast } = useLms();
  const [selectedFeeForPayment, setSelectedFeeForPayment] = useState<FeeRecord | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('aarav@upi');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  const studentFees = feeRecords.filter((f) => f.studentId === 'std_01' || f.studentName.includes('Aarav'));
  const allFees = studentFees.length > 0 ? studentFees : feeRecords;

  const totalFees = allFees.reduce((acc, curr) => acc + (curr.totalFee || 0), 0);
  const totalPaid = allFees.reduce((acc, curr) => acc + (curr.paidAmount || 0), 0);
  const totalDue = allFees.reduce((acc, curr) => acc + (curr.dueAmount || 0), 0);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeeForPayment) return;

    payFeeRecord(selectedFeeForPayment.id, paymentMethod.toUpperCase());
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSelectedFeeForPayment(null);
  };

  return (
    <div id="student-fees-view" className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-indigo-600" />
            Fee Statements & Payment Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage academic tuition fees, laboratory dues, download tax receipts, and pay online securely
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold shadow-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>256-Bit SSL Encrypted Payment Portal</span>
        </div>
      </div>

      {/* Summary Bento Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Curriculum Fee</span>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">${totalFees.toLocaleString()}</h3>
          <p className="text-xs text-slate-500 mt-1">Class 10 Academic Year 2026–27</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount Cleared</span>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">${totalPaid.toLocaleString()}</h3>
          <p className="text-xs font-semibold text-emerald-700 mt-1">Receipts verified</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Outstanding Dues</span>
          <h3 className="text-2xl font-extrabold text-rose-600 mt-1">${totalDue.toLocaleString()}</h3>
          <p className="text-xs text-slate-500 mt-1">Next installment due Sep 30</p>
        </div>
      </div>

      {/* Invoices & Fee Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Official Fee Invoices & Installments</h3>
          <span className="text-xs font-semibold text-slate-500">{allFees.length} Invoices Found</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-5">Invoice #</th>
                <th className="py-3.5 px-4">Fee Head / Description</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Paid Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {allFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-indigo-700">
                    {fee.invoiceNumber || `INV-${fee.id}`}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-900">
                    <div>{fee.feeType || 'Tuition & Term Fee'}</div>
                    {fee.transactionId && (
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        Txn ID: {fee.transactionId}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-slate-600">{fee.dueDate}</td>
                  <td className="py-4 px-4 font-bold text-slate-900">${fee.totalFee}</td>
                  <td className="py-4 px-4 font-semibold text-emerald-700">${fee.paidAmount}</td>
                  <td className="py-4 px-4">
                    {fee.status === 'paid' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Paid ✓
                      </span>
                    )}
                    {fee.status === 'partial' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Partial
                      </span>
                    )}
                    {fee.status === 'pending' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        Pending
                      </span>
                    )}
                    {fee.status === 'overdue' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-right">
                    {fee.status === 'paid' ? (
                      <button
                        onClick={() => addToast('Receipt Exported', `Official PDF downloaded for ${fee.invoiceNumber}.`, 'success')}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Receipt
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedFeeForPayment(fee)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Pay Due (${fee.dueAmount})
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {selectedFeeForPayment && (
        <Modal
          isOpen={!!selectedFeeForPayment}
          onClose={() => setSelectedFeeForPayment(null)}
          title={`Pay Fee Invoice: ${selectedFeeForPayment.invoiceNumber || 'INV-001'}`}
          subtitle={`${selectedFeeForPayment.feeType} • Total Payable: $${selectedFeeForPayment.dueAmount}`}
        >
          <form onSubmit={handleProcessPayment} className="space-y-5">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">Instant UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">Debit / Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">Net Banking</span>
              </button>
            </div>

            {/* Input Details */}
            {paymentMethod === 'upi' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">VPA / UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@okaxis"
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="08/28"
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">CVV / CVC</label>
                    <input
                      type="password"
                      defaultValue="789"
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Select Bank</label>
                <select className="w-full p-2.5 text-xs border border-slate-200 rounded-xl">
                  <option>HDFC Bank NetBanking</option>
                  <option>State Bank of India</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Convenience Fee: <span className="font-bold text-slate-900">$0.00</span></span>
              <span>Total: <span className="font-extrabold text-indigo-700 text-sm">${selectedFeeForPayment.dueAmount}</span></span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedFeeForPayment(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Confirm & Pay ${selectedFeeForPayment.dueAmount}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
