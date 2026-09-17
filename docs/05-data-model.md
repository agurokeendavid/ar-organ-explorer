# 05 — Data model

Offline-first, local only. SQLite for progress and the tutor thread; bundled JSON for content.

## Bundled content

`data/content.json` ships in the app (import it, or seed SQLite from it on first launch).
Shape:

```ts
type Content = {
  organs: Organ[];
  sections: Record<string, Section[]>;   // organId → lesson sections
  quiz: Record<string, Question[]>;      // organId → questions
  tutor: { q: string; a: string }[];     // saved offline answers
  badges: { earned: Badge[]; locked: LockedBadge[] };
};

type Organ = {
  id: 'heart' | 'lungs' | 'digestive' | 'brain' | 'kidneys' | 'skeleton';
  name: string;          // "Heart"
  system: string;        // "Circulatory system"
  model: string;         // "heart.glb"
  blurb: string;
  lessonTitle: string;   // "How the heart works"
  totalLessons: number;
  stats: { value: string; label: string }[];   // exactly 2
  parts: { name: string; description: string; node?: string }[];
};

type Section  = { title: string; body: string; keyword: string; definition: string; figure: string };
type Question = { q: string; options: string[]; answer: number; why: string };
```

Only the heart currently has full lesson sections and quiz questions; the other five systems have
organ, parts and stats. Missing sections/questions must degrade gracefully: the Lessons row still
opens Organ detail, and the lesson/quiz entry shows "Coming soon" instead of an empty reader.

## SQLite schema

```sql
CREATE TABLE lesson_progress (
  organ_id       TEXT NOT NULL,
  section_index  INTEGER NOT NULL,
  completed_at   INTEGER NOT NULL,
  PRIMARY KEY (organ_id, section_index)
);

CREATE TABLE quiz_attempt (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  organ_id    TEXT NOT NULL,
  score       INTEGER NOT NULL,
  total       INTEGER NOT NULL,
  answers     TEXT NOT NULL,          -- JSON array of picked indices
  taken_at    INTEGER NOT NULL
);

CREATE TABLE ar_placement (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  organ_id   TEXT NOT NULL,
  placed_at  INTEGER NOT NULL
);

CREATE TABLE badge (
  key        TEXT PRIMARY KEY,
  earned_at  INTEGER
);

CREATE TABLE tutor_message (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  from_bot  INTEGER NOT NULL,
  text      TEXT NOT NULL,
  sent_at   INTEGER NOT NULL
);

CREATE TABLE app_state (key TEXT PRIMARY KEY, value TEXT NOT NULL);
```

Migrations: numbered files under `src/data/migrations/`, applied by `PRAGMA user_version`.

## Derived values

| UI value | Derivation |
|---|---|
| Home continue ratio ("3/8") | `COUNT(lesson_progress WHERE organ_id=?)` / `organ.totalLessons` |
| Continue bar % | same ratio, floor 4% so an empty bar still reads as a bar |
| Lessons row progress | same, per organ |
| Progress stat: lessons finished | distinct `(organ_id, section_index)` rows |
| Progress stat: quizzes taken | `COUNT(quiz_attempt)` |
| Progress stat: organs in AR | `COUNT(DISTINCT organ_id) FROM ar_placement` |
| Day streak | distinct `date(completed_at)` run ending today, across all activity tables |

## Badge rules

| Key | Condition |
|---|---|
| `first_lesson` | any `lesson_progress` row |
| `quiz_starter` | any `quiz_attempt` |
| `ar_beginner` | any `ar_placement` |
| `streak_3` | streak ≥ 3 |
| `lung_learner` | any `lesson_progress` for `lungs` |
| `curious_mind` | ≥ 5 tutor questions asked |
| `ar_adventurer` | `COUNT(DISTINCT organ_id) FROM ar_placement >= 3` |
| `quiz_ace` | a `quiz_attempt` with `score = total` |
| `full_explorer` | all six systems have every section completed |

Evaluate after each write, in one function, so badge logic has a single home.

## Prototype seed data

The prototype shows Ana mid-way: heart 3/8, lungs 1/6, others 0. Ship the app **empty** —
that state is illustrative. Optionally add a dev-only "seed demo progress" action for
screenshots and the dissertation demo.
