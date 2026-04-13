import { LightMask } from "./LightMask.js";

class TorchLightSystem {
    constructor(options = {}) {
        this.width = options.width ?? 256;
        this.height = options.height ?? 192;
        this.tileSize = options.tileSize ?? 16;
        this.fullRadiusCells = options.fullRadiusCells ?? 4;
        this.dimLevels = options.dimLevels ?? 2;
        this.lightMask = new LightMask(this.width, this.height);
    }

    _sanitizeRadiusCells(value) {
        if (!Number.isFinite(value)) {
            return 4;
        }

        return Math.max(1, Math.round(value));
    }

    _sanitizeDimLevels(value) {
        if (!Number.isFinite(value)) {
            return 2;
        }

        const rounded = Math.round(value);
        if (rounded < 0) {
            return 0;
        }
        if (rounded > 2) {
            return 2;
        }
        return rounded;
    }

    setConfig(fullRadiusCells, dimLevels) {
        this.fullRadiusCells = this._sanitizeRadiusCells(fullRadiusCells);
        this.dimLevels = this._sanitizeDimLevels(dimLevels);
    }

    getMask() {
        return this.lightMask;
    }

    _getLevelForTileDistance(tileDistance) {
        if (tileDistance <= this.fullRadiusCells) {
            return 3;
        }

        if (this.dimLevels >= 1 && tileDistance <= (this.fullRadiusCells + 1)) {
            return 2;
        }

        if (this.dimLevels >= 2 && tileDistance <= (this.fullRadiusCells + 2)) {
            return 1;
        }

        return 0;
    }

    rebuild(torchX, torchY) {
        const sourceX = Math.round(torchX);
        const sourceY = Math.round(torchY);

        const torchTileX = Math.floor(sourceX / this.tileSize);
        const torchTileY = Math.floor(sourceY / this.tileSize);

        this.lightMask.clear(0);

        let idx = 0;
        for (let y = 0; y < this.height; y++) {
            const tileY = Math.floor(y / this.tileSize);
            for (let x = 0; x < this.width; x++, idx++) {
                const tileX = Math.floor(x / this.tileSize);
                const dx = tileX - torchTileX;
                const dy = tileY - torchTileY;
                const tileDistance = Math.sqrt((dx * dx) + (dy * dy));
                this.lightMask.values[idx] = this._getLevelForTileDistance(tileDistance);
            }
        }
    }
}

export { TorchLightSystem };
