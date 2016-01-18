var bullet = {
    onInit: function (parameters) {
        this.x = parameters.player.x;
        this.y = parameters.player.y;
        this.speed = parameters.bullet.speed;
        this.size = parameters.bullet.size;
        this.angle = parameters.angle;
    },
    onUpdate: function (delta) {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        
        if ((this.x < 0 && this.x > jsGFwk.settings.width) ||
            (this.y < 0 && this.y > jsGFwk.settings.height)) {
            this.destroy();
        }
    },
    onDraw: function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }
};