var bullet = {
    onInit: function (parameters) {
        this.x = parameters.player.x;
        this.y = parameters.player.y;
        this.speed = parameters.bullet.speed;
        this.radius = parameters.bullet.size;
        this.angle = parameters.angle;
        this.center = { x: this.radius / 2, y: this.radius / 2 };
    },
    onUpdate: function (delta) {
        var self = this;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        
        if ((this.x < 0 && this.x > jsGFwk.settings.width) ||
            (this.y < 0 && this.y > jsGFwk.settings.height)) {
            this.destroy();
        }
        
        GLOBAL.enemyContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(self, item, jsGFwk.Collisions.collidingModes.RAD_DISTANCE)) {
                event.cancel = true;
                item.impact();
                self.destroy();
            }
        });
    },
    onDraw: function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }
};