import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import { calculatePlanCost, CurrencyCode, EXCHANGE_RATES } from '../utils/pricing.js';
import {
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  CreditCard,
  ChevronDown,
  Lock,
  ArrowRight
} from 'lucide-react';
import { PaystackModal } from '../components/payment/PaystackModal.js';

export const PricingPage: React.FC = () => {
  const { user, navigate, showToast } = useApp();

  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('yearly');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<'pro' | 'team' | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const freeCost = calculatePlanCost('free', billingInterval, currency);
  const proCost = calculatePlanCost('pro', billingInterval, currency);
  const teamCost = calculatePlanCost('team', billingInterval, currency);

  const faqs = [
    {
      q: 'Can I pay in Nigerian Naira (NGN) via Paystack?',
      a: 'Yes! Select "NGN" from the currency switcher above. Paystack supports local debit cards, USSD codes (*737#), and direct bank transfers.'
    },
    {
      q: 'What is included in the Nexora Pro membership?',
      a: 'Nexora Pro grants unlimited access to all present and future courses in AI App Dev, Game Dev, Web Dev, and Prompting, along with the full 250+ Master Prompt Library, AI Learning Assistant, and verified certificates.'
    },
    {
      q: 'Do I get access to the course project code repositories?',
      a: 'Yes, every course includes downloadable ZIP boilerplate archives, Figma mobile kits, and runnable GitHub repositories.'
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Absolutely. You can cancel with 1-click directly from your Student Dashboard. You will retain Pro access until the end of your billing cycle.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Pricing Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-bold uppercase">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>FLEXIBLE MONETIZATION & MEMBERSHIP</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          Invest in Your AI Engineering Career
        </h1>

        <p className="text-sm sm:text-base text-slate-300">
          Learn how to turn artificial intelligence into production software, games, and digital products with transparent pricing.
        </p>

        {/* Currency Switcher & Billing Toggle */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Monthly / Yearly Toggle */}
          <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                billingInterval === 'yearly'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly (Save 30%)</span>
              <span className="text-[10px] bg-cyan-400 text-black px-1.5 py-0.2 rounded font-mono font-bold">
                BEST VALUE
              </span>
            </button>
          </div>

          {/* Currency Dropdown */}
          <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300">
            <span className="font-mono text-[11px] text-slate-400">Currency:</span>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent text-white font-bold font-mono focus:outline-none cursor-pointer"
            >
              <option value="USD" className="bg-[#0b0e1a]">USD ($)</option>
              <option value="NGN" className="bg-[#0b0e1a]">NGN (₦) - Paystack</option>
              <option value="EUR" className="bg-[#0b0e1a]">EUR (€)</option>
              <option value="GBP" className="bg-[#0b0e1a]">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tier 1: Free Starter */}
        <div className="p-8 rounded-3xl glass-card flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
              Free Tier
            </span>
            <h3 className="font-heading font-bold text-2xl text-white">
              Starter Learner
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore beginner courses and fundamental AI prompt mechanics.
            </p>

            <div className="py-4 border-y border-white/10">
              <div className="text-4xl font-black font-heading text-white">
                {freeCost.formatted}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                Free forever • No credit card required
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Access to Free Starter Courses</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Basic Prompt Library (50+ prompts)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Public Community Access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Tools Directory</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={() => {
                showToast('You are on the Free Starter plan.', 'info');
                navigate('courses');
              }}
              className="w-full py-3 rounded-xl text-xs font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Start Learning Free
            </button>
          </div>
        </div>

        {/* Tier 2: Nexora Pro (Highlighted) */}
        <div className="p-8 rounded-3xl glass-panel border-2 border-purple-500 relative flex flex-col justify-between shadow-2xl shadow-purple-600/20">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
            RECOMMENDED BY INSTRUCTORS
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-purple-300 uppercase font-bold tracking-wider">
                Full Academy Pass
              </span>
              {billingInterval === 'yearly' && (
                <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                  Save $99/yr
                </span>
              )}
            </div>

            <h3 className="font-heading font-bold text-2xl text-white">
              Nexora Pro Architect
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Complete access to all tracks, full 250+ prompt library, AI assistant, and verified certificates.
            </p>

            <div className="py-4 border-y border-white/10">
              <div className="text-4xl font-black font-heading text-white">
                {proCost.formatted}
              </div>
              <div className="text-[11px] text-purple-300 font-mono mt-1">
                {billingInterval === 'yearly' ? 'billed annually (save 30%)' : 'billed monthly'}
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-200 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>All 15+ Advanced Courses (Apps, Games, Web, Prompts)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Complete 250+ Master Prompt Vault</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Unlimited AI Learning Assistant & Prompt Improver</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Official Verified Course Certificates (Gold Seal)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Weekly Coding Challenges & 2x XP Multipliers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct Instructor Q&A in Community</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={() => setSelectedPlanForCheckout('pro')}
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Upgrade with Paystack</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tier 3: Studio Enterprise */}
        <div className="p-8 rounded-3xl glass-card flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
              Studio & Agency Tier
            </span>
            <h3 className="font-heading font-bold text-2xl text-white">
              Studio Enterprise
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              For teams, agencies, and dev studios building client AI products.
            </p>

            <div className="py-4 border-y border-white/10">
              <div className="text-4xl font-black font-heading text-white">
                {teamCost.formatted}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-1">
                {billingInterval === 'yearly' ? 'billed annually' : 'billed monthly'}
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Everything in Nexora Pro for up to 10 Seats</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Private Studio Prompt Repository</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1-on-1 Code Architecture Reviews</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Custom Team Billing & Invoices</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={() => setSelectedPlanForCheckout('team')}
              className="w-full py-3 rounded-xl text-xs font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Upgrade Team with Paystack
            </button>
          </div>
        </div>
      </div>

      {/* Paystack Security Notice */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold text-white">Paystack Bank-Grade Security</div>
            <div>All card details, USSD and bank transfers processed securely with 256-bit encryption.</div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <span>PCI-DSS Level 1</span>
          <span>•</span>
          <span>Instant Pro Activation</span>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h3 className="font-heading font-bold text-2xl text-white text-center mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl glass-card overflow-hidden border border-white/10"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-white hover:bg-white/5 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-black/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Paystack Checkout Modal */}
      {selectedPlanForCheckout && (
        <PaystackModal
          planId={selectedPlanForCheckout}
          interval={billingInterval}
          currency={currency}
          onClose={() => setSelectedPlanForCheckout(null)}
        />
      )}
    </div>
  );
};
