import { PORT_CONFIG } from "./config.js";
import { sanitizeRenderTileDimension } from "./tile-size.js";

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

function pickRest(entry, excludedKeys) {
    const clone = { ...(entry || {}) };

    for (const key of excludedKeys) {
        delete clone[key];
    }

    return clone;
}

function hasNumeric(value) {
    return Number.isFinite(value);
}

function mapLegacyXToTile(x) {
    const mapped = Math.floor((x / LEGACY_SCREEN_WIDTH) * GRID_WIDTH);
    return clamp(mapped, 0, GRID_WIDTH - 1);
}

function mapLegacyYToTile(y) {
    const mapped = Math.floor((y / LEGACY_SCREEN_HEIGHT) * GRID_HEIGHT);
    return clamp(mapped, 0, GRID_HEIGHT - 1);
}

function mapLegacyRectToTiles(rect, defaults = { width: TILE_SIZE, height: TILE_SIZE }) {
    const x = asNumber(rect?.x, 0);
    const y = asNumber(rect?.y, 0);
    const width = Math.max(1, asNumber(rect?.width, defaults.width));
    const height = Math.max(1, asNumber(rect?.height, defaults.height));

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

    return {
        x: tileX * TILE_SIZE,
        y: tileY * TILE_SIZE,
        width: (endTileX - tileX) * TILE_SIZE,
        height: (endTileY - tileY) * TILE_SIZE,
    };
}

function mapLegacyPointToPixels(point, fallback = { x: 0, y: 0 }) {
    const x = asNumber(point?.x, fallback.x);
    const y = asNumber(point?.y, fallback.y);

    return {
        x: mapLegacyXToTile(x) * TILE_SIZE,
        y: mapLegacyYToTile(y) * TILE_SIZE,
    };
}

function normalizeLegacyDistance(distance) {
    if (!Number.isFinite(distance)) {
        return undefined;
    }

    return Math.max(1, Math.round((distance / LEGACY_SCREEN_WIDTH) * SCREEN_WIDTH));
}

function isLikelyLegacyPoint(entry) {
    return (entry?.x > (SCREEN_WIDTH - 1)) || (entry?.y > (SCREEN_HEIGHT - 1));
}

function isLikelyLegacyRect(entry) {
    return (
        (entry?.x > (SCREEN_WIDTH - 1))
        || (entry?.y > (SCREEN_HEIGHT - 1))
        || (entry?.width > SCREEN_WIDTH)
        || (entry?.height > SCREEN_HEIGHT)
    );
}

function normalizeRectPixels(entry, defaults = { width: TILE_SIZE, height: TILE_SIZE }, allowOffscreen = false) {
    const x = Math.round(asNumber(entry?.x, 0));
    const y = Math.round(asNumber(entry?.y, 0));
    const width = Math.max(1, Math.round(asNumber(entry?.width, defaults.width)));
    const height = Math.max(1, Math.round(asNumber(entry?.height, defaults.height)));

    if (allowOffscreen) {
        return { x, y, width, height };
    }

    const clampedX = clamp(x, 0, SCREEN_WIDTH - 1);
    const clampedY = clamp(y, 0, SCREEN_HEIGHT - 1);
    const maxWidth = SCREEN_WIDTH - clampedX;
    const maxHeight = SCREEN_HEIGHT - clampedY;

    return {
        x: clampedX,
        y: clampedY,
        width: clamp(width, 1, Math.max(1, maxWidth)),
        height: clamp(height, 1, Math.max(1, maxHeight)),
    };
}

function normalizeRect(entry, defaults = { width: TILE_SIZE, height: TILE_SIZE }, options = {}) {
    if (!entry) {
        return null;
    }

    const useLegacy = isLikelyLegacyRect(entry);
    const allowOffscreen = options.allowOffscreen === true;
    const mapped = useLegacy
        ? mapLegacyRectToTiles(entry, defaults)
        : normalizeRectPixels(entry, defaults, allowOffscreen);

    const renderTileWidth = entry?.renderTileWidth ?? entry?.tileWidth;
    const renderTileHeight = entry?.renderTileHeight ?? entry?.tileHeight;

    return {
        ...mapped,
        ...pickRest(entry, ["x", "y", "width", "height", "renderTileWidth", "renderTileHeight", "tileWidth", "tileHeight"]),
        ...(hasNumeric(renderTileWidth) ? { renderTileWidth: sanitizeRenderTileDimension(renderTileWidth) } : {}),
        ...(hasNumeric(renderTileHeight) ? { renderTileHeight: sanitizeRenderTileDimension(renderTileHeight) } : {}),
    };
}

