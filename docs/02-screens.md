# 02 — Screens

13 screens. Values are dp at a 412 × 892 reference. Copy is **verbatim** — ship it as written.
Icon names are Material Symbols Rounded.

A persistent **status bar row** sits above content on every screen: 30 dp tall, 18 dp side padding,
`Source Sans 3 600 11 / #5c6270`; left `9:41`; right `wifi` (or `wifi_off` when offline),
`signal_cellular_alt`, `battery_5_bar` (rotated 90°), `84%` in 10 dp monospace. In the app this
is the real OS status bar — style it `dark-content` on `#f6f7f9`, and `light-content` on AR screens.

---

## 1. Onboarding

**Purpose:** explain the app in one screen and request camera access.

Layout: single column, `padding: 26 24 22`, `gap: 18`, no scroll.

1. **Brand row** — 28 dp `#2f5fd0` square, radius 9, white `accessibility_new` icon 18 dp;
   label "Body Explorer" (`h4`). Gap 9.
2. **Hero stage** — height 250, radius 20, background
   `radial-gradient(120% 100% at 50% 30%, #eef2fb 0%, #f8f9fb 70%)`. Contains a slowly rotating
   heart model. In RN: a static render or a ViroReact/3D preview; a still image is acceptable here.
3. **Headline** (`display`): "See inside the body, right on your desk."
4. **Paragraph** (`body`, `text.secondary`): "Six organ systems, in 3D. Lessons, quizzes and
   progress all work with no internet."
5. **Permission explainer card** — `surface`, 1 dp `border`, radius 16, padding `14 15`, row,
   gap 12: 34 dp `surface.tint` well (radius 11) with `photo_camera` 20 dp `primary`; then
   title "Camera access" (`labelStrong`) + body "Used only for AR mode. Everything else works
   without it." (`bodySm`, `text.secondary`).
6. **Actions** pinned to bottom (`marginTop: auto`, gap 10):
   - Primary, height 54, radius 15, `primary`: **"Allow camera"** → request camera permission
     → Home.
   - Ghost, height 48: **"Skip — use without AR"** → Home, AR entry points then show the
     permission prompt again on first use.

**Permissions screen:** there is no separate route in the prototype — this screen *is* the
permission gate, and the OS dialog is the second step. If permission is denied, AR entry points
show an inline card with the same copy plus a "Open settings" ghost button.

---

## 2. Home

**Purpose:** resume the last lesson and reach AR, tutor and the six systems.

Scrolls. Header `padding: 12 20 6`, row, space-between:
- Left column: "Wednesday" (`labelSm`, `text.muted`), "Hi, Ana" (`h2`).
- Right: 42 dp button, `surface` + `border`, radius 14, `person` 22 dp `primary` → Progress.

Body `padding: 10 20 0`, `gap: 14`:

1. **Continue card** → Lesson. `surface`, border, radius 20, padding 14, row, gap 13.
   74 dp organ thumbnail well (`surface.sunken`, radius 14). Right column gap 6:
   eyebrow "CONTINUE" (`metaStrong`, `primary`), title "How the heart works" (`titleCard`),
   then a progress row: 7 dp track (radius 6, `track`) with 37% `primary` fill + "3/8" (`meta`).
2. **AR card** → AR scan. `dark.surface`, radius 20, padding `16 18`, row, gap 14.
   46 dp `accent.ar` well (radius 14) with white `view_in_ar` 24 dp; "Explore in AR"
   (700/17, white) + "Place an organ on your table" (13.5, `dark.textMuted`); trailing
   `chevron_right` white. Pressed → `dark.pressed`.
3. **Tutor card** → AI Tutor. `surface`, border, radius 20, padding `14 16`, row, gap 13.
   42 dp `surface.tint` well (radius 13) with `smart_toy` 22 dp `primary`; "Ask the Tutor"
   (700/16) + "Answers saved on this device" (13.5, `text.muted`); trailing `chevron_right`
   `text.muted`.
