import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import { CommunityPost } from '../types/index.js';
import {
  MessageSquare,
  Heart,
  Share2,
  Flag,
  Plus,
  Send,
  Sparkles,
  ExternalLink,
  Flame,
  Award,
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { communityPosts, user, likePost, addComment, createPost, reportPost, showToast } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Showcase' | 'Discussion' | 'Question' | 'Prompt Tip'>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('Showcase');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('React, AI, Showcase');
  const [newProjectUrl, setNewProjectUrl] = useState('');

  const filteredPosts = communityPosts.filter(p => {
    if (p.reported) return false;
    if (selectedFilter === 'All') return true;
    return p.category === selectedFilter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Title and content are required.', 'error');
      return;
    }

    createPost({
      title: newTitle,
      category: newCategory,
      content: newContent,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      projectUrl: newProjectUrl.trim() || undefined
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewProjectUrl('');
  };

  const handleCommentSubmit = (postId: string) => {
    if (!commentInput.trim()) return;
    addComment(postId, commentInput);
    setCommentInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Community Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-purple-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-bold uppercase mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Nexora Builders Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Student Community
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Showcase your AI apps & games, ask technical questions, discuss master prompts, and collaborate.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Share Project / Ask Question (+75 XP)</span>
        </button>
      </div>

      {/* Weekly Challenge Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-indigo-950/60 to-cyan-950/40 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-amber-300 font-bold uppercase">
              ACTIVE WEEKLY CHALLENGE
            </div>
            <h3 className="font-heading font-bold text-white text-base">
              Weekend Game Jam: Build a 3D Web Game with AI in 48h
            </h3>
            <p className="text-xs text-slate-300">
              Top 3 submissions get featured on the Nexora Hall of Fame & earn 2,000 XP!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setNewCategory('Showcase');
            setNewTitle('🎮 [Game Jam Entry]: ');
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-400 text-black transition-colors shrink-0 font-mono"
        >
          Submit Entry
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Showcase', 'Discussion', 'Question', 'Prompt Tip'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === tab
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Community Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="p-6 rounded-2xl glass-card space-y-4"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/30"
                />
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{post.author.name}</span>
                    {post.author.isPro && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                        PRO
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                    <span>{post.author.role}</span>
                    <span>•</span>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase font-semibold">
                  {post.category}
                </span>
                <button
                  onClick={() => reportPost(post.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Report post for moderation"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h2 className="font-heading font-bold text-lg text-white">
                {post.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              {post.imageUrl && (
                <div className="rounded-xl overflow-hidden max-h-80 w-full mt-3 border border-white/10">
                  <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              {post.projectUrl && (
                <div className="pt-2">
                  <a
                    href={post.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 transition-colors"
                  >
                    <span>View Project Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-purple-300 bg-white/5 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interaction Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => likePost(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    post.isLiked
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span className="font-mono">{post.likes}</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-mono">{post.commentsCount} Comments</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-500">
                Nexora Community Thread
              </span>
            </div>

            {/* Expandable Comment Thread */}
            {activeCommentPostId === post.id && (
              <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in">
                {/* Existing Comments */}
                <div className="space-y-3">
                  {post.comments.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-black/40 border border-white/5 flex gap-3 text-xs">
                      <img src={c.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{c.author}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{c.time}</span>
                        </div>
                        <p className="text-slate-300">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    placeholder="Write a constructive response or feedback..."
                    className="flex-1 px-3.5 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleCommentSubmit(post.id);
                    }}
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal: Share Project / Post */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl glass-panel border border-purple-500/30 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-lg text-white">Share with Nexora Community</h3>
              <button onClick={() => setIsCreateModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Post Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Built a 3D Hovercraft Game in Three.js!"
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                >
                  <option value="Showcase">Project Showcase</option>
                  <option value="Discussion">Lesson Discussion</option>
                  <option value="Question">Technical Question</option>
                  <option value="Prompt Tip">Prompt Tip / Trick</option>
                  <option value="Tutorial">Community Tutorial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Content / Explanation</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Describe what you built, which AI tools you used, and what challenges you overcame..."
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Live Project / GitHub URL (Optional)</label>
                <input
                  type="url"
                  value={newProjectUrl}
                  onChange={e => setNewProjectUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="React, ThreeJS, Claude, Mobile"
                  className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-colors shadow-sm"
              >
                Post to Community (+75 XP)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
