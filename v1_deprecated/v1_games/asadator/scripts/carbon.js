var carbon = {
    onInit: function (data) {
        this.x = data.x;
        this.y = data.y;
        this.life = 150;
        this.timeAcc = 0;

        this.img = jsGFwk.Sprites.carbon.spriteBag[parseInt(Math.random() * 3)].image;
    },
    onUpdate: function (tick) {
        this.timeAcc += tick;

        if (this.timeAcc >= 0.2) {
            this.life--;
            gameController.reduceFuego();
            this.timeAcc = 0;
        }

        if (this.life <= 0) {
            this.destroy();
        }
    },
    onDraw: function (ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }
};