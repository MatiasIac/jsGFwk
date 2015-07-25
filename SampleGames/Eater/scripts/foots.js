var Foots = {
    onInit: function onInit(param) {
        this.x = param.x;
        this.y = param.y;
        this.width = 13;
        this.height = 12;
    },
    onUpdate: function onUpdate(delta) {
        if (Player.isRectColliding(this)) {
            this.destroy();
        }
    },
    onDraw: function onDraw(ctx) {
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(jsGFwk.Sprites.foots.image, this.x, this.y);
    }
};