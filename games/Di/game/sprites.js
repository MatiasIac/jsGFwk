import { PORT_CONFIG } from "./config.js";
import { resolveRectRenderTileSize } from "./tile-size.js";

const framework = window.jsGFwk;
if (!framework) {
    throw new Error("jsGFwk bundle not loaded. Ensure ../../dist/jsgfwk-bundle.js is available.");
}

const {
    createMonochromeSprite,
    ATTRIBUTE_MODES,
    DRAW_MODES,
} = framework;

const { TILE_SIZE } = PORT_CONFIG;

function drawRectAsTiles(renderer, rect, spriteOrSpriteSet, drawOptions) {
    const tileSize = resolveRectRenderTileSize(rect);
    const tileWidth = tileSize.width;
    const tileHeight = tileSize.height;

    let sprite = spriteOrSpriteSet;
    if (spriteOrSpriteSet && spriteOrSpriteSet.width === undefined) {
        const key = `${tileWidth}x${tileHeight}`;
        sprite = spriteOrSpriteSet[key] || spriteOrSpriteSet["16x16"];
    }

    const maxX = rect.x + rect.width;
    const maxY = rect.y + rect.height;

    for (let y = rect.y; y < maxY; y += tileHeight) {
        for (let x = rect.x; x < maxX; x += tileWidth) {
            renderer.drawTile(x, y, sprite, drawOptions);
        }
    }
}

function buildWallTile(width = TILE_SIZE, height = TILE_SIZE) {
    const rows = [];

    for (let y = 0; y < height; y++) {
        let row = "";

        for (let x = 0; x < width; x++) {
            let bit = 0;
            const isBorder = y === 0 || y === height - 1 || x === 0 || x === width - 1;
            if (isBorder) {
                bit = 1;
            } else if ((y % 4) === 0) {
                bit = ((x + y) & 1) === 0 ? 1 : 0;
            }

            row += bit ? "1" : "0";
        }

        rows.push(row);
    }

    return createMonochromeSprite(width, height, rows);
}

function buildBorderTile() {
    const rows = [];

    for (let y = 0; y < TILE_SIZE; y++) {
        if (y === 0 || y === TILE_SIZE - 1) {
            rows.push("1111000000001111");
            continue;
        }

        if (y === 7 || y === 8) {
            rows.push("1000011111100001");
            continue;
        }

        rows.push("1000000000000001");
    }

    return createMonochromeSprite(TILE_SIZE, TILE_SIZE, rows);
}

function buildMarkerTile() {
    const rows = [
        "0000000000000000",
        "0000000000000000",
        "0000011111100000",
        "0000111111110000",
        "0001111111111000",
        "0011111111111100",
        "0011111111111100",
        "0011111111111100",
        "0011111111111100",
        "0011111111111100",
        "0001111111111000",
        "0000111111110000",
        "0000011111100000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
    ];

    return createMonochromeSprite(TILE_SIZE, TILE_SIZE, rows);
}

function buildSpikeTile() {
    const rows = [
        "0001000100010001",
        "0011101110111011",
        "0111111111111111",
        "0011101110111011",
        "0001000100010001",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
        "0000000000000000",
    ];

    return createMonochromeSprite(TILE_SIZE, TILE_SIZE, rows);
}

function mirrorRows(rows) {
    return rows.map((row) => row.split("").reverse().join(""));
}

const PLAYER_IDLE_ROWS = [
    "0000011111100000",
    "0001111111111000",
    "0011110011111100",
    "0011100000111100",
    "0111111111111110",
    "0111111111111110",
    "0111111111111110",
    "0011111111111100",
    "0001111111111000",
    "0011111111111100",
    "0111101101101110",
    "0111001111001110",
    "0011001111001100",
    "0011001111001100",
    "0011000110001100",
    "0011000110001100",
];

