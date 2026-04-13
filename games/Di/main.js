import { LEGACY_LEVELS } from "./game/data/legacy-levels.js";
import { PORT_CONFIG } from "./game/config.js";
import { buildPortedLevels } from "./game/level-port.js";
import { RuntimeState } from "./game/runtime/RuntimeState.js";
import { WorldLayer } from "./game/objects/WorldLayer.js";
import { Player } from "./game/objects/Player.js";
import { LightingLayer } from "./game/objects/LightingLayer.js";
import { clamp } from "./game/utils/math.js";

const framework = window.jsGFwk;
if (!framework) {
    throw new Error("jsGFwk bundle not loaded. Ensure ../../dist/jsgfwk-bundle.js is available.");
}

const {
    Engine,
    SpectrumAnimator2D,
    KeyboardIO,
    ScenesManager,
    ATTRIBUTE_MODES,
} = framework;

const { SCREEN_WIDTH, SCREEN_HEIGHT } = PORT_CONFIG;
const levelStatsElement = document.getElementById("levelStats");
const statusElement = document.getElementById("status");
const LEVELS = buildPortedLevels(LEGACY_LEVELS);

const runtime = new RuntimeState(LEVELS, {
    levelStatsElement,
    statusElement,
});

const game = new Engine();
const keyboard = new KeyboardIO();
const scenesManager = new ScenesManager();

const worldLayer = new WorldLayer(runtime);
const player = new Player(runtime, keyboard);
const lighting = new LightingLayer(runtime, player);

game.settings.canvas = "canvas";
game.settings.width = SCREEN_WIDTH;
game.settings.height = SCREEN_HEIGHT;
game.settings.clearColor = "rgb(0,0,0)";

game.include(keyboard);
game.include(new SpectrumAnimator2D({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scale: 3,
    clashMode: ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
    clearAttribute: {
        ink: 7,
        paper: 0,
        bright: false,
    },
}));
game.include(scenesManager);

scenesManager.create("mainGame", [worldLayer, player, lighting]);
scenesManager.SCENES.mainGame.activate();

function resetTransientSimulationState() {
    const activeKeys = keyboard.getActiveKeys();
    for (const key in activeKeys) {
        delete activeKeys[key];
    }

    player.horizontalAccumulator = 0;
    player.verticalAccumulator = 0;
    player.vy = 0;
    player.jumpLatch = false;
    lighting.forceRebuild();
}

window.addEventListener("blur", resetTransientSimulationState);
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        resetTransientSimulationState();
    } else {
        lighting.forceRebuild();
    }
});

game.start();

window.diPort = {
    runtime,
    levels: LEVELS,
    lighting,
    scenesManager,
    activateScene(name) {
        const scene = scenesManager.SCENES[name];
        if (!scene) {
            return false;
        }

        scene.activate();
        return true;
    },
    setRoomLightRadius(levelIndex, radiusCells, dimLevels) {
        const updated = runtime.setLevelLightRadius(levelIndex, radiusCells, dimLevels);
        if (updated) {
            lighting.forceRebuild();
        }
        return updated;
    },
    setCurrentRoomLightRadius(radiusCells, dimLevels) {
        const updated = runtime.setLevelLightRadius(runtime.currentIndex, radiusCells, dimLevels);
        if (updated) {
            lighting.forceRebuild();
        }
        return updated;
    },
    clearRoomLightRadius(levelIndex) {
        runtime.clearLevelLightRadius(levelIndex);
        lighting.forceRebuild();
    },
    setDefaultLightRadius(radiusCells) {
        runtime.setDefaultLightRadius(radiusCells);
        lighting.forceRebuild();
    },
    setDefaultLightDimLevels(dimLevels) {
        runtime.setDefaultLightDimLevels(dimLevels);
        lighting.forceRebuild();
    },
    setLightFlicker(enabled, strength = lighting.flickerStrength, rateHz = lighting.flickerRateHz) {
        lighting.flickerEnabled = Boolean(enabled);
        lighting.flickerStrength = clamp(Number.isFinite(strength) ? strength : 0.35, 0, 1);
        lighting.flickerRateHz = clamp(Number.isFinite(rateHz) ? rateHz : 10, 1, 30);
        lighting.flickerAccumulator = 0;
    },
    getLightFlicker() {
        return {
            enabled: lighting.flickerEnabled,
            strength: lighting.flickerStrength,
            rateHz: lighting.flickerRateHz,
        };
    },
    getCurrentLightRadius() {
        return runtime.getLightRadiusForCurrentLevel();
    },
    getCurrentLightConfig() {
        return runtime.getLightConfigForCurrentLevel();
    },
    setCurrentLevelPlatformTileSize(platformIndex, tileWidth, tileHeight) {
        return runtime.setPlatformRenderTileSize(runtime.currentIndex, platformIndex, tileWidth, tileHeight);
    },
    clearCurrentLevelPlatformTileSize(platformIndex) {
        return runtime.clearPlatformRenderTileSize(runtime.currentIndex, platformIndex);
    },
    setPlatformTileSize(levelIndex, platformIndex, tileWidth, tileHeight) {
        return runtime.setPlatformRenderTileSize(levelIndex, platformIndex, tileWidth, tileHeight);
    },
    clearPlatformTileSize(levelIndex, platformIndex) {
        return runtime.clearPlatformRenderTileSize(levelIndex, platformIndex);
    },
};
