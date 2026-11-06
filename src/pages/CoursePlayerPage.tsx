import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.js';
import {
  Play,
  Pause,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileCode,
  HelpCircle,
  FolderDown,
  Sparkles,
  Award,
  Volume2,
  Maximize2,
  Copy,
  Check,
  RotateCcw,
  Trophy,
  Flame,
  CheckSquare,
  Square
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CertificateModal } from '../components/certificate/CertificateModal.js';
import { UserCertificate } from '../types/index.js';
import { calculateCourseProgress } from '../utils/courseProgress.js';

export const CoursePlayerPage: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    selectedLessonId,
    user,
    navigate,
    completeLesson,
    toggleLessonComplete,
    claimCertificate,
    showToast
  } = useApp();

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  const currentLessonIndex = course.lessons.findIndex(l => l.id === selectedLessonId);
  const activeLesson = course.lessons[currentLessonIndex !== -1 ? currentLessonIndex : 0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(25);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'content' | 'code' | 'quiz' | 'assignment' | 'resources'>('content');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Assignment state
  const [assignmentSubmission, setAssignmentSubmission] = useState('');
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState(false);
  const [showSolutionPrompt, setShowSolutionPrompt] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Certificate Modal state
  const [activeCertificate, setActiveCertificate] = useState<UserCertificate | null>(null);

  // Real-time progress computation
  const courseProgress = user?.courseProgress[course.id];
  const completedLessonIds = courseProgress?.completedLessonIds || [];
  const completedCount = completedLessonIds.length;
  const totalLessons = course.lessons.length;
  const progressPercent = calculateCourseProgress(totalLessons, completedLessonIds);
  const isLessonCompleted = completedLessonIds.includes(activeLesson.id);
  const isCourseFullyCompleted = completedCount >= totalLessons && totalLessons > 0;

  const nextLesson = currentLessonIndex < course.lessons.length - 1 ? course.lessons[currentLessonIndex + 1] : null;
  const prevLesson = currentLessonIndex > 0 ? course.lessons[currentLessonIndex - 1] : null;

  // Reset quiz state when switching lessons
  useEffect(() => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setAssignmentSubmission('');
    setIsAssignmentSubmitted(false);
    setShowSolutionPrompt(false);
    setIsPlaying(false);
    setVideoProgress(15);
  }, [activeLesson.id]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleQuizOptionSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeLesson.quiz) return;
    let correctCount = 0;
    activeLesson.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / activeLesson.quiz.length) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore === 100) {
      showToast('Perfect quiz score! +100 bonus XP ⚡', 'success');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } else {
      showToast(`Quiz completed: ${calculatedScore}%. Review explanations below.`, 'info');
    }
  };

  const handleToggleActiveLesson = () => {
    const willBeCompleted = !isLessonCompleted;

    if (willBeCompleted) {
      completeLesson(course.id, activeLesson.id, quizScore || undefined);

      const willBeCourseCompleted = completedCount + 1 >= totalLessons;
      if (willBeCourseCompleted) {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        const cert = claimCertificate(course.id);
        if (cert) setActiveCertificate(cert);
      } else if (nextLesson) {
        // Auto navigate to next lesson after a short friendly delay
        setTimeout(() => {
          navigate('course-player', { courseId: course.id, lessonId: nextLesson.id });
        }, 1200);
      }
    } else {
      toggleLessonComplete(course.id, activeLesson.id);
    }
  };

  const handleToggleSidebarLesson = (e: React.MouseEvent, lessonId: string) => {
    e.stopPropagation();
    const isCurrentlyDone = completedLessonIds.includes(lessonId);

    if (!isCurrentlyDone) {
      completeLesson(course.id, lessonId);
      if (completedCount + 1 >= totalLessons) {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        const cert = claimCertificate(course.id);
        if (cert) setActiveCertificate(cert);
      }
    } else {
      toggleLessonComplete(course.id, lessonId);
    }
  };

  const copyCode = (code: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
    } catch (e) {}
    setCopiedCode(true);
    showToast('Code copied to clipboard!', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. REAL-TIME COURSE PROGRESS BANNER */}
      <div className="rounded-2xl glass-panel border border-purple-500/30 p-5 bg-gradient-to-r from-purple-950/40 via-black to-cyan-950/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('course-detail', { courseId: course.id })}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors group"
              >
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Overview</span>
              </button>
              <span className="text-slate-600">•</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {course.categoryLabel}
              </span>
              {isCourseFullyCompleted && (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-emerald-400" />
                  <span>100% Certified</span>
                </span>
              )}
            </div>

            <h1 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight">
              {course.title}
            </h1>
            <p className="text-xs text-slate-400 font-sans line-clamp-1">
              Instructor: {course.instructor.name} ({course.instructor.role})
            </p>
          </div>

          {/* Real-time Progress Widget */}
          <div className="flex flex-col sm:items-end justify-center min-w-[260px] space-y-2 bg-black/40 p-3.5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between w-full text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Flame className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Course Progress</span>
              </div>
              <span className="font-heading font-bold text-sm text-cyan-300">
                {progressPercent}% Complete
              </span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden p-0.5 border border-white/15 relative">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700 ease-out shadow-lg shadow-purple-500/40"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between w-full text-[11px] font-mono text-slate-400">
              <span>{completedCount} of {totalLessons} lessons completed</span>
              <span className="text-purple-300">+{completedCount * 50} XP earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACTIVE LESSON TOOLBAR & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-black/60 border border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            {currentLessonIndex + 1}
          </div>
          <div className="space-y-0.5 truncate">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Current Lesson • {activeLesson.duration}
            </div>
            <div className="text-sm font-semibold text-white truncate max-w-md sm:max-w-lg">
              {activeLesson.title}
            </div>
          </div>
        </div>

        {/* Action Controls: Previous / Next / Mark as Complete */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => prevLesson && navigate('course-player', { courseId: course.id, lessonId: prevLesson.id })}
            disabled={!prevLesson}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-white/10"
            title="Previous Lesson"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* REAL-TIME 'MARK AS COMPLETE' BUTTON */}
          <button
            onClick={handleToggleActiveLesson}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              isLessonCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-emerald-500/10'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30 hover:scale-[1.02]'
            }`}
          >
            {isLessonCompleted ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Completed (Click to Mark Incomplete)</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Complete (+50 XP)</span>
              </>
            )}
          </button>

          <button
            onClick={() => nextLesson && navigate('course-player', { courseId: course.id, lessonId: nextLesson.id })}
            disabled={!nextLesson}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-white/10"
            title="Next Lesson"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Video Player & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Simulated Video Player */}
          <div className="rounded-2xl glass-panel border border-purple-500/30 overflow-hidden shadow-2xl relative bg-black aspect-video flex flex-col justify-between group">
            {/* Ambient Background Poster */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeLesson.videoThumbnail}
                alt={activeLesson.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isPlaying ? 'opacity-30 blur-sm' : 'opacity-70'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </div>

            {/* Video Overlay Info */}
            <div className="relative z-10 p-5 flex justify-between items-start text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white border border-white/10 font-bold">
                {course.categoryLabel} • {activeLesson.duration}
              </span>
              <div className="flex items-center gap-2">
                {isLessonCompleted && (
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1 font-sans">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Lesson Completed</span>
                  </span>
                )}
                <div className="flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded text-cyan-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>HD 1080p AI SIMULATION</span>
                </div>
              </div>
            </div>

            {/* Big Center Play Button when paused */}
            {!isPlaying && (
              <div
                className="relative z-10 flex flex-col items-center justify-center space-y-2 cursor-pointer"
                onClick={handleTogglePlay}
              >
                <div className="w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 ml-1 fill-white" />
                </div>
                <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                  Click to Play Tutorial
                </span>
              </div>
            )}

            {/* Active Simulation View when playing */}
            {isPlaying && (
              <div className="relative z-10 p-8 text-center space-y-3 pointer-events-none">
                <div className="text-xs font-mono text-purple-300 uppercase tracking-widest animate-pulse">
                  Streaming Nexora Interactive Masterclass Video
                </div>
                <div className="font-heading text-lg font-bold text-white max-w-md mx-auto">
                  {activeLesson.title}
                </div>
                <p className="text-xs text-slate-300 max-w-lg mx-auto">
                  "{activeLesson.transcript.slice(0, 140)}..."
                </p>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-black/95 to-black/20 space-y-2">
              {/* Progress Scrubber */}
              <div
                className="w-full h-1.5 rounded-full bg-white/20 hover:h-2 transition-all cursor-pointer relative"
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const pct = Math.round((clickX / rect.width) * 100);
                  setVideoProgress(pct);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                  style={{ width: `${videoProgress}%` }}
                ></div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-4">
                  <button onClick={handleTogglePlay} className="hover:text-white transition-colors cursor-pointer">
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <Volume2 className="w-4 h-4" />
                  <span className="font-mono text-[11px]">
                    {Math.floor((videoProgress / 100) * 18)}:24 / 18:30
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <button
                    onClick={() => setPlaybackSpeed(s => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : s === 1.5 ? 2 : 1))}
                    className="hover:text-purple-300 px-1.5 py-0.5 rounded bg-white/10 transition-colors"
                  >
                    {playbackSpeed}x
                  </button>
                  <Maximize2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Lesson Navigation Tabs */}
          <div className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden">
            <div className="flex border-b border-white/10 px-4 bg-black/40 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'content'
                    ? 'border-purple-500 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Written Explanation</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'code'
                    ? 'border-purple-500 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Code Snippets</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'border-purple-500 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Quiz & Check</span>
              </button>

              <button
                onClick={() => setActiveTab('assignment')}
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'assignment'
                    ? 'border-purple-500 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Practical Assignment</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'resources'
                    ? 'border-purple-500 text-purple-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FolderDown className="w-3.5 h-3.5" />
                <span>Resources</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6">
              {/* TAB 1: WRITTEN EXPLANATION */}
              {activeTab === 'content' && (
                <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h2 className="font-heading font-bold text-lg text-white">
                      {activeLesson.title}
                    </h2>
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded">
                      Est. Duration: {activeLesson.duration}
                    </span>
                  </div>

                  <div className="whitespace-pre-wrap font-sans space-y-3">
                    {activeLesson.content}
                  </div>

                  {activeLesson.starterPrompt && (
                    <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-purple-300 uppercase">
                          Lesson Starter Master Prompt
                        </span>
                        <button
                          onClick={() => copyCode(activeLesson.starterPrompt!)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </button>
                      </div>
                      <div className="font-mono text-xs text-slate-200 bg-black/60 p-3 rounded-lg border border-white/10">
                        {activeLesson.starterPrompt}
                      </div>
                    </div>
                  )}

                  {/* BOTTOM LESSON COMPLETION CALL TO ACTION */}
                  <div className="mt-8 p-5 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-black to-purple-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        {isLessonCompleted ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Lesson Completed</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-purple-300 font-bold text-sm">
                            <Sparkles className="w-4 h-4" />
                            <span>Ready to finish this module?</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">
                        {isLessonCompleted
                          ? 'You have earned 50 XP for completing this module. Ready for the next lesson?'
                          : 'Marking this lesson complete updates your course progress and awards +50 XP.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={handleToggleActiveLesson}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                          isLessonCompleted
                            ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                            : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                        }`}
                      >
                        {isLessonCompleted ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Mark Incomplete</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Mark as Complete (+50 XP)</span>
                          </>
                        )}
                      </button>

                      {nextLesson && (
                        <button
                          onClick={() => navigate('course-player', { courseId: course.id, lessonId: nextLesson.id })}
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                        >
                          <span>Next Lesson</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CODE SNIPPETS */}
              {activeTab === 'code' && (
                <div className="space-y-4">
                  {activeLesson.codeSnippet ? (
                    <div>
                      <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 rounded-t-xl border border-white/10 border-b-0 text-xs font-mono">
                        <span className="text-cyan-400">{activeLesson.codeSnippet.filename}</span>
                        <button
                          onClick={() => copyCode(activeLesson.codeSnippet!.code)}
                          className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                          <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
                        </button>
                      </div>
                      <pre className="p-4 bg-[#070912] rounded-b-xl border border-white/10 overflow-x-auto text-xs font-mono text-purple-200 leading-relaxed selection:bg-purple-600 selection:text-white">
                        <code>{activeLesson.codeSnippet.code}</code>
                      </pre>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No code snippet required for this introductory module.</p>
                  )}
                </div>
              )}

              {/* TAB 3: QUIZ & CHECK */}
              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  {activeLesson.quiz && activeLesson.quiz.length > 0 ? (
                    <div className="space-y-6">
                      {activeLesson.quiz.map((q, qIdx) => (
                        <div key={q.id} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-3">
                          <div className="font-heading font-semibold text-sm text-white">
                            Question {qIdx + 1}: {q.question}
                          </div>

                          <div className="space-y-2">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = selectedAnswers[q.id] === optIdx;
                              const isCorrect = q.correctIndex === optIdx;

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                                  className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                                    quizSubmitted
                                      ? isCorrect
                                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                                        : isSelected
                                        ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                                        : 'bg-black/30 border-white/5 text-slate-400'
                                      : isSelected
                                      ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                                      : 'bg-black/30 border-white/10 text-slate-300 hover:bg-white/5'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className="p-3 rounded-lg bg-white/5 text-xs text-slate-300 border border-white/10 font-mono">
                              <strong className="text-purple-300">Explanation:</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      ))}

                      {!quizSubmitted ? (
                        <button
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(selectedAnswers).length < activeLesson.quiz.length}
                          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
                        >
                          Submit Quiz Answers
                        </button>
                      ) : (
                        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-heading">
                            Quiz Result: {quizScore}% Correct
                          </span>
                          <button
                            onClick={() => {
                              setQuizSubmitted(false);
                              setSelectedAnswers({});
                            }}
                            className="text-xs text-cyan-400 hover:underline cursor-pointer"
                          >
                            Retake Quiz
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No quiz attached to this lesson.</p>
                  )}
                </div>
              )}

              {/* TAB 4: PRACTICAL ASSIGNMENT */}
              {activeTab === 'assignment' && (
                <div className="space-y-4">
                  {activeLesson.assignment ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                          Task Description
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {activeLesson.assignment.task}
                        </p>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Hint: {activeLesson.assignment.hint}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Submit Your Project Code / GitHub URL
                        </label>
                        <textarea
                          rows={4}
                          value={assignmentSubmission}
                          onChange={e => setAssignmentSubmission(e.target.value)}
                          placeholder="Paste your prompt, code snippet, or repository URL here..."
                          className="w-full px-3.5 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white font-mono focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            if (!assignmentSubmission.trim()) {
                              showToast('Please paste your code or repository link.', 'error');
                              return;
                            }
                            setIsAssignmentSubmitted(true);
                            showToast('Assignment submitted successfully! +25 XP', 'success');
                          }}
                          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm cursor-pointer"
                        >
                          {isAssignmentSubmitted ? 'Update Submission' : 'Submit for Review'}
                        </button>

                        <button
                          onClick={() => setShowSolutionPrompt(!showSolutionPrompt)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
                        >
                          {showSolutionPrompt ? 'Hide Solution Prompt' : 'Reveal Model Master Prompt'}
                        </button>
                      </div>

                      {showSolutionPrompt && (
                        <div className="p-4 rounded-xl bg-black/80 border border-purple-500/30 space-y-2 animate-in fade-in">
                          <span className="text-[11px] font-mono text-purple-300 font-bold uppercase">
                            Official Master Solution Prompt
                          </span>
                          <div className="font-mono text-xs text-slate-300 bg-black/50 p-3 rounded-lg border border-white/10">
                            {activeLesson.assignment.solutionPrompt}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No assignment for this lesson.</p>
                  )}
                </div>
              )}

              {/* TAB 5: RESOURCES */}
              {activeTab === 'resources' && (
                <div className="space-y-3">
                  {course.resources.map(res => (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white">{res.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {res.fileType.toUpperCase()} • {res.size}
                        </div>
                      </div>
                      <button
                        onClick={() => showToast(`Downloaded "${res.title}"`, 'success')}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <FolderDown className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Syllabus Sidebar & Lesson Selector */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl glass-panel border border-purple-500/25 space-y-4">
            <div className="space-y-2 pb-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                  Course Syllabus
                </h3>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  {progressPercent}%
                </span>
              </div>

              {/* Mini sidebar progress bar */}
              <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{completedCount} of {totalLessons} Completed</span>
                {isCourseFullyCompleted && (
                  <button
                    onClick={() => {
                      const cert = claimCertificate(course.id);
                      if (cert) setActiveCertificate(cert);
                    }}
                    className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Award className="w-3 h-3" />
                    <span>View Cert</span>
                  </button>
                )}
              </div>
            </div>

            {/* Individual Lessons List with Direct Interactive Checkbox Toggle */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {course.lessons.map((lesson, idx) => {
                const isCurrent = lesson.id === activeLesson.id;
                const isCompleted = completedLessonIds.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => navigate('course-player', { courseId: course.id, lessonId: lesson.id })}
                    className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                      isCurrent
                        ? 'bg-purple-600/30 border-purple-500 text-white shadow-md shadow-purple-600/20'
                        : isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 hover:bg-emerald-950/30'
                        : 'bg-black/40 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      {/* Interactive Lesson Completion Toggle */}
                      <button
                        type="button"
                        onClick={e => handleToggleSidebarLesson(e, lesson.id)}
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] shrink-0 transition-transform hover:scale-110 cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-500 text-black shadow-sm'
                            : isCurrent
                            ? 'bg-purple-500/40 text-purple-200 border border-purple-400/50'
                            : 'bg-white/10 text-slate-400 hover:border-purple-400/50 hover:text-purple-300'
                        }`}
                        title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                      </button>

                      <div className="truncate">
                        <div className={`truncate font-semibold ${isCurrent ? 'text-white' : ''}`}>
                          {lesson.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                          <span>{lesson.duration}</span>
                          {lesson.quiz && <span>• Quiz</span>}
                          {isCompleted && <span className="text-emerald-400">• Done</span>}
                        </div>
                      </div>
                    </div>

                    {/* Quick status pill */}
                    <div className="shrink-0 flex items-center">
                      {isCompleted ? (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          DONE
                        </span>
                      ) : isCurrent ? (
                        <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded border border-purple-500/30">
                          ACTIVE
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certificate Unlock Banner in Sidebar */}
            {isCourseFullyCompleted && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Course Completed!</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-tight">
                  You finished all {totalLessons} lessons. Claim and print your verified gold-seal credential.
                </p>
                <button
                  onClick={() => {
                    const cert = claimCertificate(course.id);
                    if (cert) setActiveCertificate(cert);
                  }}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  View Official Certificate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal when complete */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </div>
  );
};
