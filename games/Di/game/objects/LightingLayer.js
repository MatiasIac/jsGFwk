import { PORT_CONFIG } from "../config.js";
import { TorchLightSystem } from "../lighting/TorchLightSystem.js";
import { applyLightMaskToRenderer } from "../lighting/LightingPass.js";
import { clamp } from "../utils/math.js";

const framework = window.jsGFwk;
if (!framework) {
    throw new Error("jsGFwk bundle not loaded. Ensure ../../dist/jsgfwk-bundle.js is available.");
}

const { VisualGameObject } = framework;
const { SCREEN_WIDTH, SCREEN_HEIGHT, TILE_SIZE } = PORT_CONFIG;

class LightingLayer extends VisualGameObject {
    constructor(runtime, player) {
        super("lighting", 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 200, false);
        this.runtime = runtime;
        this.player = player;
        this.torchOffset = { x: 8, y: 6 };
        this.rebuildThreshold = 1;
        const lightConfig = this.runtime.getLightConfigForCurrentLevel();
        this.lightSystem = new TorchLightSystem({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            tileSize: TILE_SIZE,
            fullRadiusCells: lightConfig.radiusCells,
            dimLevels: lightConfig.dimLevels,
        });

        this.lastTorchX = Number.NaN;
        this.lastTorchY = Number.NaN;
        this.lastLevelIndex = -1;
        this.lastRadiusCells = -1;
        this.lastDimLevels = -1;

        this.flickerEnabled = true;
        this.flickerStrength = 0.35;
        this.flickerRateHz = 10;
        this.flickerAccumulator = 0;
        this.flickerTick = 0;
    }

    forceRebuild() {
        this.lastTorchX = Number.NaN;
        this.lastTorchY = Number.NaN;
        this.lastLevelIndex = -1;
        this.lastRadiusCells = -1;
        this.lastDimLevels = -1;
    }

    getTorchPosition() {
        const facingBias = this.player.facing === "left" ? -4 : 4;
        const torchX = clamp((this.player.x | 0) + this.torchOffset.x + facingBias, 0, SCREEN_WIDTH - 1);
        const torchY = clamp((this.player.y | 0) + this.torchOffset.y, 0, SCREEN_HEIGHT - 1);
        return { x: torchX, y: torchY };
    }

    update(delta = 0) {
        const dt = Number.isFinite(delta) ? clamp(delta, 0, 0.1) : 0;
        if (this.flickerEnabled && this.flickerRateHz > 0) {
            this.flickerAccumulator += dt;
            const step = 1 / this.flickerRateHz;
            if (this.flickerAccumulator >= step) {
                const ticks = Math.floor(this.flickerAccumulator / step);
                this.flickerTick = (this.flickerTick + ticks) >>> 0;
                this.flickerAccumulator -= ticks * step;
            }
        }

        const { x: torchX, y: torchY } = this.getTorchPosition();
        const light = this.runtime.getLightConfigForCurrentLevel();
        const roomChanged = this.lastLevelIndex !== this.runtime.currentIndex;
        const lightConfigChanged = this.lastRadiusCells !== light.radiusCells
            || this.lastDimLevels !== light.dimLevels;
        const movedEnough = Number.isNaN(this.lastTorchX)
            || Math.abs(torchX - this.lastTorchX) >= this.rebuildThreshold
            || Math.abs(torchY - this.lastTorchY) >= this.rebuildThreshold;

        if (!roomChanged && !lightConfigChanged && !movedEnough) {
            return;
        }

        this.lightSystem.setConfig(light.radiusCells, light.dimLevels);
        this.lightSystem.rebuild(torchX, torchY);

        this.lastTorchX = torchX;
        this.lastTorchY = torchY;
        this.lastLevelIndex = this.runtime.currentIndex;
        this.lastRadiusCells = light.radiusCells;
        this.lastDimLevels = light.dimLevels;
    }

    postRenderSpectrum(renderer) {
        applyLightMaskToRenderer(renderer, this.lightSystem.getMask(), {
            flickerEnabled: this.flickerEnabled,
            flickerStrength: this.flickerStrength,
            flickerTick: this.flickerTick,
        });
    }
}

export { LightingLayer };
