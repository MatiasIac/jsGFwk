import { PORT_CONFIG, LEGACY_BLOCK_SIZE } from "./config.js";

const {
    LEGACY_SCREEN_WIDTH,
    LEGACY_SCREEN_HEIGHT,
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    TILE_SIZE,
    GRID_WIDTH,
    GRID_HEIGHT,
} = PORT_CONFIG;

function clamp(value, min, max) {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

function asNumber(value, fallback) {
    return Number.isFinite(value) ? value : fallback;
}

function sanitizeRenderTileDimension(value) {
    return value === 8 ? 8 : 16;
}

function mapLegacyXToTile(x) {
    const mapped = Math.floor((x / LEGACY_SCREEN_WIDTH) * GRID_WIDTH);
    return clamp(mapped, 0, GRID_WIDTH - 1);
}

function mapLegacyYToTile(y) {
    const mapped = Math.floor((y / LEGACY_SCREEN_HEIGHT) * GRID_HEIGHT);
    return clamp(mapped, 0, GRID_HEIGHT - 1);
}

function mapLegacyRectToTiles(rect, defaultSize = LEGACY_BLOCK_SIZE) {
    const x = asNumber(rect?.x, 0);
    const y = asNumber(rect?.y, 0);
    const width = Math.max(1, asNumber(rect?.width, defaultSize.width));
    const height = Math.max(1, asNumber(rect?.height, defaultSize.height));

    const tileX = mapLegacyXToTile(x);
    const tileY = mapLegacyYToTile(y);

    const endTileX = clamp(
        Math.ceil(((x + width) / LEGACY_SCREEN_WIDTH) * GRID_WIDTH),
        tileX + 1,
        GRID_WIDTH
    );
    const endTileY = clamp(
        Math.ceil(((y + height) / LEGACY_SCREEN_HEIGHT) * GRID_HEIGHT),
        tileY + 1,
        GRID_HEIGHT
    );

    const tileWidth = endTileX - tileX;
    const tileHeight = endTileY - tileY;
    const customTileWidth = rect?.renderTileWidth ?? rect?.tileWidth;
    const customTileHeight = rect?.renderTileHeight ?? rect?.tileHeight;

    return {
        x: tileX * TILE_SIZE,
        y: tileY * TILE_SIZE,
        width: tileWidth * TILE_SIZE,
        height: tileHeight * TILE_SIZE,
        tileX,
        tileY,
        tileWidth,
        tileHeight,
        ...(Number.isFinite(customTileWidth) ? { renderTileWidth: sanitizeRenderTileDimension(customTileWidth) } : {}),
        ...(Number.isFinite(customTileHeight) ? { renderTileHeight: sanitizeRenderTileDimension(customTileHeight) } : {}),
    };
}

function mapLegacyPointToPixels(point, fallback = { x: 0, y: 0 }) {
    const x = asNumber(point?.x, fallback.x);
    const y = asNumber(point?.y, fallback.y);

    const tileX = mapLegacyXToTile(x);
    const tileY = mapLegacyYToTile(y);

    return {
        x: tileX * TILE_SIZE,
        y: tileY * TILE_SIZE,
    };
}

function mapRectArray(items, defaultSize = LEGACY_BLOCK_SIZE) {
    if (!Array.isArray(items)) {
        return [];
    }

    return items.map((item) => mapLegacyRectToTiles(item, defaultSize));
}

function mapPointArray(items) {
    if (!Array.isArray(items)) {
        return [];
    }

    return items.map((item) => mapLegacyPointToPixels(item));
}

function mapOptionalRect(entry, defaultSize = LEGACY_BLOCK_SIZE) {
    if (!entry) {
        return null;
    }

    return mapLegacyRectToTiles(entry, defaultSize);
}

function mapExits(exits, defaultSpawn, fallbackLevelIndex) {
    if (!Array.isArray(exits)) {
        return [];
    }

    return exits.map((entry, exitIndex) => {
        const mapped = mapLegacyRectToTiles(entry);
        const showsAt = mapLegacyPointToPixels(entry?.showsAt, defaultSpawn);

        return {
            ...mapped,
            id: `exit-${fallbackLevelIndex}-${exitIndex}`,
            goTo: Number.isInteger(entry?.goTo) ? entry.goTo : fallbackLevelIndex,
            type: entry?.type || "door",
            showsAt,
        };
    });
}

function mapLevel(level, levelIndex) {
    const startingPoint = mapLegacyPointToPixels(level?.startingPoint);

    return {
        index: levelIndex,
        startingPoint,
        platforms: mapRectArray(level?.platforms),
        exits: mapExits(level?.exit, startingPoint, levelIndex),
        spikes: mapRectArray(level?.spikes),
        bats: mapPointArray(level?.bats),
        blood: mapPointArray(level?.blood),
        fallingWalls: mapRectArray(level?.fallingWalls),
        levers: mapPointArray(level?.levers),
        movableWalls: mapRectArray(level?.movableWalls),
        saws: mapRectArray(level?.saws),
        item: mapOptionalRect(level?.item, { width: 18, height: 18 }),
        portal: mapOptionalRect(level?.portal),
        coffin: mapOptionalRect(level?.coffin),
        skeletonDoor: mapOptionalRect(level?.skeletonDoor),
        stakeDoor: mapOptionalRect(level?.stakeDoor),
        batteryContainer: mapOptionalRect(level?.batteryContainer, { width: 95, height: 54 }),
        foreground: Boolean(level?.foreground),
    };
}

function buildPortedLevels(legacyLevels) {
    if (!Array.isArray(legacyLevels)) {
        return [];
    }

    return legacyLevels.map((level, index) => mapLevel(level, index));
}

export { buildPortedLevels, SCREEN_WIDTH, SCREEN_HEIGHT, TILE_SIZE };
