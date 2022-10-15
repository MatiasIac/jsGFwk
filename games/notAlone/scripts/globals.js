const VIEWPORT_WIDTH = 32;
const VIEWPORT_HEIGHT = 24;
const VIEWPORT_MAX_X = 1568;
const VIEWPORT_MAX_Y = 1168;
const TILE_SIZE = 20;

let MAP_MATRIX = [];
let VIEWPORT_X = 0;
let VIEWPORT_Y = 0;

const MAP_TILES = [
    //water
    {r: 0, g: 0, b: 255, tileIndex: 0, isSolid: false},
    //dark water
    {r: 0, g: 51, b: 153, tileIndex: 1, isSolid: false},
    //horizontal road
    {r: 153, g: 153, b: 153, tileIndex: 2, isSolid: false},
    //dirt
    {r: 204, g: 102, b: 0, tileIndex: 3, isSolid: false},
    //grass
    {r: 0, g: 255, b: 0, tileIndex: 4, isSolid: false},
];

