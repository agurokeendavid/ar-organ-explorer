import { BadgeContext, evaluateBadges } from '../badgeRules';

const now = new Date('2026-01-10T12:00:00Z');
const dayMs = 24 * 60 * 60 * 1000;
const daysAgo = (n: number) => now.getTime() - n * dayMs;

const emptyContext: BadgeContext = {
  lessonProgress: [],
  quizAttempts: [],
  arPlacements: [],
  tutorQuestionCount: 0,
  organSectionCounts: { heart: 4, lungs: 6 },
  now,
};

describe('evaluateBadges', () => {
  it('earns nothing with no activity at all', () => {
    const result = evaluateBadges(emptyContext);
    expect(Object.values(result).every(earned => earned === false)).toBe(true);
  });

  it('first_lesson: earned by any lesson_progress row', () => {
    const ctx: BadgeContext = {
      ...emptyContext,
      lessonProgress: [{ organ_id: 'heart', section_index: 0, completed_at: daysAgo(0) }],
    };
    expect(evaluateBadges(ctx).first_lesson).toBe(true);
    expect(evaluateBadges(emptyContext).first_lesson).toBe(false);
  });

  it('quiz_starter: earned by any quiz_attempt', () => {
    const ctx: BadgeContext = {
      ...emptyContext,
      quizAttempts: [{ organ_id: 'heart', score: 1, total: 5, taken_at: daysAgo(0) }],
    };
    expect(evaluateBadges(ctx).quiz_starter).toBe(true);
    expect(evaluateBadges(emptyContext).quiz_starter).toBe(false);
  });

  it('ar_beginner: earned by any ar_placement', () => {
    const ctx: BadgeContext = {
      ...emptyContext,
      arPlacements: [{ organ_id: 'heart', placed_at: daysAgo(0) }],
    };
    expect(evaluateBadges(ctx).ar_beginner).toBe(true);
    expect(evaluateBadges(emptyContext).ar_beginner).toBe(false);
  });

  it('streak_3: earned once the streak reaches 3 consecutive days ending today', () => {
    const shortStreak: BadgeContext = {
      ...emptyContext,
      lessonProgress: [
        { organ_id: 'heart', section_index: 0, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 1, completed_at: daysAgo(1) },
      ],
    };
    const longStreak: BadgeContext = {
      ...emptyContext,
      lessonProgress: [
        { organ_id: 'heart', section_index: 0, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 1, completed_at: daysAgo(1) },
        { organ_id: 'heart', section_index: 2, completed_at: daysAgo(2) },
      ],
    };
    expect(evaluateBadges(shortStreak).streak_3).toBe(false);
    expect(evaluateBadges(longStreak).streak_3).toBe(true);
  });

  it('lung_learner: earned by any lesson_progress for lungs specifically', () => {
    const heartOnly: BadgeContext = {
      ...emptyContext,
      lessonProgress: [{ organ_id: 'heart', section_index: 0, completed_at: daysAgo(0) }],
    };
    const withLungs: BadgeContext = {
      ...emptyContext,
      lessonProgress: [{ organ_id: 'lungs', section_index: 0, completed_at: daysAgo(0) }],
    };
    expect(evaluateBadges(heartOnly).lung_learner).toBe(false);
    expect(evaluateBadges(withLungs).lung_learner).toBe(true);
  });

  it('curious_mind: earned once 5 tutor questions have been asked', () => {
    expect(evaluateBadges({ ...emptyContext, tutorQuestionCount: 4 }).curious_mind).toBe(false);
    expect(evaluateBadges({ ...emptyContext, tutorQuestionCount: 5 }).curious_mind).toBe(true);
  });

  it('ar_adventurer: earned once 3 distinct organs have been placed in AR', () => {
    const two: BadgeContext = {
      ...emptyContext,
      arPlacements: [
        { organ_id: 'heart', placed_at: daysAgo(0) },
        { organ_id: 'lungs', placed_at: daysAgo(0) },
      ],
    };
    const three: BadgeContext = {
      ...emptyContext,
      arPlacements: [
        { organ_id: 'heart', placed_at: daysAgo(0) },
        { organ_id: 'lungs', placed_at: daysAgo(0) },
        { organ_id: 'brain', placed_at: daysAgo(0) },
      ],
    };
    expect(evaluateBadges(two).ar_adventurer).toBe(false);
    expect(evaluateBadges(three).ar_adventurer).toBe(true);
  });

  it('quiz_ace: earned by a quiz_attempt scoring a perfect total', () => {
    const imperfect: BadgeContext = {
      ...emptyContext,
      quizAttempts: [{ organ_id: 'heart', score: 4, total: 5, taken_at: daysAgo(0) }],
    };
    const perfect: BadgeContext = {
      ...emptyContext,
      quizAttempts: [{ organ_id: 'heart', score: 5, total: 5, taken_at: daysAgo(0) }],
    };
    expect(evaluateBadges(imperfect).quiz_ace).toBe(false);
    expect(evaluateBadges(perfect).quiz_ace).toBe(true);
  });

  it('full_explorer: earned only when every known organ has all its sections completed', () => {
    const partial: BadgeContext = {
      ...emptyContext,
      lessonProgress: [
        { organ_id: 'heart', section_index: 0, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 1, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 2, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 3, completed_at: daysAgo(0) },
        // lungs still missing sections
      ],
    };
    const complete: BadgeContext = {
      ...emptyContext,
      lessonProgress: [
        { organ_id: 'heart', section_index: 0, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 1, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 2, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 3, completed_at: daysAgo(0) },
        { organ_id: 'lungs', section_index: 0, completed_at: daysAgo(0) },
        { organ_id: 'lungs', section_index: 1, completed_at: daysAgo(0) },
        { organ_id: 'lungs', section_index: 2, completed_at: daysAgo(0) },
        { organ_id: 'lungs', section_index: 3, completed_at: daysAgo(0) },
        { organ_id: 'lungs', section_index: 4, completed_at: daysAgo(0) },
        { organ_id: 'lungs', section_index: 5, completed_at: daysAgo(0) },
      ],
    };
    expect(evaluateBadges(partial).full_explorer).toBe(false);
    expect(evaluateBadges(complete).full_explorer).toBe(true);
  });

  it('full_explorer: is unreachable for an organ with no authored sections yet', () => {
    const ctx: BadgeContext = {
      ...emptyContext,
      organSectionCounts: { heart: 4, lungs: 0 },
      lessonProgress: [
        { organ_id: 'heart', section_index: 0, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 1, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 2, completed_at: daysAgo(0) },
        { organ_id: 'heart', section_index: 3, completed_at: daysAgo(0) },
      ],
    };
    expect(evaluateBadges(ctx).full_explorer).toBe(false);
  });
});