4. **Section header** row: "Organ systems" (`h3`) + "All lessons" (`labelSm`, `primary`) → Lessons.
5. **Organ grid** — 2 columns, gap 12, bottom padding 16. Each tile: `surface`, border,
   radius 18, padding 12, gap 9 — 74 dp tall thumbnail well (radius 12), name (`labelStrong`),
   progress ratio (`meta`, `text.muted`). Tap → Organ detail with that organ and its first part
   selected.

---

## 3. Lessons

**Purpose:** browse all systems and their lesson progress.

Header `padding: 12 20 10`: "Lessons" (`h2`) + "6 systems · 36 lessons" (`meta`, `text.muted`).

Body `padding: 0 20 16`, gap 11:
1. **Search field** (display only in v1) — height 44, radius 14, `surface` + border,
   padding-x 14, `search` icon 20 dp `text.faint` + placeholder "Search lessons…" (15 dp,
   `text.muted`).
2. **Filter chips** row, gap 8: "All" (selected: `primary`, white), "Started", "Finished"
   (`surface` + border, `text.secondary`). Padding `7 15`, radius 11.
3. **System rows** (6) — `surface`, border, radius 18, padding 13, row, gap 13:
   56 dp thumbnail well (radius 13); right column gap 6 with system name (`titleRow`),
   blurb (`bodySm`, `text.body`), and a 6 dp progress track + ratio (`meta`).
   Tap → Organ detail.

Row copy comes from `data/content.json` (`system`, `blurb`, `done`/`total`).

---

## 4. Lesson (reader)

**Purpose:** read one system's lesson in four sections, then take the quiz.

Header `padding: 8 16 12`, row, gap 10: 38 dp back button (`surface` + border, radius 12,
`arrow_back` 20 dp `#3d424e`); title "How the heart works" (700/15.5) + "Section 1 of 4"
(`micro`, `text.muted`).

**Step bars:** `padding: 0 20 14`, row, gap 5, four equal bars 5 dp tall, radius 4.
Completed/current → `primary`; upcoming → `border`.

Scrolling body `padding: 0 20`, gap 15:
1. **Figure stage** — height 190, radius 18, same radial gradient as onboarding, with the organ
   model. Bottom-left caption (`micro`, `#9aa0ae`) naming the asset, e.g. "heart.glb render /
   front view, labelled". In the app the caption is dropped; it exists to mark which asset the
   figure needs.
2. **Section title** (`h1`) and **body** (`bodyLg`, `text.body`).
3. **Keyword card** — `surface`, border, radius 16, padding 14, gap 5: the term (700/15) and
   its child-level definition (`bodySm`, `text.secondary`).
4. **Primary button** — "Next section" for sections 1–3, "Take the quiz" on section 4.

Section text, keyword and definition for all four sections: `data/content.json` → `sections`.

---

## 5. Organ detail

**Purpose:** learn one organ's parts before or after AR.

- Back header as in Lesson, titled with the organ name.
- **Model stage** — radius 18, radial gradient, the organ model, height ~220.
- **Title + blurb** — organ name (`h1`), blurb (`bodyLg`, `text.body`).
- **Two stat tiles** — row, gap 12, each `surface` + border, radius 16, padding 14:
  big value (Bricolage 800/22) + label (`bodySm`, `text.muted`). e.g. heart: "100,000 / beats a
  day", "4 / chambers".
- **Part chips** — wrapping row, gap 8, padding `8 13`, radius 11. Selected → `primary` fill,
  white; unselected → `surface.sunkenAlt`, `text.body`.
- **Part description** — the selected part's sentence (`bodyLg`, `text.body`), swapping in place.
- **Actions** — primary "See it in AR" → AR scan; ghost "Open 3D viewer" → 3D viewer.

Parts and stats per organ: `data/content.json` → `organs[].parts`, `organs[].stats`.

---

## 6. AR scan / placement

**Purpose:** find a surface and place the organ.

Full-bleed camera preview; all chrome overlays it, `light-content` status bar.

- **Top bar** — 18 dp padding: circular 38 dp close button (`rgba(0,0,0,0.35)`, white `close`)
  → previous screen; center pill (`rgba(0,0,0,0.45)`, radius 999, padding `7 14`) reading the
  organ name; right 38 dp button with `help` icon.
