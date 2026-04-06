import { getPaletteRgba } from "./SpectrumPalette.js";

class CanvasPresenter {
    constructor(canvas, options) {
        if (!canvas) {
            throw new Error("CanvasPresenter requires a target canvas.");
        }

        this.canvas = canvas;
        this.width = options.width;
        this.height = options.height;
        this.scale = options.scale || 1;

        this.outputContext = this.canvas.getContext("2d");
        this.offscreenCanvas = document.createElement("canvas");
        this.offscreenCanvas.width = this.width;
        this.offscreenCanvas.height = this.height;
        this.offscreenContext = this.offscreenCanvas.getContext("2d");
        this.imageData = this.offscreenContext.createImageData(this.width, this.height);

        this.setScale(this.scale);
    }

    setScale(scale) {
        this.scale = Math.max(1, scale | 0);
        this.canvas.width = this.width * this.scale;
        this.canvas.height = this.height * this.scale;

        this.outputContext.imageSmoothingEnabled = false;
        this.offscreenContext.imageSmoothingEnabled = false;
    }

    render(bitmapBuffer, attributeBuffer, flashPhase = false) {
        const rgba = this.imageData.data;
        const pixels = bitmapBuffer.pixels;
        const width = bitmapBuffer.width;
        const height = bitmapBuffer.height;
        const attrWidth = attributeBuffer.cellWidth;

        for (let y = 0; y < height; y++) {
            const rowOffset = y * width;
            const attrRowOffset = (y >> 3) * attrWidth;

            for (let x = 0; x < width; x++) {
                const pixelIndex = rowOffset + x;
                const attrIndex = attrRowOffset + (x >> 3);
                const isInkBit = pixels[pixelIndex] === 1;

                const flash = attributeBuffer.flash[attrIndex] === 1;
                const effectiveInkBit = (flash && flashPhase) ? !isInkBit : isInkBit;
                const colorIndex = effectiveInkBit ? attributeBuffer.ink[attrIndex] : attributeBuffer.paper[attrIndex];
                const isBright = attributeBuffer.bright[attrIndex] === 1;
                const color = getPaletteRgba(colorIndex, isBright);

                const rgbaIndex = pixelIndex * 4;
                rgba[rgbaIndex] = color[0];
                rgba[rgbaIndex + 1] = color[1];
                rgba[rgbaIndex + 2] = color[2];
                rgba[rgbaIndex + 3] = color[3];
            }
        }

        this.offscreenContext.putImageData(this.imageData, 0, 0);
        this.outputContext.imageSmoothingEnabled = false;
        this.outputContext.drawImage(
            this.offscreenCanvas,
            0,
            0,
            this.canvas.width,
            this.canvas.height,
        );
    }
}

export { CanvasPresenter };
