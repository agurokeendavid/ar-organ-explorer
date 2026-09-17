# 01 — Design tokens

Exact values from the hi-fi prototype. Generate `src/theme/tokens.ts` from this file.
Prototype px → React Native dp, 1:1, at a 412 dp reference width.

## Color

### Surfaces
| Token | Hex | Use |
|---|---|---|
| `bg.app` | `#f6f7f9` | screen background |
| `bg.page` | `#eceef2` | prototype desk backdrop; also progress-bar track |
| `surface` | `#ffffff` | cards, sheets, input fields, tab bar |
| `surface.sunken` | `#f1f4fa` | thumbnail wells behind organ images |
| `surface.sunkenAlt` | `#f1f3f7` | unselected part chips, disabled input |
| `surface.tint` | `#e7edfd` | primary-tinted icon wells, selected option row |
| `border` | `#e2e5ec` | 1 dp card/field border, inactive step bar |
| `track` | `#eceef2` | progress-bar track |

### Dark surfaces (AR + feature cards)
| Token | Hex | Use |
|---|---|---|
| `dark.surface` | `#23262e` | AR promo card, AR chrome, sheets over camera |
| `dark.frame` | `#1a1c22` | device bezel (prototype only) |
| `dark.pressed` | `#14161c` | pressed state of dark card |
| `dark.textMuted` | `#a7adbb` | secondary text on dark |
| `dark.control` | `rgba(255,255,255,0.10)` | unselected AR tool pill |

### Ink
| Token | Hex | Use |
|---|---|---|
| `text.primary` | `#23262e` | headings, titles |
| `text.body` | `#3d424e` | body copy, part descriptions |
| `text.secondary` | `#5c6270` | supporting copy, status bar |
| `text.muted` | `#8a90a0` | meta, counters, captions |
| `text.faint` | `#a7adbb` | inactive tab icons, placeholder icons |
| `text.disabled` | `#c3c8d4` | disabled button fill, unselected radio dot |
| `text.onDark` | `#ffffff` | text on dark/primary |

### Brand + semantic
| Token | Hex | Use |
|---|---|---|
| `primary` | `#2f5fd0` | primary actions, active tab, selection, progress fill |
| `primary.pressed` | `#2247a3` | pressed primary button |
| `primary.tint` | `#e7edfd` | primary 8% background |
| `accent.ar` | `#d9822b` | AR affordances, badge fills |
| `success` | `#2f8f5b` | correct answer border/mark |
| `success.bg` | `#eef7f1` | correct answer row fill |
| `error` | `#c4432e` | wrong answer border/mark |
| `error.bg` | `#fbf0ee` | wrong answer row fill |

Alternate primaries exposed as a prototype tweak (usable as a theming hook, primary stays
`#2f5fd0` by default): `#1f7a6b`, `#7a4fd0`, `#d0562f`.

## Typography

Families: **Bricolage Grotesque** (display/headings) · **Source Sans 3** (body/UI) ·
platform monospace (`ui-monospace`; on Android use `monospace`) for small meta labels.

