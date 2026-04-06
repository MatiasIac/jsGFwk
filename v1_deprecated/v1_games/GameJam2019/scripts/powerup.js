var powerup = {
    onInit: function(param) {
        this.x = param.x;
        this.y = param.y;
        this.width = 22;
        this.height = 18;
        this.powerUpIndex = parseInt(Math.random() * 3);
        this.speed = 1.2;
    },
    onUpdate: function(delta) {
        this.y += this.speed;

        if (spaceship.isRectColliding(this)) {
            switch (this.powerUpIndex) {
                case 0:
                    stats.updateLive(-5);
                    break;
                case 1:
                    stats.updateEnergy(-5);
                    break;
                case 2:
                    stats.updateGas(-15);
                    break;
            }
            powerUpJuke.play();
            this.destroy();
        }

        if (this.y > height) {
            this.destroy();
        }
    },
    onDraw: function(context) {
        context.drawImage(jsGFwk.Sprites.powerups.spriteBag[this.powerUpIndex].image, 
            this.x, this.y);
    }
}