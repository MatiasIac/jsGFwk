import { PORT_CONFIG } from "./config.js";

const { TILE_SIZE } = PORT_CONFIG;

function sanitizeRenderTileDimension(value) {
    return value === 8 ? 8 : 16;
}

function resolveRectRenderTileSize(rect) {
    return {
        width: sanitizeRenderTileDimension(rect?.renderTileWidth ?? rect?.tileWidth ?? TILE_SIZE),
        height: sanitizeRenderTileDimension(rect?.renderTileHeight ?? rect?.tileHeight ?? TILE_SIZE),
    };
}

export { sanitizeRenderTileDimension, resolveRectRenderTileSize };
