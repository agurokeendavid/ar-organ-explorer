import { getDb } from '../db';
import { ArPlacementRow } from '../selectors';

export function recordArPlacement(organId: string, placedAt: number = Date.now()): void {
  getDb().execute('INSERT INTO ar_placement (organ_id, placed_at) VALUES (?, ?);', [
    organId,
    placedAt,
  ]);
}

export function getAllArPlacements(): ArPlacementRow[] {
  const result = getDb().execute<ArPlacementRow>('SELECT organ_id, placed_at FROM ar_placement;');
  return result.rows._array;
}
