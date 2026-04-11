# Design: grain and abstraction

## The problem with “edit the wave”

A digital audio waveform is a **very long list of numbers**. At a typical sample rate, one second of mono audio is tens of thousands of samples. Each sample is a tiny vertical displacement: meaningful to the ear in aggregate, but **the wrong unit for direct manipulation** in a visual editor.

If you try to “draw” or “sculpt” that curve at full resolution:

- **Motor control**: A mouse cannot place forty-eight thousand points per second with intent.
- **Perception**: The screen maps those samples to a handful of pixels; most detail is lost or aliased.
- **Semantics**: Tweaking sample 17,203 does not correspond to a musical or sonic idea most people can name.

So the difficulty you hit—**soundwaves are too fine a grain to edit as literal waves**—is not a failure of imagination; it is a mismatch between **human-scale gestures** and **sample-scale data**.

## Move up a layer: what should the user edit?

Useful, fun tools almost always expose **higher-level quantities** that imply many samples at once:

| Layer | Examples | Why it works |
|--------|-----------|----------------|
| **Musical** | Pitch, duration, scale degree, tempo | Maps to how people think about notes and time. |
| **Acoustic** | Brightness, loudness, noisiness, attack | Coarse descriptors that still correlate with perception. |
| **Signal** | Envelope (ADSR), filter cutoff, FM ratio | Few parameters control thousands of samples. |
| **Spectral** | Formants, partials, noise band | Matches timbre intuition better than raw time-domain dots. |

The waveform view can remain **feedback** (what happened) rather than **primary input** (how you specify it).

## Geometry as macro-control (this project’s direction)

Soundwave uses **curves and control structures** (Bézier-related paths) as a **macro** description: a small number of control points defines a whole segment of output. That is the right *idea*: compress many samples into a gesture-friendly representation.

The next design question is **what that curve means** musically—pure timbre sketch, periodic repeat, envelope, modulation source—and how playback (duration, pitch, repetition) stays **explicit** so the user is not accidentally fighting aliasing or DC offset. Those topics are explored in [fun-useful-sound-control](fun-useful-sound-control.md) and tied to the implementation in [how-soundwave-works](how-soundwave-works.md).
