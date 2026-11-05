import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.js';
import { PromptCategory, PromptItem } from '../types/index.js';
import {
  Search,
  Filter,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Zap,
  Globe,
  Code2,
  Gamepad2,
  Palette,
  Briefcase,
  Film,
  Image,
  Eye,
  X,
  Layers
} from 'lucide-react';

const CATEGORIES: { id: PromptCategory | 'All'; label: string; icon: any }[] = [
  { id: 'All', label: 'All Prompts', icon: Sparkles },
  { id: 'Website Development', label: 'Websites', icon: Globe },
  { id: 'Mobile App Development', label: 'Mobile Apps', icon: Code2 },
  { id: 'Game Development', label: 'Games', icon: Gamepad2 },
  { id: 'Logo Design', label: 'Logos', icon: Palette },
  { id: 'Graphic Design', label: 'Graphic Design', icon: Layers },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Animation', label: 'Animation', icon: Film },
  { id: 'AI Image Generation', label: 'AI Image Gen', icon: Image }
];

export const PromptLibraryPage: React.FC = () => {
  const { prompts, user, copyPrompt, toggleSavePrompt, selectedPromptCategory } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedPromptCategory || 'All');
  const [tierFilter, setTierFilter] = useState<'all' | 'free' | 'pro'>('all');
  const [inspectingPrompt, setInspectingPrompt] = useState<PromptItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.promptText.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      const matchesTier =
        tierFilter === 'all' ||
        (tierFilter === 'free' && !p.isPro) ||
        (tierFilter === 'pro' && p.isPro);

      return matchesSearch && matchesCategory && matchesTier;
    });
  }, [prompts, searchQuery, selectedCategory, tierFilter]);

  const handleCopy = (prompt: PromptItem) => {
    copyPrompt(prompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-semibold uppercase">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Curated Master Prompt Vault</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          AI Prompt Library
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Engineered, battle-tested master prompts for generating websites, native mobile apps, 2D/3D games, vector logos, business blueprints, and cinematic imagery.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="p-6 rounded-2xl glass-panel border border-purple-500/20 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search prompts by keyword, model, or tags (e.g., 'Three.js', 'React Native', 'Midjourney')..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div>
            <select
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Access Tiers</option>
              <option value="free">Free Prompts</option>
              <option value="pro">Nexora Pro Exclusives</option>
            </select>
          </div>
        </div>

        {/* 8 Requested Categories */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt Cards Grid */}
      {filteredPrompts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-card space-y-3">
          <Zap className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No prompts found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or clearing the category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map(prompt => {
            const isSaved = user?.savedPromptIds.includes(prompt.id);
            const isCopied = copiedId === prompt.id;

            return (
              <div
                key={prompt.id}
                className="p-6 rounded-2xl glass-card flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Category, Tokens & Bookmark */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                      {prompt.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {prompt.tokens} tokens
                      </span>

                      <button
                        onClick={() => toggleSavePrompt(prompt.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Bookmark to vault'}
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {prompt.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {prompt.description}
                  </p>

                  {/* Snippet Preview */}
                  <div
                    onClick={() => setInspectingPrompt(prompt)}
                    className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-slate-300 line-clamp-3 mb-4 cursor-pointer hover:border-purple-500/40 transition-colors"
                    title="Click to view full prompt and variables"
                  >
                    {prompt.promptText}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {prompt.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-slate-400 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setInspectingPrompt(prompt)}
                    className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>

                  <button
                    onClick={() => handleCopy(prompt)}
                    className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Prompt Inspector Modal */}
      {inspectingPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-2xl rounded-2xl glass-panel border border-purple-500/30 overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-purple-500/20 bg-black/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded uppercase">
                  {inspectingPrompt.category}
                </span>
                <h3 className="font-heading font-bold text-lg text-white mt-1">
                  {inspectingPrompt.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectingPrompt(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Description
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {inspectingPrompt.description}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Optimized For AI Tools
                </span>
                <div className="flex flex-wrap gap-2">
                  {inspectingPrompt.targetTools.map((tool, idx) => (
                    <span key={idx} className="text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-lg font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    Complete Master Prompt Text
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Est. {inspectingPrompt.tokens} tokens
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto selection:bg-purple-500 selection:text-white">
                  {inspectingPrompt.promptText}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-purple-500/20 bg-black/40 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Copied {inspectingPrompt.copiedCount} times by academy students
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleSavePrompt(inspectingPrompt.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>

                <button
                  onClick={() => {
                    handleCopy(inspectingPrompt);
                    setInspectingPrompt(null);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt & Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
