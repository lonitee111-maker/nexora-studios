import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, switchUser, showToast, navigate } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please provide both email and password.', 'error');
      return;
    }

    login(email, selectedRole);
    navigate('dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-purple-600 to-cyan-400 shadow-xl shadow-purple-600/30">
            <img
              src="/assets/nexora-logo.jpeg"
              alt="Nexora Studios Emblem"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="font-heading font-black text-2xl text-white tracking-wider mt-2">
            NEXORA AI ACADEMY
          </div>
          <div className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
            Powered by Nexora Studios
          </div>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          {mode === 'login' ? 'Sign In to Your Learning Account' : 'Join the Global AI Academy'}
        </p>
      </div>

      {/* 1-Click Demo Profiles Pill (High Utility!) */}
      <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-purple-300 font-mono text-[11px] uppercase">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Instant 1-Click Demo Profiles</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Jump straight into testing features without typing credentials:
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              switchUser('student_pro');
              navigate('dashboard');
            }}
            className="p-2 rounded-lg bg-black/60 border border-purple-500/30 text-purple-200 hover:border-purple-400 text-left transition-colors"
          >
            <div className="font-bold text-[11px] truncate">Alex Chen</div>
            <div className="text-[9px] text-purple-400 font-mono">PRO STUDENT</div>
          </button>

          <button
            type="button"
            onClick={() => {
              switchUser('student_free');
              navigate('dashboard');
            }}
            className="p-2 rounded-lg bg-black/60 border border-white/10 text-slate-200 hover:border-white/30 text-left transition-colors"
          >
            <div className="font-bold text-[11px] truncate">Amara Okafor</div>
            <div className="text-[9px] text-slate-400 font-mono">FREE LEARNER</div>
          </button>

          <button
            type="button"
            onClick={() => {
              switchUser('admin');
              navigate('admin');
            }}
            className="p-2 rounded-lg bg-black/60 border border-cyan-500/30 text-cyan-200 hover:border-cyan-400 text-left transition-colors"
          >
            <div className="font-bold text-[11px] truncate">Sarah Nexora</div>
            <div className="text-[9px] text-cyan-400 font-mono">ADMINISTRATOR</div>
          </button>
        </div>
      </div>

      {/* Auth Card */}
      <div className="p-8 rounded-3xl glass-panel border border-purple-500/25 space-y-6">
        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1 bg-black/50 rounded-xl border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg transition-colors ${
              mode === 'login' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2 rounded-lg transition-colors ${
              mode === 'register' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Alex Chen"
                  className="w-full px-3.5 py-2 pl-9 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="learner@nexora.dev"
                className="w-full px-3.5 py-2 pl-9 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2 pl-9 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Role Choice */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Account Role</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
            >
              <option value="student">Student / Developer</option>
              <option value="admin">Studio Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            <span>{mode === 'login' ? 'Sign In to Nexora' : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-500 font-mono">
          Powered by Nexora Studios • Secure Token Management
        </div>
      </div>
    </div>
  );
};
