import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.js';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed! You will receive weekly master prompts and AI tutorials.', 'success');
    setEmail('');
  };

  return (
    <footer className="border-t border-purple-500/15 bg-[#05050a] pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-radial-glow pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-[#07070f] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="font-heading font-black text-xl tracking-wider text-white">
                  NEXORA
                </span>
                <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 ml-2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase font-semibold">
                  AI ACADEMY
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-sm">
              The premier online destination for mastering Artificial Intelligence to build production mobile apps, 2D & 3D games, full-stack websites, and battle-tested prompts.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>POWERED BY <strong className="text-cyan-400 font-semibold">NEXORA STUDIOS</strong></span>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Get Weekly Master Prompts
              </div>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="developer@example.com"
                  className="w-full px-3.5 py-2 text-xs bg-black/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Learning Tracks */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-heading">
              Learning Tracks
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('category-app')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  AI App Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category-game')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  AI Game Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category-web')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  AI Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('category-prompt')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Prompt Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('courses')}
                  className="hover:text-white transition-colors text-left font-medium text-slate-300"
                >
                  All 15+ Courses →
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-heading">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('prompt-library')}
                  className="hover:text-white transition-colors text-left"
                >
                  AI Prompt Library (250+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('tools-directory')}
                  className="hover:text-white transition-colors text-left"
                >
                  AI Tools Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('community')}
                  className="hover:text-white transition-colors text-left"
                >
                  Student Community & Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('dashboard')}
                  className="hover:text-white transition-colors text-left"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('admin')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-heading">
              Nexora
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Nexora Studios
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('pricing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Pricing & Memberships
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('login')}
                  className="hover:text-white transition-colors text-left"
                >
                  Login & Registration
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Nexora AI Academy. All rights reserved. Powered by <span className="text-cyan-400">Nexora Studios</span>.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Honor Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
