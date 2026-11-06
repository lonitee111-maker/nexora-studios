import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  PromptItem,
  AITool,
  CommunityPost,
  LeaderboardEntry,
  PlatformAnnouncement,
  UserProfile,
  UserCertificate,
  BankAccountDetail,
  PaymentReceipt
} from '../types/index.js';
import {
  INITIAL_COURSES,
  INITIAL_PROMPTS,
  INITIAL_AI_TOOLS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_LEADERBOARD,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_BADGES,
  OFFICIAL_BANK_ACCOUNTS,
  INITIAL_RECEIPTS
} from '../data/mockData.js';
import { calculateXpForAction, checkUnlockedBadges } from '../utils/gamification.js';
import { isEligibleForCertificate } from '../utils/courseProgress.js';

export type NavigationPage =
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'course-player'
  | 'category-app'
  | 'category-game'
  | 'category-web'
  | 'category-prompt'
  | 'prompt-library'
  | 'tools-directory'
  | 'dashboard'
  | 'admin'
  | 'community'
  | 'about'
  | 'contact'
  | 'login'
  | 'pricing';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  user: UserProfile | null;
  courses: Course[];
  prompts: PromptItem[];
  tools: AITool[];
  communityPosts: CommunityPost[];
  leaderboard: LeaderboardEntry[];
  announcements: PlatformAnnouncement[];
  bankAccounts: BankAccountDetail[];
  receipts: PaymentReceipt[];
  activePage: NavigationPage;
  selectedCourseId: string | null;
  selectedLessonId: string | null;
  selectedPromptCategory: string | null;
  isAssistantOpen: boolean;
  isReceiptModalOpen: boolean;
  toasts: ToastMessage[];

  // Navigation & View Actions
  navigate: (page: NavigationPage, params?: { courseId?: string; lessonId?: string; promptCategory?: string }) => void;
  setAssistantOpen: (open: boolean) => void;
  setReceiptModalOpen: (open: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Student Actions
  enrollCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string, quizScore?: number) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  copyPrompt: (prompt: PromptItem) => void;
  toggleSavePrompt: (promptId: string) => void;
  claimCertificate: (courseId: string) => UserCertificate | null;
  upgradeToPro: (plan: 'pro' | 'team', reference?: string) => void;
  submitReceipt: (receiptData: {
    studentName: string;
    studentEmail: string;
    plan: PaymentReceipt['plan'];
    amount: number;
    currency: string;
    bankName: string;
    senderAccountName: string;
    transactionReference: string;
    receiptImage?: string;
    notes?: string;
  }) => string;

  // Community Actions
  likePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (post: { title: string; category: CommunityPost['category']; content: string; tags: string[]; projectUrl?: string; imageUrl?: string }) => void;
  reportPost: (postId: string) => void;

  // Auth Actions
  switchUser: (role: 'student_pro' | 'student_free' | 'admin' | 'guest') => void;
  login: (email: string, role?: 'student' | 'admin') => void;
  logout: () => void;

  // Admin Actions
  adminAddCourse: (course: Course) => void;
  adminDeleteCourse: (courseId: string) => void;
  adminAddPrompt: (prompt: PromptItem) => void;
  adminPublishAnnouncement: (title: string, content: string, tag: PlatformAnnouncement['tag']) => void;
  approveReceipt: (receiptId: string) => void;
  rejectReceipt: (receiptId: string, reason: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default initial user: Alex Chen (Pro Student)
const DEMO_STUDENT_PRO: UserProfile = {
  id: 'usr-student-pro',
  name: 'Alex Chen',
  email: 'alex.chen@nexora.dev',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  role: 'student',
  isPro: true,
  joinedAt: 'October 2026',
  title: 'AI Mobile & Web Developer',
  bio: 'Learning to build full-stack SaaS and mobile apps with AI. Passionate about prompt architecture and Three.js.',
  xp: 850,
  streakDays: 5,
  completedLessonsCount: 3,
  promptsCopiedCount: 14,
  communityPostsCount: 2,
  certificatesEarnedCount: 1,
  enrolledCourseIds: ['course-ai-app-dev', 'course-ai-web-dev', 'course-prompt-engineering'],
  savedPromptIds: ['pr-web-1', 'pr-app-1', 'pr-game-1'],
  courseProgress: {
    'course-ai-app-dev': { completedLessonIds: ['les-app-1', 'les-app-2'], lastLessonId: 'les-app-3' },
    'course-ai-web-dev': { completedLessonIds: ['les-web-1'], lastLessonId: 'les-web-2' },
    'course-prompt-engineering': { completedLessonIds: ['les-prompt-1'], lastLessonId: 'les-prompt-1' }
  },
  certificates: [
    {
      id: 'cert-1',
      courseId: 'course-prompt-engineering',
      courseTitle: 'Prompt Engineering Masterclass: Architecting Intelligence',
      issueDate: 'November 2, 2026',
      studentName: 'Alex Chen',
      certificateId: 'NX-CERT-2026-9842'
    }
  ],
  unlockedBadgeIds: ['badge-prompt-initiate', 'badge-first-lesson', 'badge-certified-builder']
};

const DEMO_STUDENT_FREE: UserProfile = {
  id: 'usr-student-free',
  name: 'Amara Okafor',
  email: 'amara.okafor@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  role: 'student',
  isPro: false,
  joinedAt: 'November 2026',
  title: 'Aspiring AI Developer',
  bio: 'Exploring AI web and game creation from Lagos, Nigeria.',
  xp: 220,
  streakDays: 2,
  completedLessonsCount: 1,
  promptsCopiedCount: 3,
  communityPostsCount: 0,
  certificatesEarnedCount: 0,
  enrolledCourseIds: ['course-ai-app-dev'],
  savedPromptIds: ['pr-web-1'],
  courseProgress: {
    'course-ai-app-dev': { completedLessonIds: ['les-app-1'], lastLessonId: 'les-app-2' }
  },
  certificates: [],
  unlockedBadgeIds: ['badge-prompt-initiate', 'badge-first-lesson']
};

const DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-sarah',
  name: 'Sarah Nexora',
  email: 'sarah@nexorastudios.com',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  role: 'admin',
  isPro: true,
  joinedAt: 'January 2026',
  title: 'Lead Platform Architect & Admin',
  bio: 'Overseeing curriculum design and AI engineering at Nexora Studios.',
  xp: 9990,
  streakDays: 45,
  completedLessonsCount: 25,
  promptsCopiedCount: 88,
  communityPostsCount: 12,
  certificatesEarnedCount: 4,
  enrolledCourseIds: ['course-ai-app-dev', 'course-ai-game-dev', 'course-ai-web-dev', 'course-prompt-engineering'],
  savedPromptIds: ['pr-web-1', 'pr-app-1', 'pr-game-1', 'pr-logo-1', 'pr-img-1'],
  courseProgress: {},
  certificates: [],
  unlockedBadgeIds: ['badge-prompt-initiate', 'badge-prompt-master', 'badge-first-lesson', 'badge-dedicated-scholar', 'badge-streak-warrior', 'badge-community-builder', 'badge-certified-builder']
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nexora_user');
    return saved ? JSON.parse(saved) : DEMO_STUDENT_PRO;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('nexora_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [prompts, setPrompts] = useState<PromptItem[]>(() => {
    const saved = localStorage.getItem('nexora_prompts');
    return saved ? JSON.parse(saved) : INITIAL_PROMPTS;
  });

  const [tools] = useState<AITool[]>(INITIAL_AI_TOOLS);

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('nexora_community');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS;
  });

  const [announcements, setAnnouncements] = useState<PlatformAnnouncement[]>(() => {
    const saved = localStorage.getItem('nexora_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [bankAccounts] = useState<BankAccountDetail[]>(OFFICIAL_BANK_ACCOUNTS);

  const [receipts, setReceipts] = useState<PaymentReceipt[]>(() => {
    const saved = localStorage.getItem('nexora_receipts');
    return saved ? JSON.parse(saved) : INITIAL_RECEIPTS;
  });

  const [leaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);

  const [activePage, setActivePage] = useState<NavigationPage>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('course-ai-app-dev');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('les-app-1');
  const [selectedPromptCategory, setSelectedPromptCategory] = useState<string | null>(null);
  const [isAssistantOpen, setAssistantOpen] = useState(false);
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist state updates to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('nexora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nexora_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nexora_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('nexora_prompts', JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem('nexora_community', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('nexora_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('nexora_receipts', JSON.stringify(receipts));
  }, [receipts]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigate = (
    page: NavigationPage,
    params?: { courseId?: string; lessonId?: string; promptCategory?: string }
  ) => {
    setActivePage(page);
    if (params?.courseId) setSelectedCourseId(params.courseId);
    if (params?.lessonId) setSelectedLessonId(params.lessonId);
    if (params?.promptCategory) setSelectedPromptCategory(params.promptCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enrollCourse = (courseId: string) => {
    if (!user) {
      showToast('Please sign in or select a demo profile to enroll in courses.', 'info');
      setActivePage('login');
      return;
    }

    if (user.enrolledCourseIds.includes(courseId)) {
      showToast('You are already enrolled! Opening course...', 'info');
      navigate('course-detail', { courseId });
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (course?.isPro && !user.isPro) {
      showToast('This course requires a Nexora Pro subscription.', 'info');
      setActivePage('pricing');
      return;
    }

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
        courseProgress: {
          ...prev.courseProgress,
          [courseId]: { completedLessonIds: [], lastLessonId: course?.lessons[0]?.id }
        }
      };
    });

    showToast(`Successfully enrolled in "${course?.title || 'course'}"!`, 'success');
    navigate('course-detail', { courseId });
  };

  const completeLesson = (courseId: string, lessonId: string, quizScore?: number) => {
    if (!user) {
      showToast('Please sign in or select a demo profile to track your progress.', 'info');
      return;
    }

    const currentCourseProgress = user.courseProgress[courseId] || { completedLessonIds: [] };
    const alreadyCompleted = currentCourseProgress.completedLessonIds.includes(lessonId);

    if (alreadyCompleted) {
      showToast('Lesson already marked as complete.', 'info');
      return;
    }

    const newCompleted = [...currentCourseProgress.completedLessonIds, lessonId];
    const earnedXp = calculateXpForAction('lesson_complete') + (quizScore === 100 ? calculateXpForAction('quiz_perfect') : 0);

    const updatedStats = {
      xp: user.xp + earnedXp,
      streakDays: user.streakDays,
      completedLessonsCount: user.completedLessonsCount + 1,
      promptsCopiedCount: user.promptsCopiedCount,
      communityPostsCount: user.communityPostsCount,
      certificatesEarnedCount: user.certificatesEarnedCount,
    };

    const newBadgeIds = checkUnlockedBadges(updatedStats);
    const updatedEnrolled = user.enrolledCourseIds.includes(courseId)
      ? user.enrolledCourseIds
      : [...user.enrolledCourseIds, courseId];

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        xp: updatedStats.xp,
        completedLessonsCount: updatedStats.completedLessonsCount,
        enrolledCourseIds: updatedEnrolled,
        unlockedBadgeIds: Array.from(new Set([...prev.unlockedBadgeIds, ...newBadgeIds])),
        courseProgress: {
          ...prev.courseProgress,
          [courseId]: {
            completedLessonIds: newCompleted,
            lastLessonId: lessonId
          }
        }
      };
    });

    showToast(`Lesson completed! +${earnedXp} XP earned ⚡`, 'success');

    // Check certificate eligibility
    const course = courses.find(c => c.id === courseId);
    if (course && isEligibleForCertificate(course.lessons.length, newCompleted)) {
      claimCertificate(courseId);
    }
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    if (!user) {
      showToast('Please sign in or select a demo profile to track your progress.', 'info');
      return;
    }

    const currentCourseProgress = user.courseProgress[courseId] || { completedLessonIds: [] };
    const isCompleted = currentCourseProgress.completedLessonIds.includes(lessonId);

    if (isCompleted) {
      const newCompleted = currentCourseProgress.completedLessonIds.filter(id => id !== lessonId);
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          completedLessonsCount: Math.max(0, prev.completedLessonsCount - 1),
          courseProgress: {
            ...prev.courseProgress,
            [courseId]: {
              ...currentCourseProgress,
              completedLessonIds: newCompleted
            }
          }
        };
      });
      showToast('Lesson marked as incomplete.', 'info');
    } else {
      completeLesson(courseId, lessonId);
    }
  };

  const copyPrompt = (prompt: PromptItem) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(prompt.promptText).catch(() => {});
      }
    } catch (e) {
      // Ignored for restricted frames/headless
    }

    // Update prompt copiedCount
    setPrompts(prev =>
      prev.map(p => (p.id === prompt.id ? { ...p, copiedCount: p.copiedCount + 1 } : p))
    );

    if (user) {
      const earnedXp = calculateXpForAction('prompt_copy');
      const updatedStats = {
        xp: user.xp + earnedXp,
        streakDays: user.streakDays,
        completedLessonsCount: user.completedLessonsCount,
        promptsCopiedCount: user.promptsCopiedCount + 1,
        communityPostsCount: user.communityPostsCount,
        certificatesEarnedCount: user.certificatesEarnedCount,
      };

      const newBadgeIds = checkUnlockedBadges(updatedStats);

      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          xp: updatedStats.xp,
          promptsCopiedCount: updatedStats.promptsCopiedCount,
          unlockedBadgeIds: Array.from(new Set([...prev.unlockedBadgeIds, ...newBadgeIds]))
        };
      });
      showToast(`Prompt copied to clipboard! +${earnedXp} XP ⚡`, 'success');
    } else {
      showToast('Prompt copied to clipboard!', 'success');
    }
  };

  const toggleSavePrompt = (promptId: string) => {
    if (!user) {
      showToast('Sign in to bookmark prompts to your vault.', 'info');
      return;
    }

    const isSaved = user.savedPromptIds.includes(promptId);
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        savedPromptIds: isSaved
          ? prev.savedPromptIds.filter(id => id !== promptId)
          : [...prev.savedPromptIds, promptId]
      };
    });

    showToast(isSaved ? 'Prompt removed from saved list.' : 'Prompt saved to your personal vault!', 'success');
  };

  const claimCertificate = (courseId: string): UserCertificate | null => {
    if (!user) return null;

    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    const existingCert = user.certificates.find(c => c.courseId === courseId);
    if (existingCert) return existingCert;

    const newCert: UserCertificate = {
      id: `cert-${Date.now()}`,
      courseId,
      courseTitle: course.title,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      studentName: user.name,
      certificateId: `NX-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setUser(prev => {
      if (!prev) return null;
      const updatedCount = prev.certificatesEarnedCount + 1;
      return {
        ...prev,
        certificatesEarnedCount: updatedCount,
        certificates: [...prev.certificates, newCert],
        unlockedBadgeIds: Array.from(new Set([...prev.unlockedBadgeIds, 'badge-certified-builder']))
      };
    });

    showToast(`🎓 Congratulations! Official Certificate issued for "${course.title}"!`, 'success');
    return newCert;
  };

  const upgradeToPro = (plan: 'pro' | 'team', reference?: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        isPro: true,
        title: plan === 'team' ? 'Studio Enterprise Lead' : 'Nexora Pro Architect'
      };
    });
    showToast(`🎉 Welcome to Nexora ${plan === 'team' ? 'Enterprise' : 'Pro'}! Unlimited access unlocked.`, 'success');
  };

  const likePost = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim() || !user) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: user.name,
      avatar: user.avatar,
      text: text.trim(),
      time: 'Just now'
    };

    setCommunityPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, commentsCount: p.commentsCount + 1, comments: [...p.comments, newComment] }
          : p
      )
    );
    showToast('Comment posted!', 'success');
  };

  const createPost = (postData: {
    title: string;
    category: CommunityPost['category'];
    content: string;
    tags: string[];
    projectUrl?: string;
    imageUrl?: string;
  }) => {
    if (!user) {
      showToast('Sign in to share projects with the community.', 'info');
      return;
    }

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: user.name,
        avatar: user.avatar,
        role: user.title,
        isPro: user.isPro
      },
      createdAt: 'Just now',
      title: postData.title,
      category: postData.category,
      content: postData.content,
      tags: postData.tags,
      likes: 1,
      isLiked: true,
      commentsCount: 0,
      comments: [],
      projectUrl: postData.projectUrl,
      imageUrl: postData.imageUrl
    };

    setCommunityPosts(prev => [newPost, ...prev]);

    const earnedXp = calculateXpForAction('project_share');
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        xp: prev.xp + earnedXp,
        communityPostsCount: prev.communityPostsCount + 1,
        unlockedBadgeIds: Array.from(new Set([...prev.unlockedBadgeIds, 'badge-community-builder']))
      };
    });

    showToast(`Project shared with the community! +${earnedXp} XP ⚡`, 'success');
  };

  const reportPost = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, reported: true } : p))
    );
    showToast('Post reported for moderation review. Thank you for keeping Nexora safe.', 'info');
  };

  const switchUser = (role: 'student_pro' | 'student_free' | 'admin' | 'guest') => {
    if (role === 'student_pro') {
      setUser(DEMO_STUDENT_PRO);
      showToast('Switched to Demo Student (Alex Chen - Nexora Pro)', 'info');
    } else if (role === 'student_free') {
      setUser(DEMO_STUDENT_FREE);
      showToast('Switched to Demo Student (Amara Okafor - Free Tier)', 'info');
    } else if (role === 'admin') {
      setUser(DEMO_ADMIN);
      showToast('Switched to Platform Administrator (Sarah Nexora)', 'info');
    } else {
      setUser(null);
      showToast('Logged out to Guest Mode', 'info');
    }
  };

  const login = (email: string, role: 'student' | 'admin' = 'student') => {
    if (role === 'admin' || email.includes('admin') || email.includes('sarah')) {
      setUser(DEMO_ADMIN);
      showToast('Welcome back, Admin Sarah Nexora!', 'success');
    } else {
      const newUser: UserProfile = {
        ...DEMO_STUDENT_PRO,
        email,
        name: email.split('@')[0] || 'Learner'
      };
      setUser(newUser);
      showToast(`Welcome to Nexora AI Academy, ${newUser.name}!`, 'success');
    }
    setActivePage('dashboard');
  };

  const logout = () => {
    setUser(null);
    showToast('You have been signed out.', 'info');
    setActivePage('home');
  };

  const adminAddCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
    showToast(`Course "${newCourse.title}" successfully published!`, 'success');
  };

  const adminDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    showToast('Course removed from catalog.', 'info');
  };

  const adminAddPrompt = (newPrompt: PromptItem) => {
    setPrompts(prev => [newPrompt, ...prev]);
    showToast(`Master Prompt "${newPrompt.title}" added to Prompt Library!`, 'success');
  };

  const adminPublishAnnouncement = (title: string, content: string, tag: PlatformAnnouncement['tag']) => {
    const newAnn: PlatformAnnouncement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      tag,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: user?.name || 'Nexora Studios'
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    showToast('Platform announcement published live!', 'success');
  };

  const submitReceipt = (receiptData: {
    studentName: string;
    studentEmail: string;
    plan: PaymentReceipt['plan'];
    amount: number;
    currency: string;
    bankName: string;
    senderAccountName: string;
    transactionReference: string;
    receiptImage?: string;
    notes?: string;
  }): string => {
    const newReceipt: PaymentReceipt = {
      id: `rcp-${Date.now()}`,
      ...receiptData,
      submittedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      status: 'pending'
    };

    setReceipts(prev => [newReceipt, ...prev]);

    if (user) {
      setUser(prev => prev ? { ...prev, xp: prev.xp + 25 } : null);
    }

    showToast(`Payment receipt submitted! DE PHANTOM & the Admin team will confirm your payment to activate full access. (Ref: ${newReceipt.transactionReference})`, 'success');
    return newReceipt.id;
  };

  const approveReceipt = (receiptId: string) => {
    const target = receipts.find(r => r.id === receiptId);
    if (!target) return;

    setReceipts(prev =>
      prev.map(r =>
        r.id === receiptId
          ? {
              ...r,
              status: 'approved',
              reviewedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
              reviewedBy: 'DE PHANTOM (Lead Admin)'
            }
          : r
      )
    );

    // If the approved student is currently active or logged in, grant Pro status!
    if (user && (user.email === target.studentEmail || user.name.toLowerCase().includes(target.studentName.toLowerCase()) || target.studentName.includes('Amara'))) {
      setUser(prev => prev ? { ...prev, isPro: true, title: 'Nexora Pro Architect' } : null);
    }

    showToast(`🎉 Payment receipt verified! Full Pro Access confirmed & granted to ${target.studentName}.`, 'success');
  };

  const rejectReceipt = (receiptId: string, reason: string) => {
    setReceipts(prev =>
      prev.map(r =>
        r.id === receiptId
          ? {
              ...r,
              status: 'rejected',
              rejectionReason: reason,
              reviewedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
              reviewedBy: 'DE PHANTOM (Lead Admin)'
            }
          : r
      )
    );
    showToast(`Payment receipt marked as rejected: ${reason}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        courses,
        prompts,
        tools,
        communityPosts,
        leaderboard,
        announcements,
        bankAccounts,
        receipts,
        activePage,
        selectedCourseId,
        selectedLessonId,
        selectedPromptCategory,
        isAssistantOpen,
        isReceiptModalOpen,
        toasts,
        navigate,
        setAssistantOpen,
        setReceiptModalOpen,
        showToast,
        removeToast,
        enrollCourse,
        completeLesson,
        toggleLessonComplete,
        copyPrompt,
        toggleSavePrompt,
        claimCertificate,
        upgradeToPro,
        submitReceipt,
        approveReceipt,
        rejectReceipt,
        likePost,
        addComment,
        createPost,
        reportPost,
        switchUser,
        login,
        logout,
        adminAddCourse,
        adminDeleteCourse,
        adminAddPrompt,
        adminPublishAnnouncement
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
