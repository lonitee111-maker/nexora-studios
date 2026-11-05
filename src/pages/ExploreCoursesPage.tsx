import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.js';
import { CourseCategory, CourseLevel } from '../types/index.js';
import {
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Code2,
  Gamepad2,
  Globe,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const ExploreCoursesPage: React.FC = () => {
  const { courses, user, navigate, enrollCourse } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'duration'>('popular');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'all' || course.level === selectedLevel;

      const matchesPricing =
        selectedPricing === 'all' ||
        (selectedPricing === 'free' && !course.isPro) ||
        (selectedPricing === 'pro' && course.isPro);

      return matchesSearch && matchesCategory && matchesLevel && matchesPricing;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return b.lessons.length - a.lessons.length;
      return b.reviewCount - a.reviewCount;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedPricing, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-semibold uppercase">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Complete Course Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          Explore AI Masterclasses
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Learn how to build real mobile apps, games, websites, and master prompts with step-by-step video tutorials, code sandboxes, and verified certificates.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-6 rounded-2xl glass-panel border border-purple-500/20 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="md:col-span-2 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, tech stack, or topic..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Pricing Filter */}
          <div>
            <select
              value={selectedPricing}
              onChange={e => setSelectedPricing(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Access Tiers</option>
              <option value="free">Free Courses Only</option>
              <option value="pro">Pro Member Exclusives</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Courses', icon: BookOpen },
              { id: 'app', label: 'AI App Dev', icon: Code2 },
              { id: 'game', label: 'AI Game Dev', icon: Gamepad2 },
              { id: 'web', label: 'AI Website Dev', icon: Globe },
              { id: 'prompt', label: 'Prompt Engineering', icon: Zap }
            ].map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
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

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-black/50 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Curriculum Length</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center rounded-2xl glass-card space-y-3">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No courses match your filter criteria</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query, difficulty level, or category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSelectedPricing('all');
            }}
            className="text-xs font-bold text-purple-400 hover:text-purple-300 underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => {
            const isEnrolled = user?.enrolledCourseIds.includes(course.id);
            const progress = user?.courseProgress[course.id];
            const percent = progress
              ? Math.round((progress.completedLessonIds.length / course.lessons.length) * 100)
              : 0;

            return (
              <div
                key={course.id}
                className="rounded-2xl glass-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail */}
                  <div
                    className="relative h-48 w-full overflow-hidden cursor-pointer"
                    onClick={() => navigate('course-detail', { courseId: course.id })}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a14] via-transparent to-transparent"></div>

                    {/* Badge Chips */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 uppercase">
                        {course.categoryLabel}
                      </span>
                      {course.isPro ? (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-600 text-white">
                          PRO
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-600 text-white">
                          FREE
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 text-xs font-mono px-2 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {course.rating}
                      </span>
                      <span>•</span>
                      <span>{course.reviewCount} reviews</span>
                      <span>•</span>
                      <span className="text-purple-300">{course.level}</span>
                    </div>

                    <h3
                      onClick={() => navigate('course-detail', { courseId: course.id })}
                      className="font-heading font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-300 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress Bar if enrolled */}
                    {isEnrolled && (
                      <div className="mb-4 p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
                        <div className="flex justify-between text-[11px] font-mono mb-1">
                          <span className="text-purple-300">Your Progress</span>
                          <span className="text-cyan-400 font-bold">{percent}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-black/50 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-purple-500/30"
                    />
                    <span className="text-xs text-slate-300 font-medium truncate max-w-[110px]">
                      {course.instructor.name}
                    </span>
                  </div>

                  {isEnrolled ? (
                    <button
                      onClick={() => navigate('course-player', { courseId: course.id, lessonId: course.lessons[0]?.id })}
                      className="text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => enrollCourse(course.id)}
                      className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <span>Enroll Course</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
