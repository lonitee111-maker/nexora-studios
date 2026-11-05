import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.js';
import {
  Sparkles,
  X,
  Send,
  Zap,
  Lightbulb,
  Copy,
  Check,
  Bot,
  User as UserIcon,
  RotateCcw,
  Code2,
  Gamepad2,
  Globe
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AIAssistantDrawer: React.FC = () => {
  const { isAssistantOpen, setAssistantOpen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'tutor' | 'improver' | 'ideas'>('tutor');

  // Tutor Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello builder! I am **Nexora AI Mentor**, your full-stack AI tutor.\n\nWhether you need help architecting an **iOS/Android app**, debugging a **3D Three.js game loop**, structuring a **SaaS dashboard**, or writing an **elite master prompt**, I am here to guide you.\n\nWhat would you like to build today?`,
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Prompt Improver State
  const [rawPrompt, setRawPrompt] = useState('');
  const [targetCategory, setTargetCategory] = useState('Full-Stack Web Development');
  const [targetTool, setTargetTool] = useState('Cursor & Claude 3.5 Sonnet');
  const [improvedResult, setImprovedResult] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [copiedImproved, setCopiedImproved] = useState(false);

  // Idea Generator State
  const [ideaDomain, setIdeaDomain] = useState('Mobile & Web App');
  const [ideaDifficulty, setIdeaDifficulty] = useState('Intermediate');
  const [generatedIdeas, setGeneratedIdeas] = useState('');
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);

  if (!isAssistantOpen) return null;

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Let us keep building!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `Here is a master tip for your build:\n\n\`\`\`text\n[ROLE]: Senior Software Engineer\n[TASK]: ${textToSend}\n[REQUIREMENTS]: Provide complete code without placeholders, strict TypeScript types, and mobile-friendly styling.\n\`\`\``,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImprovePrompt = async () => {
    if (!rawPrompt.trim() || isImproving) return;
    setIsImproving(true);
    setCopiedImproved(false);

    try {
      const res = await fetch('/api/ai/improve-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: rawPrompt,
          category: targetCategory,
          targetTool
        })
      });
      const data = await res.json();
      setImprovedResult(data.result);
    } catch (err) {
      showToast('Could not reach AI server. Using local master prompt engine.', 'info');
    } finally {
      setIsImproving(false);
    }
  };

  const handleGenerateIdeas = async () => {
    if (isGeneratingIdeas) return;
    setIsGeneratingIdeas(true);

    try {
      const res = await fetch('/api/ai/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: ideaDomain,
          difficulty: ideaDifficulty
        })
      });
      const data = await res.json();
      setGeneratedIdeas(data.ideas);
    } catch (err) {
      showToast('Could not reach AI server.', 'info');
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const copyToClipboard = (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (e) {}
    setCopiedImproved(true);
    showToast('Prompt copied to clipboard!', 'success');
    setTimeout(() => setCopiedImproved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-[#0a0c16] border-l border-purple-500/25 flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-4 border-b border-purple-500/20 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#0b0e1a] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white flex items-center gap-2">
                <span>Nexora AI Mentor</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 font-mono">
                  ACTIVE
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Powered by Gemini 2.5 Flash & Nexora Studios
              </div>
            </div>
          </div>

          <button
            onClick={() => setAssistantOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-white/10 px-4 bg-black/20 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tutor')}
            className={`py-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'tutor'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Tutor</span>
          </button>

          <button
            onClick={() => setActiveTab('improver')}
            className={`py-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'improver'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Prompt Improver</span>
          </button>

          <button
            onClick={() => setActiveTab('ideas')}
            className={`py-3 px-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'ideas'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Project Generator</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: AI TUTOR CHAT */}
          {activeTab === 'tutor' && (
            <div className="space-y-4">
              {/* Quick Starter Chips */}
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20">
                <div className="text-[11px] font-semibold text-purple-300 mb-2">
                  Suggested Builder Questions:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'How to write a mobile app prompt for Cursor?',
                    'Explain Three.js 60FPS game loop decoupling',
                    'How to connect Supabase Auth to React Native?',
                    'Give me a master prompt for SaaS landing page'
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-black/40 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-purple-200 text-left transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message List */}
              <div className="space-y-3">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-purple-300" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-purple-600 text-white font-medium rounded-tr-sm'
                          : 'bg-[#121626] border border-white/10 text-slate-200 rounded-tl-sm whitespace-pre-wrap'
                      }`}
                    >
                      {msg.text}
                      <div className="text-[10px] text-right text-slate-400/80 mt-1.5 font-mono">
                        {msg.time}
                      </div>
                    </div>
                    {msg.sender === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <UserIcon className="w-3.5 h-3.5 text-slate-300" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    </div>
                    <div className="bg-[#121626] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-400 animate-pulse">
                      Nexora AI Mentor is synthesizing your response...
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROMPT IMPROVER */}
          {activeTab === 'improver' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>The Nexora C.R.E.A.T.E. Master Prompt Engine</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Paste any rough, vague idea. Our engine upgrades it with Role Anchoring, Negative Constraints, Schema Definitions, and Step-by-Step execution protocols.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Rough Idea or Prompt
                  </label>
                  <textarea
                    rows={4}
                    value={rawPrompt}
                    onChange={e => setRawPrompt(e.target.value)}
                    placeholder="e.g. Build me a 3D racing game with high score and car controls..."
                    className="w-full px-3.5 py-2.5 text-xs bg-black/50 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Category
                    </label>
                    <select
                      value={targetCategory}
                      onChange={e => setTargetCategory(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Mobile App Development">Mobile App (React Native/iOS)</option>
                      <option value="Game Development">Game Dev (Three.js/WebGL)</option>
                      <option value="Full-Stack Web Development">Website & SaaS (Next.js)</option>
                      <option value="Graphic & Logo Design">Logo & Visual Asset</option>
                      <option value="AI Image Generation">Midjourney / Flux</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Target AI Tool
                    </label>
                    <select
                      value={targetTool}
                      onChange={e => setTargetTool(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Cursor & Claude 3.5 Sonnet">Cursor & Claude 3.5 Sonnet</option>
                      <option value="v0 by Vercel">v0 by Vercel</option>
                      <option value="Claude Code Terminal">Claude Code Terminal</option>
                      <option value="Bolt.new / Lovable">Bolt.new / Lovable</option>
                      <option value="Midjourney v6">Midjourney v6</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleImprovePrompt}
                  disabled={!rawPrompt.trim() || isImproving}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
                >
                  {isImproving ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Architecting Master Prompt...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Engineer Master Prompt</span>
                    </>
                  )}
                </button>

                {improvedResult && (
                  <div className="mt-4 p-4 rounded-xl bg-[#080a14] border border-purple-500/30 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-purple-300 font-bold uppercase">
                        Engineered Master Prompt Output
                      </span>
                      <button
                        onClick={() => copyToClipboard(improvedResult)}
                        className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20"
                      >
                        {copiedImproved ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedImproved ? 'Copied!' : 'Copy Prompt'}</span>
                      </button>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap max-h-80 overflow-y-auto">
                      {improvedResult}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECT GENERATOR */}
          {activeTab === 'ideas' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1">
                  <Lightbulb className="w-4 h-4 text-purple-400" />
                  <span>AI Project Roadmap & Idea Generator</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Discover production-ready digital products you can build with AI today to boost your portfolio or launch as a revenue-generating startup.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Domain</label>
                  <select
                    value={ideaDomain}
                    onChange={e => setIdeaDomain(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Mobile App Development">Mobile App (Android/iOS)</option>
                    <option value="Game Development">2D & 3D Game Dev</option>
                    <option value="SaaS & Web Applications">Full-Stack SaaS Website</option>
                    <option value="AI Workflow & Automation">AI Automation & Agents</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Skill Level</label>
                  <select
                    value={ideaDifficulty}
                    onChange={e => setIdeaDifficulty(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-black/50 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Complete Beginner">Complete Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced / Production">Advanced / Production</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateIdeas}
                disabled={isGeneratingIdeas}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition-all"
              >
                {isGeneratingIdeas ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Blueprints...</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4" />
                    <span>Generate Project Blueprints</span>
                  </>
                )}
              </button>

              {generatedIdeas && (
                <div className="mt-4 p-4 rounded-xl bg-[#080a14] border border-cyan-500/30 text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {generatedIdeas}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Bar for AI Tutor */}
        {activeTab === 'tutor' && (
          <div className="p-4 border-t border-purple-500/20 bg-black/40">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Ask about app code, 3D math, prompts, or debugging..."
                className="flex-1 px-4 py-2.5 text-xs bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center transition-colors shadow-sm"
                aria-label="Send message to AI tutor"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