function normalizePoint(entry, fallback = { x: 0, y: 0 }, options = {}) {
    const allowOffscreen = options.allowOffscreen === true;
    const x = asNumber(entry?.x, fallback.x);
    const y = asNumber(entry?.y, fallback.y);

    if (isLikelyLegacyPoint({ x, y })) {
        return mapLegacyPointToPixels({ x, y }, fallback);
    }

    if (allowOffscreen) {
        return {
            x: Math.round(x),
            y: Math.round(y),
        };
    }

    return {
        x: clamp(Math.round(x), 0, SCREEN_WIDTH - 1),
        y: clamp(Math.round(y), 0, SCREEN_HEIGHT - 1),
    };
}

function normalizeRectArray(items, defaults = { width: TILE_SIZE, height: TILE_SIZE }, options = {}) {
    if (!Array.isArray(items)) {
        return [];
    }

    return items
        .map((entry) => normalizeRect(entry, defaults, options))
        .filter(Boolean);
}

function normalizePointArray(items, fallback = { x: 0, y: 0 }, options = {}) {
    if (!Array.isArray(items)) {
        return [];
    }

    return items.map((entry) => ({
        ...normalizePoint(entry, fallback, options),
        ...pickRest(entry, ["x", "y"]),
    }));
}

function normalizeOptionalRect(entry, defaults = { width: TILE_SIZE, height: TILE_SIZE }, options = {}) {
    return normalizeRect(entry, defaults, options);
}

function normalizeSpikes(source) {
    if (!Array.isArray(source)) {
        return [];
    }

    return source
        .map((entry) => normalizeRect(entry, { width: TILE_SIZE, height: TILE_SIZE }))
        .filter(Boolean)
        .map((mapped, index) => ({
            ...mapped,
            state: mapped.state || "off",
            damageState: mapped.damageState || "on",
            id: mapped.id || `spike-${index}`,
        }));
}

function normalizeBats(source) {
    if (!Array.isArray(source)) {
        return [];
    }

    return source.map((entry, index) => {
        const point = normalizePoint(entry);
        const legacyDistance = hasNumeric(entry?.max)
            ? normalizeLegacyDistance(entry.max)
            : undefined;
        const range = hasNumeric(entry?.range)
            ? Math.max(1, Math.round(entry.range))
            : legacyDistance;

        return {
            ...point,
            ...pickRest(entry, ["x", "y", "upDown", "max"]),
            axis: entry?.axis || (entry?.upDown ? "vertical" : "horizontal"),
            range: hasNumeric(range) ? range : 32,
            speed: hasNumeric(entry?.speed) ? entry.speed : 0.02,
            direction: hasNumeric(entry?.direction) ? entry.direction : 1,
            id: entry?.id || `bat-${index}`,
        };
    });
}

function normalizeFallingWalls(source) {
    if (!Array.isArray(source)) {
        return [];
    }

    return source
        .map((entry) => normalizeRect(entry, { width: TILE_SIZE, height: TILE_SIZE }))
        .filter(Boolean)
        .map((mapped, index) => ({
            ...mapped,
            trigger: mapped.trigger || "below",
            id: mapped.id || `falling-wall-${index}`,
        }));
}

