var Cloud = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.width = parameters.width;
        this.height = parameters.height;
        this.speed = parameters.speed;
        this.alpha = 1;
        this.accMorph = 0;
    },
    onUpdate: function (delta) {
        this.y -= this.speed;
        
        this.accMorph += delta;
        
        if (this.accMorph >= 0.1) {
            this.alpha -= 0.03;
        }
        
        if (this.alpha <= 0) {
            this.destroy();
        }
    },
    onDraw: function (ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(jsGFwk.Sprites.effectCloud.spriteBag[0].image,
                      this.x, this.y, this.width, this.height);
    }
};