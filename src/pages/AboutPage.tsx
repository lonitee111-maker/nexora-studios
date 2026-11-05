import React from 'react';
import { useApp } from '../context/AppContext.js';
import { Sparkles, ArrowRight, ShieldCheck, Award, Heart, Globe, Code2, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>POWERED BY NEXORA STUDIOS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          Democratizing AI Creation for the World
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Nexora AI Academy was founded with a singular conviction: Artificial Intelligence shouldn't replace software engineers and creators—it should turn every curious individual into a 10x architect capable of building mobile apps, 3D worlds, and global software businesses.
        </p>
      </div>

      {/* 3 Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl glass-card space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">
            Zero-Slop Production Code
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We don't teach toy scripts or surface-level hype. Every curriculum module teaches real TypeScript architectures, mobile native deployment, and WebGL physics.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">
            Master Prompt Engineering
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our C.R.E.A.T.E. master prompt framework eliminates hallucination, stops lazy code output, and commands frontier LLMs with surgical precision.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">
            Global Accessibility & Paystack
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We support builders from Lagos to San Francisco, Tokyo to London, with localized pricing and payment gateways to ensure world-class education is available everywhere.
          </p>
        </div>
      </div>

      {/* Instructors */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="font-heading font-bold text-3xl text-white">
            Meet the Nexora Studios Instructors
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Industry practitioners shipping real products every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Elena Rostova', role: 'Principal Mobile Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', track: 'Mobile AI' },
            { name: 'Kaelen Vance', role: 'Lead Game Technologist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', track: '3D Game Dev' },
            { name: 'Marcus Sterling', role: 'Full-Stack Founder', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', track: 'SaaS & Web' },
            { name: 'Dr. Aaron Thorne', role: 'Chief AI Research Scientist', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop', track: 'Prompt Engineering' }
          ].map((inst, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-card text-center space-y-3">
              <img src={inst.avatar} alt={inst.name} className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-purple-500/25" />
              <div>
                <div className="font-heading font-bold text-sm text-white">{inst.name}</div>
                <div className="text-[11px] text-purple-300 font-mono">{inst.role}</div>
                <span className="inline-block mt-2 text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                  {inst.track}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
