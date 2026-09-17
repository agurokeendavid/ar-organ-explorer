import { getDb } from '../db';
import { LessonProgressRow } from '../selectors';

export function markSectionComplete(
  organId: string,
  sectionIndex: number,
  completedAt: number = Date.now(),
): void {
  getDb().execute(
    'INSERT OR REPLACE INTO lesson_progress (organ_id, section_index, completed_at) VALUES (?, ?, ?);',
    [organId, sectionIndex, completedAt],
  );
}

export function getProgressForOrgan(organId: string): LessonProgressRow[] {
  const result = getDb().execute<LessonProgressRow>(
    'SELECT organ_id, section_index, completed_at FROM lesson_progress WHERE organ_id = ?;',
    [organId],
  );
  return result.rows._array;
}

export function getAllProgress(): LessonProgressRow[] {
  const result = getDb().execute<LessonProgressRow>(
    'SELECT organ_id, section_index, completed_at FROM lesson_progress;',
  );
  return result.rows._array;
}
