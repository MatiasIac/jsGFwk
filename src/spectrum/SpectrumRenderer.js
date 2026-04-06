import { BitmapBuffer } from "./BitmapBuffer.js";
import { AttributeBuffer } from "./AttributeBuffer.js";
import { SpriteDrawer } from "./SpriteDrawer.js";
import { CanvasPresenter } from "./CanvasPresenter.js";
import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    ATTRIBUTE_MODES,
    DRAW_MODES,
    DEFAULT_ATTRIBUTE,
} from "./constants.js";

class SpectrumRenderer {
    constructor(canvas, options = {}) {
        this.width = options.width || SCREEN_WIDTH;
        this.height = options.height || SCREEN_HEIGHT;
        this.scale = options.scale || 2;
        this.clashMode = options.clashMode || ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE;
        this.defaultAttribute = {
            ink: options.clearAttribute?.ink ?? DEFAULT_ATTRIBUTE.ink,
            paper: options.clearAttribute?.paper ?? DEFAULT_ATTRIBUTE.paper,
            bright: Boolean(options.clearAttribute?.bright),
            flash: Boolean(options.clearAttribute?.flash),
            priority: 0,
        };
        this.flashIntervalMs = options.flashIntervalMs || 320;

        this.bitmapBuffer = new BitmapBuffer(this.width, this.height);
        this.attributeBuffer = new AttributeBuffer(this.width >> 3, this.height >> 3);
        this.spriteDrawer = new SpriteDrawer(this.bitmapBuffer, this.attributeBuffer);
        this.presenter = new CanvasPresenter(canvas, {
            width: this.width,
            height: this.height,
            scale: this.scale,
        });

        this._drawOrder = 0;
        this._lastFlashToggleMs = 0;
        this._flashPhase = false;
    }

    setScale(scale) {
        this.scale = Math.max(1, scale | 0);
        this.presenter.setScale(this.scale);
    }

    setClashMode(mode) {
        this.clashMode = mode;
    }

    clear(attribute = this.defaultAttribute) {
        this.bitmapBuffer.clear(0);
        this.attributeBuffer.clear({ ...attribute, priority: 0 });
        this._drawOrder = 0;
    }

    beginFrame(options = {}) {
        const shouldClear = options.clear !== false;
        if (!shouldClear) {
            this._drawOrder = 0;
            return;
        }

        const clearAttribute = options.attribute || this.defaultAttribute;
        this.clear(clearAttribute);
    }

    setAttributeCell(cellX, cellY, attribute) {
        this.attributeBuffer.setCell(cellX, cellY, {
            ink: attribute?.ink,
            paper: attribute?.paper,
            bright: Boolean(attribute?.bright),
            flash: Boolean(attribute?.flash),
            priority: attribute?.priority ?? 0,
        });
    }

    plotPixel(x, y, bit = 1) {
        this.bitmapBuffer.setBit(x, y, bit ? 1 : 0);
    }

    fillRect(x, y, width, height, bit = 1) {
        const sourceX = x | 0;
        const sourceY = y | 0;
        const sourceWidth = Math.max(0, width | 0);
        const sourceHeight = Math.max(0, height | 0);

        const x0 = Math.max(0, sourceX);
        const y0 = Math.max(0, sourceY);
        const x1 = Math.min(this.width, sourceX + sourceWidth);
        const y1 = Math.min(this.height, sourceY + sourceHeight);

        for (let py = y0; py < y1; py++) {
            for (let px = x0; px < x1; px++) {
                this.bitmapBuffer.setBit(px, py, bit ? 1 : 0);
            }
        }
    }

    drawTile(x, y, tile, options = {}) {
        this.drawSprite(x, y, tile, options);
    }

    drawSprite(x, y, sprite, options = {}) {
        this._drawOrder += 1;

        this.spriteDrawer.drawSprite(
            x | 0,
            y | 0,
            sprite,
            {
                ink: options.ink,
                paper: options.paper,
                bright: options.bright,
                flash: options.flash,
                mode: options.mode || DRAW_MODES.OPAQUE,
                attributeMode: options.attributeMode || this.clashMode,
                affectAttributes: options.affectAttributes,
                priority: options.priority ?? this._drawOrder,
            },
            this._drawOrder,
        );
    }

    renderFrame(nowMs = Date.now()) {
        if (this._lastFlashToggleMs === 0) {
            this._lastFlashToggleMs = nowMs;
        } else if (this.flashIntervalMs > 0 && (nowMs - this._lastFlashToggleMs) >= this.flashIntervalMs) {
            this._flashPhase = !this._flashPhase;
            this._lastFlashToggleMs = nowMs;
        }

        this.presenter.render(this.bitmapBuffer, this.attributeBuffer, this._flashPhase);
    }
}

export { SpectrumRenderer, ATTRIBUTE_MODES, DRAW_MODES };
