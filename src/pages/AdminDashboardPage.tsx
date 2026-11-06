import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import { Course, PromptItem, PlatformAnnouncement } from '../types/index.js';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Edit3,
  Users,
  DollarSign,
  BookOpen,
  Zap,
  Send,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  X,
  Clock,
  Eye,
  Receipt,
  Building2,
  AlertCircle
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    courses,
    prompts,
    announcements,
    receipts,
    approveReceipt,
    rejectReceipt,
    user,
    navigate,
    adminAddCourse,
    adminDeleteCourse,
    adminAddPrompt,
    adminPublishAnnouncement,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'prompts' | 'announcements' | 'students' | 'receipts'>('receipts');
  const [receiptFilter, setReceiptFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedReceiptForPreview, setSelectedReceiptForPreview] = useState<string | null>(null);

  // New Course Form Modal State
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState<'app' | 'game' | 'web' | 'prompt'>('app');
  const [courseLevel, setCourseLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [courseDuration, setCourseDuration] = useState('6h 30m');
  const [courseIsPro, setCourseIsPro] = useState(false);
  const [courseTagline, setCourseTagline] = useState('');
  const [courseDesc, setCourseDesc] = useState('');

  // New Prompt Form Modal State
  const [isAddPromptModalOpen, setIsAddPromptModalOpen] = useState(false);
  const [promptTitle, setPromptTitle] = useState('');
  const [promptCategory, setPromptCategory] = useState<any>('Website Development');
  const [promptDesc, setPromptDesc] = useState('');
  const [promptText, setPromptText] = useState('');
  const [promptIsPro, setPromptIsPro] = useState(false);

  // New Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annTag, setAnnTag] = useState<PlatformAnnouncement['tag']>('Update');

  // Simulated student list
  const [students, setStudents] = useState([
    { id: '1', name: 'Alex Chen', email: 'alex.chen@nexora.dev', role: 'student', isPro: true, xp: 850, joined: 'Oct 2026' },
    { id: '2', name: 'Amara Okafor', email: 'amara.okafor@gmail.com', role: 'student', isPro: false, xp: 220, joined: 'Nov 2026' },
    { id: '3', name: 'Kenji Sato', email: 'kenji.sato@games.io', role: 'student', isPro: true, xp: 3820, joined: 'Sep 2026' },
    { id: '4', name: 'Tariq Al-Mansoor', email: 'tariq@technova.ae', role: 'student', isPro: true, xp: 4250, joined: 'Aug 2026' }
  ]);

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold font-heading text-white">Administrator Access Required</h2>
        <p className="text-xs text-slate-400">
          This panel is restricted to Nexora Studios platform administrators.
        </p>
        <button
          onClick={() => {
            const { switchUser } = (window as any).appActions || {};
            // Instant switch to admin via navbar or switch demo role
            navigate('home');
          }}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
        >
          Return Home (Switch to Admin via Navbar Demo pill)
        </button>
      </div>
    );
  }

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim() || !courseTagline.trim()) {
      showToast('Course title and tagline are required.', 'error');
      return;
    }

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: courseTitle,
      slug: courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: courseCategory,
      categoryLabel: courseCategory === 'app' ? 'AI App Development' : courseCategory === 'game' ? 'AI Game Development' : courseCategory === 'web' ? 'AI Website Development' : 'Prompt Engineering',
      level: courseLevel,
      duration: courseDuration,
      rating: 5.0,
      reviewCount: 1,
      isPro: courseIsPro,
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
      instructor: {
        name: user.name,
        role: 'Studio Instructor',
        avatar: user.avatar
      },
      tagline: courseTagline,
      description: courseDesc,
      objectives: ['Master fundamental AI architecture', 'Build and deploy a real-world project'],
      prerequisites: ['Basic programming knowledge'],
      tags: ['AI', 'Nexora', courseCategory],
      resources: [],
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: '01. Architecture Overview & Setup',
          duration: '15m',
          type: 'video',
          videoThumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
          transcript: 'Welcome to this newly created Nexora masterclass...',
          content: 'This lesson covers foundational concepts and environment configuration.',
          starterPrompt: `Create a modern architecture for ${courseTitle}.`
        }
      ]
    };

    adminAddCourse(newCourse);
    setIsAddCourseModalOpen(false);
    setCourseTitle('');
    setCourseTagline('');
    setCourseDesc('');
  };

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptTitle.trim() || !promptText.trim()) {
      showToast('Prompt title and text are required.', 'error');
      return;
    }

    const newPrompt: PromptItem = {
      id: `pr-${Date.now()}`,
      title: promptTitle,
      category: promptCategory,
      description: promptDesc,
      promptText,
      tags: ['Custom', 'NexoraAdmin'],
      tokens: Math.round(promptText.split(' ').length * 1.3),
      targetTools: ['Cursor', 'Claude', 'GPT-4o'],
      isPro: promptIsPro,
      copiedCount: 0,
      author: user.name
    };

    adminAddPrompt(newPrompt);
    setIsAddPromptModalOpen(false);
    setPromptTitle('');
    setPromptDesc('');
    setPromptText('');
  };

  const handlePublishAnn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) {
      showToast('Title and content are required.', 'error');
      return;
    }
    adminPublishAnnouncement(annTitle, annContent, annTag);
    setAnnTitle('');
    setAnnContent('');
  };

  const toggleStudentPro = (studentId: string) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          const updated = !s.isPro;
          showToast(`Updated ${s.name} subscription to ${updated ? 'Pro' : 'Free'}.`, 'success');
          return { ...s, isPro: updated };
        }
        return s;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Header */}
      <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>NEXORA STUDIOS EXECUTIVE CONSOLE</span>
          </div>
          <h1 className="text-3xl font-black font-heading text-white">
            Platform Administrator Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage curriculum, add courses, upload video modules, inspect telemetry, and publish announcements.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsAddCourseModalOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>

          <button
            onClick={() => setIsAddPromptModalOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 flex items-center gap-1.5 shadow-md shadow-cyan-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Master Prompt</span>
          </button>
        </div>
      </div>

      {/* Platform Real-Time Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Total Enrolled Learners</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black font-heading text-white">18,482</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% this month</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Monthly Recurring Rev</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-heading text-white">$48,290</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Paystack & Stripe Active</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Published Courses</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black font-heading text-white">{courses.length}</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">
            Across 4 specialized tracks
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-card">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Prompt Library Copies</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-heading text-white">42,890</div>
          <div className="text-[11px] text-purple-300 font-mono mt-1">
            {prompts.length} curated prompts
          </div>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-white/10 text-xs font-semibold space-x-6 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('receipts')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'receipts' ? 'border-purple-500 text-purple-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Receipt className="w-4 h-4 text-cyan-400" />
          <span>Payment Receipts & Approvals</span>
          {receipts.filter(r => r.status === 'pending').length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {receipts.filter(r => r.status === 'pending').length} Pending
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'courses' ? 'border-purple-500 text-purple-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Course Management ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'prompts' ? 'border-purple-500 text-purple-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Prompt Library Manager ({prompts.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'announcements' ? 'border-purple-500 text-purple-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Publish Announcements
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'students' ? 'border-purple-500 text-purple-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Student Memberships
        </button>
      </div>

      {/* TAB 1: COURSE MANAGEMENT */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-mono text-slate-400 border-b border-white/10 pb-3">
                <tr>
                  <th className="pb-3">Course Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Level</th>
                  <th className="pb-3">Lessons</th>
                  <th className="pb-3">Tier</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-white/5">
                    <td className="py-3 font-semibold text-white flex items-center gap-2">
                      <img src={course.thumbnail} alt="" className="w-7 h-7 rounded object-cover" />
                      <span>{course.title}</span>
                    </td>
                    <td className="py-3 text-slate-300 font-mono">{course.categoryLabel}</td>
                    <td className="py-3 text-slate-300">{course.level}</td>
                    <td className="py-3 text-slate-300 font-mono">{course.lessons.length} lessons</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${course.isPro ? 'bg-purple-600/30 text-purple-300' : 'bg-emerald-600/30 text-emerald-300'}`}>
                        {course.isPro ? 'PRO' : 'FREE'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => adminDeleteCourse(course.id)}
                        className="p-1.5 rounded-lg bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 transition-colors"
                        title="Delete course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PROMPT LIBRARY MANAGER */}
      {activeTab === 'prompts' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl glass-card overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-mono text-slate-400 border-b border-white/10 pb-3">
                <tr>
                  <th className="pb-3">Prompt Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Tokens</th>
                  <th className="pb-3">Copied</th>
                  <th className="pb-3">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {prompts.map(p => (
                  <tr key={p.id} className="hover:bg-white/5">
                    <td className="py-3 font-semibold text-white">{p.title}</td>
                    <td className="py-3 text-slate-300 font-mono">{p.category}</td>
                    <td className="py-3 text-slate-400 font-mono">{p.tokens}</td>
                    <td className="py-3 text-cyan-400 font-mono">{p.copiedCount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${p.isPro ? 'bg-purple-600/30 text-purple-300' : 'bg-emerald-600/30 text-emerald-300'}`}>
                        {p.isPro ? 'PRO' : 'FREE'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handlePublishAnn} className="p-6 rounded-2xl glass-card space-y-4">
            <h3 className="font-heading font-bold text-base text-white">
              Broadcast New Announcement
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Announcement Headline
              </label>
              <input
                type="text"
                value={annTitle}
                onChange={e => setAnnTitle(e.target.value)}
                placeholder="e.g. 🚀 Weekend Game Jam Begins Now!"
                className="w-full px-3.5 py-2 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tag</label>
              <select
                value={annTag}
                onChange={e => setAnnTag(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Update">Update</option>
                <option value="Challenge">Challenge</option>
                <option value="Masterclass">Masterclass</option>
                <option value="Feature">Feature</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message Content</label>
              <textarea
                rows={4}
                value={annContent}
                onChange={e => setAnnContent(e.target.value)}
                placeholder="Describe the update, rules, and student instructions..."
                className="w-full px-3.5 py-2 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Live Announcement</span>
            </button>
          </form>

          {/* List of Published Announcements */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-base text-white">
              Published Announcements ({announcements.length})
            </h3>
            {announcements.map(ann => (
              <div key={ann.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-cyan-400 font-bold uppercase">{ann.tag}</span>
                  <span className="text-slate-500">{ann.date}</span>
                </div>
                <div className="font-heading font-bold text-sm text-white">{ann.title}</div>
                <p className="text-xs text-slate-400">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STUDENTS */}
      {activeTab === 'students' && (
        <div className="p-6 rounded-2xl glass-card overflow-x-auto space-y-4">
          <div className="text-xs text-slate-400 mb-2">
            Inspect enrolled students and toggle Pro access privileges.
          </div>
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase font-mono text-slate-400 border-b border-white/10 pb-3">
              <tr>
                <th className="pb-3">Student Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">XP Points</th>
                <th className="pb-3">Joined</th>
                <th className="pb-3">Plan Status</th>
                <th className="pb-3 text-right">Access Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-white/5">
                  <td className="py-3 font-semibold text-white">{s.name}</td>
                  <td className="py-3 text-slate-300 font-mono">{s.email}</td>
                  <td className="py-3 text-purple-300 font-mono">{s.xp} XP</td>
                  <td className="py-3 text-slate-400">{s.joined}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${s.isPro ? 'bg-purple-600/30 text-purple-300' : 'bg-slate-700 text-slate-300'}`}>
                      {s.isPro ? 'PRO' : 'FREE'}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => toggleStudentPro(s.id)}
                      className="px-2.5 py-1 rounded text-[11px] font-semibold bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10"
                    >
                      {s.isPro ? 'Revoke Pro' : 'Grant Pro Access'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: PAYMENT RECEIPTS & APPROVALS (DE PHANTOM Lead Admin) */}
      {activeTab === 'receipts' && (
        <div className="space-y-6">
          {/* Header Notice */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0e1222] to-black border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  CONFIRMATION DESK
                </span>
                <span className="text-xs text-slate-400">
                  Lead Officer: <strong className="text-white">DE PHANTOM</strong> (Nexora Executive Administration)
                </span>
              </div>
              <h2 className="text-xl font-heading font-bold text-white">
                Direct Bank Transfer Receipts & Manual Access Registration
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl">
                Review submitted bank transfer proof slips from students who transferred to OPay (Ayomide Omojola Emmanuel / JESULONI ENOCH AYODELE), Kuda, or USD Wire. Once verified against your account ledger, click <strong>"Approve & Register Full Access"</strong> to activate their Nexora Pro Architect membership.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-center min-w-[90px]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Pending</div>
                <div className="text-lg font-black font-heading text-amber-400">
                  {receipts.filter(r => r.status === 'pending').length}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-center min-w-[90px]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Approved</div>
                <div className="text-lg font-black font-heading text-emerald-400">
                  {receipts.filter(r => r.status === 'approved').length}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-center min-w-[90px]">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Total Value</div>
                <div className="text-lg font-black font-heading text-cyan-300">
                  ₦{receipts.filter(r => r.status === 'approved').reduce((acc, r) => acc + (r.currency === 'NGN' ? r.amount : r.amount * 1550), 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
              <button
                key={f}
                onClick={() => setReceiptFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  receiptFilter === f
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-black/40 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {f} ({f === 'all' ? receipts.length : receipts.filter(r => r.status === f).length})
              </button>
            ))}
          </div>

          {/* Receipts List */}
          <div className="space-y-4">
            {receipts.filter(r => receiptFilter === 'all' || r.status === receiptFilter).length === 0 ? (
              <div className="p-12 text-center rounded-2xl glass-card text-slate-400 text-xs">
                No payment receipts found under "{receiptFilter}".
              </div>
            ) : (
              receipts
                .filter(r => receiptFilter === 'all' || r.status === receiptFilter)
                .map(receipt => {
                  return (
                    <div
                      key={receipt.id}
                      className="p-6 rounded-2xl glass-card border border-white/10 hover:border-purple-500/30 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                    >
                      {/* Left: Student & Transfer Information */}
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-heading font-bold text-base text-white">
                            {receipt.studentName}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">({receipt.studentEmail})</span>

                          {/* Status Pill */}
                          {receipt.status === 'pending' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Pending Verification
                            </span>
                          )}
                          {receipt.status === 'approved' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Approved & Full Access Granted
                            </span>
                          )}
                          {receipt.status === 'rejected' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Rejected
                            </span>
                          )}
                        </div>

                        {/* Transfer Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-black/40 p-3.5 rounded-xl border border-white/5 font-mono">
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase">Plan Selected</div>
                            <div className="font-bold text-purple-300 uppercase">
                              {receipt.plan.replace('_', ' ')}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase">Amount Transferred</div>
                            <div className="font-bold text-emerald-400">
                              {receipt.currency} {receipt.amount.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase">Receiving Bank</div>
                            <div className="text-white truncate" title={receipt.bankName}>
                              {receipt.bankName}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase">Reference / Session</div>
                            <div className="text-cyan-300 truncate" title={receipt.transactionReference}>
                              {receipt.transactionReference}
                            </div>
                          </div>
                        </div>

                        {/* Meta: Sender Account Name, Sub Date, Review Details */}
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-400">
                          <div>
                            Sender Account Name: <strong className="text-slate-200">{receipt.senderAccountName}</strong>
                          </div>
                          <div>•</div>
                          <div>
                            Submitted: <span className="text-slate-300">{receipt.submittedAt}</span>
                          </div>
                          {receipt.reviewedBy && (
                            <>
                              <div>•</div>
                              <div className="text-purple-300">
                                Confirmed by: <strong>{receipt.reviewedBy}</strong> ({receipt.reviewedAt})
                              </div>
                            </>
                          )}
                        </div>

                        {receipt.notes && (
                          <div className="text-xs text-slate-300 italic bg-purple-950/20 p-2.5 rounded-lg border border-purple-500/20">
                            Student Note: "{receipt.notes}"
                          </div>
                        )}

                        {receipt.rejectionReason && (
                          <div className="text-xs text-rose-300 bg-rose-950/30 p-2.5 rounded-lg border border-rose-500/30">
                            Rejection Reason: {receipt.rejectionReason}
                          </div>
                        )}
                      </div>

                      {/* Middle: Receipt Document Slip Thumbnail */}
                      <div className="shrink-0 flex flex-col items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedReceiptForPreview(receipt.receiptImage || null)}
                          className="w-28 h-28 rounded-xl overflow-hidden border border-purple-500/40 relative group cursor-pointer bg-black"
                          title="Click to inspect receipt document"
                        >
                          <img
                            src={receipt.receiptImage}
                            alt="Payment Receipt Slip"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-bold gap-1">
                            <Eye className="w-5 h-5 text-cyan-400" />
                            <span>Inspect Slip</span>
                          </div>
                        </button>
                        <span className="text-[10px] text-slate-500 font-mono">Proof of Payment</span>
                      </div>

                      {/* Right: Decision Buttons for DE PHANTOM / Admins */}
                      <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-44">
                        {receipt.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => approveReceipt(receipt.id)}
                              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Approve & Grant Full Access</span>
                            </button>

                            <button
                              onClick={() => {
                                const reason = window.prompt('Enter reason for rejecting receipt (e.g. Deposit not found in ledger):');
                                if (reason) {
                                  rejectReceipt(receipt.id, reason);
                                }
                              }}
                              className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                            >
                              Reject Receipt
                            </button>
                          </>
                        ) : receipt.status === 'approved' ? (
                          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-1">
                            <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Pro Access Active
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              Learner Registered
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-center text-[11px] text-rose-300 font-semibold">
                            Receipt Rejected
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}

      {/* Modal: Full Receipt Image Lightbox */}
      {selectedReceiptForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-2xl w-full bg-[#090b14] border border-purple-500/40 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="font-heading font-bold text-sm text-white">Payment Proof Inspection Slip</h4>
              <button
                onClick={() => setSelectedReceiptForPreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto rounded-xl bg-black flex items-center justify-center p-2">
              <img
                src={selectedReceiptForPreview}
                alt="Enlarged Payment Receipt"
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="text-right">
              <button
                onClick={() => setSelectedReceiptForPreview(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Course */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl glass-panel border border-purple-500/30 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-lg text-white">Create New Academy Course</h3>
              <button onClick={() => setIsAddCourseModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={e => setCourseTitle(e.target.value)}
                  placeholder="e.g. Master 3D Spatial Computing with AI"
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={courseCategory}
                    onChange={e => setCourseCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                  >
                    <option value="app">AI App Development</option>
                    <option value="game">AI Game Development</option>
                    <option value="web">AI Website Development</option>
                    <option value="prompt">Prompt Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={courseLevel}
                    onChange={e => setCourseLevel(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={courseTagline}
                  onChange={e => setCourseTagline(e.target.value)}
                  placeholder="One sentence summary of learning outcomes"
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={courseDesc}
                  onChange={e => setCourseDesc(e.target.value)}
                  placeholder="Detailed curriculum overview..."
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="proCheck"
                  checked={courseIsPro}
                  onChange={e => setCourseIsPro(e.target.checked)}
                  className="rounded text-purple-600"
                />
                <label htmlFor="proCheck" className="text-xs text-slate-300">
                  Require Nexora Pro Membership for this course
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm"
              >
                Publish Course to Academy
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Master Prompt */}
      {isAddPromptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl glass-panel border border-cyan-500/30 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-lg text-white">Add Master Prompt to Library</h3>
              <button onClick={() => setIsAddPromptModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleCreatePrompt} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Prompt Title</label>
                <input
                  type="text"
                  value={promptTitle}
                  onChange={e => setPromptTitle(e.target.value)}
                  placeholder="e.g. Full-Stack Supabase Auth & RLS Master Prompt"
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={promptCategory}
                  onChange={e => setPromptCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Game Development">Game Development</option>
                  <option value="Logo Design">Logo Design</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Business">Business</option>
                  <option value="Animation">Animation</option>
                  <option value="AI Image Generation">AI Image Generation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <input
                  type="text"
                  value={promptDesc}
                  onChange={e => setPromptDesc(e.target.value)}
                  placeholder="What does this prompt achieve?"
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Complete Master Prompt Text</label>
                <textarea
                  rows={5}
                  value={promptText}
                  onChange={e => setPromptText(e.target.value)}
                  placeholder="[ROLE]: ...&#10;[TECHNICAL CONSTRAINTS]: ..."
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white font-mono"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="promptProCheck"
                  checked={promptIsPro}
                  onChange={e => setPromptIsPro(e.target.checked)}
                  className="rounded text-cyan-600"
                />
                <label htmlFor="promptProCheck" className="text-xs text-slate-300">
                  Mark as Nexora Pro exclusive
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors shadow-sm"
              >
                Add Prompt to Library
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
