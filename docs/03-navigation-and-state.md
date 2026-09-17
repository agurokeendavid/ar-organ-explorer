# 03 — Navigation and state

## Route map

```
RootStack (native-stack, headers off)
├─ Onboarding              (first launch only; MMKV flag `onboarding.done`)
├─ Tabs (bottom-tabs)
│   ├─ HomeTab      → Home
│   ├─ LessonsTab   → Lessons
│   ├─ ARTab        → pushes ARScan on the root stack (tab is a launcher, not a screen)
│   ├─ QuizTab      → pushes Quiz on the root stack for the active system
│   └─ MeTab        → Progress
├─ Lesson        { organId, sectionIndex? }
├─ OrganDetail   { organId, partName? }
├─ ARScan        { organId }
├─ ARView        { organId, partName }
├─ Viewer        { organId, partName? }
├─ Quiz          { organId }
├─ Results       { organId, answers }
├─ Achievements
└─ Tutor
```

Back behavior in the prototype is simplified (most screens return Home). In the app use the real
stack: `ARView → ARScan`, `Results → Lessons` (Quiz is removed from the stack after results),
everything else `goBack()`. Android hardware back must follow the same rules; on ARView it
should release the AR session before popping.

## Screen state

Per-screen local state (`useState`/`useReducer`), matching the prototype:

| Screen | State |
|---|---|
| Lesson | `sectionIndex: 0..3` |
| OrganDetail / ARView / Viewer | `selectedPart: string` (defaults to `organ.parts[0].name`) |
| ARView / Viewer | `tool: 'rotate' \| 'scale' \| 'move'`, `labelsVisible: boolean` (default true) |
| ARScan | `tracking: 'searching' \| 'found' \| 'lost' \| 'dark' \| 'unsupported'` |
| Quiz | `questionIndex`, `picked: number \| null`, `checked: boolean`, `answers: number[]` |
| Tutor | `messages: { fromBot: boolean; text: string }[]` |

## Shared state

Keep it small. One context or Zustand store:

- `activeOrganId` — what the AR and Quiz tabs act on. Set whenever the user opens an organ or
  lesson. Default `heart`.
- `connectivity` — from NetInfo, **display only**. Drives the tutor status line and composer
  state. Never gates navigation or content.
- `progress` — read model over SQLite (per-system `done`/`total`, quiz scores, AR placements,
  streak). Invalidate after each write.

## Key transitions

| Trigger | Effect |
|---|---|
| "Allow camera" / "Skip" | set `onboarding.done`, request permission (allow only), reset to Tabs |
| Home continue card | `Lesson { organId: activeOrgan, sectionIndex: lastSection }` |
| Organ tile / lessons row | `OrganDetail { organId, partName: firstPart }`, set `activeOrganId` |
| Lesson "Next section" | `sectionIndex + 1`; write `lesson_progress` |
| Lesson "Take the quiz" | `Quiz { organId }` with fresh state |
| Quiz "Check answer" | `checked = true`, append `picked` to `answers` |
| Quiz next / see results | advance, or `Results` (replace Quiz in the stack) and write `quiz_attempt` |
| "Try again" | `Quiz` with `questionIndex 0`, `answers []` |
| AR place | `ARView { organId, partName: firstPart }`; write `ar_placement` |
| Label / part chip tap | `selectedPart`, info sheet content follows |
| Reset in AR | tool → `rotate`, transform → default, part → first |
| Tutor suggested chip | append user message + saved answer; persist the thread |

## Progress writes

Write on completion, not on mount: a lesson section when the user advances past it, a quiz attempt
when results render, an AR placement when the model anchors. All writes are local and synchronous
enough to be fire-and-forget; never block the UI on them.
