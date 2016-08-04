var powerUp = {
    onInit: function (p) {
        this.x = p.x;
        this.y = p.y;
        this.width = 23;
        this.height = 20;
    },
    onUpdate: function (delta) {
        this.x--;
        
        if (jsGFwk.Collisions.areCollidingBy(this, leo, 
            jsGFwk.Collisions.collidingModes.RECTANGLE)) {
            leo.powerUp();
            this.destroy();
            return;
        }
        
        if (this.x < -this.width) {
            this.destroy();
        }
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.powerup.sprite.image, this.x, this.y, this.width, this.height);
    }
};