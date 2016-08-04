var leoBullet = {
    bulletSpeed: 10,
    onInit: function (p) {
        this.x = p.x;
        this.y = p.y;
        this.width = 27;
        this.height = 6;
    },
    onUpdate: function (delta) {
        var self = this;
        this.x += this.bulletSpeed + globalSpeed;
        
        enemyContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(self, item,
                     jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                event.cancel = true;
                item.hit();
                self.destroy();
            }
        });
        
        if (this.x > jsGFwk.settings.width) {
            this.destroy();
        }
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.leoBullet.image, this.x, this.y);
    }
};