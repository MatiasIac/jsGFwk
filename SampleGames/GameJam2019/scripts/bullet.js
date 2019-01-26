var bullet = {
    onInit: function(params) {
        this.params = params;
        this.speed = 3;
        this.angle = Math.atan2(this.params.targetY - this.params.y, 
            this.params.targetX - this.params.x);
    },
    onUpdate: function() {
        if (this.params.x < 0 || this.params.x > width) {
            this.destroy();
        }

        if (this.params.y < 0 || this.params.y > height) {
            this.destroy();
        }

        this.params.x += this.speed * Math.cos(this.angle);
        this.params.y += this.speed * Math.sin(this.angle);
    },
    onDraw: function(context) {
        context.drawImage(jsGFwk.Sprites.bullet.image,
            this.params.x, this.params.y);
    }
};