# How Soundwave works

This document describes how the **current** JavaScript implementation connects the canvas to audio. File paths are relative to the repository root.

## Architecture sketch

- **`snd.html`** — Loads jQuery, oCanvas, and scripts under `js/soundwavelib/`, plus `js/main.js`.
- **`js/main.js`** — Creates `AudioContext`, instantiates `SoundWave`, wires UI (load WAV, play, keyboard).
- **`js/soundwavelib/soundwave.js`** — Core type: registers a custom oCanvas display, manages control lines, builds audio buffers, and (when used) loads WAV data.
- **`js/soundwavelib/beziercurvepath.js`** — Builds a path along cubic Bézier segments from control lines and resamples to an even spacing along X.
- **`js/soundwavelib/linewithmidpoint.js`** — Control polyline / midpoint logic for each segment.
- **`js/soundwavelib/keytonote.js`** — Maps keyboard codes to semitone-style offsets for pitch shifting at play time.
- **`js/soundwavelib/bufferloader.js`** — Loads and decodes audio files for the WAV path.

## Drawing → samples

1. The user adds **control lines** with double-clicks (see `main.js` and `SoundWave.prototype.addCtrlLine` in `soundwave.js`).
2. When enough geometry exists, the display routine uses **`bezierCurvePath`** with the value from the **Points** field (`#points`) as the number of rendered positions along the path (`soundwave.js`, `drawSoundwave`).
3. For **playback**, `returnSoundCtrlLines` builds a similar path but uses the **frequency** argument as the horizontal resolution for sampling (`soundwave.js`), then **`playSoundwave`** copies the **y** values of those samples into a stereo `AudioBuffer` and loops the pattern to fill the requested **duration**.

So the **curve’s shape** becomes the **amplitude shape of one period** (repeated in the buffer loop), while **Points / frequency** and **duration** tie that shape to time.

## Keyboard and play button

- **Play** uses `$("#points").val()` as the frequency argument to `playSoundwave`.
- **Keyboard** (with keys mapped in `keytonote.js`) multiplies that base by a musical interval: `frequency = base * 2^(offset/12)` in `main.js`.

## WAV loading

`loadSoundwave` uses `BufferLoader` to fetch and decode a file; `processLoadedSound` walks the decoded channel and calls **`addCtrlLine`** at positions derived from canvas width versus buffer length—**seeding** the editor from a recording rather than manual drawing.

## Practical caveats

The drawing and playback pipelines use related but not necessarily identical parameter roles (canvas dimensions vs frequency in `returnSoundCtrlLines`). Treat this doc as a **map of intent**; when changing behavior, align **visual preview** and **audible buffer** deliberately so users get predictable feedback.