| Style | Family | Weight | Size | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| `display` | Bricolage | 800 | 32 | 1.1 (35) | −0.02em | onboarding headline |
| `h1` | Bricolage | 800 | 26 | 1.15 (30) | −0.02em | lesson section title |
| `h2` | Bricolage | 800 | 25 | 1.2 (30) | −0.02em | screen titles (Home greeting, Lessons) |
| `h3` | Bricolage | 700 | 17 | 1.25 (21) | 0 | section headers ("Organ systems") |
| `h4` | Bricolage | 700 | 15 | 1.3 (20) | 0 | app name in headers |
| `bodyLg` | Source Sans 3 | 400 | 16.5 | 1.55 (26) | 0 | lesson body copy |
| `body` | Source Sans 3 | 400 | 16 | 1.5 (24) | 0 | onboarding paragraph |
| `bodySm` | Source Sans 3 | 400 | 13.5 | 1.45 (20) | 0 | card blurbs, part descriptions |
| `titleCard` | Source Sans 3 | 700 | 16.5 | 1.2 (20) | 0 | card titles |
| `titleRow` | Source Sans 3 | 700 | 16 | 1.2 (19) | 0 | list row titles |
| `labelStrong` | Source Sans 3 | 700 | 15 | 1.3 (20) | 0 | chip/inline labels |
| `button` | Source Sans 3 | 700 | 16.5 | 1 | 0 | primary button label |
| `buttonSm` | Source Sans 3 | 600 | 15 | 1 | 0 | secondary/ghost button |
| `chip` | Source Sans 3 | 600 | 13.5 | 1 | 0 | filter chips, tool pills |
| `labelSm` | Source Sans 3 | 600 | 12.5 | 1.2 | 0 | day label, small links |
| `meta` | monospace | 400 | 11.5 | 1.4 | 0 | counters ("3/8"), asset names |
| `metaStrong` | monospace | 600 | 11.5 | 1.4 | 0.04em | eyebrows ("CONTINUE") |
| `micro` | monospace | 400 | 10–11 | 1.6 | 0 | figure captions, status bar % |
| `tab` | Source Sans 3 | 600 | 10.5 | 1 | 0 | tab bar labels |

Minimum body size on any screen: 13.5. Never go below 11 for monospace meta.

## Spacing

Base scale (dp): `2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 34`.

- Screen horizontal padding: **20** (headers 16–20; AR chrome 18).
- Vertical gap between stacked cards: **14** on Home, **11–12** in lists, **15** in lesson body.
- Card inner padding: **12–16** (see per-screen spec).
- Grid gap (2-col organ grid): **12**.

## Radius

| Token | dp | Use |
|---|---|---|
| `radius.screen` | 36 | device screen (prototype only) |
| `radius.xl` | 20 | hero/feature cards |
| `radius.lg` | 18 | list cards, grid tiles, 3D stage |
| `radius.md` | 16 | info boxes, primary sheets |
| `radius.button` | 15 | primary button (54 dp tall) |
| `radius.sm` | 14 | small avatar/icon buttons, search field |
| `radius.icon` | 11–13 | icon wells (34–46 dp squares) |
| `radius.chip` | 10–11 | chips, tool pills |
| `radius.pill` | 999 | AR badges, radial controls |

## Elevation

The design is flat: 1 dp `#e2e5ec` borders carry separation, not shadows. Only two shadows:

- Device frame (prototype only): `0 24 50 −18 rgba(20,24,35,0.5)`.
- Sheets over the camera in AR: `0 −8 24 rgba(0,0,0,0.25)` (RN: `elevation: 12`).

Do not add Material default elevation to cards.

## Interaction states

| Element | Default | Pressed / selected |
|---|---|---|
| Primary button | `primary` fill, white label | fill → `primary.pressed` |
| Ghost button | transparent, `text.secondary` | label → `text.primary` |
| Card (tappable) | `surface` + `border` | border → `primary` |
| Chip | `surface` + `border`, `text.secondary` | `primary` fill, white label |
| Part chip | `surface.sunkenAlt`, `text.body` | `primary` fill, white label |
| Tab item | icon+label `text.faint`, unfilled icon | `primary`, filled icon |
| AR tool pill | `dark.control`, white | `primary` fill, white |
| Quiz option | `surface` + `border`, dot `text.disabled` | selected: `surface.tint` + `primary`; correct: `success.bg` + `success`; wrong: `error.bg` + `error` |
| Disabled button | `text.disabled` fill, white label | no press feedback |

Card and chip presses in RN: `Pressable` with the border/fill change above, plus
`android_ripple` disabled (the design has no ripple) or a 0.96 scale via Reanimated, 120 ms.

## Motion

| Motion | Duration | Easing |
|---|---|---|
| Screen push/pop | 280 ms | native-stack default |
| Card press | 120 ms | ease-out |
| Section advance (lesson) | 220 ms fade + 10 dp rise | ease-out |
| Answer reveal | 180 ms fade of the explanation block | ease-out |
| AR reticle pulse | 1600 ms loop, opacity 0.35→0.9, scale 1→1.06 | ease-in-out |
| Sheet in/out | 240 ms translateY | ease-out |
