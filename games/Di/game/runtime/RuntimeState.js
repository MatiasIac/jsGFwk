import { LEGACY_LEVEL_SOURCE } from "../data/legacy-levels.js";
import { PORT_CONFIG, PLAYER_SIZE } from "../config.js";
import { sanitizeRenderTileDimension } from "../tile-size.js";
import { clamp, intersects } from "../utils/math.js";

const { SCREEN_WIDTH, SCREEN_HEIGHT } = PORT_CONFIG;
const PLAYER_COLLIDER_HEIGHT = PLAYER_SIZE - 1;

class RuntimeState {
    constructor(levels, options = {}) {
        this.levels = levels;
        const startLevelIndex = Math.min(10, Math.max(0, levels.length - 1));
        this.currentIndex = startLevelIndex;
        this.level = levels[startLevelIndex];
        this.playerSpawn = { ...this.level.startingPoint };
        this.defaultLightRadiusCells = 4;
        this.defaultLightDimLevels = 2;
        this.levelLightOverrides = {};

        this.levelStatsElement = options.levelStatsElement ?? null;
        this.statusElement = options.statusElement ?? null;

        this.message = "";
        this.messageUntil = 0;

        this.renderStatus();
    }

    tick() {
        if (this.message && Date.now() >= this.messageUntil) {
            this.message = "";
            this.messageUntil = 0;
            this.renderStatus();
        }
    }

    setMessage(message, ttlMs = 2000) {
        this.message = message;
        this.messageUntil = Date.now() + ttlMs;
        this.renderStatus();
    }

    renderStatus() {
        if (this.levelStatsElement) {
            const light = this.getLightConfigForCurrentLevel();
            this.levelStatsElement.textContent = `Level ${this.currentIndex + 1}/${this.levels.length} | Platforms ${this.level.platforms.length} | Exits ${this.level.exits.length} | Light ${light.radiusCells} cells +${light.dimLevels} dim`;
        }

        if (this.statusElement) {
            const base = "Controls: A/D move, W or Space jump, Shift sprint. Exits activate on touch.";
            const info = `Level source: ${LEGACY_LEVEL_SOURCE}`;

            this.statusElement.textContent = this.message
                ? `${base} ${this.message}`
                : `${base} ${info}`;
        }
    }

    setLevel(nextIndex, spawnOverride) {
        const nextLevel = this.levels[nextIndex];
        if (!nextLevel) {
            this.setMessage(`Exit points to level ${nextIndex + 1}, but this scaffold has ${this.levels.length} levels.`);
            return false;
        }

        this.currentIndex = nextIndex;
        this.level = nextLevel;
        this.playerSpawn = spawnOverride ? { ...spawnOverride } : { ...nextLevel.startingPoint };

        this.renderStatus();
        return true;
    }

    sanitizeLightRadiusCells(value) {
        if (!Number.isFinite(value)) {
            return this.defaultLightRadiusCells;
        }

        return clamp(Math.round(value), 1, 12);
    }

    sanitizeLightDimLevels(value) {
        if (!Number.isFinite(value)) {
            return this.defaultLightDimLevels;
        }

        return clamp(Math.round(value), 0, 2);
    }

    getLightConfigForLevel(levelIndex) {
        const level = this.levels[levelIndex];
        const override = this.levelLightOverrides[levelIndex] || {};

        const levelRadius = Number.isFinite(level?.lightRadiusCells)
            ? level.lightRadiusCells
            : (Number.isFinite(level?.lightRadius) ? level.lightRadius : this.defaultLightRadiusCells);
        const levelDimLevels = Number.isFinite(level?.lightDimLevels)
            ? level.lightDimLevels
            : this.defaultLightDimLevels;

        return {
            radiusCells: this.sanitizeLightRadiusCells(
                Number.isFinite(override.radiusCells) ? override.radiusCells : levelRadius
            ),
            dimLevels: this.sanitizeLightDimLevels(
                Number.isFinite(override.dimLevels) ? override.dimLevels : levelDimLevels
            ),
        };
    }

    getLightConfigForCurrentLevel() {
        return this.getLightConfigForLevel(this.currentIndex);
    }

    getLightRadiusForCurrentLevel() {
        return this.getLightConfigForCurrentLevel().radiusCells;
    }

    setLevelLightRadius(levelIndex, radiusCells, dimLevels) {
        if (!Number.isInteger(levelIndex) || !this.levels[levelIndex]) {
            return false;
        }

        const current = this.levelLightOverrides[levelIndex] || {};
        this.levelLightOverrides[levelIndex] = {
            radiusCells: this.sanitizeLightRadiusCells(radiusCells),
            dimLevels: Number.isFinite(dimLevels)
                ? this.sanitizeLightDimLevels(dimLevels)
                : current.dimLevels,
        };

        if (!Number.isFinite(this.levelLightOverrides[levelIndex].dimLevels)) {
            delete this.levelLightOverrides[levelIndex].dimLevels;
        }

        this.renderStatus();
        return true;
    }

    clearLevelLightRadius(levelIndex) {
        delete this.levelLightOverrides[levelIndex];
        this.renderStatus();
    }

    setDefaultLightRadius(radiusCells) {
        this.defaultLightRadiusCells = this.sanitizeLightRadiusCells(radiusCells);
        this.renderStatus();
    }

    setDefaultLightDimLevels(dimLevels) {
        this.defaultLightDimLevels = this.sanitizeLightDimLevels(dimLevels);
        this.renderStatus();
    }

    setPlatformRenderTileSize(levelIndex, platformIndex, tileWidth, tileHeight) {
        if (!Number.isInteger(levelIndex) || !this.levels[levelIndex]) {
            return false;
        }

        const platforms = this.levels[levelIndex].platforms;
        if (!Number.isInteger(platformIndex) || platformIndex < 0 || platformIndex >= platforms.length) {
            return false;
        }

        const platform = platforms[platformIndex];
        platform.renderTileWidth = sanitizeRenderTileDimension(tileWidth);
        platform.renderTileHeight = sanitizeRenderTileDimension(tileHeight);

        return true;
    }

    clearPlatformRenderTileSize(levelIndex, platformIndex) {
        if (!Number.isInteger(levelIndex) || !this.levels[levelIndex]) {
            return false;
        }

        const platforms = this.levels[levelIndex].platforms;
        if (!Number.isInteger(platformIndex) || platformIndex < 0 || platformIndex >= platforms.length) {
            return false;
        }

        const platform = platforms[platformIndex];
        delete platform.renderTileWidth;
        delete platform.renderTileHeight;
        return true;
    }

    getSpawnPoint() {
        return {
            x: clamp(this.playerSpawn.x, 0, SCREEN_WIDTH - PLAYER_SIZE),
            y: clamp(this.playerSpawn.y, 0, SCREEN_HEIGHT - PLAYER_COLLIDER_HEIGHT),
        };
    }

    isBlocked(rect) {
        return this.level.platforms.some((platform) => intersects(rect, platform));
    }

    findExit(rect) {
        return this.level.exits.find((exit) => intersects(rect, exit)) || null;
    }

    touchesSpike(rect) {
        const spikes = Array.isArray(this.level?.enemies?.spikes)
            ? this.level.enemies.spikes
            : (Array.isArray(this.level?.spikes) ? this.level.spikes : []);

        return spikes.some((spike) => intersects(rect, spike));
    }
}

export { RuntimeState };
