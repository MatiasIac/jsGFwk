import { ATTRIBUTE_MODES, DRAW_MODES, DEFAULT_ATTRIBUTE } from "./constants.js";

class SpriteDrawer {
    constructor(bitmapBuffer, attributeBuffer) {
        this.bitmapBuffer = bitmapBuffer;
        this.attributeBuffer = attributeBuffer;
    }

    drawSprite(x, y, sprite, options = {}, drawOrder = 0) {
        if (!sprite || !sprite.data || !Number.isInteger(sprite.width) || !Number.isInteger(sprite.height)) {
            throw new Error("Sprite must include width, height, and data.");
        }

        const mode = options.mode || DRAW_MODES.OPAQUE;
        const attributeMode = options.attributeMode || ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE;
        const affectAttributes = options.affectAttributes !== false;
        const spriteAttribute = {
            ink: options.ink ?? DEFAULT_ATTRIBUTE.ink,
            paper: options.paper ?? DEFAULT_ATTRIBUTE.paper,
            bright: options.bright ?? DEFAULT_ATTRIBUTE.bright,
            flash: options.flash ?? DEFAULT_ATTRIBUTE.flash,
            priority: options.priority ?? drawOrder,
        };

        const touchedCellIndexes = affectAttributes ? new Set() : null;
        const { width, height, data } = sprite;

        for (let sourceY = 0; sourceY < height; sourceY++) {
            const targetY = y + sourceY;
            if (targetY < 0 || targetY >= this.bitmapBuffer.height) {
                continue;
            }

            const rowOffset = sourceY * width;
            for (let sourceX = 0; sourceX < width; sourceX++) {
                const targetX = x + sourceX;
                if (targetX < 0 || targetX >= this.bitmapBuffer.width) {
                    continue;
                }

                const bit = data[rowOffset + sourceX] ? 1 : 0;
                let pixelWasWritten = false;

                if (mode === DRAW_MODES.OPAQUE) {
                    this.bitmapBuffer.setBit(targetX, targetY, bit);
                    pixelWasWritten = true;
                } else if (mode === DRAW_MODES.TRANSPARENT) {
                    if (bit === 1) {
                        this.bitmapBuffer.setBit(targetX, targetY, 1);
                        pixelWasWritten = true;
                    }
                } else if (mode === DRAW_MODES.XOR) {
                    if (bit === 1) {
                        this.bitmapBuffer.xorBit(targetX, targetY);
                        pixelWasWritten = true;
                    }
                } else {
                    throw new Error(`Unknown draw mode: ${mode}`);
                }

                if (touchedCellIndexes && (pixelWasWritten || mode === DRAW_MODES.OPAQUE)) {
                    const cellIndex = this.attributeBuffer.indexOfPixel(targetX, targetY);
                    if (cellIndex >= 0) {
                        touchedCellIndexes.add(cellIndex);
                    }
                }
            }
        }

        if (!touchedCellIndexes || touchedCellIndexes.size === 0) {
            return;
        }

        this._applyAttributes(touchedCellIndexes, spriteAttribute, attributeMode);
    }

    _applyAttributes(cellIndexes, attribute, attributeMode) {
        if (attributeMode === ATTRIBUTE_MODES.BACKGROUND_LOCKED) {
            return;
        }

        if (attributeMode === ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE) {
            for (const idx of cellIndexes) {
                this.attributeBuffer.setByIndex(idx, attribute);
            }
            return;
        }

        if (attributeMode === ATTRIBUTE_MODES.SPRITE_PRIORITY) {
            for (const idx of cellIndexes) {
                const currentPriority = this.attributeBuffer.priority[idx];
                if (attribute.priority >= currentPriority) {
                    this.attributeBuffer.setByIndex(idx, attribute);
                }
            }
            return;
        }

        throw new Error(`Unknown attribute mode: ${attributeMode}`);
    }
}

export { SpriteDrawer };
