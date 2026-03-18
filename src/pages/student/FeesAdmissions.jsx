import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Wallet, IndianRupee, FileCheck, CheckCircle2, UploadCloud, AlertCircle, Clock } from 'lucide-react';

const FeesAdmissions = () => {
    const { studentFees, payFee, admissionRecord, submitDocument } = useData();
    const { addToast } = useToast();

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');

    const balanceAmount = studentFees.totalAmount - studentFees.amountPaid;
    const paymentPercentage = (studentFees.amountPaid / studentFees.totalAmount) * 100;

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        const amount = parseInt(paymentAmount);
        if (!amount || amount <= 0 || amount > balanceAmount) {
            addToast('Invalid payment amount.', 'error');
            return;
        }

        payFee(amount);
        addToast(`Successfully paid ₹${amount.toLocaleString('en-IN')}`, 'success');
        setPaymentAmount('');
        setIsPaymentModalOpen(false);
    };

    const handleFileUpload = (docName) => {
        addToast(`Successfully uploaded ${docName}`, 'success');
        submitDocument(docName);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-6xl mx-auto"
        >
            <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-indigo-400">
                    Fees & Admissions
                </h2>
                <p className="text-slate-400 mt-2">Manage your admission form, track fee payments, and submit pending documents.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ---------- FEES SECTION ---------- */}
                <div className="glassmorphism p-8 rounded-2xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-semibold flex items-center text-white">
                                <Wallet className="mr-3 text-indigo-400" size={24} />
                                Fee Status
                            </h3>
                            <span className="text-sm px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300">
                                Due: {studentFees.dueDate}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-800/80 p-4 rounded-xl border border-white/5">
                                <p className="text-slate-400 text-sm mb-1">Total Fees</p>
                                <p className="text-2xl font-bold flex items-center">
                                    <IndianRupee size={20} className="mr-1 text-slate-500" />
                                    {studentFees.totalAmount.toLocaleString('en-IN')}
                                </p>
                            </div>
                            <div className="bg-slate-800/80 p-4 rounded-xl border border-white/5">
                                <p className="text-slate-400 text-sm mb-1">Paid Amount</p>
                                <p className="text-2xl font-bold flex items-center text-emerald-400">
                                    <IndianRupee size={20} className="mr-1" />
                                    {studentFees.amountPaid.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Payment Progress</span>
                                <span className="font-medium text-emerald-400">{Math.round(paymentPercentage)}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-3 border border-white/5 overflow-hidden">
                                <motion.div
                                    className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-3 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${paymentPercentage}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-sm text-indigo-300">Remaining Balance</p>
                            <p className="text-xl font-bold text-white flex items-center">
                                <IndianRupee size={16} className="mr-1" />
                                {balanceAmount.toLocaleString('en-IN')}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsPaymentModalOpen(true)}
                            disabled={balanceAmount === 0}
                            className={`px-6 py-3 rounded-xl font-medium transition-all active:scale-95 ${balanceAmount === 0
                                    ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed border border-emerald-500/30'
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                }`}
                        >
                            {balanceAmount === 0 ? 'Fully Paid' : 'Pay Fees'}
                        </button>
                    </div>
                </div>

                {/* ---------- ADMISSIONS SECTION ---------- */}
                <div className="space-y-6">
                    <div className="glassmorphism p-8 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-semibold flex items-center text-white mb-6">
                            <FileCheck className="mr-3 text-emerald-400" size={24} />
                            Admission Status
                        </h3>

                        <div className="flex items-center space-x-4 mb-6 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-emerald-400 font-semibold">{admissionRecord.status}</p>
                                <p className="text-sm text-slate-300">Your admission form was successfully processed.</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm mt-6 border-t border-white/10 pt-6">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Form Submitted</span>
                                <span className="text-white font-medium">{admissionRecord.formSubmitted ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Days Since Admission</span>
                                <span className="text-white font-medium flex items-center">
                                    <Clock size={14} className="mr-1.5 text-indigo-400" />
                                    {admissionRecord.daysSinceAdmission} / 10 Days
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="glassmorphism p-8 rounded-2xl border border-white/5 bg-slate-800/30">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center text-white">
                                Mandatory Documents
                            </h3>
                            {admissionRecord.daysSinceAdmission > 10 && admissionRecord.pendingDocuments.length > 0 && (
                                <span className="text-xs bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full border border-rose-500/30 flex items-center">
                                    <AlertCircle size={12} className="mr-1" /> Deadline Passed
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-400 mb-6">You must submit all original documents within 10 days of your admission confirmation.</p>

                        <div className="space-y-3">
                            {/* Pending Documents */}
                            {admissionRecord.pendingDocuments.map(doc => (
                                <div key={doc} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                    <span className="text-sm text-slate-300">{doc}</span>
                                    <button
                                        onClick={() => handleFileUpload(doc)}
                                        disabled={admissionRecord.daysSinceAdmission > 10}
                                        className="text-xs flex items-center bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <UploadCloud size={14} className="mr-1.5" /> Upload
                                    </button>
                                </div>
                            ))}

                            {/* Submitted Documents */}
                            {admissionRecord.submittedDocuments.map(doc => (
                                <div key={doc} className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                                    <span className="text-sm text-emerald-300 line-through opacity-70">{doc}</span>
                                    <span className="text-xs flex items-center text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                                        <CheckCircle2 size={14} className="mr-1.5" /> Verified
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {isPaymentModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glassmorphism p-8 rounded-2xl w-full max-w-sm relative border border-white/10 shadow-2xl bg-slate-900 border-t-4 border-t-indigo-500">
                            <h3 className="text-xl font-bold text-white mb-2">Pay College Fees</h3>
                            <p className="text-sm text-slate-400 mb-6">Enter the amount you wish to pay towards your balance.</p>

                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm text-slate-400">
                                        <span>Current Balance</span>
                                        <span className="font-semibold text-white">₹{balanceAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            required
                                            type="number"
                                            min="1"
                                            max={balanceAmount}
                                            value={paymentAmount}
                                            onChange={(e) => setPaymentAmount(e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-lg font-medium focus:outline-none focus:border-indigo-500 placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500 transition-all"
                                            placeholder="0"
                                        />
                                    </div>
                                    <p className="text-xs text-indigo-400 text-right cursor-pointer" onClick={() => setPaymentAmount(balanceAmount.toString())}>Pay full balance</p>
                                </div>
                                <div className="flex space-x-3 pt-4">
                                    <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-slate-300 font-medium">Cancel</button>
                                    <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg transition-colors">Confirm Pay</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FeesAdmissions;
