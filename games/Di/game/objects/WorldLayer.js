import { PORT_CONFIG } from "../config.js";
import { DRAW_STYLE, SPRITES, WALL_TILE_SPRITES, drawRectAsTiles } from "../sprites.js";

const framework = window.jsGFwk;
if (!framework) {
    throw new Error("jsGFwk bundle not loaded. Ensure ../../dist/jsgfwk-bundle.js is available.");
}

const { VisualGameObject } = framework;
const { SCREEN_WIDTH, SCREEN_HEIGHT } = PORT_CONFIG;

class WorldLayer extends VisualGameObject {
    constructor(runtime) {
        super("world", 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0, true);
        this.runtime = runtime;
    }

    update() {
        this.runtime.tick();
    }

    drawSpectrum(renderer) {
        const enemies = this.runtime.level.enemies || {};
        const spikes = Array.isArray(enemies.spikes) ? enemies.spikes : (this.runtime.level.spikes || []);
        const bats = Array.isArray(enemies.bats) ? enemies.bats : (this.runtime.level.bats || []);

        for (const platform of this.runtime.level.platforms) {
            drawRectAsTiles(renderer, platform, WALL_TILE_SPRITES, DRAW_STYLE.wall);
        }

        for (const exit of this.runtime.level.exits) {
            drawRectAsTiles(renderer, exit, SPRITES.exit, DRAW_STYLE.exit);
        }

        for (const spike of spikes) {
            drawRectAsTiles(renderer, spike, SPRITES.spike, DRAW_STYLE.spike);
        }

        for (const bat of bats) {
            renderer.drawTile(bat.x, bat.y, SPRITES.marker, DRAW_STYLE.markerA);
        }

        for (const blood of this.runtime.level.blood) {
            renderer.drawTile(blood.x, blood.y, SPRITES.marker, DRAW_STYLE.markerB);
        }
    }
}

export { WorldLayer };
