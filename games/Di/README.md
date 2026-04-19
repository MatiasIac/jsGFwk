# Di ZX Port Scaffold

This folder contains a starter port of **ShaculaV2** from `v1_deprecated/v1_games/ShaculaV2` to the current jsGFwk bundle using the ZX Spectrum renderer.

## What is scaffolded

- ZX screen setup at `256x192` using `SpectrumAnimator2D`
- Tile size locked to `16x16` (16 columns x 12 rows)
- Level data kept in ZX-native coordinates inside:
  - `games/Di/game/data/legacy-levels.js`
- Enemy definitions grouped by type (`spikes`, `bats`, `fallingWalls`, `saws`) under `level.enemies`
- Preferred level keys are now `exits` (instead of legacy `exit`) and `enemies.*` (instead of scattered enemy arrays)
- Placeholder rendering for:
  - platforms
  - exits
  - spikes
  - bat/blood markers
- Basic player controller:
  - `A` / `D` movement
  - `W` or `Space` jump
  - gravity + platform landing
  - `Shift` sprint
  - animated 2-frame sets for run left/right and jump left/right
  - idle uses the default sprite
  - exits trigger when touched
  - exit anti-bounce guard after screen transitions
  - spike respawn
- Torch lighting system:
  - per-pixel light mask computed from a cell-radius circle around the torch/player
  - full-visibility core plus up to 2 configurable dim rings
  - ZX-style darkness via dithering (no alpha blending)
  - same mask affects map and moving sprites
  - per-room adjustable light radius in cells
  - optional flicker on dim rings for torch-like motion
- Platform rendering flexibility:
  - platform visuals can use 16x16, 8x16, 16x8, or 8x8 tile sprites
  - collision/physics remain rectangle-based and unchanged

## Files

- `index.html`: runnable page
- `main.js`: game bootstrap, scene wiring, and public debug/runtime API
- `game/config.js`: screen/tile constants
- `game/sprites.js`: all sprite graphics and draw styles
- `game/level-port.js`: level normalizer (accepts ZX-native data and keeps legacy fallback mapping)
- `game/data/legacy-levels.js`: ZX-native room data used by this port
- `game/runtime/RuntimeState.js`: level state, transitions, and status messaging
- `game/objects/WorldLayer.js`: room/platform rendering
- `game/objects/Player.js`: movement, collision, exits, hazards, and player animation
- `game/objects/LightingLayer.js`: torch light mask updates and flicker
- `game/tile-size.js`: tile-size sanitization helpers for mixed 8/16 render tiles
- `game/utils/math.js`: shared clamp/intersection helpers

## Notes for continuation

- The scaffold currently focuses on room structure and flow.
- Legacy systems like movable walls, saw behavior, item swapping, and light/radar are not implemented yet.
- Normalized levels are available in `window.diPort.levels` for quick debugging in the browser console.
- Runtime lighting controls in browser console:
  - `window.diPort.setCurrentRoomLightRadius(4, 2)` (`radiusCells`, `dimLevels`)
  - `window.diPort.setRoomLightRadius(3, 5, 1)` (0-based level index)
  - `window.diPort.clearRoomLightRadius(3)`
  - `window.diPort.setDefaultLightRadius(4)`
  - `window.diPort.setDefaultLightDimLevels(2)`
  - `window.diPort.getCurrentLightConfig()`
  - `window.diPort.setLightFlicker(true, 0.35, 10)` (`enabled`, `strength`, `rateHz`)
  - `window.diPort.getLightFlicker()`
- Runtime platform tile-size controls:
  - `window.diPort.setCurrentLevelPlatformTileSize(0, 8, 16)` (`platformIndex`, `tileW`, `tileH`)
  - `window.diPort.clearCurrentLevelPlatformTileSize(0)`
  - `window.diPort.setPlatformTileSize(3, 2, 16, 8)` (`levelIndex`, `platformIndex`, `tileW`, `tileH`)
  - `window.diPort.clearPlatformTileSize(3, 2)`

## Collision vs Render Size Example

Collision uses `platform.width` / `platform.height`.
Rendering pattern size uses `platform.renderTileWidth` / `platform.renderTileHeight`.

Example in browser console:

```js
const levelIndex = window.diPort.runtime.currentIndex;
const platforms = window.diPort.levels[levelIndex].platforms;

// Example 1: wood plank (32x8 collision), rendered as 16x8 chunks
const plank = platforms[0];
plank.x = 64;
plank.y = 96;
plank.width = 32;
plank.height = 8;
plank.renderTileWidth = 16;
plank.renderTileHeight = 8;

// Example 2: slim wall (8x96 collision), rendered as 8x16 chunks
const slimWall = platforms[1];
slimWall.x = 120;
slimWall.y = 48;
slimWall.width = 8;
slimWall.height = 96;
slimWall.renderTileWidth = 8;
slimWall.renderTileHeight = 16;
```

If you only change `renderTileWidth` / `renderTileHeight`, collision will not change.
