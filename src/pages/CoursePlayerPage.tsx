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
  RotateCcw,
  Copy,
  Check,
  Send,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CertificateModal } from '../components/certificate/CertificateModal.js';
import { UserCertificate } from '../types/index.js';

export const CoursePlayerPage: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    selectedLessonId,
    user,
    navigate,
    completeLesson,
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

  const courseProgress = user?.courseProgress[course.id];
  const isLessonCompleted = courseProgress?.completedLessonIds.includes(activeLesson.id);

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

  const handleMarkCompleted = () => {
    completeLesson(course.id, activeLesson.id, quizScore || undefined);

    // If this is the last lesson, celebrate!
    const updatedCompleted = [
      ...(courseProgress?.completedLessonIds || []),
      activeLesson.id
    ];

    if (updatedCompleted.length >= course.lessons.length) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
      const cert = claimCertificate(course.id);
      if (cert) setActiveCertificate(cert);
    } else {
      // Auto-advance to next lesson if available
      const nextLesson = course.lessons[currentLessonIndex + 1];
      if (nextLesson) {
        setTimeout(() => {
          navigate('course-player', { courseId: course.id, lessonId: nextLesson.id });
        }, 1200);
      }
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
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-500/20">
        <button
          onClick={() => navigate('course-detail', { courseId: course.id })}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to {course.title}</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-purple-300">
            Lesson {currentLessonIndex + 1} of {course.lessons.length}
          </span>
          <button
            onClick={handleMarkCompleted}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isLessonCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isLessonCompleted ? 'Completed (Click to Re-verify)' : 'Mark Lesson Complete (+50 XP)'}</span>
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
              <div className="flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded text-cyan-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>HD 1080p AI SIMULATION</span>
              </div>
            </div>

            {/* Big Center Play Button when paused */}
            {!isPlaying && (
              <div className="relative z-10 flex flex-col items-center justify-center space-y-2 cursor-pointer" onClick={handleTogglePlay}>
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
                  <button onClick={handleTogglePlay} className="hover:text-white transition-colors">
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
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
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
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
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
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
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
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
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
                className={`py-3.5 px-4 flex items-center gap-1.5 border-b-2 transition-colors whitespace-nowrap ${
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
                <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
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
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20"
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
                          className="flex items-center gap-1 text-slate-300 hover:text-white"
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
                                  className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all ${
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
                          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 transition-colors shadow-sm"
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
                            className="text-xs text-cyan-400 hover:underline"
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
                          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm"
                        >
                          {isAssignmentSubmitted ? 'Update Submission' : 'Submit for Review'}
                        </button>

                        <button
                          onClick={() => setShowSolutionPrompt(!showSolutionPrompt)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10"
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
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 font-semibold flex items-center gap-1 transition-colors"
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
          <div className="p-6 rounded-2xl glass-panel border border-purple-500/25 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                Course Syllabus
              </h3>
              <span className="text-xs font-mono text-cyan-400">
                {courseProgress?.completedLessonIds.length || 0} / {course.lessons.length} Done
              </span>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {course.lessons.map((lesson, idx) => {
                const isCurrent = lesson.id === activeLesson.id;
                const isCompleted = courseProgress?.completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigate('course-player', { courseId: course.id, lessonId: lesson.id })}
                    className={`w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-3 ${
                      isCurrent
                        ? 'bg-purple-600/30 border-purple-500 text-white shadow-sm'
                        : isCompleted
                        ? 'bg-black/40 border-emerald-500/30 text-emerald-200 hover:bg-white/5'
                        : 'bg-black/30 border-white/5 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isCurrent
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="flex-1 truncate">
                      <div className="truncate font-semibold">{lesson.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                        <span>{lesson.duration}</span>
                        {lesson.quiz && <span>• Quiz</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
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
