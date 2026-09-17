# 04 — AR and 3D

## Stack

ViroReact (`@reactvision/react-viro`) over Google ARCore, Android only. No Unity, no WebView.

## Scene

```
ViroARSceneNavigator
└─ ViroARScene (onTrackingUpdated)
   ├─ ViroAmbientLight  intensity 260
   ├─ ViroSpotLight     direction [0,-1,-0.2], castsShadow
   ├─ ViroARPlaneSelector          ← surface detection + placement
   │   └─ ViroNode (anchor)
   │       ├─ Viro3DObject  source: organ .glb, type "GLB"
   │       └─ ViroFlexView / ViroText labels, one per labelled part
   └─ ViroQuad (shadow receiver, opacity 0.2)
```

Rules:
- One anchor per session. Changing tool, labels or selected part must not re-anchor the model.
- Normalize scale on load: fit the model's bounding box to ~0.18 m on its longest axis, then
  apply user scale on top. This is what keeps the UI independent of model geometry.
- Cap user scale to 0.5×–3× of the normalized size; cap rotation to the Y axis for `rotate`
  (free-axis rotation confuses this age group).

## Tracking states

Map `onTrackingUpdated` to the five states in `docs/02-screens.md` §6:

| Viro reason | UI state |
|---|---|
| `TRACKING_NORMAL`, no plane yet | searching |
| plane found | found |
| `TRACKING_LIMITED` + `EXCESSIVE_MOTION` | lost — "Move the phone slowly…" |
| `TRACKING_LIMITED` + `INSUFFICIENT_FEATURES`/low light | dark — "Too dark to track…" |
| ARCore unavailable / not installed | unsupported — offer the 3D viewer |

Check ARCore availability at AR entry (not at app start) and route to the 3D viewer when it is
missing. AR must never be a hard requirement for any lesson, quiz or badge except the AR badges.

## Part labels

Each organ's parts are declared in `data/content.json` with an optional `node` — the mesh or
empty-node name inside the GLB that the label attaches to. Resolve labels by looking up node
names at load time; if a node is missing, skip that label rather than guessing a position.
This means a replaced model only needs its nodes named, with no UI change.

Required node names per organ are listed in `content.json`. If a supplied model has different
names, add a rename map in `src/features/ar/nodeAliases.ts` — never hardcode coordinates.

## The 3D viewer (non-AR)

Same node/label logic without a camera. Use `ViroSceneNavigator` (VR-less 3D scene) so the model
and label code is shared, or `react-native-filament` if Viro's non-AR path proves unstable —
record whichever you pick in `docs/decisions.md`.

## Model pipeline

Expected assets, all optimized for mid-range Android:

```
assets/models/heart.glb
assets/models/lungs.glb
assets/models/digestive-system.glb
assets/models/brain.glb
assets/models/kidneys.glb
assets/models/skeleton.glb
```

Budget per model: ≤ 40k triangles, one 1024² base-color texture (2048² only for the skeleton),
Draco or meshopt compression, ≤ 3 MB on disk. Generated (e.g. Tripo) or licensed models are both
fine; the prototype's three.js shapes are **not** shippable.

Before adding a model: name its part nodes, bake it to a Y-up, meters-scale, origin-at-centroid
GLB, and confirm it loads in ViroReact on a physical device. Models are bundled in the APK —
verify the total APK size stays reasonable; if not, move to on-demand asset packs and keep a
"downloading" state that never blocks the lessons.

## Anatomical accuracy

Models and copy are subject to academic validation. Keep every model swappable and never
duplicate anatomical text into component code — it lives in `content.json` only.
