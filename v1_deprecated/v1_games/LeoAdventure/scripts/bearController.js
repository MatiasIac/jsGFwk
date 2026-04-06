var bearController = {
    id: 'bearController',
    visible: false,
    init: function () {
        jsGFwk.Sprites.bear.reset();
        
        this.animationBearTimer = new jsGFwk.Timer({
            action: function () {
                jsGFwk.Sprites.bear.next();
            },
            tickTime: 0.3
        });
        
        this.bearTimer = new jsGFwk.Timer({
            action: function () {
                enemyContainer.cloneObject({x: 800, 
                                            y: (Math.random() * 300) + 50,
                                            speed: (Math.random() * 6) + 3});
            },
            tickTime: 1.3
        });
        
        this.oscarTimer = new jsGFwk.Timer({
            action: function () {
                oscarContainer.cloneObject();
            },
            tickTime: 2
        });
    },
    update: function (delta) {
        this.bearTimer.tick(delta);
        this.animationBearTimer.tick(delta);
        this.oscarTimer.tick(delta);
    }
};