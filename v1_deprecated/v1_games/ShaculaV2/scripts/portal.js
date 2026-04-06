var Portal = {
    id: 'portal',
    visible: true,
    accumulatorTimer: 0,
    init: function () { 
        jsGFwk.Sprites.portal.reset();
    },
    update: function (delta) {
        this.accumulatorTimer += delta;
        
        if (this.accumulatorTimer >= 0.12) {
            this.accumulatorTimer = 0;
            jsGFwk.Sprites.portal.next();
        } 
    },
    draw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.portal.sprite.image,
            Levels[GLOBAL.currentLevel].portal.x, Levels[GLOBAL.currentLevel].portal.y);
    }
};