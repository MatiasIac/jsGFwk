var bearBullet = {
    bulletSpeed: 4,
    onInit: function (p) {
        this.x = p.x;
        this.y = p.y;
        this.width = 7;
        this.height = 7;
        this.angle = p.angle;
        
        laser2Juke.play();
    },
    onUpdate: function (delta) {
        this.x += this.bulletSpeed * Math.cos(this.angle);
        this.y += this.bulletSpeed * Math.sin(this.angle);
        
        if ((this.x < 0 || this.x > jsGFwk.settings.width) ||
            (this.y < 0 || this.y > jsGFwk.settings.height)) {
            this.destroy();
            return;
        }
        
        if (jsGFwk.Collisions.areCollidingBy(this, leo, 
            jsGFwk.Collisions.collidingModes.RECTANGLE)) {
            leo.hit();
            this.destroy();
        }
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.bearBullet.image, this.x, this.y);
    }
};