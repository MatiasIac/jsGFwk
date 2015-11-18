var Bat = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.pivotY = parameters.y;
        this.pivotX = parameters.x;
        this.speed = parameters.speed;
        this.movementPointer = parameters.upDown ? this.upDownPointer : this.leftRightPointer;
        this.maxSin = parameters.max;
        this.width = 31;
        this.height = 17;
        this.accumulatorTimer = 0;
        this.batImageIndex = 0;
        this.sinAcc = 0;
    },
    
    upDownPointer: function () {
        this.y = (Math.sin(this.sinAcc) * this.maxSin) + this.pivotY;
    },
    
    leftRightPointer: function () {
        this.x = (Math.sin(this.sinAcc) * this.maxSin) + this.pivotX;
    },
    
    movementPointer: function () {},
    
    onUpdate: function (delta) {
        this.accumulatorTimer += delta;
        
        this.sinAcc += this.speed;
        this.movementPointer();
        
        if (this.accumulatorTimer >= 0.2) {
            this.accumulatorTimer = 0;
            this.batImageIndex += 1;
            this.batImageIndex = this.batImageIndex % 3;
        }
        
        if (dracul.isRectColliding(this)) {
            dracul.kill();
        }
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.bat.spriteBag[this.batImageIndex].image,
                     this.x, this.y);
    }
};