const PLAYER_RUN_RIGHT_ROWS = [
    [
        "0000011111100000",
        "0001111111111000",
        "0011110011111100",
        "0011100000111100",
        "0111111111111110",
        "0111111111111110",
        "0111111111111110",
        "0011111111111100",
        "0001111111111000",
        "0011111111111100",
        "0111101101101110",
        "0111001111001110",
        "0011001110001100",
        "0011000111001100",
        "0011000011101100",
        "0001100001111000",
    ],
    [
        "0000011111100000",
        "0001111111111000",
        "0011110011111100",
        "0011100000111100",
        "0111111111111110",
        "0111111111111110",
        "0111111111111110",
        "0011111111111100",
        "0001111111111000",
        "0011111111111100",
        "0111101101101110",
        "0111001111001110",
        "0011000011101100",
        "0011000111001100",
        "0011001110001100",
        "0011111000011000",
    ],
];

const PLAYER_JUMP_RIGHT_ROWS = [
    [
        "0000011111100000",
        "0001111111111000",
        "0011110011111100",
        "0011100000111100",
        "0111111111111110",
        "0111111111111110",
        "0011111111111100",
        "0001111111111000",
        "0011111111111100",
        "0111101101101110",
        "0111001111001110",
        "0011001111001100",
        "0001111111111000",
        "0000111111110000",
        "0000011101110000",
        "0000001100110000",
    ],
    [
        "0000011111100000",
        "0001111111111000",
        "0011110011111100",
        "0011100000111100",
        "0111111111111110",
        "0111111111111110",
        "0011111111111100",
        "0001111111111000",
        "0011111111111100",
        "0111101101101110",
        "0111001111001110",
        "0001111111111000",
        "0000111111110000",
        "0000011111100000",
        "0000011001100000",
        "0000110000110000",
    ],
];

function toMonochromeSprite(rows) {
    return createMonochromeSprite(TILE_SIZE, TILE_SIZE, rows);
}

function buildPlayerSprites() {
    return {
        idle: toMonochromeSprite(PLAYER_IDLE_ROWS),
        runRight: PLAYER_RUN_RIGHT_ROWS.map((rows) => toMonochromeSprite(rows)),
        runLeft: PLAYER_RUN_RIGHT_ROWS.map((rows) => toMonochromeSprite(mirrorRows(rows))),
        jumpRight: PLAYER_JUMP_RIGHT_ROWS.map((rows) => toMonochromeSprite(rows)),
        jumpLeft: PLAYER_JUMP_RIGHT_ROWS.map((rows) => toMonochromeSprite(mirrorRows(rows))),
    };
}

const WALL_TILE_SPRITES = {
    "16x16": buildWallTile(16, 16),
    "8x16": buildWallTile(8, 16),
    "16x8": buildWallTile(16, 8),
    "8x8": buildWallTile(8, 8),
};

const SPRITES = {
    wall: WALL_TILE_SPRITES["16x16"],
    exit: buildBorderTile(),
    marker: buildMarkerTile(),
    spike: buildSpikeTile(),
    player: buildPlayerSprites(),
};

const DRAW_STYLE = {
    wall: {
        ink: 5,
        paper: 0,
        bright: false,
        mode: DRAW_MODES.OPAQUE,
        attributeMode: ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
    },
    exit: {
        ink: 2,
        paper: 0,
        bright: true,
        mode: DRAW_MODES.TRANSPARENT,
        attributeMode: ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
    },
    spike: {
        ink: 2,
        paper: 0,
        bright: true,
        mode: DRAW_MODES.TRANSPARENT,
        attributeMode: ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
    },
    markerA: {
        ink: 3,
        paper: 0,
        bright: true,
        mode: DRAW_MODES.TRANSPARENT,
        attributeMode: ATTRIBUTE_MODES.BACKGROUND_LOCKED,
    },
    markerB: {
        ink: 4,
        paper: 0,
        bright: true,
        mode: DRAW_MODES.TRANSPARENT,
        attributeMode: ATTRIBUTE_MODES.BACKGROUND_LOCKED,
    },
    markerC: {
        ink: 5,
        paper: 0,
        bright: true,
        mode: DRAW_MODES.TRANSPARENT,
        attributeMode: ATTRIBUTE_MODES.BACKGROUND_LOCKED,
    },
    player: {
        ink: 7,
        paper: 0,
        bright: true,
        mode: DRAW_MODES.TRANSPARENT,
        attributeMode: ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
    },
};

export { WALL_TILE_SPRITES, SPRITES, DRAW_STYLE, drawRectAsTiles };
