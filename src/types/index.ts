export type CourseCategory = 'app' | 'game' | 'web' | 'prompt';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseResource {
  id: string;
  title: string;
  fileType: 'pdf' | 'zip' | 'figma' | 'code';
  size: string;
  downloadUrl: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'project' | 'quiz' | 'prompt-lab';
  videoThumbnail: string;
  transcript: string;
  content: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  starterPrompt?: string;
  quiz?: QuizQuestion[];
  assignment?: {
    task: string;
    hint: string;
    solutionPrompt: string;
  };
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: CourseCategory;
  categoryLabel: string;
  level: CourseLevel;
  duration: string;
  rating: number;
  reviewCount: number;
  isPro: boolean;
  thumbnail: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  tagline: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  lessons: Lesson[];
  resources: CourseResource[];
  tags: string[];
}

export type PromptCategory =
  | 'Website Development'
  | 'Mobile App Development'
  | 'Game Development'
  | 'Logo Design'
  | 'Graphic Design'
  | 'Business'
  | 'Animation'
  | 'AI Image Generation';

export interface PromptItem {
  id: string;
  title: string;
  category: PromptCategory;
  description: string;
  promptText: string;
  tags: string[];
  tokens: number;
  targetTools: string[];
  isPro: boolean;
  copiedCount: number;
  author: string;
}

export interface AITool {
  id: string;
  name: string;
  category: 'Code Assistant' | 'Full-Stack App Generator' | 'Game & 3D' | 'UI/UX Design' | 'Image & Asset' | 'Audio & Voice';
  description: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  url: string;
  featured: boolean;
  recommendedCourseId?: string;
  iconName: string;
}

export interface CommunityComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    isPro: boolean;
  };
  createdAt: string;
  title: string;
  category: 'Showcase' | 'Discussion' | 'Question' | 'Prompt Tip' | 'Tutorial';
  content: string;
  tags: string[];
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  comments: CommunityComment[];
  projectUrl?: string;
  imageUrl?: string;
  reported?: boolean;
}

export interface UserCertificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  studentName: string;
  certificateId: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'admin';
  isPro: boolean;
  joinedAt: string;
  title: string;
  bio: string;
  xp: number;
  streakDays: number;
  completedLessonsCount: number;
  promptsCopiedCount: number;
  communityPostsCount: number;
  certificatesEarnedCount: number;
  enrolledCourseIds: string[];
  savedPromptIds: string[];
  courseProgress: Record<string, { completedLessonIds: string[]; lastLessonId?: string }>;
  certificates: UserCertificate[];
  unlockedBadgeIds: string[];
}

export interface PlatformAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  tag: 'Update' | 'Challenge' | 'Masterclass' | 'Feature';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  country: string;
  isPro: boolean;
  badge: string;
}
