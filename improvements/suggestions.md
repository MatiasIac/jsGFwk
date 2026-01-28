# Framework Improvement Suggestions

1. **Fix requestAnimFrame fallback scope** (src/animator2d.js:61-69)
   - The shim delegates to window.setTimeout(callback, _gfwk.settings.frameRate), but _gfwk is not defined within that closure, so any browser falling back to setTimeout will throw before the engine even starts. Cache this._gfwk outside the closure (or pass this) so the fallback works when requestAnimationFrame is unavailable.

2. **Correct convolution bounds in ImageFilters** (src/imageFilters.js:31-33)
   - The convolution helper references sw/sh, yet only w/h exist in scope. This means every 3x3 filter (blur, emboss, etc.) will raise a ReferenceError on the first iteration. Replace those identifiers with the already computed width/height so the filters can run.

3. **Stabilize sprite cloning/generation** (src/sprites.js:38-78)
   - SpriteCollection.clone reads self.sprites[i], but self is undefined. Likewise, _genSprite calls tempContext.translate(spriteObject.width, 0) even though only object exists. These bugs surface as soon as you try to clone a collection or invert a sprite. Use the proper this/object references so sprite utilities are safe to call.

4. **Honor explicit visibility when constructing visual objects** (src/gameObjects.js:22-32)
   - The constructor sets this.isVisible = isVisible || true, which coerces every falsy value to true. You cannot create an invisible object or pass false when toggling scenes. Prefer this.isVisible = (isVisible !== undefined ? isVisible : true) (or nullish coalescing) so callers keep control.

5. **Start resource loading immediately and surface progress/errors** (src/resourcesManager.js:82-99)
   - onStart waits two seconds before assigning src values, which adds a fixed startup delay and hides load failures (e.g., bad URLs) until the timeout fires. Kicking off network requests immediately and returning promises (or dispatching progress/error callbacks per asset) would make boot time deterministic and easier to debug.

6. **Detach DOM listeners on shutdown** (src/keyboardIO.js:51-68, src/mouseIO.js:67-98, src/touchIO.js:24-33)
   - Input modules register global listeners in onStart but never expose onStop logic. Re-entering a scene, switching canvases, or tearing down the engine leaves orphan listeners and duplicated callbacks. Track bound handlers and remove them during onStop to avoid leaks and duplicated events.
