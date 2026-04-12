# Design: staged workflow (tabs)

This document describes a **planned user experience** for Soundwave: a **three-stage workflow** presented as **tabs**. Each stage has a distinct job: **create** a starting sound, **shape** it with expressive controls, then **arrange** and apply **global** edits across layers.

The goal is to match how people think about sound work—**idea → timbre → piece**—without forcing every control into one screen.

## Principles

- **One primary intent per tab** so the UI does not mix “describe a sound,” “tweak parameters,” and “edit the timeline” in the same cognitive frame.
- **Non-destructive where possible**: later stages should be able to revisit earlier decisions (re-prompt, re-open a sound’s edit stack) without losing work unless the user explicitly commits to a destructive action.
- **Hybrid realism**: AI can propose a **starting sample** from language; **DSP and higher-level parameters** (as in [fun-useful sound control](fun-useful-sound-control.md)) carry **perceptual refinement** and performance-friendly playback.

## Tab 1 — Describe → generate

**Purpose:** Turn a **text prompt** into an initial **audio sample** (or short clip) that becomes the object of later editing.

**User sees**

- A text field for describing the desired sound (tone, material, duration hint, mood, etc.).
- Primary action: **Generate** (and optionally **Regenerate** / variation controls if the backend supports them).
- Secondary: **constraints** that help the model and the app agree on output shape—e.g. target length, mono/stereo, rough loudness or peak limit, sample rate if exposed.

**System behavior (design intent)**

- Output is a **named asset** in the session (e.g. “Bell — take 2”) with metadata: prompt, generation timestamp, model/version if applicable.
- Failures are surfaced clearly: timeout, refusal, silence, clipping; user can retry without losing other tabs’ work.

**Out of scope for this tab**

- Fine timbre editing (that is Tab 2).
- Arrangement (Tab 3).

## Tab 2 — Modify the sample

**Purpose:** Edit **one selected generated (or imported) sample** using **macro controls**—the same design philosophy as [design: grain and abstraction](design-grain-and-abstraction.md): parameters and structure, not literal per-sample drawing.

**User sees**

- **Sample picker** or list of assets created in Tab 1 (and optionally imports).
- Control groups such as:
  - **Time**: trim start/end, stretch/compress (with optional pitch coupling or decoupling), loop regions if relevant.
  - **Level / dynamics**: gain, compression-ish controls, envelope (attack, decay, sustain, release) when applicable.
  - **Timbre / spectrum**: brightness, filter cutoff and resonance, noise mix, harmonic emphasis—mapped to whatever the engine exposes (Web Audio graph, spectral ops, etc.).
  - **Space**: simple reverb/delay sends if part of the product scope.
- **Preview** that always reflects the current parameter set.
- Optional future: **lightweight AI assist** (e.g. “more metallic,” “darker”) as **presets or deltas** on top of DSP—not required for the first version.

**Data model note**

- Edits should be **replayable parameters** attached to the asset (or a **non-destructive layer stack**) rather than only a flattened waveform, when feasible—so Tab 3 can reuse the same asset with different edit chains if the product allows multiple “versions.”

## Tab 3 — Sequence, layer, global edits

**Purpose:** Combine **multiple configured samples** into a **timeline** (or scene), and apply **arrangement-level** and **global** processing.

**User sees**

- **Tracks or layers**: each layer references a sample that has already been through Tab 2 (or a default pass-through).
- **Sequencing**: place clips on a timeline, order one-shots, loop segments, basic tempo/grid if applicable.
- **Per-clip edits** (where they belong in arrangement): clip gain, pan, clip fades, clip boundaries.
- **Global / bus-level edits** (examples):
  - **Fade in / fade out** on the master or on groups.
  - **Master** level limiter or gentle bus compression (if in scope).
  - **Export** or **bounce** of the mixed result.

**Relationship to Tab 2**

- Tab 3 is about **when** and **how many**, plus **mix-level** polish; Tab 2 remains the home for **single-sound** timbre and micro-structure.

## Cross-cutting concerns

- **Navigation**: Users can move between tabs freely; the app should preserve state and make clear **which sample** Tab 2 is editing and **which project** Tab 3 is mixing.
- **Session model**: Define whether “project” contains all generated samples, edit stacks, and the timeline—or whether each tab autosaves independently.
- **Performance**: Real-time preview in Tab 3 may require freezing or bouncing heavy chains; the design should allow **offline** or **deferred** render for export.

## Non-goals (for this design sketch)

- Prescribing a specific AI vendor or model architecture.
- Locking parameter lists before the audio engine is chosen; Tab 2’s groups are **categories**, not a final API.

## Related wiki pages

- [Design: grain and abstraction](design-grain-and-abstraction.md)
- [Fun, useful sound control](fun-useful-sound-control.md)
- [How Soundwave works](how-soundwave-works.md)
