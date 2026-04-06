import {
    ATTRIBUTE_WIDTH,
    ATTRIBUTE_HEIGHT,
    ATTRIBUTE_CELL_SIZE,
    DEFAULT_ATTRIBUTE,
} from "./constants.js";
import { sanitizeColorIndex } from "./SpectrumPalette.js";

class AttributeBuffer {
    constructor(cellWidth = ATTRIBUTE_WIDTH, cellHeight = ATTRIBUTE_HEIGHT) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.length = cellWidth * cellHeight;

        this.ink = new Uint8Array(this.length);
        this.paper = new Uint8Array(this.length);
        this.bright = new Uint8Array(this.length);
        this.flash = new Uint8Array(this.length);
        this.priority = new Int16Array(this.length);

        this.clear(DEFAULT_ATTRIBUTE);
    }

    inBoundsCell(cellX, cellY) {
        return cellX >= 0 && cellX < this.cellWidth && cellY >= 0 && cellY < this.cellHeight;
    }

    indexOfCell(cellX, cellY) {
        if (!this.inBoundsCell(cellX, cellY)) {
            return -1;
        }

        return (cellY * this.cellWidth) + cellX;
    }

    indexOfPixel(x, y) {
        const cellX = x >> 3;
        const cellY = y >> 3;
        return this.indexOfCell(cellX, cellY);
    }

    clear(attribute = DEFAULT_ATTRIBUTE) {
        const normalized = this._normalize(attribute, DEFAULT_ATTRIBUTE.priority);

        this.ink.fill(normalized.ink);
        this.paper.fill(normalized.paper);
        this.bright.fill(normalized.bright ? 1 : 0);
        this.flash.fill(normalized.flash ? 1 : 0);
        this.priority.fill(normalized.priority);
    }

    setCell(cellX, cellY, attribute) {
        const index = this.indexOfCell(cellX, cellY);
        if (index < 0) {
            return;
        }

        this.setByIndex(index, attribute);
    }

    setByIndex(index, attribute) {
        if (index < 0 || index >= this.length) {
            return;
        }

        const normalized = this._normalize(attribute, this.priority[index]);
        this.ink[index] = normalized.ink;
        this.paper[index] = normalized.paper;
        this.bright[index] = normalized.bright ? 1 : 0;
        this.flash[index] = normalized.flash ? 1 : 0;
        this.priority[index] = normalized.priority;
    }

    getCell(cellX, cellY) {
        const index = this.indexOfCell(cellX, cellY);
        if (index < 0) {
            return null;
        }

        return this.getByIndex(index);
    }

    getByIndex(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }

        return {
            ink: this.ink[index],
            paper: this.paper[index],
            bright: this.bright[index] === 1,
            flash: this.flash[index] === 1,
            priority: this.priority[index],
        };
    }

    _normalize(attribute, fallbackPriority) {
        const ink = sanitizeColorIndex(attribute?.ink ?? DEFAULT_ATTRIBUTE.ink);
        const paper = sanitizeColorIndex(attribute?.paper ?? DEFAULT_ATTRIBUTE.paper);

        return {
            ink,
            paper,
            bright: Boolean(attribute?.bright),
            flash: Boolean(attribute?.flash),
            priority: Number.isFinite(attribute?.priority) ? (attribute.priority | 0) : (fallbackPriority | 0),
        };
    }
}

export { AttributeBuffer, ATTRIBUTE_CELL_SIZE };
