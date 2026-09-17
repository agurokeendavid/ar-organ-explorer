# Updated Technical Requirements — AR Organ System Learning Mobile Application

Design the application with the following implementation architecture in mind.

## Application Platform

The application will be developed primarily for:

**Android smartphones and Android tablets**

using:

- React Native
- TypeScript

The application should be designed as an **offline-first educational application**.

A custom backend server will NOT be required for the initial version.

---

# Offline-First Architecture

The majority of application functionality must continue working without an internet connection.

The following features should work completely offline:

- Home Screen
- Organ System Lessons
- Organ Information
- AR Exploration
- Interactive 3D Organ Models
- Educational Content
- Quiz Module
- Quiz Results
- Learning Progress
- Achievements
- Recently Viewed Lessons

Local application data will be stored using:

**SQLite**

Educational content and quiz questions can either be stored in SQLite or bundled JSON data.

---

# Augmented Reality

Use the following implementation assumptions when designing the AR experience:

- React Native
- ViroReact
- Google ARCore
- Android device camera
- Local GLB / GLTF 3D models

The AR system should support:

- Surface detection
- 3D model placement
- Rotate
- Zoom / Scale
- Move
- Reset position
- Organ selection
- Anatomical labels
- Information bottom sheet
- Highlight selected organ
- Optional simple organ animations

The application should NOT depend on Unity.

The AR interface should remain practical to implement using React Native and ViroReact.

---

# 3D Organ Models

The developer is primarily a React Native/software developer and is not a professional 3D artist.

Therefore, the application should NOT assume that anatomical models will be manually created using Blender, Maya or other professional 3D modeling software.

3D models will instead come from one or both of these approaches:

1. Existing licensed educational/anatomical 3D assets.

2. AI-generated 3D models produced using an AI 3D generation platform such as Tripo or an equivalent service.

Preferred runtime format:

**GLB / GLTF**

Example application assets:

assets/models/heart.glb

assets/models/lungs.glb

assets/models/digestive-system.glb

assets/models/brain.glb

assets/models/kidneys.glb

assets/models/skeleton.glb

All models should be optimized for Android mobile devices.

The UI should not depend on one exact 3D model because assets may be replaced later with more anatomically accurate versions.

---

# Anatomical Accuracy

Because this application is intended for elementary Science education, anatomical models and educational descriptions should be designed to support academic validation.

The UI should provide clean educational representations of organs rather than graphic medical imagery.

Avoid:

- Blood
- Gore
- Surgical presentation
- Frightening anatomical imagery

Prefer:

- Simplified educational anatomy
- Recognizable anatomical structures
- Appropriate colors
- Clear labels
- Child-friendly presentation

---

# AI Tutor

Design the AI Tutor as a modular feature.

For the initial prototype/dissertation version, it may operate using:

- Suggested questions
- Offline predefined questions and answers
- Locally stored educational content

Example questions:

- What does the heart do?
- Why do we need lungs?
- What happens to food after we eat?
- What does our brain do?
- Why do we have bones?

The UI should still appear like an interactive learning assistant.

Design the application so the AI Tutor implementation can later be replaced or extended using a third-party AI API.

Future architecture may be:

React Native App
→ Secure AI Service
→ Third-Party AI Model

Do NOT design the entire application around requiring internet access.

If AI is unavailable, students must still be able to:

- Explore AR
- Read lessons
- Study organs
- Complete quizzes
- View progress

---

# Offline State

Instead of treating offline mode as an application error, design the application as offline-first.

The user should normally be able to use the application without internet access.

If the future AI Tutor requires internet access, only the AI Tutor should display:

**AI Tutor requires an internet connection.**

The rest of the application should continue functioning normally.

---

# Development Constraint

All designs should remain reasonably implementable by a React Native developer.

Avoid solutions that unnecessarily require:

- Unity
- Unreal Engine
- Blender
- Custom game engines
- Complex backend infrastructure
- Cloud databases

Prefer established React Native components and libraries whenever possible.

The final prototype should provide a practical design that can later be converted into reusable React Native components.