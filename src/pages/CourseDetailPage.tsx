import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import {
  Play,
  Clock,
  Star,
  CheckCircle2,
  FileText,
  Download,
  Share2,
  ArrowRight,
  ShieldCheck,
  Award,
  Lock,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { courses, selectedCourseId, user, navigate, enrollCourse, showToast } = useApp();
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  if (!course) return null;

  const isEnrolled = user?.enrolledCourseIds.includes(course.id);
  const progress = user?.courseProgress[course.id];
  const completedCount = progress?.completedLessonIds.length || 0;
  const progressPercent = Math.round((completedCount / course.lessons.length) * 100);

  const handleStartLesson = (lessonId: string) => {
    if (!isEnrolled) {
      enrollCourse(course.id);
    }
    navigate('course-player', { courseId: course.id, lessonId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Course Hero Banner */}
      <div className="rounded-3xl glass-panel border border-purple-500/25 p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase">
                {course.categoryLabel}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                {course.level} Level
              </span>
              {course.isPro && (
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold">
                  NEXORA PRO
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
              {course.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {course.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium pt-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.rating}</span>
                <span className="text-slate-400 font-normal">({course.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{course.duration} curriculum</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>{course.lessons.length} complete lessons</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Award className="w-4 h-4" />
                <span>Verified Certificate</span>
              </div>
            </div>

            {/* Instructor Pill */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40"
              />
              <div>
                <div className="text-xs font-bold text-white">{course.instructor.name}</div>
                <div className="text-[11px] text-slate-400">{course.instructor.role}</div>
              </div>
            </div>
          </div>

          {/* Right Action / Preview Card */}
          <div className="p-6 rounded-2xl bg-black/60 border border-purple-500/30 flex flex-col justify-between space-y-6">
            <div className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer" onClick={() => handleStartLesson(course.lessons[0]?.id)}>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-white" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/80 text-white px-2 py-0.5 rounded">
                Course Preview Available
              </div>
            </div>

            {isEnrolled ? (
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-purple-300">Your Completion</span>
                  <span className="text-cyan-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => handleStartLesson(progress?.lastLessonId || course.lessons[0]?.id)}
                  className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/25 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Continue Where You Left Off</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => enrollCourse(course.id)}
                  className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <span>Enroll in this Masterclass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-center text-[11px] text-slate-400 font-mono">
                  {course.isPro ? 'Included with Nexora Pro Membership' : 'Free Access for All Academy Members'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content & Syllabus Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Syllabus & Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Learning Objectives */}
          <div className="p-8 rounded-2xl glass-card space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">
              Learning Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Syllabus Accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Curriculum & Lessons
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {course.lessons.length} structured modules • Video tutorials & practical prompt assignments
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {course.lessons.map((lesson, idx) => {
                const isCompleted = progress?.completedLessonIds.includes(lesson.id);
                const isExpanded = expandedLessonId === lesson.id;

                return (
                  <div
                    key={lesson.id}
                    className="rounded-xl glass-card overflow-hidden border border-white/10"
                  >
                    <div
                      onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                            isCompleted
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : idx + 1}
                        </div>

                        <div>
                          <div className="font-heading font-semibold text-sm text-white">
                            {lesson.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                            <span>{lesson.duration}</span>
                            <span>•</span>
                            <span>Interactive Video & Sandbox</span>
                            {lesson.quiz && (
                              <>
                                <span>•</span>
                                <span className="text-purple-300">Quiz Included</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleStartLesson(lesson.id);
                          }}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 flex items-center gap-1 transition-colors"
                        >
                          <Play className="w-3 h-3 fill-purple-300" />
                          <span>{isCompleted ? 'Review' : 'Start'}</span>
                        </button>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 pt-2 border-t border-white/5 bg-black/40 space-y-3 text-xs text-slate-300">
                        <p>{lesson.transcript.slice(0, 200)}...</p>
                        {lesson.starterPrompt && (
                          <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-purple-300">
                            <strong>Starter Prompt:</strong> {lesson.starterPrompt}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Prerequisites & Downloadable Materials */}
        <div className="space-y-6">
          {/* Prerequisites */}
          <div className="p-6 rounded-2xl glass-card space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Prerequisites
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {course.prerequisites.map((prereq, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Downloadable Resources */}
          <div className="p-6 rounded-2xl glass-card space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Included Resources
            </h4>
            <div className="space-y-2">
              {course.resources.map(res => (
                <div
                  key={res.id}
                  className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-semibold text-white">{res.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {res.fileType.toUpperCase()} • {res.size}
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Downloaded "${res.title}"`, 'success')}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 transition-colors"
                    title="Download resource"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Nexora Credential Guarantee */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 to-black/60 border border-purple-500/25 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 font-mono uppercase">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Nexora Certified</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete all lessons, quizzes, and practical assignments to unlock your official verified certificate for your LinkedIn and developer resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
