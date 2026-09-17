import {
  ArPlacementRow,
  LessonProgressRow,
  QuizAttemptRow,
  getDayStreak,
  getOrgansInArCount,
} from './selectors';

export type BadgeKey =
  | 'first_lesson'
  | 'quiz_starter'
  | 'ar_beginner'
  | 'streak_3'
  | 'lung_learner'
  | 'curious_mind'
  | 'ar_adventurer'
  | 'quiz_ace'
  | 'full_explorer';

export type BadgeContext = {
  lessonProgress: LessonProgressRow[];
  quizAttempts: QuizAttemptRow[];
  arPlacements: ArPlacementRow[];
  tutorQuestionCount: number;
  /** Every organ id the app knows about, with the authored section count for that organ. */
  organSectionCounts: Record<string, number>;
  now?: Date;
};

function isFullyExplored(ctx: BadgeContext): boolean {
  const organIds = Object.keys(ctx.organSectionCounts);
  if (organIds.length === 0) {
    return false;
  }

  return organIds.every(organId => {
    const required = ctx.organSectionCounts[organId];
    if (!required) {
      return false;
    }
    const completed = new Set(
      ctx.lessonProgress.filter(row => row.organ_id === organId).map(row => row.section_index),
    ).size;
    return completed >= required;
  });
}

export function evaluateBadges(ctx: BadgeContext): Record<BadgeKey, boolean> {
  const activityTimestamps = [
    ...ctx.lessonProgress.map(row => row.completed_at),
    ...ctx.quizAttempts.map(row => row.taken_at),
    ...ctx.arPlacements.map(row => row.placed_at),
  ];
  const streak = getDayStreak(activityTimestamps, ctx.now);

  return {
    first_lesson: ctx.lessonProgress.length > 0,
    quiz_starter: ctx.quizAttempts.length > 0,
    ar_beginner: ctx.arPlacements.length > 0,
    streak_3: streak >= 3,
    lung_learner: ctx.lessonProgress.some(row => row.organ_id === 'lungs'),
    curious_mind: ctx.tutorQuestionCount >= 5,
    ar_adventurer: getOrgansInArCount(ctx.arPlacements) >= 3,
    quiz_ace: ctx.quizAttempts.some(row => row.score === row.total),
    full_explorer: isFullyExplored(ctx),
  };
}
