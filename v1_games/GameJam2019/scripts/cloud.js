var cloud = {
    onInit: function(params) {
        this.imageIndex = parseInt(Math.random() * 8);
        this.width = jsGFwk.Sprites.clouds.spriteBag[this.imageIndex].width;
        this.height = jsGFwk.Sprites.clouds.spriteBag[this.imageIndex].height;
        this.params = params;
        this.times = 10;
        this.deltaAccumulator = 0;
    },
    onUpdate: function(delta) {
        this.deltaAccumulator += delta;

        if (this.deltaAccumulator > 0.1) {
            this.width -= 0.5;
            this.height -= 0.5;
            this.times--;
            this.deltaAccumulator = 0;

            if (this.times <= 0) {
                this.destroy();
            }
        }
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.clouds.spriteBag[this.imageIndex].image,
            this.params.x + (this.width / 2), this.params.y,
            this.width, this.height);
    }
};