# jsGFwk v3

jsGFwk is a lightweight HTML5/Canvas framework that gives you just the right amount of structure for building 2D games without hijacking your main loop. Every capability—rendering, collisions, input, sprites, audio, scenes, storage—is implemented as an optional plug-in, so you decide exactly how much of the framework to use.

This repository hosts the third generation of the framework. It keeps backward compatibility with older projects where possible, but it modernizes the source by using ES modules and a webpack-based bundle (`dist/jsgfwk-bundle.js`) that you can drop into any project, including Electron or plain browser deployments.

> **Tip:** The quickest way to understand the API is to open `examples/index.html`, which wires up every plug-in and demonstrates sprites, audio, storage, containers, and scenes in a single page.

---

## Getting Started

1. **Reference the bundle and canvas in your page**  
   ```html
   <script src="./scripts/jsgfwk-bundle.js"></script>
   <canvas id="canvas" width="640" height="480"></canvas>
   ```

2. **Instantiate the engine and include the plug-ins you need**
   ```javascript
   const game = new jsGFwk.Engine();
   const animator = new jsGFwk.Animator2D();
   const resourceManager = new jsGFwk.ResourcesManager();
   const sprites = new jsGFwk.Sprites();
   const keyboardIO = new jsGFwk.KeyboardIO();

   game.include(animator);
   game.include(resourceManager);
   game.include(sprites);
   game.include(keyboardIO);
   ```

3. **Create your game objects, load assets, then start the loop**
   ```javascript
   resourceManager.addGraphic({ name: "atlas", source: "./graphics/jumpingBase.png" });
   resourceManager.onResourcesLoadedCompleted = () => {
       sprites.createCollection("fallingGuy", resourceManager.GRAPHICS.atlas.image, [{ left: 0, top: 0, width: 64, height: 32 }]);
       game.createObject(new jsGFwk.VisualGameObject("player", 50, 50, 64, 32));
   };

   game.start();
   ```

---

## Architecture Highlights

### Engine & Animator
- `Engine` keeps the registry of game objects, injects each included plug-in (`game.include(...)`), and owns lifecycle hooks (`onStart`, `onStop`, `onObjectCreated`).
- `Animator2D` is the double-buffered renderer. It clears the buffer, runs every object’s `update(delta)` and `draw(context)` methods, and then blits the buffer to the visible canvas every frame via `requestAnimationFrame`.

### Game Objects & Scenes
- `GameObject` / `VisualGameObject` are the base classes. Visual objects track position, size, visibility, and collision helpers injected by the `Collisions` plug-in.
- `ScenesManager` groups collections of objects into named scenes. Activating a scene creates all its objects at once; deactivating destroys them, making state transitions easy to manage.
- `Containers` let you clone lightweight blueprint objects at runtime (great for particles or bullets) and destroy them individually.

### Assets, Sprites, and Image Tools
- `ResourcesManager` queues graphics (`addGraphic`) and audio (`addSound`) files, tracks load progress, and exposes the loaded assets through `GRAPHICS` and `SOUNDS`. Register `onResourcesLoadedCompleted` to know when you can safely build sprites or play audio.
- `Sprites` slices sprite sheets into reusable collections and supports inverted frames and optional filters.
- `ImageManipulation` and `ImageFilters` provide helpers for merging regions of images, applying convolution filters (blur, sharpen, emboss, etc.), or generating grayscale/inverted variants on the fly.

### Input, Storage, and Interaction
- `KeyboardIO`, `MouseIO`, and `TouchIO` attach DOM listeners when the engine starts and remove them on stop, exposing simple registration APIs (`registerKeypress`, `registerClick`, `registerTouch`, etc.).
- `WebStorage` wraps the browser’s `localStorage` to save structured data (`setData` / `getJson`), handy for remembering high scores or configuration.

### Audio & Timing
- `Jukebox` wraps HTML5 `Audio`, allowing you to create multiple playback channels from a single source, control volume per channel, and trigger overlapping effects.
- `Clock` is a lightweight timer that ticks in `update(delta)` and fires an action when its trigger time elapses—ideal for scripted events.

### Fonts and Camera
- `Fonts.buildFont(name, path)` injects `@font-face` rules at runtime so you can render custom TTF/OTF fonts on your canvas.
- `Camera` is a placeholder plug-in ready for view transforms or scrolling logic if your project needs it.

---

## Putting It Together

```javascript
const game = new jsGFwk.Engine();
const animator = new jsGFwk.Animator2D();
const collisions = new jsGFwk.Collisions();
const scenesManager = new jsGFwk.ScenesManager();

game.include(animator);
game.include(collisions);
game.include(scenesManager);

const player = new jsGFwk.VisualGameObject("Player", 100, 100, 32, 32, 1, true);
player.update = (delta) => { /* movement logic */ };
player.draw = (ctx) => {
    ctx.fillStyle = "#00FFAA";
    ctx.fillRect(player.x, player.y, player.width, player.height);
};

scenesManager.create("main", [player]);
scenesManager.SCENES.main.activate();
game.start();
```

- Use `game.createObject` for ad-hoc objects or rely on `ScenesManager` for deterministic activation/deactivation.
- Call `sprites.SPRITES_BAG.yourSprite.moveNextSprite()` in `update` to animate frame collections.
- Register mouse/keyboard callbacks through their respective IO plug-ins to keep your objects focused on gameplay logic.

---

## Examples & Legacy Content

- `examples/index.html` showcases the full engine: animated sprites, clones, clocks, fonts, sounds, scenes, and storage. Use it as a starting point for your own prototypes.
- `games/` and `v1_games/` contain additional experiments and legacy demos that you can port or learn from.
- `v1_deprecated/` preserves older plug-ins in case you need to reference the previous architecture.

---

<img src="./jsGFwkLogo.png" alt="jsGFwk" width="400" />

If you build something cool with jsGFwk, drop a note or contribute improvements—new plug-ins are easy to add, and the community examples help everyone ship faster.
