function _hash32(x, y, seed) {
    let h = ((x * 73856093) ^ (y * 19349663) ^ (seed * 83492791)) >>> 0;
    h ^= h >>> 13;
    h = (h * 1274126177) >>> 0;
    h ^= h >>> 16;
    return h >>> 0;
}

function shouldDrawLitPixel(lightLevel, x, y, options = {}) {
    const flickerEnabled = options.flickerEnabled !== false;
    const flickerTick = options.flickerTick | 0;
    const flickerStrength = Math.max(0, Math.min(1, options.flickerStrength ?? 0.35));

    if (lightLevel >= 3) {
        return true;
    }

    if (lightLevel === 2) {
        const phase = flickerEnabled ? (flickerTick & 1) : 0;
        let keep = ((x + y + phase) & 1) === 0;

        if (flickerEnabled && flickerStrength > 0) {
            const toggleChance = Math.floor(4 * flickerStrength);
            if ((_hash32(x, y, flickerTick) & 31) < toggleChance) {
                keep = !keep;
            }
        }

        return keep;
    }

    if (lightLevel === 1) {
        const phaseX = flickerEnabled ? ((flickerTick >> 1) & 1) : 0;
        const phaseY = flickerEnabled ? ((flickerTick >> 2) & 1) : 0;
        let keep = ((x + phaseX) & 1) === 0 && ((y + phaseY) & 1) === 0;

        if (flickerEnabled && flickerStrength > 0) {
            const toggleChance = Math.floor(3 * flickerStrength);
            if ((_hash32(x, y, flickerTick + 17) & 63) < toggleChance) {
                keep = !keep;
            }
        }

        return keep;
    }

    return false;
}

function applyLightMaskToRenderer(renderer, lightMask, options = {}) {
    if (!renderer || !lightMask) {
        return;
    }

    const bitmapBuffer = renderer.bitmapBuffer;
    if (!bitmapBuffer || !bitmapBuffer.pixels || !lightMask.values) {
        return;
    }

    const width = lightMask.width;
    const height = lightMask.height;
    const pixels = bitmapBuffer.pixels;
    const maskValues = lightMask.values;

    if ((width * height) !== pixels.length || maskValues.length !== pixels.length) {
        return;
    }

    let idx = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++, idx++) {
            if (pixels[idx] === 0) {
                continue;
            }

            if (!shouldDrawLitPixel(maskValues[idx], x, y, options)) {
                pixels[idx] = 0;
            }
        }
    }
}

export { applyLightMaskToRenderer, shouldDrawLitPixel };
