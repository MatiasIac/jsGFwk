var Saw = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.originalX = parameters.x;
        this.originalY = parameters.y;
        this.width = 30;
        this.height = 30;
        this.animIndex = 0;
        this.moveAccumulator = 0;
        this.speed = parameters.speed;
        this.range = parameters.range;
        
        switch (parameters.type) {
            case 'circular':
                this.updatePointer = this.updateCircular;
                break;
            default:
                this.updatePointer = this.updateLinear;
                break;
        }
    },
    updateCircular: function (delta) {
        this.moveAccumulator += this.speed;
        this.x = (Math.sin(this.moveAccumulator) * this.range) + this.originalX;
        this.y = (Math.cos(this.moveAccumulator) * this.range) + this.originalY;
    },
    updateLinear: function (delta) {
        this.moveAccumulator += this.speed;
        this.x = (Math.sin(this.moveAccumulator) * this.range) + this.originalX;
    },
    updatePointer: function () {},
    onUpdate: function (delta) {
        this.animIndex++;
        this.animIndex = this.animIndex % 4;
        this.updatePointer(delta);
        
        if (dracul.isRectColliding(this)) {
            dracul.kill();
        }
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.saw.spriteBag[this.animIndex].image, this.x, this.y);
    }
};