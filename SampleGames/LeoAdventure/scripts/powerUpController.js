var powerUpController = {
    id: 'powerUpController',
    visible: false,
    init: function () {
        jsGFwk.Sprites.powerup.reset();
        
        this.animationPowerTimer = new jsGFwk.Timer({
            action: function () {
                jsGFwk.Sprites.powerup.next();
            },
            tickTime: 0.3
        });
    },
    update: function (delta) {
        this.animationPowerTimer.tick(delta);
        
        if (killedBears >= 15) {
            powerUpContainer.cloneObject({ x: 680, y: (Math.random() * 300) + 50 });
            killedBears = 0;
        }
    }
};