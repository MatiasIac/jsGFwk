# jsGFwk ZX Spectrum Torch Lighting and Visibility System

Create a lighting and visibility system for a 2D platformer built with **jsGFwk** and a **ZX Spectrum-style renderer**.

The game runs in a single-screen room of **256x192 pixels**. The gameplay map is defined in JSON using **16x16 tiles** for walls and platforms. The visual renderer simulates the ZX Spectrum using:

- a **1-bit bitmap buffer** for pixels
- a separate **8x8 attribute buffer** for ink/paper colours

The main character is a vampire carrying a torch. The torch should illuminate the nearby area, while walls and selected platforms should block light and create shadows. Areas hidden behind blockers should not be fully visible.

Moving enemies must also be affected by the same lighting system.

## Existing renderer assumptions

The current renderer already has these characteristics:

- `BitmapBuffer` stores pixels as 0/1 bits
- `SpriteDrawer.drawSprite()` iterates every source pixel and writes individual bits into the bitmap buffer
- `SpectrumRenderer.drawSprite()` delegates to `SpriteDrawer`
- screen resolution is 256x192
- attribute cells are 8x8

This means the best implementation is **not** modern alpha blending. Instead, simulate darkness by reducing visible pixels using **dither / density masks**.

## Goal

Implement a reusable torch-light visibility system with the following behaviour:

1. Compute visibility from the torch position using **2D ray casting**.
2. Rays stop when they hit a light-blocking tile.
3. Produce a **screen light mask** with several light bands, for example:
   - `0` = hidden
   - `1` = very dark
   - `2` = dim
   - `3` = fully lit
4. Apply the light mask when drawing both:
   - static map tiles
   - moving sprites such as enemies
5. Darkness must be represented by **pixel loss / dithering**, not alpha blending.
6. The solution must remain compatible with the ZX Spectrum renderer style.

## Design requirements

### 1. Light source

- The light source is the torch position, not necessarily the player origin.
- The torch position can be derived from the player position with an offset, for example:
  - `torchX = player.x + 8`
  - `torchY = player.y + 6`
- This offset should be configurable.

### 2. Visibility algorithm

Use **ray casting** as the first implementation.

Suggested approach:

- Cast rays in 360 degrees around the torch.
- Use a configurable number of rays, for example `180`, `256`, or `360`.
- Advance each ray in small steps such as `2` pixels.
- Stop the ray when:
  - it reaches maximum light range
  - it hits a tile that blocks light
- As the ray advances, mark pixels or tiles as visible in the light mask.

### 3. Map interaction

The level map uses 16x16 gameplay tiles.

Add a way to determine whether a tile blocks light:

```js
function isLightBlockingTile(tileX, tileY) {
  // true for walls and other fully solid elements
  // false for empty space and non-blocking decoration
}
```

This should be configurable so the game can later decide whether some platforms block light fully, partially, or not at all.

### 4. Light mask

Create a separate structure representing screen visibility.

Preferred first version:

- Per-pixel mask sized `256 * 192`

Alternative acceptable version:

- Per-tile mask at 16x16 resolution, later expanded during rendering

Per-pixel is preferred because it will look better with moving sprites.

Suggested structure:

```js
class LightMask {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.values = new Uint8Array(width * height);
  }

  clear(value = 0) {
    this.values.fill(value);
  }

  indexOf(x, y) {
    return y * this.width + x;
  }

  get(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return 0;
    }
    return this.values[this.indexOf(x, y)];
  }

  set(x, y, value) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }
    this.values[this.indexOf(x, y)] = value;
  }

  max(x, y, value) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }
    const idx = this.indexOf(x, y);
    if (value > this.values[idx]) {
      this.values[idx] = value;
    }
  }
}
```

### 5. Light bands

Use distance from torch to assign a light level.

Example:

- distance `0-32` pixels => level `3`
- distance `33-64` pixels => level `2`
- distance `65-96` pixels => level `1`
- beyond that => level `0`

