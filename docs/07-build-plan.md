# 07 — Build plan

Milestones in dependency order. Each is one agent session: small enough to review, large enough to
run end to end. Commit with the milestone id in the subject.

## M0 — Scaffold
React Native CLI + TypeScript (strict), bare Android project. React Navigation (native-stack +
bottom-tabs), Reanimated, gesture-handler, vector-icons, MMKV, SQLite, NetInfo, permissions.
Bundle Bricolage Grotesque and Source Sans 3 into `assets/fonts`. Verify a debug build on a
device. **Done when** an empty Tabs shell launches with the real fonts loaded.

## M1 — Theme + primitives
`src/theme/tokens.ts` from `docs/01-design-tokens.md` (colors, type styles, spacing, radii,
motion). Then: `Button` (primary/ghost/disabled), `Card` (pressable border-highlight),
`Chip`, `PartChip`, `ProgressBar`, `StatTile`, `IconButton`, `SectionHeader`, `Sheet`,
`Icon` wrapper. **Done when** a dev gallery screen shows every primitive in every state and no
screen file contains a hex literal.

## M2 — Content + data layer
Import `data/content.json` with the types from `docs/05-data-model.md`. SQLite open +
migrations + the tables. Repositories: `lessonProgress`, `quizAttempt`, `arPlacement`,
`badges`, `tutorThread`. Derived selectors for every row in the "Derived values" table.
**Done when** unit tests cover ratios, streak and all nine badge rules.

## M3 — Home, Lessons, Tab bar
The three tab screens with real derived progress. Tab bar per spec, including AR/Quiz acting as
launchers. **Done when** Home and Lessons match the prototype at 412 dp and reflect seeded
progress.

## M4 — Lesson reader + Organ detail
Four-section reader with step bars, keyword card, figure stage placeholder, and section-advance
writes. Organ detail with stat tiles, part chips and swapping description. **Done when** the heart
lesson runs section 1→4 into the quiz, and every organ's detail screen renders from content.

## M5 — Quiz + Results
Question runner, option states, locked-after-check, explanation reveal, score, review list,
retry. Persists an attempt and evaluates badges. **Done when** all five heart questions play
through to Results with correct scoring and the quiz badges fire.

## M6 — 3D viewer
Model loading with bounding-box normalization, node-based labels, tool set, info sheet, part
selection — no camera. This comes **before** AR so label and transform logic is proven without
ARCore in the loop. **Done when** all six models (or placeholders) load, labels attach to named
nodes, and rotate/scale/move behave within the documented caps.

## M7 — AR scan + AR view
Permission flow, ARCore availability check, ViroReact scene, plane detection, all five tracking
states, placement, and the `buttons` control layout reusing M6's label/transform code. Fallback
to the viewer when AR is unavailable. **Done when** an organ anchors on a table, keeps its anchor
through tool and label changes, and a placement is recorded.

## M8 — Progress + Achievements
Stat grid, per-system rows, badge strip, earned grid and locked list, all from M2's selectors.
**Done when** every badge's earned and locked presentation is verified.

## M9 — AI Tutor
Chat UI, suggested chips, offline matcher behind `TutorClient`, persisted thread, offline
composer state and header status. **Done when** the whole screen works in airplane mode and the
remote client is stubbed but unwired.

## M10 — Onboarding + polish pass
Onboarding screen, first-launch flag, permission denial path. Then a pass against
`docs/02-screens.md`: spacing, copy, press states, motion timings, 1.3× font scaling, 5" and 10"
devices, and a full airplane-mode run of every screen. **Done when** each screen's
"definition of done" in `AGENTS.md` holds.

## Out of scope for v1
Backend, accounts, sync, online tutor model, iOS, two-pane tablet layouts, lesson search,
teacher/parent dashboard, audio narration. Do not start these without an explicit task.
