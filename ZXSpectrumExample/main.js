const framework = window.jsGFwk;
if (!framework) {
    throw new Error("jsGFwk bundle not loaded. Ensure jsgfwk-bundle.js is referenced before main.js.");
}

const {
    Engine,
    VisualGameObject,
    SpectrumAnimator2D,
    createMonochromeSprite,
    ATTRIBUTE_MODES,
    DRAW_MODES,
} = framework;

const grassTile = createMonochromeSprite(8, 8, [
    "10101010",
    "01010101",
    "10101010",
    "01010101",
    "10101010",
    "01010101",
    "10101010",
    "01010101",
]);

const heroSprite = createMonochromeSprite(12, 16, [
    "000011110000",
    "000111111000",
    "001110011100",
    "001100001100",
    "001111111100",
    "000111111000",
    "000011110000",
    "000111111000",
    "001111111100",
    "001101101100",
    "000011110000",
    "000111111000",
    "000110011000",
    "001100001100",
    "001100001100",
    "000000000000",
]);

const hudIcon = createMonochromeSprite(8, 8, [
    "00111100",
    "01111110",
    "11111111",
    "11100111",
    "11100111",
    "11111111",
    "01111110",
    "00111100",
]);

class BackgroundLayer extends VisualGameObject {
    constructor() {
        super("background", 0, 0, 256, 192, 0, true);
    }

    drawSpectrum(renderer) {
        for (let cellY = 0; cellY < 2; cellY++) {
            for (let cellX = 0; cellX < 32; cellX++) {
                renderer.setAttributeCell(cellX, cellY, {
                    ink: 7,
                    paper: 1,
                    bright: true,
                });
            }
        }

        renderer.fillRect(0, 0, 256, 16, 0);
        renderer.drawSprite(12, 4, hudIcon, {
            ink: 6,
            paper: 1,
            bright: true,
            mode: DRAW_MODES.TRANSPARENT,
            attributeMode: ATTRIBUTE_MODES.BACKGROUND_LOCKED,
        });
        renderer.drawSprite(24, 4, hudIcon, {
            ink: 2,
            paper: 1,
            bright: true,
            mode: DRAW_MODES.TRANSPARENT,
            attributeMode: ATTRIBUTE_MODES.BACKGROUND_LOCKED,
        });

        for (let y = 16; y < 192; y += 8) {
            for (let x = 0; x < 256; x += 8) {
                renderer.drawTile(x, y, grassTile, {
                    ink: 4,
                    paper: 0,
                    bright: true,
                    mode: DRAW_MODES.OPAQUE,
                    attributeMode: ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
                });
            }
        }
    }
}

class Hero extends VisualGameObject {
    constructor() {
        super("hero", 18, 72, heroSprite.width, heroSprite.height, 2, true);
        this.vx = 53;
        this.vy = 35;
    }

    update(delta) {
        this.x += this.vx * delta;
        this.y += this.vy * delta;

        if (this.x <= 0) {
            this.x = 0;
            this.vx *= -1;
        } else if (this.x + this.width >= 256) {
            this.x = 256 - this.width;
            this.vx *= -1;
        }

        if (this.y <= 16) {
            this.y = 16;
            this.vy *= -1;
        } else if (this.y + this.height >= 192) {
            this.y = 192 - this.height;
            this.vy *= -1;
        }
    }

    drawSpectrum(renderer) {
        renderer.drawSprite(this.x | 0, this.y | 0, heroSprite, {
            ink: 6,
            paper: 0,
            bright: true,
            mode: DRAW_MODES.TRANSPARENT,
            attributeMode: ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
        });
    }
}

const game = new Engine();
game.settings.canvas = "canvas";
game.settings.width = 256;
game.settings.height = 192;
game.settings.clearColor = "rgb(0,0,0)";

game.include(new SpectrumAnimator2D({
    width: 256,
    height: 192,
    scale: 3,
    clashMode: ATTRIBUTE_MODES.AUTHENTIC_OVERWRITE,
    clearAttribute: { ink: 7, paper: 0, bright: false },
}));

game.createObject(new BackgroundLayer());
game.createObject(new Hero());
game.start();
