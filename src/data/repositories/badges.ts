import { getDb } from '../db';
import { content } from '../content';
import { BadgeKey, evaluateBadges } from '../badgeRules';
import { getAllArPlacements } from './arPlacement';
import { getAllProgress } from './lessonProgress';
import { getAllQuizAttempts } from './quizAttempt';
import { countUserQuestions } from './tutorThread';

export function getEarnedBadgeKeys(): string[] {
  const result = getDb().execute<{ key: string }>(
    'SELECT key FROM badge WHERE earned_at IS NOT NULL;',
  );
  return result.rows._array.map(row => row.key);
}

function markBadgeEarned(key: string, earnedAt: number): void {
  getDb().execute('INSERT OR REPLACE INTO badge (key, earned_at) VALUES (?, ?);', [
    key,
    earnedAt,
  ]);
}

/**
 * Single home for badge evaluation, per docs/05-data-model.md: call this
 * after every write to lesson_progress, quiz_attempt, ar_placement or
 * tutor_message so newly-earned badges get persisted immediately.
 */
export function evaluateAndPersistBadges(now: number = Date.now()): BadgeKey[] {
  const organSectionCounts = Object.fromEntries(
    content.organs.map(organ => [organ.id, content.sections[organ.id]?.length ?? 0]),
  );

  const results = evaluateBadges({
    lessonProgress: getAllProgress(),
    quizAttempts: getAllQuizAttempts(),
    arPlacements: getAllArPlacements(),
    tutorQuestionCount: countUserQuestions(),
    organSectionCounts,
    now: new Date(now),
  });

  const alreadyEarned = new Set(getEarnedBadgeKeys());
  const newlyEarned: BadgeKey[] = [];

  for (const [key, earned] of Object.entries(results) as [BadgeKey, boolean][]) {
    if (earned && !alreadyEarned.has(key)) {
      markBadgeEarned(key, now);
      newlyEarned.push(key);
    }
  }

  return newlyEarned;
}