This should be configurable.

### 6. Rendering rule

Do **not** use transparency or colour fading.

Instead, when drawing a bit that is `1`, check the light mask at the target screen pixel and decide whether that bit should actually be written.

For example:

- level `3`: always draw pixel
- level `2`: draw pixel only on half the positions using a pattern
- level `1`: draw pixel only on a sparse pattern
- level `0`: do not draw pixel

This preserves the retro 1-bit visual style.

## Required engine changes

### A. Add a light mask module

Create a new file, for example:

- `src/spectrum/LightMask.js`

### B. Add a light / visibility calculator

Create a new file, for example:

- `src/spectrum/TorchLightSystem.js`

Responsibilities:

- receive torch position
- receive map collision / blocker lookup callback
- compute the light mask each frame or when needed

Suggested public API:

```js
class TorchLightSystem {
  constructor(options = {}) {
    this.width = options.width ?? 256;
    this.height = options.height ?? 192;
    this.tileSize = options.tileSize ?? 16;
    this.maxDistance = options.maxDistance ?? 96;
    this.rayCount = options.rayCount ?? 256;
    this.stepSize = options.stepSize ?? 2;
    this.lightMask = new LightMask(this.width, this.height);
  }

  rebuild(torchX, torchY, isLightBlockingTile) {
    // clear mask
    // cast rays
    // fill light levels into mask
  }

  getMask() {
    return this.lightMask;
  }
}
```

### C. Extend SpriteDrawer to support light-aware drawing

Modify `SpriteDrawer.drawSprite()` so it can optionally receive a `lightMask` and a `lightMode` or `lightBands` configuration.

Example extended options:

```js
{
  lightMask,
  lightSampling: "per-pixel",
  ignoreLighting: false
}
```

Rules:

- if `ignoreLighting` is `true`, draw as normal
- if no `lightMask` is supplied, draw as normal
- if a `lightMask` is supplied:
  - only write `1` bits according to the light level and pattern
  - `0` bits remain `0`

### D. Optionally extend SpectrumRenderer

Allow `SpectrumRenderer` to store a current frame light mask and pass it into `SpriteDrawer` automatically.

Suggested methods:

```js
setLightMask(lightMask) {
  this.lightMask = lightMask;
}

clearLightMask() {
  this.lightMask = null;
}
```

And in `drawSprite()`:

```js
this.spriteDrawer.drawSprite(x, y, sprite, {
  ...options,
  lightMask: options.lightMask ?? this.lightMask,
});
```

## Dithering patterns

Implement a helper that decides whether to keep a lit pixel.

Example:

```js
function shouldDrawLitPixel(lightLevel, x, y) {
  if (lightLevel >= 3) {
    return true;
  }

  if (lightLevel === 2) {
    return ((x + y) & 1) === 0;
  }

  if (lightLevel === 1) {
    return (x & 1) === 0 && (y & 1) === 0;
  }

  return false;
}
```

This is intentionally simple and Spectrum-friendly.

## Example ray casting logic

```js
rebuild(torchX, torchY, isLightBlockingTile) {
  this.lightMask.clear(0);

  for (let i = 0; i < this.rayCount; i++) {
    const angle = (i / this.rayCount) * Math.PI * 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    for (let distance = 0; distance <= this.maxDistance; distance += this.stepSize) {
      const px = Math.round(torchX + dx * distance);
      const py = Math.round(torchY + dy * distance);

      if (px < 0 || py < 0 || px >= this.width || py >= this.height) {
        break;
      }

      let lightLevel = 0;
      if (distance <= 32) {
        lightLevel = 3;
      } else if (distance <= 64) {
        lightLevel = 2;
      } else if (distance <= 96) {
        lightLevel = 1;
      }

      this.lightMask.max(px, py, lightLevel);

      const tileX = Math.floor(px / this.tileSize);
      const tileY = Math.floor(py / this.tileSize);

      if (distance > 0 && isLightBlockingTile(tileX, tileY)) {
        break;
      }
    }
  }
}
```

