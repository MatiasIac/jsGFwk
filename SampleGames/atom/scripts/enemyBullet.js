var enemyBullet = {
    onInit: function (parameters) {
        this.x = parameters.enemy.x;
        this.y = parameters.enemy.y;
        this.speed = parameters.bullet.speed;
        this.radius = parameters.bullet.size;
        this.angle = parameters.angle;
        this.center = { x: 0, y: 0 };
    },
    onUpdate: function (delta) {
        var self = this;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        
        if ((this.x < 0 && this.x > jsGFwk.settings.width) ||
            (this.y < 0 && this.y > jsGFwk.settings.height)) {
            this.destroy();
        }
        
        /*GLOBAL.enemyContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(self, item, jsGFwk.Collisions.collidingModes.RAD_DISTANCE)) {
                event.cancel = true;
                item.impact(self.damage);
                self.destroy();
            }
        });*/
    },
    onDraw: function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(0,0,180,1)';
        context.fill();
        context.closePath();
    }
};