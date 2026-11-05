import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateLevel, calculateXpForAction, checkUnlockedBadges, formatXp } from './gamification.js';
import { calculatePlanCost, BASE_PLANS } from './pricing.js';
import { calculateCourseProgress, isEligibleForCertificate, getNextLessonId } from './courseProgress.js';

test('gamification level calculation progresses reliably', () => {
  const l1 = calculateLevel(0);
  assert.equal(l1.level, 1);
  assert.equal(l1.progressPercent, 0);

  const l2 = calculateLevel(250);
  assert.equal(l2.level, 2);
  assert.equal(l2.currentLevelXp, 0);

  const midway = calculateLevel(375);
  assert.equal(midway.level, 2);
  assert.equal(midway.progressPercent, 50);
});

test('xp calculation and formatting works as expected', () => {
  assert.equal(calculateXpForAction('lesson_complete'), 50);
  assert.equal(calculateXpForAction('quiz_perfect'), 100);
  assert.equal(calculateXpForAction('prompt_copy'), 10);

  assert.equal(formatXp(450), '450 XP');
  assert.equal(formatXp(1500), '1.5k XP');
});

test('badge unlocking detects student milestones', () => {
  const emptyBadges = checkUnlockedBadges({
    xp: 0,
    streakDays: 0,
    completedLessonsCount: 0,
    promptsCopiedCount: 0,
    communityPostsCount: 0,
    certificatesEarnedCount: 0,
  });
  assert.equal(emptyBadges.length, 0);

  const activeBadges = checkUnlockedBadges({
    xp: 600,
    streakDays: 7,
    completedLessonsCount: 1,
    promptsCopiedCount: 25,
    communityPostsCount: 2,
    certificatesEarnedCount: 1,
  });
  assert.ok(activeBadges.includes('badge-prompt-initiate'));
  assert.ok(activeBadges.includes('badge-prompt-master'));
  assert.ok(activeBadges.includes('badge-first-lesson'));
  assert.ok(activeBadges.includes('badge-streak-warrior'));
  assert.ok(activeBadges.includes('badge-certified-builder'));
});

test('pricing math correctly computes USD and NGN with savings', () => {
  const monthlyPro = calculatePlanCost('pro', 'monthly', 'USD');
  assert.equal(monthlyPro.amount, 29);
  assert.equal(monthlyPro.formatted, '$29');

  const yearlyPro = calculatePlanCost('pro', 'yearly', 'USD');
  assert.equal(yearlyPro.amount, 249);
  assert.equal(yearlyPro.savingsUsd, 29 * 12 - 249); // $99 savings

  const ngnMonthly = calculatePlanCost('pro', 'monthly', 'NGN');
  assert.equal(ngnMonthly.amount, 29 * 1550);
  assert.ok(ngnMonthly.formatted.includes('₦'));
});

test('course progress and certificate eligibility logic handles edge cases', () => {
  assert.equal(calculateCourseProgress(0, []), 0);
  assert.equal(calculateCourseProgress(5, ['l1', 'l2']), 40);
  assert.equal(calculateCourseProgress(4, ['l1', 'l2', 'l3', 'l4']), 100);

  assert.equal(isEligibleForCertificate(4, ['l1', 'l2']), false);
  assert.equal(isEligibleForCertificate(4, ['l1', 'l2', 'l3', 'l4']), true);

  const allLessons = ['les-1', 'les-2', 'les-3'];
  assert.equal(getNextLessonId(allLessons, ['les-1']), 'les-2');
  assert.equal(getNextLessonId(allLessons, ['les-1', 'les-2']), 'les-3');
});
