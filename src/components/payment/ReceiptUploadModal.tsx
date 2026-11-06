import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.js';
import {
  X,
  Building2,
  Copy,
  Check,
  UploadCloud,
  FileText,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const ReceiptUploadModal: React.FC = () => {
  const {
    bankAccounts,
    isReceiptModalOpen,
    setReceiptModalOpen,
    submitReceipt,
    user,
    showToast
  } = useApp();

  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'upload'>('upload');

  // Form State
  const [studentName, setStudentName] = useState(user?.name || '');
  const [studentEmail, setStudentEmail] = useState(user?.email || '');
  const [plan, setPlan] = useState<'pro_monthly' | 'pro_yearly' | 'enterprise'>('pro_yearly');
  const [selectedBank, setSelectedBank] = useState(bankAccounts[0]?.bankName || 'OPay Digital Services (OPay)');
  const [senderAccountName, setSenderAccountName] = useState('');
  const [amount, setAmount] = useState(385950);
  const [currency, setCurrency] = useState('NGN');
  const [transactionReference, setTransactionReference] = useState('');
  const [receiptImage, setReceiptImage] = useState<string>('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceiptId, setSubmittedReceiptId] = useState<string | null>(null);

  if (!isReceiptModalOpen) return null;

  const handleCopy = (text: string, bankId: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (e) {}
    setCopiedBankId(bankId);
    showToast(`Account number copied: ${text}`, 'success');
    setTimeout(() => setCopiedBankId(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
        showToast('Receipt file attached!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim() || !senderAccountName.trim() || !transactionReference.trim()) {
      showToast('Please fill out all required transfer verification fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const id = submitReceipt({
        studentName,
        studentEmail,
        plan,
        amount,
        currency,
        bankName: selectedBank,
        senderAccountName,
        transactionReference,
        receiptImage,
        notes
      });
      setIsSubmitting(false);
      setSubmittedReceiptId(id);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#090b14] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-950/40 to-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-purple-600 to-cyan-400 shadow-md shrink-0">
              <img
                src="/assets/nexora-logo.jpeg"
                alt="Nexora Studios Emblem"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Direct Bank Transfer & Receipt Verification
              </h3>
              <p className="text-xs text-slate-400">
                Official Nexora Studios Bank Accounts & Manual Access Confirmation
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setReceiptModalOpen(false);
              setSubmittedReceiptId(null);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen after submission */}
        {submittedReceiptId ? (
          <div className="p-8 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Receipt Ref: {transactionReference}
              </span>
              <h4 className="font-heading font-bold text-xl text-white">
                Receipt Submitted for Verification!
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{studentName}</strong>. Our finance desk and lead administrator (<strong>DE PHANTOM</strong>) have received your proof of payment.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/20 max-w-md mx-auto text-left text-xs space-y-2 font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Plan:</span>
                <span className="text-purple-300 uppercase font-bold">{plan.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="text-emerald-400 font-bold">{currency} {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Receiving Bank:</span>
                <span className="text-white">{selectedBank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Pending Admin Confirmation
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 max-w-md mx-auto text-xs text-purple-200">
              💡 <em>Once DE PHANTOM confirms your deposit in the admin panel, your account will be granted full Pro access immediately.</em>
            </div>

            <button
              onClick={() => {
                setReceiptModalOpen(false);
                setSubmittedReceiptId(null);
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg cursor-pointer hover:scale-105 transition-all"
            >
              Done & Return to Academy
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto p-6 space-y-6">
            {/* View Mode Tabs */}
            <div className="flex p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>1. View Official Bank Accounts</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>2. Upload Transfer Receipt</span>
              </button>
            </div>

            {/* TAB 1: OFFICIAL BANK ACCOUNTS DETAILS */}
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    Transfer the plan fee to any of our designated official corporate accounts below. After transferring, click <strong>"2. Upload Transfer Receipt"</strong> to submit your confirmation receipt so our administrators can register your full access!
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bankAccounts.map(account => (
                    <div
                      key={account.id}
                      className="p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-purple-500/40 transition-colors space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-heading">
                          {account.bankName}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {account.currency}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[11px] text-slate-400">Account Name:</div>
                        <div className="text-xs font-semibold text-purple-200">{account.accountName}</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase">Account Number</div>
                          <div className="font-mono font-bold text-sm text-cyan-300 tracking-wider">
                            {account.accountNumber}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopy(account.accountNumber, account.id)}
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs"
                          title="Copy account number"
                        >
                          {copiedBankId === account.id ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-purple-300" />
                          )}
                        </button>
                      </div>

                      {account.branchOrSortCode && (
                        <div className="text-[10px] font-mono text-slate-400">
                          Sort Code: {account.branchOrSortCode}
                        </div>
                      )}
                      {account.swiftCode && (
                        <div className="text-[10px] font-mono text-slate-400">
                          SWIFT / BIC: {account.swiftCode}
                        </div>
                      )}
                      {account.instructions && (
                        <div className="text-[10px] text-slate-400 italic">
                          "{account.instructions}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('upload')}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>I Have Made Transfer — Upload My Receipt</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: UPLOAD RECEIPT FORM */}
            {activeTab === 'upload' && (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      placeholder="e.g. Amara Okafor"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Student Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={e => setStudentEmail(e.target.value)}
                      placeholder="amara@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Membership Plan *
                    </label>
                    <select
                      value={plan}
                      onChange={e => {
                        const newPlan = e.target.value as any;
                        setPlan(newPlan);
                        if (newPlan === 'pro_monthly') {
                          setAmount(44950);
                        } else if (newPlan === 'pro_yearly') {
                          setAmount(385950);
                        } else {
                          setAmount(950000);
                        }
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="pro_yearly">Pro Yearly (₦385,950 / $249)</option>
                      <option value="pro_monthly">Pro Monthly (₦44,950 / $29)</option>
                      <option value="enterprise">Enterprise Team (₦950,000 / $799)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Bank Transferred To *
                    </label>
                    <select
                      value={selectedBank}
                      onChange={e => setSelectedBank(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                    >
                      {bankAccounts.map(b => (
                        <option key={b.id} value={b.bankName}>
                          {b.bankName} ({b.currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Amount & Currency *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={currency}
                        onChange={e => setCurrency(e.target.value)}
                        className="w-20 px-2 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none"
                      >
                        <option value="NGN">NGN (₦)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                      <input
                        type="number"
                        required
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                        className="flex-1 px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Sender Account Name (Name on bank account) *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderAccountName}
                      onChange={e => setSenderAccountName(e.target.value)}
                      placeholder="e.g. Amara Chioma Okafor"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Transaction Reference / Session ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={transactionReference}
                      onChange={e => setTransactionReference(e.target.value)}
                      placeholder="e.g. OPAY-TRF-20261105-0984"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Upload proof / file preview */}
                <div className="space-y-2">
                  <label className="block font-semibold text-slate-300">
                    Payment Receipt Proof (Screenshot, PDF, or Photo) *
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-black/40 border border-dashed border-white/20">
                    {receiptImage ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-purple-500/40 shrink-0 bg-black">
                        <img src={receiptImage} alt="Receipt Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-500">
                        <FileText className="w-8 h-8" />
                      </div>
                    )}

                    <div className="space-y-2 flex-1 text-center sm:text-left">
                      <div className="text-xs text-slate-300">
                        Attach your bank transfer debit alert or payment receipt slip.
                      </div>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileUpload}
                        className="block w-full text-[11px] text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600/30 file:text-purple-300 hover:file:bg-purple-600/50 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Notes / Message for DE PHANTOM & Admins (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="e.g. Transferred via OPay app to Ayomide Omojola Emmanuel at 08:30 AM"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400">
                    🛡️ Verified and registered manually by Nexora Studios Administrators.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-600/30 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Receipt...' : 'Submit Receipt for Access'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
