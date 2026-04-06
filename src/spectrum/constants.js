const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 192;
const ATTRIBUTE_CELL_SIZE = 8;
const ATTRIBUTE_WIDTH = SCREEN_WIDTH / ATTRIBUTE_CELL_SIZE;
const ATTRIBUTE_HEIGHT = SCREEN_HEIGHT / ATTRIBUTE_CELL_SIZE;

const DRAW_MODES = Object.freeze({
    OPAQUE: "opaque",
    TRANSPARENT: "transparent",
    XOR: "xor",
});

const ATTRIBUTE_MODES = Object.freeze({
    AUTHENTIC_OVERWRITE: "authentic-overwrite",
    BACKGROUND_LOCKED: "background-locked",
    SPRITE_PRIORITY: "sprite-priority",
});

const DEFAULT_ATTRIBUTE = Object.freeze({
    ink: 7,
    paper: 0,
    bright: false,
    flash: false,
    priority: 0,
});

export {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    ATTRIBUTE_CELL_SIZE,
    ATTRIBUTE_WIDTH,
    ATTRIBUTE_HEIGHT,
    DRAW_MODES,
    ATTRIBUTE_MODES,
    DEFAULT_ATTRIBUTE,
};
