import { SpectrumRenderer, ATTRIBUTE_MODES } from "./SpectrumRenderer.js";

class SpectrumAnimator2D {
    _name = "SpectrumAnimator2D";

    constructor(options = {}) {
        this.options = options;
        this.renderer = null;
        this._lastFrame = 0;
        this._rafHandle = null;
        this._frameFn = this._pointer.bind(this);
    }

    _requestAnimationFrame(callback) {
        if (window.requestAnimationFrame) {
            return window.requestAnimationFrame(callback);
        }

        return window.setTimeout(callback, this._gfwk.settings.frameRate || (1000 / 30));
    }

    _cancelAnimationFrame(handle) {
        if (window.cancelAnimationFrame) {
            window.cancelAnimationFrame(handle);
            return;
        }

        window.clearTimeout(handle);
    }

    _pointer() {
        const now = Date.now();
        const delta = this._lastFrame === 0 ? 0 : (now - this._lastFrame) / 1000;
        this._lastFrame = now;

        this.renderer.beginFrame();

        for (let i = 0; i < this._gfwk._includes.length; i++) {
            const include = this._gfwk._includes[i];
            if (include === this) {
                continue;
            }

            if (typeof include.preRenderSpectrum === "function") {
                include.preRenderSpectrum(this.renderer);
            } else if (typeof include.preRender === "function") {
                include.preRender(this.renderer);
            }
        }

        for (const name in this._gfwk._gameObjects) {
            const object = this._gfwk._gameObjects[name];
            if (!object) {
                continue;
            }

            if (typeof object.update === "function") {
                object.update(delta);
            }

            if (object.isVisible === false) {
                continue;
            }

            if (typeof object.drawSpectrum === "function") {
                object.drawSpectrum(this.renderer, delta);
            } else if (typeof object.draw === "function") {
                object.draw(this.renderer);
            }
        }

        for (const name in this._gfwk._gameObjects) {
            const object = this._gfwk._gameObjects[name];
            if (!object) {
                continue;
            }

            if (typeof object.postRenderSpectrum === "function") {
                object.postRenderSpectrum(this.renderer, delta);
            } else if (typeof object.postRender === "function") {
                object.postRender(this.renderer);
            }
        }

        this.renderer.renderFrame(now);
        this._rafHandle = this._requestAnimationFrame(this._frameFn);
    }

    onStart() {
        const canvasId = this._gfwk.settings.canvas;
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error(`SpectrumAnimator2D could not find canvas "${canvasId}".`);
        }

        this.renderer = new SpectrumRenderer(canvas, {
            width: this.options.width || 256,
            height: this.options.height || 192,
            scale: this.options.scale || 2,
            clashMode: this.options.clashMode || ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
            clearAttribute: this.options.clearAttribute,
            flashIntervalMs: this.options.flashIntervalMs,
        });

        this._lastFrame = 0;
        this._rafHandle = this._requestAnimationFrame(this._frameFn);
    }

    onStop() {
        if (this._rafHandle !== null) {
            this._cancelAnimationFrame(this._rafHandle);
            this._rafHandle = null;
        }
    }
}

export { SpectrumAnimator2D };
