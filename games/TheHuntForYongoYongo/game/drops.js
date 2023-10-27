var Drops = {
    img: 0,
    count: 0,
    init: function (param) {
        var self = this;
        this.x = param.x;
        this.y = param.y;
    },
    update: function (delta) {
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
    draw: function (ctx) {
        ctx.drawImage(sprites.SPRITES_BAG.drop.sprites[this.img].image, this.x, this.y);
    }
};