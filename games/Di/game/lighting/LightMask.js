class LightMask {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.values = new Uint8Array(width * height);
    }

    clear(value = 0) {
        this.values.fill(value);
    }

    inBounds(x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }

    indexOf(x, y) {
        return (y * this.width) + x;
    }

    get(x, y) {
        if (!this.inBounds(x, y)) {
            return 0;
        }

        return this.values[this.indexOf(x, y)];
    }

    set(x, y, value) {
        if (!this.inBounds(x, y)) {
            return;
        }

        this.values[this.indexOf(x, y)] = value;
    }

    max(x, y, value) {
        if (!this.inBounds(x, y)) {
            return;
        }

        const idx = this.indexOf(x, y);
        if (value > this.values[idx]) {
            this.values[idx] = value;
        }
    }
}

export { LightMask };
