import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import { calculateLevel, formatXp } from '../utils/gamification.js';
import { INITIAL_BADGES } from '../data/mockData.js';
import {
  Flame,
  Zap,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Bookmark,
  ShieldCheck,
  Printer,
  User as UserIcon,
  Play,
  Receipt,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';
import { CertificateModal } from '../components/certificate/CertificateModal.js';
import { UserCertificate } from '../types/index.js';

export const StudentDashboardPage: React.FC = () => {
  const { user, courses, prompts, navigate, copyPrompt, receipts, setReceiptModalOpen } = useApp();
  const [activeCert, setActiveCert] = useState<UserCertificate | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <UserIcon className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-2xl font-bold font-heading text-white">Sign In to View Your Dashboard</h2>
        <p className="text-sm text-slate-400">
          Track course progress, earned certificates, saved prompts, and learning streaks.
        </p>
        <button
          onClick={() => navigate('login')}
          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
        >
          Sign In / Choose Demo Profile
        </button>
      </div>
    );
  }

  const levelInfo = calculateLevel(user.xp);

  const enrolledCoursesList = courses.filter(c => user.enrolledCourseIds.includes(c.id));
  const savedPromptsList = prompts.filter(p => user.savedPromptIds.includes(p.id));

  const handleCopyPrompt = (prompt: any) => {
    copyPrompt(prompt);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header & Stats */}
      <div className="p-8 rounded-3xl glass-panel border border-purple-500/25 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* User Bio */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-purple-500/30 shrink-0"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
                  {user.name}
                </h1>
                {user.isPro ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                    NEXORA PRO
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    FREE LEARNER
                  </span>
                )}
                {user.role === 'admin' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                    ADMIN
                  </span>
                )}
              </div>

              <div className="text-xs text-purple-400 font-medium">{user.title}</div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">{user.bio}</p>
              <div className="text-[11px] text-slate-500 font-mono">Member since {user.joinedAt}</div>
            </div>
          </div>

          {/* Level & XP Progression Card */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-purple-300 font-bold">Level {levelInfo.level} Architect</span>
              <span className="text-cyan-400 font-bold">{formatXp(user.xp)}</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                style={{ width: `${levelInfo.progressPercent}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP to next level</span>
              <span>{levelInfo.progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="p-4 rounded-xl bg-white/5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-mono mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Enrolled</span>
            </div>
            <div className="text-2xl font-black text-white font-heading">{user.enrolledCourseIds.length}</div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-mono mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Streak</span>
            </div>
            <div className="text-2xl font-black text-white font-heading">{user.streakDays} Days</div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-mono mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Prompts Copied</span>
            </div>
            <div className="text-2xl font-black text-white font-heading">{user.promptsCopiedCount}</div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-mono mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Certificates</span>
            </div>
            <div className="text-2xl font-black text-white font-heading">{user.certificates.length}</div>
          </div>
        </div>
      </div>

      {/* Bank Transfer Receipts & Access Verification Status */}
      {(() => {
        const studentReceipts = receipts.filter(
          r => r.studentEmail === user.email || r.studentName.toLowerCase().includes(user.name.toLowerCase())
        );

        return (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0d0f1f] to-black border border-purple-500/25 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-cyan-400">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Bank Transfer Receipts & Access Verification
                  </h3>
                  <p className="text-xs text-slate-400">
                    Track the status of your direct bank transfers and review approval by lead administrator DE PHANTOM.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setReceiptModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload New Transfer Receipt</span>
              </button>
            </div>

            {studentReceipts.length === 0 ? (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span>No manual transfer receipts submitted yet. Prefer paying via bank transfer instead of card?</span>
                <button
                  onClick={() => setReceiptModalOpen(true)}
                  className="text-cyan-300 hover:underline font-semibold cursor-pointer"
                >
                  View Accounts & Submit Proof →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {studentReceipts.map(rcp => (
                  <div
                    key={rcp.id}
                    className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-mono text-purple-300 uppercase">
                        {rcp.plan.replace('_', ' ')}
                      </span>
                      {rcp.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending DE PHANTOM Approval
                        </span>
                      )}
                      {rcp.status === 'approved' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Full Pro Access Active
                        </span>
                      )}
                      {rcp.status === 'rejected' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Rejected
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Amount Paid:</span>
                      <span className="font-mono font-bold text-white">{rcp.currency} {rcp.amount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Bank & Reference:</span>
                      <span className="font-mono text-cyan-300 truncate max-w-[200px]" title={rcp.transactionReference}>
                        {rcp.bankName.split(' ')[0]} • {rcp.transactionReference}
                      </span>
                    </div>

                    {rcp.status === 'approved' && rcp.reviewedBy && (
                      <div className="text-[11px] text-emerald-300/90 bg-emerald-950/20 p-2 rounded-lg border border-emerald-500/20">
                        ✓ Confirmed by {rcp.reviewedBy} at {rcp.reviewedAt}. Full access registered.
                      </div>
                    )}

                    {rcp.status === 'pending' && (
                      <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2 rounded-lg border border-amber-500/20">
                        ⏳ Transfer slip under review by DE PHANTOM. Access will unlock automatically once confirmed.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* Enrolled Courses Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-2xl text-white">
            Enrolled Courses & Progress
          </h2>
          <button
            onClick={() => navigate('courses')}
            className="text-xs font-bold text-purple-400 hover:text-purple-300"
          >
            Browse More Courses →
          </button>
        </div>

        {enrolledCoursesList.length === 0 ? (
          <div className="p-10 rounded-2xl glass-card text-center space-y-3">
            <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-400">You are not enrolled in any courses yet.</p>
            <button
              onClick={() => navigate('courses')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500"
            >
              Explore Course Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCoursesList.map(course => {
              const progress = user.courseProgress[course.id];
              const completedCount = progress?.completedLessonIds.length || 0;
              const percent = Math.round((completedCount / course.lessons.length) * 100);
              const lastLessonId = progress?.lastLessonId || course.lessons[0]?.id;

              return (
                <div
                  key={course.id}
                  className="rounded-2xl glass-card overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080a14] via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/70 text-cyan-300 border border-cyan-500/30 uppercase">
                          {course.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-heading font-bold text-base text-white mb-2 line-clamp-1">
                        {course.title}
                      </h3>

                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400">{completedCount} of {course.lessons.length} lessons</span>
                          <span className="text-cyan-400 font-bold">{percent}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => navigate('course-player', { courseId: course.id, lessonId: lastLessonId })}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{percent === 100 ? 'Review Masterclass' : 'Continue Learning'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Earned Certificates Section */}
      <div className="space-y-6">
        <h2 className="font-heading font-bold text-2xl text-white">
          Verified Course Certificates ({user.certificates.length})
        </h2>

        {user.certificates.length === 0 ? (
          <div className="p-8 rounded-2xl glass-card text-center text-xs text-slate-400">
            Complete 100% of any course lessons and quizzes to earn your verified certificate.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.certificates.map(cert => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-black/60 to-cyan-950/30 border border-purple-500/30 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                      VERIFIED CREDENTIAL
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    {cert.courseTitle}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Issued to {cert.studentName} • {cert.issueDate}
                  </div>
                  <div className="text-[10px] text-purple-300 font-mono">
                    ID: {cert.certificateId}
                  </div>
                </div>

                <button
                  onClick={() => setActiveCert(cert)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Certificate</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievement Badges Grid */}
      <div className="space-y-6">
        <h2 className="font-heading font-bold text-2xl text-white">
          Achievement Badges
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INITIAL_BADGES.map(badge => {
            const isUnlocked = user.unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-purple-950/20 border-purple-500/30 text-white'
                    : 'bg-black/40 border-white/5 opacity-40 text-slate-500'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-purple-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                  <span>{badge.name}</span>
                  {isUnlocked && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {badge.description}
                </p>
                <div className="mt-3 text-[10px] font-mono font-bold uppercase">
                  {isUnlocked ? (
                    <span className="text-emerald-400">UNLOCKED</span>
                  ) : (
                    <span className="text-slate-600">LOCKED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Prompts Vault */}
      <div className="space-y-6">
        <h2 className="font-heading font-bold text-2xl text-white">
          Saved Prompts Vault ({savedPromptsList.length})
        </h2>

        {savedPromptsList.length === 0 ? (
          <div className="p-8 rounded-2xl glass-card text-center text-xs text-slate-400">
            You haven't bookmarked any prompts yet. Visit the Prompt Library to save your favorite prompts.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedPromptsList.map(prompt => (
              <div
                key={prompt.id}
                className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between"
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

                  <h3 className="font-heading font-semibold text-white text-sm mb-1">
                    {prompt.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {prompt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => handleCopyPrompt(prompt)}
                    className="text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 flex items-center gap-1.5"
                  >
                    {copiedPromptId === prompt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Master Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {activeCert && (
        <CertificateModal
          certificate={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
};
