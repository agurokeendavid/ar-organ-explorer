import {
  getContinueBarPercent,
  getContinueRatio,
  getDayStreak,
  getLessonsFinishedCount,
  getOrgansInArCount,
  getQuizzesTakenCount,
} from '../selectors';

const dayMs = 24 * 60 * 60 * 1000;

function timestampFor(date: Date, daysAgo: number): number {
  return date.getTime() - daysAgo * dayMs;
}

describe('getContinueRatio', () => {
  it('counts distinct sections completed for the given organ', () => {
    const rows = [
      { organ_id: 'heart', section_index: 0, completed_at: 1 },
      { organ_id: 'heart', section_index: 1, completed_at: 2 },
      { organ_id: 'heart', section_index: 1, completed_at: 3 }, // re-completed, not double counted
      { organ_id: 'lungs', section_index: 0, completed_at: 4 },
    ];

    expect(getContinueRatio('heart', rows, 8)).toEqual({ completed: 2, total: 8, ratio: 0.25 });
  });

  it('returns zero ratio when the organ has no progress', () => {
    expect(getContinueRatio('heart', [], 8)).toEqual({ completed: 0, total: 8, ratio: 0 });
  });

  it('does not divide by zero when totalLessons is zero', () => {
    expect(getContinueRatio('heart', [], 0)).toEqual({ completed: 0, total: 0, ratio: 0 });
  });
});

describe('getContinueBarPercent', () => {
  it('floors an empty ratio at 4% so the bar still reads as a bar', () => {
    expect(getContinueBarPercent(0)).toBe(4);
  });

  it('floors a very small ratio at 4%', () => {
    expect(getContinueBarPercent(0.01)).toBe(4);
  });

  it('passes through a ratio already above the floor', () => {
    expect(getContinueBarPercent(0.5)).toBe(50);
  });
});

describe('getLessonsFinishedCount', () => {
  it('counts distinct organ/section pairs across all organs', () => {
    const rows = [
      { organ_id: 'heart', section_index: 0, completed_at: 1 },
      { organ_id: 'heart', section_index: 0, completed_at: 2 }, // duplicate
      { organ_id: 'heart', section_index: 1, completed_at: 3 },
      { organ_id: 'lungs', section_index: 0, completed_at: 4 },
    ];

    expect(getLessonsFinishedCount(rows)).toBe(3);
  });
});

describe('getQuizzesTakenCount', () => {
  it('counts every attempt row', () => {
    const rows = [
      { organ_id: 'heart', score: 5, total: 5, taken_at: 1 },
      { organ_id: 'heart', score: 3, total: 5, taken_at: 2 },
    ];

    expect(getQuizzesTakenCount(rows)).toBe(2);
  });
});

describe('getOrgansInArCount', () => {
  it('counts distinct organs placed in AR', () => {
    const rows = [
      { organ_id: 'heart', placed_at: 1 },
      { organ_id: 'heart', placed_at: 2 },
      { organ_id: 'lungs', placed_at: 3 },
    ];

    expect(getOrgansInArCount(rows)).toBe(2);
  });
});

describe('getDayStreak', () => {
  const now = new Date('2026-01-10T12:00:00Z');

  it('is zero with no activity', () => {
    expect(getDayStreak([], now)).toBe(0);
  });

  it('is zero when the most recent activity was not today', () => {
    expect(getDayStreak([timestampFor(now, 1)], now)).toBe(0);
  });

  it('counts a single day when activity happened only today', () => {
    expect(getDayStreak([timestampFor(now, 0)], now)).toBe(1);
  });

  it('counts a consecutive run of days ending today', () => {
    const timestamps = [0, 1, 2].map(daysAgo => timestampFor(now, daysAgo));
    expect(getDayStreak(timestamps, now)).toBe(3);
  });

  it('stops counting at the first gap', () => {
    const timestamps = [timestampFor(now, 0), timestampFor(now, 1), timestampFor(now, 3)];
    expect(getDayStreak(timestamps, now)).toBe(2);
  });
});
