# Fun, useful sound control

This page collects **patterns** that keep sound editing expressive without requiring sample-by-sample waveform surgery. You can treat it as a design menu when extending Soundwave or similar tools.

## 1. Few knobs, big effect

Expose **low-dimensional** controls whose changes sweep through many samples:

- **Pitch / rate** — Speed of repetition or playback; one number shifts the entire buffer relationship to time.
- **Amplitude envelope** — Attack, decay, sustain, release (or simpler ramps) shape *when* energy appears, not every sample in isolation.
- **Filter or tone** — Low-pass, band-pass, or resonant filters turn “brightness” into a single slider.

Users learn cause and effect quickly; that is the core of “fun.”

## 2. Time is two different things

Separate:

- **Event time** — When a note or sound starts and how long it lasts (musical or gestural).
- **Internal time** — How a single buffer or oscillator evolves within one “grain” (vibrato, tremolo, envelope stages).

Confusing these in the UI makes tools feel brittle. Clear labels (“duration” vs “loop length” vs “envelope length”) help.

## 3. Repetition and layering

Short synthesized or drawn loops become **musical** when you can:

- **Transpose** (keyboard or explicit interval), as in a simple instrument.
- **Layer** multiple voices with slight detune or delay for thickness.
- **Trigger** the same material at different rates (rhythmic interest without editing thousands of samples).

## 4. Effects as the main sculptors

Reverb, delay, distortion, and chorus **smear and emphasize** structure that is tedious to paint in the waveform. A practical workflow is: **rough shape in synthesis or drawing → refine with effects** — still without touching individual samples.

## 5. Import and resynthesis at lower resolution

Loading a WAV and **downsampling or segmenting** the control path (one control point per N samples, or per zero-crossing region) keeps imported material manageable. The goal is **abstraction of the recording**, not a pixel-perfect copy of its waveform.

## 6. Games and constraints

Constraints increase playfulness: limited points, snapping to scale, randomize-within-bounds, or “mutate” buttons that preserve macro structure while changing details. The user explores a **space** instead of a single curve.

## 7. Mapping this to Soundwave

The current app uses **drawn paths** and **keyboard pitch** as macro controls; see [how-soundwave-works](how-soundwave-works.md) for the concrete pipeline. Natural extensions along this document’s lines include envelopes on top of the buffer, filters in the Web Audio graph, and clearer separation between “points along the curve” and “playback duration in seconds.”
