const NORMAL_RGB = [
    [0, 0, 0],
    [0, 0, 205],
    [205, 0, 0],
    [205, 0, 205],
    [0, 205, 0],
    [0, 205, 205],
    [205, 205, 0],
    [205, 205, 205],
];

const BRIGHT_RGB = [
    [0, 0, 0],
    [0, 0, 255],
    [255, 0, 0],
    [255, 0, 255],
    [0, 255, 0],
    [0, 255, 255],
    [255, 255, 0],
    [255, 255, 255],
];

function sanitizeColorIndex(index) {
    if (!Number.isFinite(index)) {
        return 0;
    }

    return Math.max(0, Math.min(7, index | 0));
}

function toRgba(colorTriplet) {
    return [colorTriplet[0], colorTriplet[1], colorTriplet[2], 255];
}

function getPaletteRgba(colorIndex, isBright) {
    const safeIndex = sanitizeColorIndex(colorIndex);
    const source = isBright ? BRIGHT_RGB : NORMAL_RGB;
    return toRgba(source[safeIndex]);
}

export { getPaletteRgba, sanitizeColorIndex };
