var carbon = {
    onInit: function (data) {
        this.x = data.x;
        this.y = data.y;
        this.life = data.life;

        this.img = jsGFwk.Sprites.carbon.spriteBag[parseInt(Math.random() * 2)].image;
    },
    onUpdate: function (tick) {
        
        this.life--;

        if (this.life <= 0) {
            this.destroy();
        }
    },
    onDraw: function (ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }
};