function _normalizeRawBit(value) {
    if (typeof value === "number") {
        return value ? 1 : 0;
    }

    if (typeof value === "string") {
        return (value === "1" || value === "#" || value === "X") ? 1 : 0;
    }

    return 0;
}

function _toDataFromRows(width, height, rows) {
    if (!Array.isArray(rows) || rows.length !== height) {
        throw new Error("Sprite rows must match sprite height.");
    }

    const data = new Uint8Array(width * height);

    for (let y = 0; y < height; y++) {
        const row = rows[y];
        if (typeof row !== "string" || row.length !== width) {
            throw new Error("Each sprite row must be a string matching sprite width.");
        }

        for (let x = 0; x < width; x++) {
            data[(y * width) + x] = _normalizeRawBit(row[x]);
        }
    }

    return data;
}

function _toDataFromFlat(width, height, source) {
    if (!Array.isArray(source) && !(source instanceof Uint8Array)) {
        throw new Error("Sprite data must be rows or a flat array.");
    }

    if (source.length !== width * height) {
        throw new Error("Flat sprite data length must equal width * height.");
    }

    const data = new Uint8Array(width * height);
    for (let i = 0; i < source.length; i++) {
        data[i] = _normalizeRawBit(source[i]);
    }

    return data;
}

function createMonochromeSprite(width, height, rowsOrData) {
    if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
        throw new Error("Sprite width and height must be positive integers.");
    }

    const isRows = Array.isArray(rowsOrData) && rowsOrData.length > 0 && typeof rowsOrData[0] === "string";
    const data = isRows
        ? _toDataFromRows(width, height, rowsOrData)
        : _toDataFromFlat(width, height, rowsOrData);

    return {
        width,
        height,
        data,
    };
}

export { createMonochromeSprite };
