import React from 'react';
import { UserCertificate } from '../../types/index.js';
import { Sparkles, Award, ShieldCheck, Printer, Download, X } from 'lucide-react';

interface CertificateModalProps {
  certificate: UserCertificate;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-2xl glass-panel border border-purple-500/30 overflow-hidden shadow-2xl relative flex flex-col">
        {/* Top Action Bar */}
        <div className="px-6 py-3 border-b border-purple-500/20 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Official Nexora Verified Credential</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close certificate"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#0c0f1d] via-[#070810] to-[#0d091a] relative border-8 border-[#171b30] m-4 sm:m-6 rounded-xl shadow-inner">
          {/* Subtle Guilloche / Tech Watermark */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

          <div className="relative z-10 text-center space-y-6">
            {/* Header Emblem */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-purple-600 to-cyan-400 shadow-lg shadow-purple-500/30 shrink-0">
                <img
                  src="/assets/nexora-logo.jpeg"
                  alt="Nexora Studios Emblem"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-heading font-black text-2xl tracking-wider text-white">
                  NEXORA
                </div>
                <div className="text-[10px] font-mono tracking-widest text-amber-300 font-semibold uppercase">
                  AI ACADEMY • CREDENTIAL VERIFICATION
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono font-semibold">
                Certificate of Completion
              </div>
              <p className="text-xs text-slate-400 mt-1">
                This is to certify that
              </p>
            </div>

            {/* Student Name */}
            <div className="py-2">
              <div className="font-heading font-black text-3xl sm:text-4xl text-gradient-nexora tracking-tight">
                {certificate.studentName}
              </div>
              <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-2"></div>
            </div>

            {/* Course Information */}
            <div className="max-w-lg mx-auto space-y-2">
              <p className="text-xs text-slate-400">
                has successfully mastered all practical projects, code implementations, and curriculum requirements for
              </p>
              <div className="font-heading font-bold text-lg sm:text-xl text-white">
                {certificate.courseTitle}
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-xs text-slate-400">
              <div className="text-left font-mono">
                <div className="text-[10px] text-slate-500 uppercase">Issue Date</div>
                <div className="text-slate-200 font-semibold">{certificate.issueDate}</div>
              </div>

              {/* Gold Verification Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center">
                  <img
                    src="/assets/nexora-logo.jpeg"
                    alt="Nexora Studios Seal"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-[9px] text-amber-300 mt-1 font-mono font-bold tracking-wider">OFFICIAL GOLD SEAL</span>
              </div>

              <div className="text-right font-mono">
                <div className="text-[10px] text-slate-500 uppercase">Certificate ID</div>
                <div className="text-purple-300 font-semibold">{certificate.certificateId}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
