var powerup = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.radius = 10;
        this.center = { x: 1, y: 1 };
        this.accVisible = 0;
    },
    onUpdate: function (delta) {
        this.accVisible += delta;
        
        if (jsGFwk.Collisions.areCollidingBy(this, player,
                 jsGFwk.Collisions.collidingModes.RAD_DISTANCE)) {
            player.powerUp();
            this.destroy();
        }
        
        if (this.accVisible > 5) {
            this.destroy();
        }
    },
    onDraw: function (context) {
        context.beginPath();
        context.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(100,155,100,1)';
        context.fill();
        context.closePath();
    }
};