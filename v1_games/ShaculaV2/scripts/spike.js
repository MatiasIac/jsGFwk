var Spike = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.delay = parameters.delay;
        this.width = 27;
        this.height = 7;
        this.spikePosition = 0;
        this.accumulatorTimer = 0;
    },
    onUpdate: function (delta) {
        this.accumulatorTimer += delta;
        
        if (this.accumulatorTimer >= this.delay) {
            this.accumulatorTimer = 0;
            this.spikePosition += 1;
            this.spikePosition = this.spikePosition % 2;
        }
        
        if (this.spikePosition === 0) {
            if (dracul.isRectColliding(this)) {
                dracul.kill();
            }
        }
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.spike.spriteBag[this.spikePosition].image,
                     this.x, this.y);
    }
};