import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.js';
import { calculateLevel } from '../../utils/gamification.js';
import {
  Sparkles,
  Zap,
  BookOpen,
  Terminal,
  Cpu,
  Users,
  CreditCard,
  ShieldAlert,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Layers,
  Code2,
  Gamepad2,
  Globe,
  Award
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, activePage, navigate, setAssistantOpen, switchUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const levelInfo = user ? calculateLevel(user.xp) : null;

  const handleNav = (page: any, params?: any) => {
    navigate(page, params);
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-purple-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNav('home')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-purple-500 to-cyan-400 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
              <img
                src="/assets/nexora-logo.jpeg"
                alt="Nexora Studios Logo"
                className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-xl tracking-wider text-white">
                  NEXORA
                </span>
                <span className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase font-semibold">
                  AI ACADEMY
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                Powered by <span className="text-amber-300 font-semibold">Nexora Studios</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'home'
                  ? 'text-purple-300 bg-purple-500/10 border border-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('courses')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'courses'
                  ? 'text-purple-300 bg-purple-500/10 border border-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Courses
            </button>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                aria-expanded={categoriesDropdownOpen}
              >
                <span>Tracks</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-xl glass-panel border border-purple-500/20 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNav('category-app')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-300 hover:text-white hover:bg-purple-500/15 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">AI App Development</div>
                      <div className="text-xs text-slate-400">Android, iOS & Supabase</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('category-game')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-300 hover:text-white hover:bg-purple-500/15 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">AI Game Development</div>
                      <div className="text-xs text-slate-400">2D, 3D Games & Three.js</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('category-web')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-300 hover:text-white hover:bg-purple-500/15 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">AI Website Development</div>
                      <div className="text-xs text-slate-400">Full-Stack SaaS & Next.js</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('category-prompt')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-300 hover:text-white hover:bg-purple-500/15 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Prompt Engineering</div>
                      <div className="text-xs text-slate-400">C.R.E.A.T.E. Master Prompts</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('prompt-library')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'prompt-library'
                  ? 'text-purple-300 bg-purple-500/10 border border-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Prompt Library
            </button>

            <button
              onClick={() => handleNav('tools-directory')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'tools-directory'
                  ? 'text-purple-300 bg-purple-500/10 border border-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              AI Tools
            </button>

            <button
              onClick={() => handleNav('community')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'community'
                  ? 'text-purple-300 bg-purple-500/10 border border-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Community
            </button>

            <button
              onClick={() => handleNav('pricing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'pricing'
                  ? 'text-purple-300 bg-purple-500/10 border border-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Pricing
            </button>
          </div>

          {/* Right Section: AI Assistant Launcher, User Profile & Quick Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            {/* AI Assistant Button */}
            <button
              onClick={() => setAssistantOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-cyan-500/20 border border-purple-500/30 text-purple-300 hover:border-purple-400 hover:text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-purple-500/20"
              title="Open Nexora AI Learning Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Ask AI Tutor</span>
            </button>

            {/* Quick Demo Switcher Pill */}
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-0.5 text-[11px]">
              <button
                onClick={() => switchUser('student_pro')}
                className={`px-2 py-1 rounded transition-colors ${
                  user?.role === 'student' && user?.isPro
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Demo Student (Pro)"
              >
                Pro
              </button>
              <button
                onClick={() => switchUser('student_free')}
                className={`px-2 py-1 rounded transition-colors ${
                  user?.role === 'student' && !user?.isPro
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Demo Student (Free)"
              >
                Free
              </button>
              <button
                onClick={() => switchUser('admin')}
                className={`px-2 py-1 rounded transition-colors ${
                  user?.role === 'admin'
                    ? 'bg-cyan-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Admin Dashboard"
              >
                Admin
              </button>
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
                  aria-expanded={userDropdownOpen}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/30"
                  />
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.isPro && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                          PRO
                        </span>
                      )}
                      {user.role === 'admin' && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                          ADMIN
                        </span>
                      )}
                    </div>
                    {levelInfo && (
                      <div className="text-[10px] text-purple-400 font-mono">
                        Lvl {levelInfo.level} • {user.xp} XP
                      </div>
                    )}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel border border-purple-500/20 shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-white/10">
                      <div className="text-sm font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-slate-400 truncate">{user.email}</div>
                    </div>

                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-purple-500/15"
                    >
                      <User className="w-4 h-4 text-purple-400" />
                      <span>Student Dashboard</span>
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => handleNav('admin')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-cyan-300 hover:text-white hover:bg-cyan-500/15"
                      >
                        <ShieldAlert className="w-4 h-4 text-cyan-400" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleNav('pricing')}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-purple-500/15"
                    >
                      <CreditCard className="w-4 h-4 text-purple-400" />
                      <span>Membership & Plans</span>
                    </button>

                    <div className="border-t border-white/10 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('pricing')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/25 transition-all"
                >
                  Join Academy
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setAssistantOpen(true)}
              className="p-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30"
              aria-label="Ask AI Tutor"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-purple-500/20 px-4 pt-3 pb-6 space-y-2">
          {/* User Status Bar in Mobile */}
          {user ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 mb-3">
              <div className="flex items-center gap-2.5">
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    {user.name}
                    {user.isPro && <span className="text-[10px] bg-purple-500/30 text-purple-300 px-1.5 rounded">PRO</span>}
                  </div>
                  <div className="text-xs text-purple-400 font-mono">{user.xp} XP</div>
                </div>
              </div>
              <button
                onClick={() => handleNav('dashboard')}
                className="text-xs font-semibold text-purple-300 bg-purple-500/20 px-2.5 py-1.5 rounded-lg border border-purple-500/30"
              >
                Dashboard
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => handleNav('login')}
                className="w-full py-2 text-center text-xs font-semibold text-slate-300 bg-white/5 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('pricing')}
                className="w-full py-2 text-center text-xs font-bold text-white bg-purple-600 rounded-lg"
              >
                Join Free
              </button>
            </div>
          )}

          {/* Quick Demo Switcher on Mobile */}
          <div className="flex items-center justify-between bg-black/60 p-2 rounded-lg text-xs border border-white/10 mb-2">
            <span className="text-slate-400">Demo Role:</span>
            <div className="flex gap-1">
              <button
                onClick={() => switchUser('student_pro')}
                className={`px-2 py-0.5 rounded text-xs ${user?.isPro ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
              >
                Pro
              </button>
              <button
                onClick={() => switchUser('student_free')}
                className={`px-2 py-0.5 rounded text-xs ${!user?.isPro && user?.role === 'student' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
              >
                Free
              </button>
              <button
                onClick={() => switchUser('admin')}
                className={`px-2 py-0.5 rounded text-xs ${user?.role === 'admin' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm pt-2">
            <button
              onClick={() => handleNav('home')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('courses')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              Explore Courses
            </button>
            <button
              onClick={() => handleNav('category-app')}
              className="text-left px-3 py-2 rounded-lg text-blue-300 hover:bg-white/5"
            >
              AI App Dev
            </button>
            <button
              onClick={() => handleNav('category-game')}
              className="text-left px-3 py-2 rounded-lg text-emerald-300 hover:bg-white/5"
            >
              AI Game Dev
            </button>
            <button
              onClick={() => handleNav('category-web')}
              className="text-left px-3 py-2 rounded-lg text-cyan-300 hover:bg-white/5"
            >
              AI Website Dev
            </button>
            <button
              onClick={() => handleNav('category-prompt')}
              className="text-left px-3 py-2 rounded-lg text-purple-300 hover:bg-white/5"
            >
              Prompt Engineering
            </button>
            <button
              onClick={() => handleNav('prompt-library')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              Prompt Library
            </button>
            <button
              onClick={() => handleNav('tools-directory')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              AI Tools
            </button>
            <button
              onClick={() => handleNav('community')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              Community
            </button>
            <button
              onClick={() => handleNav('pricing')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-left px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
