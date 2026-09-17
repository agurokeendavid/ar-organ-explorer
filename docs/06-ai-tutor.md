# 06 — AI Tutor

## v1 behavior (offline, no API)

The tutor is a **modular feature** that looks and behaves like a chat assistant but answers from
bundled content in v1.

1. The screen opens with one bot message: "Hi Ana! Ask me anything about the human body."
2. Suggested-question chips list every entry in `content.json → tutor`. Tapping one appends the
   question as a user bubble and its stored answer as a bot bubble.
3. Free typing is enabled when connectivity is up but has no online model behind it in v1 —
   match typed text against the saved questions (normalized, then a simple keyword score). If
   nothing scores above the threshold, reply: "I don't have that one saved yet. Try one of the
   questions below." and re-show the chips.
4. When offline, disable the text field, change the placeholder to "Offline — pick a saved
   question", grey the send button, and set the header status to "saved answers only". The chips
   stay fully usable — offline is a normal state, never an error.
5. The thread persists in `tutor_message` and restores on reopen.

## The API boundary

Define one interface and keep the UI behind it, so an online model can be dropped in later
without touching the screen:

```ts
export interface TutorClient {
  ask(question: string, ctx: { organId?: string }): Promise<{ text: string; source: 'offline' | 'remote' }>;
}
```

- `OfflineTutorClient` — the matcher above. Always available.
- `RemoteTutorClient` — later: app → own secure service → third-party model. Never call a model
  provider directly from the device, and never ship a provider key in the app.
- Selection: remote when connectivity is up **and** a remote client is configured; otherwise
  offline. Any remote failure or timeout (3 s) falls back to the offline client silently and
  labels the bubble `offline`.

## Guardrails for the eventual remote client

Elementary audience, so: a system prompt fixed to child-appropriate anatomy Science, a topic
check that redirects off-topic questions, no personal data in requests, and a logged transcript
only on-device. Note these constraints in code comments where the remote client is stubbed.
