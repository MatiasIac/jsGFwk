# Spectrum Renderer for jsGFwk

This project implements a ZX Spectrum style renderer for JavaScript and HTML5 Canvas.
It keeps pixel data and colors separate, reproducing the original attribute clash behavior:

- bitmap layer: 256x192, 1 bit per pixel
- attribute layer: 32x24 cells (8x8 each), each cell owns `INK`, `PAPER`, `BRIGHT`, optional `FLASH`
- final output: nearest-neighbor only, no smoothing

## Files

- `src/spectrum/BitmapBuffer.js`: 1-bit pixel storage
- `src/spectrum/AttributeBuffer.js`: 8x8 attribute storage
- `src/spectrum/SpriteDrawer.js`: sprite/tile bit writes + clash strategy
- `src/spectrum/CanvasPresenter.js`: bitmap+attributes to RGBA canvas output
- `src/spectrum/SpectrumRenderer.js`: main API
- `src/spectrum/SpectrumAnimator2D.js`: jsGFwk loop adapter
- `demo/`: runnable visual clash demo

## Clash Behavior

Supported attribute modes:

- `authentic-overwrite` (Mode A): sprite touched cells adopt sprite attributes
- `background-locked` (Mode B): sprite draws bits but does not change attributes
- `sprite-priority` (Mode C): deterministic per-cell priority wins

`authentic-overwrite` is the default mode and gives the classic Spectrum clash look.

## Sprite Model

Sprites are monochrome 1-bit sources. A sprite draw call receives:

- coordinates (`x`, `y`)
- sprite bitmap (`width`, `height`, `data`)
- `ink`, `paper`, `bright`, optional `flash`
- draw mode: `opaque`, `transparent`, optional `xor`

Use `createMonochromeSprite(width, height, rowsOrData)` to create sprite data.

## Basic API

```javascript
import { SpectrumRenderer, createMonochromeSprite, DRAW_MODES } from "./src/index.js";

const renderer = new SpectrumRenderer(canvas, { scale: 3 });
const sprite = createMonochromeSprite(8, 8, [
  "00111100",
  "01111110",
  "11111111",
  "11100111",
  "11100111",
  "11111111",
  "01111110",
  "00111100",
]);

renderer.beginFrame();
renderer.drawSprite(100, 64, sprite, {
  ink: 7,
  paper: 0,
  bright: true,
  mode: DRAW_MODES.TRANSPARENT,
});
renderer.renderFrame();
```

## jsGFwk Integration

`SpectrumAnimator2D` plugs into the existing jsGFwk `Engine` include model, similar to `Animator2D`.
Game objects can implement `drawSpectrum(renderer)` instead of `draw(context)`.

## Demo

The demo scene shows:

1. patterned green grass background tiles
2. bright white moving character sprite
3. sprite crossing many attribute cells
4. visible color clash in motion
5. top HUD strip using background-locked attributes

Run with any static server and open `demo/index.html`.
