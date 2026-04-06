var firewall = {
    onInit: function (parameters) {
        var self = this;
        this.x = parameters.x;
        this.y = parameters.y;
        this.power = parameters.power;
        
        jsGFwk.Sprites.firewall.reset();
        
        this.updatePointer = this.updateBullet;
        this.drawPointer = this.drawBullet;
        
        this.wallTimer = new jsGFwk.Timer({
            action: function () {
                self.destroy();
            }, tickTime: 2
        });
        
        this.width = 7 * this.power;
        this.height = 12;
    },
    updateBullet: function (delta) {
        this.y += 2;
        if (this.y >= jsGFwk.settings.height) {
            this.y = jsGFwk.settings.height - 12;
            this.updatePointer = this.updateWall;
            this.drawPointer = this.drawWall;
        }
    },
    drawBullet: function (context) {
        context.beginPath();
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.closePath();
    },
    updateWall: function (delta) {
        var self = this;
        
        this.wallTimer.tick(delta);
        jsGFwk.Sprites.firewall.next();
        
        enemyContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(self, item,
                jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                item.destroy();
            }
        });
    },
    drawWall: function (context) {
        for (var i = 0; i < this.power; i++) {
            context.drawImage(jsGFwk.Sprites.firewall.sprite.image, this.x + (i * 7), jsGFwk.settings.height - 12);
        }
    },
    onUpdate: function (delta) {
        this.updatePointer(delta);
    },
    onDraw: function (context) {
        this.drawPointer(context);
    }
};