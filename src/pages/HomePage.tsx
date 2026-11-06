import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Gamepad2,
  Globe,
  Zap,
  Play,
  CheckCircle2,
  Star,
  Users,
  Trophy,
  Flame,
  Award,
  Copy,
  Check,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { courses, prompts, leaderboard, navigate, copyPrompt, setAssistantOpen } = useApp();
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'app' | 'game' | 'web' | 'prompt'>('app');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Live interactive prompt preview playground data
  const samplePrompts = {
    app: {
      tool: 'Cursor / Claude',
      prompt: `Create a React Native Expo audio recorder app with animated sound wave visualizer, waveform scrubber, and background transcription service.`,
      resultTitle: 'Generated AudioWave.tsx',
      resultPreview: `// Generated via Nexora Mobile Master Prompt Protocol\nexport const AudioWaveVisualizer = ({ decibels }: { decibels: number[] }) => {\n  return (\n    <View className="flex-row items-center justify-center gap-1 h-24 bg-black/60 rounded-2xl p-4 border border-purple-500/20">\n      {decibels.map((db, i) => (\n        <AnimatedBar key={i} height={Math.max(8, db * 2.2)} color="#c084fc" />\n      ))}\n    </View>\n  );\n};`
    },
    game: {
      tool: 'Three.js / WebGL',
      prompt: `Build a 3D endless highway runner in Three.js with lane switching, neon bloom shader, obstacle collision box detection, and speed multipliers.`,
      resultTitle: 'Generated GameRunner.ts',
      resultPreview: `// Three.js Decoupled Loop Engine\nexport class CyberHighwayEngine {\n  update(delta: number) {\n    this.player.position.x = lerp(this.player.position.x, this.targetLaneX, 12 * delta);\n    this.obstacles.forEach(obstacle => {\n      obstacle.position.z += this.speed * delta;\n      if (this.checkCollision(this.player, obstacle)) this.onGameOver();\n    });\n  }\n}`
    },
    web: {
      tool: 'Next.js 15 & Tailwind',
      prompt: `Design a high-converting dark-mode SaaS pricing table with monthly/yearly switcher, savings badge, and Paystack checkout trigger.`,
      resultTitle: 'Generated PricingSwitcher.tsx',
      resultPreview: `// Nexora Conversion Engine\nexport const PricingCards = ({ isYearly, onSelectPlan }) => (\n  <div className="grid md:grid-cols-3 gap-6">\n    <GlassPricingCard\n      title="Nexora Pro"\n      price={isYearly ? '$249/yr' : '$29/mo'}\n      badge="Save $99/yr"\n      features={['Unlimited Courses', 'All 250+ Prompts', 'Verified Certificate']}\n      onUpgrade={() => onSelectPlan('pro')}\n    />\n  </div>\n);`
    },
    prompt: {
      tool: 'Frontier Reasoning Models',
      prompt: `Act as a Staff Architect. Write a C.R.E.A.T.E. system prompt for a senior full-stack AI engineer that forbids placeholders and enforces strict TypeScript.`,
      resultTitle: 'Generated MasterSystemPrompt.md',
      resultPreview: `[ROLE]: Principal Full-Stack Architect\n[NEGATIVE CONSTRAINTS]: Never output "// TODO", mock functions, or incomplete classes.\n[SCHEMA]: Return production TypeScript 5.5+ with strict null checks, error boundaries, and accessible ARIA attributes.`
    }
  };

  const handleCopySample = (text: string, id: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (e) {}
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none opacity-80"></div>
        <div className="absolute -top-32 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Official Theme Logo Crest */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-purple-600 to-cyan-400 opacity-70 blur-xl group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-purple-600 to-cyan-400 shadow-2xl shadow-purple-600/40">
                <img
                  src="/assets/nexora-logo.jpeg"
                  alt="Nexora Studios Official Emblem"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="mt-3.5 flex items-center gap-2 text-[11px] font-mono tracking-wider text-amber-300 font-bold uppercase">
              <span>NEXORA STUDIOS</span>
              <span className="text-slate-500">•</span>
              <span className="text-purple-300">BUILDING BEYOND IMAGINATION</span>
            </div>
          </div>

          {/* Brand Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>LEARN AI • MASTER PROMPTS • BUILD ANYTHING</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
            Build Mobile Apps, 3D Games & Websites with{' '}
            <span className="text-gradient-nexora">Artificial Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Nexora AI Academy empowers beginners and professional engineers to turn ideas into production code, playable games, and digital products using world-class AI prompt engineering.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate('courses')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('prompt-library')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-slate-200 glass-card hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Browse 250+ Master Prompts</span>
            </button>

            <button
              onClick={() => setAssistantOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Tutor</span>
            </button>
          </div>

          {/* Interactive Live Playground / Prompt Runner */}
          <div className="max-w-4xl mx-auto text-left">
            <div className="rounded-2xl glass-panel border border-purple-500/30 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
                    Nexora AI Prompt Runner • Live Synthesis
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setActiveInteractiveTab('app')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeInteractiveTab === 'app'
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Mobile App
                  </button>
                  <button
                    onClick={() => setActiveInteractiveTab('game')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeInteractiveTab === 'game'
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    3D Game
                  </button>
                  <button
                    onClick={() => setActiveInteractiveTab('web')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeInteractiveTab === 'web'
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    SaaS Web
                  </button>
                  <button
                    onClick={() => setActiveInteractiveTab('prompt')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeInteractiveTab === 'prompt'
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Master Prompt
                  </button>
                </div>
              </div>

              {/* Window Body: Prompt & Generated Output */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#080a14]">
                {/* Prompt Box */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-purple-300 font-semibold uppercase flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      Input Master Prompt
                    </span>
                    <span className="text-[11px] bg-white/5 px-2 py-0.5 rounded text-cyan-400 font-mono">
                      Target: {samplePrompts[activeInteractiveTab].tool}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs text-slate-200 font-mono leading-relaxed h-44 overflow-y-auto">
                    {samplePrompts[activeInteractiveTab].prompt}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleCopySample(samplePrompts[activeInteractiveTab].prompt, 'hero-p')}
                      className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                    >
                      {copiedPromptId === 'hero-p' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-purple-400" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-slate-500 font-mono">Validated with Gemini & Claude</span>
                  </div>
                </div>

                {/* Output Box */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-cyan-300 font-semibold uppercase flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      {samplePrompts[activeInteractiveTab].resultTitle}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      Compiled 100%
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/80 border border-cyan-500/20 text-xs text-cyan-200 font-mono leading-relaxed h-44 overflow-y-auto whitespace-pre-wrap selection:bg-cyan-500 selection:text-black">
                    {samplePrompts[activeInteractiveTab].resultPreview}
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() => navigate('courses')}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Take the Full Masterclass</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE PLATFORM METRICS TICKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl glass-card text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white mb-1">
              18,400+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Global Students Enrolled
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-purple-400 mb-1">
              250+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Battle-Tested Master Prompts
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-cyan-400 mb-1">
              1,240+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Apps & Games Deployed
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card text-center">
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-emerald-400 mb-1">
              4.95 / 5.0
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Average Student Rating
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE LEARNING CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-2">
            Structured Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Four Specialized Pillars of AI Creation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Go from zero knowledge to shipping real-world software, 3D worlds, responsive websites, and master prompts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: AI App Dev */}
          <div
            onClick={() => navigate('category-app')}
            className="p-6 rounded-2xl glass-card hover:border-blue-500/40 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">
                AI App Development
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Build native Android & iOS applications with React Native, Flutter, biometric auth, Supabase databases, and responsive dark interfaces.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>iOS & Android Native</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Database & Auth Systems</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Deploy to App Stores</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
              <span>Explore App Track</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 2: AI Game Dev */}
          <div
            onClick={() => navigate('category-game')}
            className="p-6 rounded-2xl glass-card hover:border-emerald-500/40 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors">
                AI Game Development
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Create 2D and 3D web and PC games. Build racing titles, endless runners, character generation with AI, physics loops, and leaderboards.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2D & 3D Three.js Games</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Physics & Vehicle Racing</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Leaderboards & Game Shops</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>Explore Game Track</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 3: AI Website Dev */}
          <div
            onClick={() => navigate('category-web')}
            className="p-6 rounded-2xl glass-card hover:border-cyan-500/40 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                AI Website Development
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Build modern, high-converting landing pages, SaaS web applications, responsive dashboards, e-commerce storefronts, and Paystack checkouts.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full-Stack SaaS Apps</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Analytics Dashboards</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Paystack & Payments</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
              <span>Explore Web Track</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 4: Prompt Engineering */}
          <div
            onClick={() => navigate('category-prompt')}
            className="p-6 rounded-2xl glass-card hover:border-purple-500/40 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors">
                Prompt Engineering
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Master the C.R.E.A.T.E. framework, chain-of-thought reasoning, negative constraints, and system prompts to extract 100% bug-free code.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-mono mb-6">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>C.R.E.A.T.E. Framework</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Zero-Placeholder Rules</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Multi-Agent Prompting</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300">
              <span>Explore Prompt Track</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-1">
              Popular Masterclasses
            </div>
            <h2 className="text-3xl font-bold font-heading text-white">
              Featured Academy Courses
            </h2>
          </div>
          <button
            onClick={() => navigate('courses')}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map(course => (
            <div
              key={course.id}
              onClick={() => navigate('course-detail', { courseId: course.id })}
              className="rounded-2xl glass-card overflow-hidden cursor-pointer group flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a14] via-transparent to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30 uppercase">
                    {course.categoryLabel}
                  </span>
                  {course.isPro ? (
                    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-purple-600 text-white shadow-sm">
                      PRO
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-emerald-600 text-white shadow-sm">
                      FREE
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 text-xs font-mono px-2 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10">
                  {course.duration}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                    <span className="text-amber-400 flex items-center gap-1 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {course.rating}
                    </span>
                    <span>•</span>
                    <span>{course.reviewCount} reviews</span>
                    <span>•</span>
                    <span className="text-purple-300">{course.level}</span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Footer with Instructor & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-purple-500/30"
                    />
                    <span className="text-xs text-slate-300 font-medium truncate max-w-[120px]">
                      {course.instructor.name}
                    </span>
                  </div>

                  <button className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                    <span>Enroll Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SEARCHABLE PROMPT LIBRARY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel border border-purple-500/25 p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-3xl mb-8">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-2">
              Ready-To-Use Prompts
            </div>
            <h2 className="text-3xl font-bold font-heading text-white">
              The Nexora AI Prompt Library
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Over 250+ categorized, tested, and optimized prompts for website development, mobile apps, 3D games, logos, business, and image generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {prompts.slice(0, 4).map(prompt => (
              <div
                key={prompt.id}
                className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {prompt.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {prompt.tokens} tokens
                    </span>
                  </div>

                  <h4 className="font-heading font-semibold text-white text-sm mb-1 line-clamp-1">
                    {prompt.title}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                    {prompt.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex gap-1.5">
                    {prompt.targetTools.slice(0, 2).map((tool, idx) => (
                      <span key={idx} className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => copyPrompt(prompt)}
                    className="text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/20 flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('prompt-library')}
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-600/20"
            >
              Explore Full Prompt Library (250+ Prompts) →
            </button>
          </div>
        </div>
      </section>

      {/* 6. GAMIFICATION & LEADERBOARD SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Gamification Feature List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              Gamified Motivation
            </div>
            <h2 className="text-3xl font-bold font-heading text-white">
              Learn, Level Up, and Earn Verified Credentials
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every lesson you finish, prompt you copy, and project you share earns Nexora XP. Unlock exclusive architect badges, climb the global leaderboard, and graduate with industry-recognized certificates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Learning Streaks</div>
                  <div className="text-xs text-slate-400">Maintain daily streaks for 2x XP multipliers</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Weekly Build Jams</div>
                  <div className="text-xs text-slate-400">Win Pro subscriptions and showcase spots</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Verified Certificates</div>
                  <div className="text-xs text-slate-400">Gold-seal credentials for your portfolio</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Achievement Badges</div>
                  <div className="text-xs text-slate-400">Over 15 distinct badges to unlock</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mini Leaderboard */}
          <div className="p-6 rounded-2xl glass-panel border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading font-bold text-white text-base">
                  Top Architects
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                GLOBAL XP
              </span>
            </div>

            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono text-[11px] ${
                        idx === 0
                          ? 'bg-amber-400 text-black'
                          : idx === 1
                          ? 'bg-slate-300 text-black'
                          : idx === 2
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {entry.rank}
                    </span>
                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1">
                        {entry.name}
                        {entry.isPro && (
                          <span className="text-[8px] bg-purple-500/30 text-purple-300 px-1 rounded">
                            PRO
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Lvl {entry.level} • {entry.badge}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-purple-300 font-bold">
                    {entry.xp} XP
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('dashboard')}
              className="w-full mt-4 py-2 text-center text-xs font-semibold text-purple-300 hover:text-white bg-purple-600/15 hover:bg-purple-600/25 rounded-lg border border-purple-500/25 transition-colors"
            >
              View Your Rank & Stats
            </button>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-10 lg:p-14 bg-gradient-to-r from-purple-900/60 via-indigo-950/80 to-cyan-950/60 border border-purple-500/40 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              Ready to Master AI and Build Anything?
            </h2>
            <p className="text-base text-slate-300">
              Join thousands of learners building production mobile apps, 3D games, and SaaS products with Nexora AI Academy today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => navigate('pricing')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-xl shadow-purple-600/30 transition-all cursor-pointer"
              >
                Start Learning Today
              </button>
              <button
                onClick={() => navigate('courses')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-slate-200 bg-white/10 hover:bg-white/15 transition-all cursor-pointer"
              >
                Browse Course Catalog
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
