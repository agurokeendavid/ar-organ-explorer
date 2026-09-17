# Body Explorer AR — Design Handoff

Repository template and design guide for implementing the **Body Explorer AR** mobile
application (elementary AR organ-system learning app, ages 9–12) in **React Native + TypeScript**.

This folder is meant to be committed as the root (or as `/design`) of a new repository.
Coding agents (Claude Code / Codex CLI / Copilot CLI) should read `AGENTS.md` first.

---

## Overview

Body Explorer AR teaches six organ systems (heart, lungs, digestive, brain, kidneys, skeleton)
to elementary Science students. Each system has lessons, an organ-detail page with selectable
parts, an AR mode that places a 3D organ on a real surface, a non-AR 3D viewer, a multiple-choice
quiz, progress tracking, achievements, and an AI Tutor that works from saved answers when offline.

The app is **offline-first**: lessons, quizzes, the 3D viewer, AR, progress and saved tutor
answers all work with no internet connection. No custom backend is required for v1.

**Target platform:** Android phones and tablets. React Native + TypeScript, ViroReact + ARCore
for AR, SQLite for local data, local GLB/GLTF models.

## About the design files

The files in `design/` are **design references created in HTML**. They are prototypes that show
the intended look, copy, and behavior — **not production code to copy**. The task is to *recreate*
these designs as React Native components using the target codebase's own patterns and libraries.
No HTML, CSS or three.js from these files should ship in the app.

- `design/AR Organ App Prototype.dc.html` — the hi-fi interactive prototype (all 13 screens,
  real navigation and state). Source of truth for layout, color, type, copy and interactions.
- `design/Body Explorer AR Prototype.html` — the same prototype as one standalone offline file.
  Open this in a browser to click through the flow; no server or dependencies needed.
- `design/AR Organ App Wireframes.dc.html` — the earlier lo-fi wireframes (structure only).
- `design/organ-model.js` — the three.js stand-in organ models used by the prototype.
  **Prototype-only.** In the app these are replaced by GLB assets.

## Fidelity

**High fidelity.** Colors, typography, spacing, radii, copy and interaction states in the
prototype are final and documented exactly in `docs/01-design-tokens.md` and
`docs/02-screens.md`. Recreate the UI to match those values. Two known non-final items:

1. **3D organ models** — the prototype uses simplified shapes built from primitives. Replace with
   Tripo-generated or licensed GLB files before academic validation. The UI must not depend on any
   one model's exact geometry.
2. **Lesson figures and photography** — the prototype marks these as supplied assets; real
   artwork/renders are still to be provided.

## Documentation

| File | What it covers |
|---|---|
| `docs/00-technical-requirements.md` | The original technical brief this design was built against |
| `AGENTS.md` | How coding agents should work in this repo: stack, conventions, guardrails |
| `docs/01-design-tokens.md` | Every color, font, size, radius, shadow, spacing value |
| `docs/02-screens.md` | All 13 screens: layout, components, exact measurements and copy |
| `docs/03-navigation-and-state.md` | Route map, navigators, state shape, transitions |
| `docs/04-ar-and-3d.md` | ViroReact/ARCore scene, control layouts, model pipeline |
| `docs/05-data-model.md` | SQLite schema, bundled content JSON, progress writes |
| `docs/06-ai-tutor.md` | Offline tutor behavior and the pluggable API boundary |
| `docs/07-build-plan.md` | Milestones as agent-sized tasks, in dependency order |
| `data/content.json` | Seed content: organs, parts, lesson sections, quiz, tutor answers, badges |

## Screens

Onboarding · Permissions · Home · Lessons · Lesson · Organ detail · AR scan/placement ·
AR view (labels + info sheet) · 3D viewer · Quiz · Results · Progress · Achievements · AI Tutor

Details for each in `docs/02-screens.md`.

## Assets used in the design

- **Fonts:** Bricolage Grotesque (headings, 700/800), Source Sans 3 (body/UI, 400–700),
  system monospace for small meta labels. Both Google Fonts — bundle the TTFs in the app
  (`assets/fonts/`) rather than fetching at runtime, since the app is offline-first.
- **Icons:** Material Symbols Rounded. In React Native use
  `react-native-vector-icons/MaterialIcons` or a bundled Material Symbols font. Icon names used
  per screen are listed in `docs/02-screens.md`.
- **3D models:** `assets/models/{heart,lungs,digestive-system,brain,kidneys,skeleton}.glb`
  — to be supplied. See `docs/04-ar-and-3d.md`.
- **Photography/illustration:** none in the prototype; lesson figures are placeholders.

## Getting started

```bash
# 1. open the prototype and click through every screen
open "design/Body Explorer AR Prototype.html"

# 2. read the agent guide, then the docs in order
cat AGENTS.md

# 3. scaffold, then follow docs/07-build-plan.md milestone by milestone
```
