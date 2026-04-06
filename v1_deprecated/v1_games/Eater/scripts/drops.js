var Drops = {
    img: 0,
    count: 0,
    onInit: function (param) {
        var self = this;
        this.x = param.x;
        this.y = param.y;
    },
    onUpdate: function (delta) {
        this.count += delta;
        
        if (this.count >= 0.3) {
            this.count = 0;
            this.img++;
        }
        
        if (this.img > 1) {
            this.img = 1;
            this.destroy();
        }
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.drop.spriteBag[this.img].image, this.x, this.y);
    }
};