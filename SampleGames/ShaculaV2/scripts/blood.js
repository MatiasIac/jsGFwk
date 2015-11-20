var Blood = {
    onInit: function (parameters) {
        this.x = parameters.blood.x;
        this.y = parameters.blood.y;
        this.index = parameters.index;
        this.height = 30;
        this.width = 12;
        this.powerUpAccumulator = 0;
        this.powerUpWait = 0.1;
        this.powerUpPointer = 0;
    },
    onUpdate: function (delta) {
        if (dracul.isRectColliding(this)) {
            GLOBAL.minRadiusLight += 20;
            GLOBAL.maxRadiusLight += 20;
            
            /*if (GLOBAL.bloodContainer.length() === 1) {
                Coffin.isOpen = 1;
            }*/
            Levels[GLOBAL.currentLevel].blood[this.index].isActive = false;
            this.destroy();
        }
        
        this.powerUpAccumulator += delta;
        if (this.powerUpAccumulator >= this.powerUpWait) {
            this.powerUpAccumulator = 0;
            this.powerUpPointer++;
            this.powerUpPointer = this.powerUpPointer % jsGFwk.Sprites.powerUp.spriteBag.length;
        }
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.powerUp.spriteBag[this.powerUpPointer].image, this.x, this.y);
    }
};