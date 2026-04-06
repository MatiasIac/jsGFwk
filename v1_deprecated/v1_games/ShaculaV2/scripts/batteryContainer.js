var BatteryContainer = {
    id: 'batteryContainer',
    visible: true,
    isCharged: false,
    init: function () { 
        jsGFwk.Sprites.batteryAnim.reset();        
    },
    update: function (delta) { 
        if (this.visible) {
            if (Levels[GLOBAL.currentLevel].batteryContainer !== undefined && !this.isCharged) {
                if (jsGFwk.Collisions.areCollidingBy(dracul, 
                    { 
                        x: Levels[GLOBAL.currentLevel].batteryContainer.x,
                        y: Levels[GLOBAL.currentLevel].batteryContainer.y,
                        width: Levels[GLOBAL.currentLevel].batteryContainer.width,
                        height: Levels[GLOBAL.currentLevel].batteryContainer.height
                    }, 
                    jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                    if (GLOBAL.item === 3) {
                        this.isCharged = true;
                        Levels[3].levers[0].state = 1;
                        GLOBAL.item = 0;
                    }
                }
            }

            if (this.isCharged) {
                jsGFwk.Sprites.batteryAnim.next();
            }
        }
    },
    draw: function (ctx) {
        if (!this.isCharged) {
            ctx.drawImage(jsGFwk.Sprites.batteryContainer.image,
                Levels[GLOBAL.currentLevel].batteryContainer.x, Levels[GLOBAL.currentLevel].batteryContainer.y);
        } else {
            ctx.drawImage(jsGFwk.Sprites.batteryAnim.sprite.image,
                Levels[GLOBAL.currentLevel].batteryContainer.x, Levels[GLOBAL.currentLevel].batteryContainer.y);
        }
    }
};