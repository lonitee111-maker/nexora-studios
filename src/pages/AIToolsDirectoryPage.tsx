import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.js';
import {
  ExternalLink,
  Search,
  BookOpen,
  Sparkles,
  Terminal,
  Layout,
  Cpu,
  Gamepad2,
  Box,
  Image,
  Headphones,
  CheckCircle2
} from 'lucide-react';

export const AIToolsDirectoryPage: React.FC = () => {
  const { tools, courses, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [pricingFilter, setPricingFilter] = useState<string>('all');

  const categories = [
    'all',
    'Code Assistant',
    'Full-Stack App Generator',
    'Game & 3D',
    'Image & Asset',
    'Audio & Voice'
  ];

  const filteredTools = useMemo(() => {
    return tools.filter(t => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' || t.category === selectedCategory;

      const matchesPricing =
        pricingFilter === 'all' || t.pricing === pricingFilter;

      return matchesSearch && matchesCat && matchesPricing;
    });
  }, [tools, searchQuery, selectedCategory, pricingFilter]);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-purple-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      case 'Box': return <Box className="w-5 h-5 text-blue-400" />;
      case 'Image': return <Image className="w-5 h-5 text-rose-400" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-indigo-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Curated Ecosystem Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          AI Tools Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          The essential AI development tools, coding agents, 3D generators, and asset pipelines taught inside Nexora AI Academy.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-6 rounded-2xl glass-panel border border-purple-500/20 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tools by name, features, or stack (e.g. 'Cursor', '3D', 'Three.js')..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div>
            <select
              value={pricingFilter}
              onChange={e => setPricingFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Pricing Models</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              {cat === 'all' ? 'All Tools' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => {
          const course = courses.find(c => c.id === tool.recommendedCourseId);

          return (
            <div
              key={tool.id}
              className="p-6 rounded-2xl glass-card flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {renderIcon(tool.iconName)}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                      {tool.pricing}
                    </span>
                    {tool.featured && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-600/30 text-purple-300 border border-purple-500/40">
                        ESSENTIAL
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 mb-1">
                  {tool.category}
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {tool.description}
                </p>

                {/* Course Link if present */}
                {course && (
                  <div
                    onClick={() => navigate('course-detail', { courseId: course.id })}
                    className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 hover:border-purple-500/40 cursor-pointer transition-colors mb-4"
                  >
                    <div className="text-[10px] text-purple-300 font-mono font-bold uppercase flex items-center gap-1 mb-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Learn in Nexora Course:</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {course.title}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Official Website</span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-cyan-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Visit Tool</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
