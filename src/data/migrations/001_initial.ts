export const version = 1;

export const statements = [
  `CREATE TABLE lesson_progress (
    organ_id       TEXT NOT NULL,
    section_index  INTEGER NOT NULL,
    completed_at   INTEGER NOT NULL,
    PRIMARY KEY (organ_id, section_index)
  );`,
  `CREATE TABLE quiz_attempt (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    organ_id    TEXT NOT NULL,
    score       INTEGER NOT NULL,
    total       INTEGER NOT NULL,
    answers     TEXT NOT NULL,
    taken_at    INTEGER NOT NULL
  );`,
  `CREATE TABLE ar_placement (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    organ_id   TEXT NOT NULL,
    placed_at  INTEGER NOT NULL
  );`,
  `CREATE TABLE badge (
    key        TEXT PRIMARY KEY,
    earned_at  INTEGER
  );`,
  `CREATE TABLE tutor_message (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    from_bot  INTEGER NOT NULL,
    text      TEXT NOT NULL,
    sent_at   INTEGER NOT NULL
  );`,
  `CREATE TABLE app_state (key TEXT PRIMARY KEY, value TEXT NOT NULL);`,
];
