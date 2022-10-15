class BackgroundMap extends jsGFwk.VisualGameObject {
    constructor() {
        super("backgroundMap", 0, 0, 0, 0, 0);
    }

    update(delta) {
    }

    draw(context) {
        let xp = 0
        let yp = 0;

        for (let vx = VIEWPORT_X; vx < (VIEWPORT_X + VIEWPORT_WIDTH); vx++) {
            yp = 0;

            for (let vy = VIEWPORT_Y; vy < (VIEWPORT_Y + VIEWPORT_HEIGHT); vy++) {
                const item = MAP_MATRIX[vx][vy];
                
                context.drawImage(sprites.SPRITES_BAG.mapTiles.sprites[item.tile].image, xp * TILE_SIZE, yp * TILE_SIZE);
            
                yp++;
            }

            xp++;
        }
    }
}

let backgroundMap = new BackgroundMap();