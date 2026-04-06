var explosion = {
    bulletSpeed: 10,
    onInit: function (p) {
        this.x = p.x;
        this.y = p.y;
        this.explosionPos = 0;
        this.acc = 0;
    },
    onUpdate: function (delta) {
        this.acc += delta;
        
        if (this.acc >= 0.1) {
            this.explosionPos++;
            this.acc = 0;
        }
        
        if (this.explosionPos === 3) {
            this.destroy();
            return;
        }
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.explosion.spriteBag[this.explosionPos].image, this.x, this.y);
    }
};