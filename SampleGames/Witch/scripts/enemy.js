var enemy = {
    onInit: function (params) {
        var self = this;
        this.x = jsGFwk.settings.width;
        this.y = jsGFwk.settings.height - 10;
        this.speed = (Math.random() * 1) + 1;
        
        this.bulletTimer = new jsGFwk.Timer({
            action: function () {
                bulletContainer.cloneObject({
                    angle: Math.atan2(witch.y - self.y, witch.x - self.x),
                    x: self.x,
                    y: self.y
                });
            }, tickTime: 1
        });
    },
    onUpdate: function (delta) {
        if (witch.x < this.x) {
            this.x -= this.speed;
        } else if (witch.x > this.x) {
            this.x += this.speed;
        }
        
        this.bulletTimer.tick(delta);
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.aldeano.image, this.x, this.y);
    }
};