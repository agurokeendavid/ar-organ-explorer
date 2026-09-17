import { getDb } from '../db';
import { QuizAttemptRow } from '../selectors';

export function recordQuizAttempt(
  organId: string,
  score: number,
  total: number,
  answers: number[],
  takenAt: number = Date.now(),
): void {
  getDb().execute(
    'INSERT INTO quiz_attempt (organ_id, score, total, answers, taken_at) VALUES (?, ?, ?, ?, ?);',
    [organId, score, total, JSON.stringify(answers), takenAt],
  );
}

export function getQuizAttemptsForOrgan(organId: string): QuizAttemptRow[] {
  const result = getDb().execute<QuizAttemptRow>(
    'SELECT organ_id, score, total, taken_at FROM quiz_attempt WHERE organ_id = ?;',
    [organId],
  );
  return result.rows._array;
}

export function getAllQuizAttempts(): QuizAttemptRow[] {
  const result = getDb().execute<QuizAttemptRow>(
    'SELECT organ_id, score, total, taken_at FROM quiz_attempt;',
  );
  return result.rows._array;
}