function normalizeSaws(source) {
    if (!Array.isArray(source)) {
        return [];
    }

    return source
        .map((entry, index) => {
            const rect = normalizeRect(entry, { width: TILE_SIZE, height: TILE_SIZE });
            if (!rect) {
                return null;
            }

            const useLegacyRange = isLikelyLegacyRect(entry) && hasNumeric(entry?.range);
            const defaultRange = useLegacyRange
                ? normalizeLegacyDistance(entry.range)
                : (hasNumeric(entry?.range) ? Math.round(entry.range) : undefined);

            const motion = entry?.motion || entry?.type || "linear";
            const normalized = {
                ...rect,
                ...pickRest(entry, ["x", "y", "width", "height", "type"]),
                motion: motion === "circular" ? "circular" : "linear",
                center: entry?.center
                    ? normalizePoint(entry.center, { x: rect.x, y: rect.y }, { allowOffscreen: true })
                    : { x: rect.x, y: rect.y },
                speed: hasNumeric(entry?.speed) ? entry.speed : 0.02,
                id: entry?.id || `saw-${index}`,
            };

            if (normalized.motion === "circular") {
                const radius = hasNumeric(entry?.radius)
                    ? Math.round(entry.radius)
                    : defaultRange;
                normalized.radius = hasNumeric(radius) ? Math.max(1, radius) : 24;
            } else {
                const range = hasNumeric(defaultRange) ? Math.max(1, defaultRange) : 24;
                normalized.range = range;
            }

            return normalized;
        })
        .filter(Boolean);
}

function normalizeExits(source, defaultSpawn, levelIndex) {
    if (!Array.isArray(source)) {
        return [];
    }

    return source
        .map((entry, exitIndex) => {
            const mappedRect = normalizeRect(entry, { width: TILE_SIZE, height: TILE_SIZE });
            if (!mappedRect) {
                return null;
            }

            const showsAt = normalizePoint(entry?.showsAt, defaultSpawn);

            return {
                ...mappedRect,
                id: entry?.id || `exit-${levelIndex}-${exitIndex}`,
                goTo: Number.isInteger(entry?.goTo) ? entry.goTo : levelIndex,
                type: entry?.type || "door",
                showsAt,
            };
        })
        .filter(Boolean);
}

function mapLevel(level, levelIndex) {
    const startingPoint = normalizePoint(level?.startingPoint);
    const enemies = level?.enemies || {};

    const spikes = normalizeSpikes(Array.isArray(enemies.spikes) ? enemies.spikes : level?.spikes);
    const bats = normalizeBats(Array.isArray(enemies.bats) ? enemies.bats : level?.bats);
    const fallingWalls = normalizeFallingWalls(
        Array.isArray(enemies.fallingWalls) ? enemies.fallingWalls : level?.fallingWalls
    );
    const saws = normalizeSaws(Array.isArray(enemies.saws) ? enemies.saws : level?.saws);

    return {
        index: Number.isInteger(level?.index) ? level.index : levelIndex,
        startingPoint,
        platforms: normalizeRectArray(level?.platforms, { width: TILE_SIZE, height: TILE_SIZE }),
        exits: normalizeExits(
            Array.isArray(level?.exits) ? level.exits : level?.exit,
            startingPoint,
            levelIndex
        ),
        blood: normalizePointArray(level?.blood),
        movableWalls: normalizeRectArray(level?.movableWalls, { width: TILE_SIZE, height: TILE_SIZE }),
        enemies: {
            spikes,
            bats,
            fallingWalls,
            saws,
        },
        item: normalizeOptionalRect(level?.item, { width: 18, height: 18 }),
        portal: normalizeOptionalRect(level?.portal, { width: TILE_SIZE, height: TILE_SIZE }),
        coffin: normalizeOptionalRect(level?.coffin, { width: TILE_SIZE, height: TILE_SIZE }),
        skeletonDoor: normalizeOptionalRect(level?.skeletonDoor, { width: TILE_SIZE, height: TILE_SIZE }),
        stakeDoor: normalizeOptionalRect(level?.stakeDoor, { width: TILE_SIZE, height: TILE_SIZE }),
        batteryContainer: normalizeOptionalRect(level?.batteryContainer, { width: 95, height: 54 }),
        foreground: Boolean(level?.foreground),
    };
}

function buildPortedLevels(levels) {
    if (!Array.isArray(levels)) {
        return [];
    }

    return levels.map((level, index) => mapLevel(level, index));
}

export { buildPortedLevels, SCREEN_WIDTH, SCREEN_HEIGHT, TILE_SIZE };
