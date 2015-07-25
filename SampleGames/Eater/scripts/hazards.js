var Hazards = {
    onInit: function onInit(param) {
        this.x = param.x;
        this.y = param.y;
        this.width = 16;
        this.height = 12;
    },
    onUpdate: function onUpdate(delta) {
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
        }
    },
    onDraw: function onDraw(ctx) {
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(jsGFwk.Sprites.traps.image, this.x, this.y);
    }
};