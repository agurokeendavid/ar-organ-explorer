# AGENTS.md — instructions for coding agents

Applies to Claude Code, Codex CLI, Copilot CLI and any other agent working in this repository.
`CLAUDE.md` and `.github/copilot-instructions.md` point here; keep all three in sync by editing
this file only.

## What this repository is

An offline-first React Native (TypeScript) Android app that teaches six human organ systems to
9–12 year olds, with an AR mode. A hi-fi HTML prototype in `design/` defines the intended UI.

## Non-negotiable constraints

1. **React Native + TypeScript.** No Expo-only native modules that break ViroReact; prefer the
   React Native CLI with a bare Android project.
2. **Offline-first.** Every feature except the future online tutor must work with the radio off.
   No network call may block navigation, rendering, or a lesson/quiz/AR flow.
3. **No backend in v1.** Content is bundled; progress is local. Do not add a server, auth, or
   cloud database.
4. **No Unity, no Blender authoring, no WebView-based 3D.** AR is ViroReact + ARCore. The 3D
   viewer is ViroReact or `react-native-filament`/GLView — decide once and record the choice.
5. **The UI must not depend on exact model geometry.** Models get replaced; screens must still
   lay out correctly with a different-sized GLB.
6. **Do not ship anything from `design/`.** Those are HTML references. Read them, then write
   React Native.
7. **Anatomical copy is content, not code.** Never invent or reword anatomical descriptions — use
   `data/content.json` verbatim. It is pending academic validation and must be traceable.

## Security & secrets guardrails

1. **No secrets in the repo, ever.** No API keys, tokens, passwords, signing credentials, or
   `.env` values committed as literals or in config files — not even "temporary" ones. If a
   feature needs a secret, read it from an untracked `.env`/`local.properties`/gradle property and
   document the variable name in `docs/decisions.md`, not the value.
2. **Release signing stays local.** The release keystore, its passwords, and any
   `keystore.properties` are never committed. Only the shared `android/app/debug.keystore` is
   tracked (it is intentionally exempted in `.gitignore`).
3. **No backend means no service credentials.** Per the "No backend in v1" rule above, there
   should be no database URLs, cloud API keys, or auth tokens in this codebase at all. Treat any
   appearance of one as a sign the change is out of scope, not something to gitignore and move on.
4. **Child-privacy default: no telemetry by default.** This app teaches 9–12 year olds. Do not add
   analytics, crash reporting, or ad SDKs, and do not collect device identifiers, location, or any
   personally identifiable information, unless a task explicitly asks for it and states the
   consent/compliance handling. Offline-first already limits exposure — do not undo that by adding
   a network SDK "just for metrics."
5. **`data/content.json` is trusted content, not a secrets boundary.** It's fine to read and ship
   verbatim; the concern here is unrelated to secrets — see the "verbatim" rule above.
6. **If you find a secret already committed** (in history or in the working tree), stop and flag
   it to the user instead of deleting/rewriting history yourself — that needs a deliberate
   rotation + history-scrub decision, not a quiet fix.

## Recommended library set

| Concern | Library |
|---|---|
| Navigation | `@react-navigation/native` — native-stack + bottom-tabs |
| Local data | `react-native-nitro-sqlite` or `expo-sqlite` (bare) |
| Key/value | `react-native-mmkv` for flags (onboarding seen, offline toggle) |
| AR | `@reactvision/react-viro` (ViroReact) + ARCore |
| Icons | `react-native-vector-icons` (MaterialIcons) or bundled Material Symbols font |
| Gestures | `react-native-gesture-handler` |
| Animation | `react-native-reanimated` |
| Permissions | `react-native-permissions` |
| Connectivity | `@react-native-community/netinfo` (display only — never gating) |

If you deviate, write the reason into `docs/decisions.md` (create it) in one line.

## Project structure to create

```
src/
  app/            App.tsx, navigation/, providers/
  screens/        one folder per screen in docs/02-screens.md
  components/     Button, Card, ProgressBar, Chip, StatTile, TabBar, InfoSheet, …
  features/
    lessons/      content selectors + progress writes
    quiz/         question runner, scoring
    ar/           ViroReact scene, placement, label anchors, controls
    tutor/        offline answer lookup + pluggable client
  data/           db.ts (SQLite), migrations/, content.ts (loads content.json)
  theme/          tokens.ts, typography.ts  ← generated from docs/01-design-tokens.md
assets/
  fonts/          BricolageGrotesque-*.ttf, SourceSans3-*.ttf
  models/         *.glb
```

## Styling rules

- Build `src/theme/tokens.ts` **first**, from `docs/01-design-tokens.md`. Every color, radius,
  spacing and text style must come from it. No literal hex values in screen files.
- The prototype is drawn at **412 × 892 dp** (Android reference). Prototype pixel values map 1:1
  to React Native `dp`. Use them as written; do not round to a 4pt grid.
- Layout with flexbox and `gap`. Match the prototype's gaps exactly.
- Minimum touch target 44 dp. Some prototype chips are visually smaller — pad the hit area with
  `hitSlop`, do not enlarge the visual.
- Text must reflow: no fixed heights on text containers, and support Android font scaling up to
  1.3× without clipping.

## Working method

- Work one milestone at a time from `docs/07-build-plan.md`. Do not start a milestone whose
  dependencies are unbuilt.
- Before writing a screen, open the standalone prototype and click through that screen's states.
  Read the matching section of `docs/02-screens.md` for exact values.
- Every screen ships with its states: loading (if any), empty, error, offline, and the
  selected/checked/disabled variants listed in the spec.
- Keep copy **verbatim** from the spec and `data/content.json`. Copy is part of the design.
- TypeScript strict mode on. No `any` in `src/features` or `src/data`.
- Commit per milestone with the milestone id in the subject, e.g. `M3: lesson reader`.

## Definition of done for a screen

- Matches the spec's tokens, spacing and copy at 412 dp width.
- Works with airplane mode on.
- All interactive elements navigate or mutate state as `docs/03-navigation-and-state.md` says.
- No hardcoded colors, fonts or radii.
- Renders without warnings on a 5" phone and a 10" tablet (tablet may reuse the phone layout in
  v1; two-pane tablet layouts are out of scope unless a task says otherwise).
