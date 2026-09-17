export type LessonProgressRow = { organ_id: string; section_index: number; completed_at: number };
export type QuizAttemptRow = { organ_id: string; score: number; total: number; taken_at: number };
export type ArPlacementRow = { organ_id: string; placed_at: number };

export type ProgressRatio = { completed: number; total: number; ratio: number };

export function getContinueRatio(
  organId: string,
  progressRows: LessonProgressRow[],
  totalLessons: number,
): ProgressRatio {
  const completed = new Set(
    progressRows.filter(row => row.organ_id === organId).map(row => row.section_index),
  ).size;
  const ratio = totalLessons > 0 ? completed / totalLessons : 0;
  return { completed, total: totalLessons, ratio };
}

export function getContinueBarPercent(ratio: number): number {
  return Math.max(ratio * 100, 4);
}

export function getLessonsFinishedCount(progressRows: LessonProgressRow[]): number {
  const seen = new Set(progressRows.map(row => `${row.organ_id}:${row.section_index}`));
  return seen.size;
}

export function getQuizzesTakenCount(quizAttemptRows: QuizAttemptRow[]): number {
  return quizAttemptRows.length;
}

export function getOrgansInArCount(arPlacementRows: ArPlacementRow[]): number {
  return new Set(arPlacementRows.map(row => row.organ_id)).size;
}

export function toDateKey(timestampMs: number): string {
  const date = new Date(timestampMs);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayStreak(activityTimestamps: number[], now: Date = new Date()): number {
  const dateKeys = new Set(activityTimestamps.map(toDateKey));
  let streak = 0;
  const cursor = new Date(now);

  while (dateKeys.has(toDateKey(cursor.getTime()))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
