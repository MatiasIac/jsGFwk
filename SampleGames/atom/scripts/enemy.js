var enemy = {
    onInit: function (parameters) {
        this.size = parameters.size;
        this.speed = parameters.speed;
        this.x = parameters.x;
        this.y = parameters.y;
    },
    onUpdate: function (delta) {
        var angle = Math.atan2(player.playerY - this.y,
                               player.playerX - this.x);
        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);
    },
    onDraw: function (context) {
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.strokeRect(this.x, this.y, this.size, this.size);
    }
};