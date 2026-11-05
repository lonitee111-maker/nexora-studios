import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Course Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    setIsSent(true);
    showToast('Support ticket submitted. A mentor will reply within 4 hours.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold uppercase">
          <Mail className="w-3.5 h-3.5" />
          <span>We Are Here to Help</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          Contact Nexora Studios
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Have questions about our AI curriculum, Paystack checkout, enterprise licensing, or technical mentorship? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-card space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-white">Direct Email</h3>
            <p className="text-xs text-slate-400">For student admissions and general support:</p>
            <div className="font-mono text-xs text-purple-300 font-bold">academy@nexorastudios.com</div>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-white">Nexora Discord Community</h3>
            <p className="text-xs text-slate-400">Join 12,000+ developers in live voice labs and prompt shares:</p>
            <div className="font-mono text-xs text-cyan-300 font-bold">discord.gg/nexora-ai</div>
          </div>

          <div className="p-6 rounded-2xl glass-card space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-white">Studio Headquarters</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nexora Studios Inc.<br />
              548 Market St, Suite 89201<br />
              San Francisco, CA 94104
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl glass-panel border border-purple-500/25">
          {isSent ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">Message Dispatched!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you for reaching out to Nexora Studios. A lead mentor will review your inquiry and respond to {email} shortly.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setMessage('');
                }}
                className="text-xs font-semibold text-purple-400 hover:underline"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Send an Inquiry or Feedback
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Topic</label>
                <select
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Course Inquiry">Course & Curriculum Question</option>
                  <option value="Paystack & Billing">Paystack & Billing Support</option>
                  <option value="Enterprise & Team">Enterprise & Studio Licensing</option>
                  <option value="Technical Bug">Report a Bug / Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="How can we assist your learning journey?"
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
