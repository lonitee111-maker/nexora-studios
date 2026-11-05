import React from 'react';
import { useApp } from '../context/AppContext.js';
import { CourseCategory } from '../types/index.js';
import {
  Code2,
  Gamepad2,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Terminal,
  BookOpen,
  Star,
  Clock,
  Layers,
  Cpu
} from 'lucide-react';

interface CategoryLandingProps {
  categoryKey: 'app' | 'game' | 'web' | 'prompt';
}

export const CategoryLandingPage: React.FC<CategoryLandingProps> = ({ categoryKey }) => {
  const { courses, prompts, tools, navigate, enrollCourse, copyPrompt } = useApp();

  const configs = {
    app: {
      title: 'AI Mobile App Development',
      badge: 'NATIVE MOBILE TRACK',
      tagline: 'Build Production iOS & Android Applications with AI',
      description: 'Master the end-to-end process of designing, coding, and launching cross-platform native apps using React Native, Expo, Supabase, and AI agents like Cursor and Claude 3.5 Sonnet.',
      icon: Code2,
      accentColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      glowColor: 'bg-blue-500/10',
      curriculumPoints: [
        { title: 'Create Android & iOS Native Apps', desc: 'Use React Native, Flutter, and Expo with AI-assisted component generation.' },
        { title: 'Design Modern Glassmorphism Interfaces', desc: 'Craft high-contrast dark mode mobile layouts with haptic feedback and micro-interactions.' },
        { title: 'Secure Authentication & Biometrics', desc: 'Connect Supabase Auth, hardware-backed Keychain/SecureStore, and FaceID check.' },
        { title: 'Real-Time Databases & Offline Sync', desc: 'Implement optimistic state, offline caches, and Row Level Security (RLS).' },
        { title: 'App Store & TestFlight Deployment', desc: 'Automate build pipelines and publish to the Apple App Store and Google Play.' }
      ],
      recommendedTools: ['tool-cursor', 'tool-lovable'],
      promptCategory: 'Mobile App Development'
    },
    game: {
      title: 'AI Game Development',
      badge: 'INTERACTIVE 2D & 3D GAMES',
      tagline: 'Create Playable 2D & 3D Games, Physics Loops & Shaders with AI',
      description: 'Turn your gameplay mechanics into high-performance web and PC games. Learn to engineer Three.js WebGL scenes, racing physics, AI character art, leaderboards, and game shops.',
      icon: Gamepad2,
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      glowColor: 'bg-emerald-500/10',
      curriculumPoints: [
        { title: 'Build 2D & 3D Web Games', desc: 'Master Three.js, Canvas 2D, and Godot with decoupled 60FPS physics loops.' },
        { title: 'Build High-Speed Racing Games', desc: 'Implement arcade hovercraft physics, drift angles, nitro boosts, and camera damping.' },
        { title: 'Multiplayer Worlds & WebSockets', desc: 'Create real-time synchronization with server-authoritative positions.' },
        { title: 'Design Game Characters & 3D Assets', desc: 'Generate textures, 3D meshes with Meshy, and sprite sheets with Scenario AI.' },
        { title: 'Global Leaderboards & In-Game Shops', desc: 'Add persistent high scores, virtual economies, and upgrade systems.' }
      ],
      recommendedTools: ['tool-scenario', 'tool-meshy'],
      promptCategory: 'Game Development'
    },
    web: {
      title: 'AI Website Development',
      badge: 'FULL-STACK SAAS & WEB',
      tagline: 'Build Full-Stack SaaS, Landing Pages & Dashboards with AI',
      description: 'Learn the exact architecture top founders and agencies use to ship production-ready web apps in hours. Master Next.js 15, Tailwind v4, interactive dashboards, and Paystack payments.',
      icon: Globe,
      accentColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      glowColor: 'bg-cyan-500/10',
      curriculumPoints: [
        { title: 'High-Converting Landing Pages', desc: 'Anatomy of high-converting SaaS pages with bento grids, radial glows, and social proof.' },
        { title: 'Full-Stack SaaS Applications', desc: 'Architect server actions, client state, and Postgres/Supabase database schemas.' },
        { title: 'Interactive Analytics Dashboards', desc: 'Build KPI cards, data visualizations, and sortable tables with faceted filters.' },
        { title: 'Global Payments with Paystack', desc: 'Implement subscription checkouts, multi-currency pricing, and webhook verification.' },
        { title: 'Mobile-Responsive & Accessible', desc: 'Zero horizontal overflow, ARIA labels, and pristine SEO meta compliance.' }
      ],
      recommendedTools: ['tool-v0', 'tool-cursor'],
      promptCategory: 'Website Development'
    },
    prompt: {
      title: 'Prompt Engineering Masterclass',
      badge: 'FRONTIER REASONING & AGENTS',
      tagline: 'Master the C.R.E.A.T.E. Framework & Code Generation Prompts',
      description: 'Master the science of commanding LLMs and coding agents to generate complete, production-grade applications without lazy placeholders, hallucinations, or bugs.',
      icon: Zap,
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      glowColor: 'bg-purple-500/10',
      curriculumPoints: [
        { title: 'The Nexora C.R.E.A.T.E. Master Protocol', desc: 'Context, Role, Expectation, Action, Technical constraints, and Exemplars.' },
        { title: 'Negative Constraints & Anti-Slop Rules', desc: 'Forbid "// TODO" comments, enforce strict types, and eliminate lazy output.' },
        { title: 'Prompts for Mobile App Architecture', desc: 'Structure folder trees, state boundaries, and navigation graphs.' },
        { title: 'Prompts for 3D Games & WebGL', desc: 'Guide models on Three.js geometry, lighting, and delta-time loops.' },
        { title: 'Multi-Agent Prompt Chains', desc: 'Orchestrate architect, implementer, and code-reviewer agents in concert.' }
      ],
      recommendedTools: ['tool-claude-code', 'tool-cursor'],
      promptCategory: 'Prompt Engineering'
    }
  };

  const current = configs[categoryKey];
  const Icon = current.icon;

  const categoryCourses = courses.filter(c => c.category === categoryKey);
  const categoryPrompts = prompts.filter(p =>
    categoryKey === 'prompt' ? true : p.category.toLowerCase().includes(categoryKey)
  );

  return (
    <div className="space-y-20 pb-20">
      {/* Category Hero */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border ${current.borderColor} ${current.accentColor} text-xs font-mono font-bold uppercase`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight">
              {current.title}
            </h1>

            <p className="text-xl font-medium text-slate-200">
              {current.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {current.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => navigate('courses')}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>View Courses in this Track</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('prompt-library', { promptCategory: current.promptCategory })}
                className="px-6 py-3 rounded-xl text-xs font-bold text-slate-200 glass-card hover:text-white flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse {current.promptCategory} Prompts</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
            Learning Objectives
          </div>
          <h2 className="text-3xl font-bold font-heading text-white">
            What You Will Learn in this Track
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.curriculumPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-purple-400 mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Track Masterclasses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-1">
            Curated Courses
          </div>
          <h2 className="text-3xl font-bold font-heading text-white">
            Courses in {current.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryCourses.map(course => (
            <div
              key={course.id}
              onClick={() => navigate('course-detail', { courseId: course.id })}
              className="rounded-2xl glass-card overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a14] via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-600 text-white">
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{course.duration}</span>
                <button className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                  <span>Start Learning</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Ready-Made Prompts for This Track */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl glass-panel border border-purple-500/25">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                Battle-Tested Prompts for this Track
              </h3>
              <p className="text-xs text-slate-400">
                Instantly copy these engineered prompts into your AI code assistants.
              </p>
            </div>
            <button
              onClick={() => navigate('prompt-library')}
              className="text-xs font-bold text-cyan-400 hover:underline self-start"
            >
              Browse Full Library →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryPrompts.slice(0, 2).map(prompt => (
              <div
                key={prompt.id}
                className="p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                      {prompt.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {prompt.tokens} tokens
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-white text-sm mb-1">
                    {prompt.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {prompt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => copyPrompt(prompt)}
                    className="text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 flex items-center gap-1.5"
                  >
                    <span>Copy Master Prompt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
