var oscar = {
    onInit: function (p) {
        var self = this;
        this.x = 680;
        this.y = (Math.random() * 400) + 10;
        
        this.bulletTimer = new jsGFwk.Timer({
            action: function () {
                bearBulletContainer.cloneObject({
                    angle: Math.atan2(leo.y - self.y, leo.x - self.x),
                    x: self.x,
                    y: self.y
                });
            }, tickTime: 0.4
        });
    },
    onUpdate: function (delta) {
        this.x -= 5;
        
        this.bulletTimer.tick(delta);
        
        if (this.x <= -41) {
            this.destroy();
            return;
        }
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.oscar.image, this.x, this.y);
    }
};