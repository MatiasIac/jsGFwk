var shield = {
    onInit: function (parameters) {
        this.droneAcc = 0;
        this.droneX = 0;
        this.droneY = 0;
    },
    onUpdate: function (delta) {
        this.droneAcc += 0.1;
        this.droneX = (Math.sin(this.droneAcc) * player.radius) + player.playerX;
        this.droneY = (Math.cos(this.droneAcc) * player.radius) + player.playerY;
    },
    onDraw: function (context) {
        context.beginPath();
        context.arc(this.droneX, this.droneY, player.radius / 2, 0, 2 * Math.PI, false);
        context.fillStyle = '#294255';
        context.fill();
        context.closePath();
    },
    destroyShield: function () {
        for(var i = 0; i < 10; i++) {
            GLOBAL.particlesContainer.cloneObject({x: this.droneX, y: this.droneY});
        }
        this.destroy();
    }
};