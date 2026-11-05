export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'prompt' | 'app' | 'game' | 'web' | 'community' | 'streak';
  unlockedAt?: string;
}

export interface UserStats {
  xp: number;
  streakDays: number;
  completedLessonsCount: number;
  promptsCopiedCount: number;
  communityPostsCount: number;
  certificatesEarnedCount: number;
}

/**
 * Calculates level based on XP.
 * Level 1 = 0-249 XP, Level 2 = 250-499 XP, etc. (250 XP per level)
 */
export function calculateLevel(xp: number): { level: number; currentLevelXp: number; nextLevelXp: number; progressPercent: number } {
  const safeXp = Math.max(0, xp);
  const xpPerLevel = 250;
  const level = Math.floor(safeXp / xpPerLevel) + 1;
  const currentLevelXp = safeXp % xpPerLevel;
  const nextLevelXp = xpPerLevel;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / nextLevelXp) * 100));

  return { level, currentLevelXp, nextLevelXp, progressPercent };
}

/**
 * Calculates XP earned for completing an action.
 */
export function calculateXpForAction(action: 'lesson_complete' | 'quiz_perfect' | 'prompt_copy' | 'project_share' | 'weekly_challenge'): number {
  switch (action) {
    case 'lesson_complete':
      return 50;
    case 'quiz_perfect':
      return 100;
    case 'prompt_copy':
      return 10;
    case 'project_share':
      return 75;
    case 'weekly_challenge':
      return 200;
    default:
      return 10;
  }
}

/**
 * Evaluates which badges a user has unlocked.
 */
export function checkUnlockedBadges(stats: UserStats): string[] {
  const unlocked: string[] = [];

  if (stats.promptsCopiedCount >= 1) unlocked.push('badge-prompt-initiate');
  if (stats.promptsCopiedCount >= 20) unlocked.push('badge-prompt-master');
  if (stats.completedLessonsCount >= 1) unlocked.push('badge-first-lesson');
  if (stats.completedLessonsCount >= 10) unlocked.push('badge-dedicated-scholar');
  if (stats.streakDays >= 7) unlocked.push('badge-streak-warrior');
  if (stats.communityPostsCount >= 1) unlocked.push('badge-community-builder');
  if (stats.certificatesEarnedCount >= 1) unlocked.push('badge-certified-builder');

  return unlocked;
}

/**
 * Formats XP with thousands separator and suffix.
 */
export function formatXp(xp: number): string {
  if (xp >= 1000000) return `${(xp / 1000000).toFixed(1)}M XP`;
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k XP`;
  return `${xp} XP`;
}