## Example SpriteDrawer integration

Below is the intended style of change. The exact implementation can vary.

```js
function shouldDrawLitPixel(lightLevel, x, y) {
  if (lightLevel >= 3) return true;
  if (lightLevel === 2) return ((x + y) & 1) === 0;
  if (lightLevel === 1) return ((x & 1) === 0) && ((y & 1) === 0);
  return false;
}
```

Inside the sprite drawing loop:

```js
const lightMask = options.lightMask || null;
const ignoreLighting = options.ignoreLighting === true;
```

Then, before writing a `1` pixel:

```js
let finalBit = bit;

if (!ignoreLighting && lightMask && bit === 1) {
  const lightLevel = lightMask.get(targetX, targetY);
  finalBit = shouldDrawLitPixel(lightLevel, targetX, targetY) ? 1 : 0;
}
```

Then use `finalBit` in the existing mode logic.

Important:

- For `TRANSPARENT` mode, only draw when `finalBit === 1`
- For `OPAQUE` mode, write `0` or `1` normally, but use `finalBit` instead of the original bit
- For `XOR`, only xor when `finalBit === 1`

## Applying the same light to enemies

Enemies are dynamic sprites. They should use the same rendering rules as the map.

That means:

- compute the light mask once per frame from the torch
- pass that same mask when drawing enemies
- enemies in shadow will be partially or fully hidden by the dither logic

Example:

```js
renderer.setLightMask(torchLightSystem.getMask());

renderer.drawTile(wall.x, wall.y, wall.sprite, {
  ink: 7,
  paper: 0
});

renderer.drawSprite(enemy.x, enemy.y, enemy.sprite, {
  ink: 2,
  paper: 0
});

renderer.drawSprite(player.x, player.y, player.sprite, {
  ink: 6,
  paper: 0,
  ignoreLighting: false
});
```

For special cases, it should be possible to bypass lighting:

```js
renderer.drawSprite(torchFlame.x, torchFlame.y, torchFlame.sprite, {
  ink: 6,
  paper: 0,
  ignoreLighting: true
});
```

## Optional improvements

These are not required in the first version, but the architecture should allow them later:

1. **Directional torch cone**
   - instead of 360 degrees, bias the light toward the facing direction

2. **Soft circle fill around the torch**
   - after ray casting, fill a small lit disc around the player so the immediate area never looks too sparse

3. **Per-tile blocker types**
   - full blocker
   - non-blocker
   - platform blocker only from certain directions

4. **Memory of explored areas**
   - previously seen areas remain faintly visible

5. **Attribute darkening**
   - optionally set paper/ink in fully hidden 8x8 cells to black for stronger contrast
   - keep this separate from the bitmap lighting logic

## Constraints

- Keep the implementation modular.
- Do not rewrite the renderer completely.
- Do not replace the Spectrum renderer with canvas alpha blending.
- Do not introduce WebGL or shaders.
- Preserve compatibility with existing sprite and tile drawing.
- Prefer small, readable classes and helper functions.

## Deliverables

Implement the following:

1. `LightMask.js`
2. `TorchLightSystem.js`
3. Changes to `SpriteDrawer.js`
4. Optional small changes to `SpectrumRenderer.js`
5. A minimal usage example showing:
   - creating the torch lighting system
   - rebuilding the mask from player torch position
   - rendering walls, enemies, and player with the mask applied

## Acceptance criteria

The implementation is successful when:

- walls block torch light
- areas behind walls become hidden or strongly dimmed
- nearby areas are more visible than far areas
- static tiles and moving enemies are both affected by the same mask
- the visual result feels compatible with ZX Spectrum aesthetics
- the engine still renders correctly when no light mask is supplied

## Final note

Favour a solution that is simple, readable, and easy to iterate on. The visual effect should feel atmospheric and retro rather than physically realistic.
