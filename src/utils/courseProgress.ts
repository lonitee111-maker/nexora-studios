export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  quizScore?: number;
}

export interface CourseProgressRecord {
  courseId: string;
  enrolledAt: string;
  lastAccessedLessonId?: string;
  completedLessonIds: string[];
  certificateIssued?: boolean;
}

/**
 * Calculates progress percentage for a course.
 */
export function calculateCourseProgress(totalLessons: number, completedLessonIds: string[]): number {
  if (totalLessons <= 0) return 0;
  const count = completedLessonIds.length;
  return Math.min(100, Math.round((count / totalLessons) * 100));
}

/**
 * Checks if a user is eligible for a course certificate.
 */
export function isEligibleForCertificate(totalLessons: number, completedLessonIds: string[]): boolean {
  if (totalLessons === 0) return false;
  return completedLessonIds.length >= totalLessons;
}

/**
 * Determines the next lesson ID the user should continue with.
 */
export function getNextLessonId(allLessonIds: string[], completedLessonIds: string[]): string | null {
  for (const id of allLessonIds) {
    if (!completedLessonIds.includes(id)) {
      return id;
    }
  }
  return allLessonIds[0] || null;
}
