import { getDb } from '../db';

export type TutorMessageRow = { id: number; from_bot: number; text: string; sent_at: number };

export function appendMessage(
  text: string,
  fromBot: boolean,
  sentAt: number = Date.now(),
): void {
  getDb().execute('INSERT INTO tutor_message (from_bot, text, sent_at) VALUES (?, ?, ?);', [
    fromBot ? 1 : 0,
    text,
    sentAt,
  ]);
}

export function getThread(): TutorMessageRow[] {
  const result = getDb().execute<TutorMessageRow>(
    'SELECT id, from_bot, text, sent_at FROM tutor_message ORDER BY sent_at ASC;',
  );
  return result.rows._array;
}

export function countUserQuestions(): number {
  const result = getDb().execute<{ count: number }>(
    'SELECT COUNT(*) as count FROM tutor_message WHERE from_bot = 0;',
  );
  return result.rows.item(0)?.count ?? 0;
}
