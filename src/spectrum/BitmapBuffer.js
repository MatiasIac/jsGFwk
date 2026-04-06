class BitmapBuffer {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.pixels = new Uint8Array(width * height);
    }

    inBounds(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    indexOf(x, y) {
        return (y * this.width) + x;
    }

    clear(value = 0) {
        this.pixels.fill(value ? 1 : 0);
    }

    setBit(x, y, value) {
        if (!this.inBounds(x, y)) {
            return;
        }

        this.pixels[this.indexOf(x, y)] = value ? 1 : 0;
    }

    xorBit(x, y) {
        if (!this.inBounds(x, y)) {
            return;
        }

        const idx = this.indexOf(x, y);
        this.pixels[idx] = this.pixels[idx] ^ 1;
    }

    getBit(x, y) {
        if (!this.inBounds(x, y)) {
            return 0;
        }

        return this.pixels[this.indexOf(x, y)];
    }
}

export { BitmapBuffer };