- **Reticle** — centered, ~140 dp, white 2 dp ring at 70% opacity, pulsing (see Motion).
- **Coach text** — centered under the reticle, white 15 dp 600 with a 60% black 8 dp shadow:
  "Point at a flat surface, then tap to place."
- **Bottom bar** — `dark.surface` at 92% opacity, radius 20, margin 16, padding `14 16`:
  a large `accent.ar` **Place** button (height 54, radius 15, label "Place organ") plus an organ
  switcher row of small thumbnails.
- Tap on a detected plane, or the Place button → **AR view** with the organ's first part selected.

**Tracking states** (all required): searching (reticle pulsing + coach text), surface found
(reticle solid, label "Tap to place"), lost tracking (`dark.surface` toast: "Move the phone
slowly to find the surface again"), too dark ("Too dark to track — try more light"),
ARCore unsupported (fall back to the 3D viewer with a one-line explainer).

---

## 7. AR view (labels + info sheet)

**Purpose:** inspect the placed organ, read part labels, manipulate it.

- Placed model anchored in world space; the app must keep the anchor across tool changes.
- **Labels** — up to 3 visible leader-line labels, white pill (`rgba(255,255,255,0.92)`,
  radius 999, padding `5 10`, 12.5/600, `text.primary`) with a 1 dp line to the anchor point.
  Toggled by the labels button. Anchor points come from named nodes in the GLB
  (see `docs/04-ar-and-3d.md`), not hardcoded screen coordinates.
- **Control bar** — three layouts, selectable in the prototype's Tweaks panel; **ship
  `buttons`** and keep the others behind a dev flag:
  - `buttons` (default): a `dark.surface` bar, radius 20, margin 16, holding tool pills
    "Rotate / Scale / Move" (padding `9 16`, radius 11; selected `primary`, unselected
    `dark.control`), plus icon buttons `label` (labels on/off), `restart_alt` (reset).
  - `gesture`: no tool pills — one-finger drag rotates, pinch scales, two-finger drag moves;
    only the labels and reset icons remain, with a first-run hint toast.
  - `radial`: a 56 dp `accent.ar` FAB bottom-right that fans four 44 dp circular buttons.
- **Info sheet** — bottom sheet, `surface`, top radius 16, padding 16, shadow per tokens:
  selected part name (700/16.5), its sentence (`bodySm`, `text.body`), and a ghost
  "Back to parts" row. Tapping a label or a labelled mesh selects that part and updates the sheet.
- Reset returns rotation/scale to defaults and re-selects the first part.

---

## 8. 3D viewer (non-AR)

**Purpose:** the same inspection without a camera or ARCore.

Identical part chips, info sheet and tool set as AR view, over the light radial-gradient stage
instead of the camera. Reachable from Organ detail, and the automatic fallback when camera
permission is denied or ARCore is unavailable. Everything here works offline with no permissions.

---

## 9. Quiz

**Purpose:** five multiple-choice questions on the current system.

- Header: back button, "Heart quiz" (700/15.5), "1 of 5" (`meta`); a 6 dp progress track under it
  filling to `qPct` (`(index + (checked ? 1 : 0)) / 5`).
- **Question** (`h1`), padding-x 20, margin-bottom 16.
- **Options** — four rows, gap 10: `surface`, 1 dp border, radius 16, padding `14 15`, row,
  gap 12 — a 22 dp radio dot (2 dp ring in the state color) and the option text (`bodyLg`).
  State colors per tokens: selected `surface.tint`/`primary`; after checking, the correct row is
  `success.bg`/`success` and a wrong pick is `error.bg`/`error`. Options are locked once checked.
- **Explanation block** (after checking) — verdict "CORRECT" or "NOT QUITE"
  (`metaStrong`, in `success`/`error`) plus the `why` sentence (`bodySm`, `text.body`).
- **Primary button** — "Check answer" → "Next question" → on Q5, "See results".
  Disabled (`text.disabled`) until an option is picked.

Questions, correct indices and explanations: `data/content.json` → `quiz`.

---

## 10. Results

- Big score "4 / 5" (Bricolage 800/40) and a note: ≥4 → "Strong work on the heart.",
  otherwise "Worth another look at sections 2 and 3."
- **Review list** — one row per question: mark ✓ / ✕ / – in `success` / `error` / `text.faint`,
  the question text (`bodySm`), and "You said: <option>" or "Not answered" (`meta`).
- Actions: primary "Try again" (resets to Q1 with answers cleared), ghost "Back to lessons".
- Any earned badge appears as an `accent.ar` pill above the score.

---

## 11. Progress

- Title "Your progress" (`h2`).
- **Stat tiles** — 2×2 grid, gap 12, `surface` + border, radius 16: lessons finished, quizzes
  taken, organs placed in AR, day streak. Value Bricolage 800/22, label `bodySm`/`text.muted`.
- **Per-system progress** — six rows: name (`titleRow`), 6 dp track + ratio (`meta`).
- **Badges strip** — horizontal row of earned badge circles (44 dp, `accent.ar` fill, white
  icon) with a trailing "See all" → Achievements.

---

## 12. Achievements

- Title "Achievements" (`h2`) + "6 of 9 earned" (`meta`).
- **Earned grid** — 3 columns, gap 12: 56 dp `accent.ar` circle with the badge's Material icon in
  white, name under it (`labelSm`, centered). Earned set: First lesson (`auto_stories`),
  Quiz starter (`task_alt`), AR beginner (`view_in_ar`), 3-day streak
  (`local_fire_department`), Lung learner (`air`), Curious mind (`psychology`).
- **Locked list** — rows with a `lock` icon in a `surface.sunkenAlt` circle, name (`titleRow`,
  `text.muted`) and the unlock condition (`bodySm`): "AR Adventurer — Place 3 different organs in
  AR", "Quiz Ace — Score 10/10 on any quiz", "Full Explorer — Finish all six organ systems".

---

## 13. AI Tutor

**Purpose:** answer body questions; fully usable offline from saved answers.

- Header: back button, "Tutor" (700/15.5) with status line "connected" or "saved answers only"
  (`micro`, `text.muted`), and a ghost toggle reading "Go offline" / "Go online"
  (prototype-only control; in the app the status reflects real connectivity).
- **Message list** — bot bubbles `surface` + border, radius 16 (tight bottom-left), padding
  `12 14`, `bodySm`/`text.body`, max width 78%; user bubbles `primary` fill, white, radius 16
  (tight bottom-right), right-aligned. First bot message: "Hi Ana! Ask me anything about the
  human body."
- **Suggested questions** — wrapping chips above the input, one per key in `content.json` →
  `tutor`. Tapping appends the question as a user bubble and its saved answer as a bot bubble.
- **Composer** — row, gap 10: field height 46, radius 14, `surface` (offline:
  `surface.sunkenAlt`), placeholder "Type a question…" (offline: "Offline — pick a saved
  question", input disabled); 46 dp send button, radius 14, `primary` (offline:
  `text.disabled`, disabled) with white `send` icon.

---

## Tab bar

Shown on **Home, Lessons, Progress** only. Height 62 + safe-area inset, `surface`, 1 dp top
border `border`. Five items, each icon 24 dp over a 10.5 dp 600 label:

| Label | Icon | Target |
|---|---|---|
| Home | `home` | Home |
| Lessons | `menu_book` | Lessons |
| AR | `view_in_ar` | AR scan |
| Quiz | `quiz` | Quiz (current system, reset) |
| Me | `person` | Progress |

Active item: `primary`, filled icon variant. Inactive: `text.faint`, outlined. AR and Quiz push
modal/stack screens, so no tab stays highlighted for them.

## Prototype-only elements — do not build

- The phone bezel, the "React Native · Android · offline-first prototype" caption, and the
  screen-jump chip bar under the device.
- The Tweaks panel (accent color, AR control layout, start screen).
- The fake 9:41 / 84% status bar.
- The `*.glb render` figure captions on lesson stages.
