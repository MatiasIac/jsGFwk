var shots = {
    init: function () {
        var self = this;
        this.shotIndex = 0;
        this.bulletTimer = new jsGFwk.Timer({
            action: function () {
                self.shot();
            }, tickTime: self.shots[this.shotIndex].shotInterval
        });
    },
    getShotName: function () {
        return this.shots[this.shotIndex].name;
    },
    tick: function (delta) {
        this.bulletTimer.tick(delta);
    },
    switchShot: function () {
        this.shotIndex++;
        this.shotIndex = this.shotIndex % this.shots.length;
        this.bulletTimer.tickTime = this.shots[this.shotIndex].shotInterval;
    },
    shot: function () {
        this.shots[this.shotIndex].f(this.buildParams());
    },
    buildParams: function () {
        var self = this,
            player = jsGFwk.getGameObjects().player;
        
        return {
            playerX: player.playerX,
            playerY: player.playerY,
            currentMouseX: player.currentMouseX,
            currentMouseY: player.currentMouseY
        };
    },
    shots: [
        {
            name: 'Bomb',
            f: function (params) {
                GLOBAL.playerBulletContainer.cloneObject({
                    player: { x: params.playerX, y: params.playerY },
                    bullet: { size: this.size, speed: this.speed },
                    angle: Math.atan2(params.currentMouseY - params.playerY, params.currentMouseX - params.playerX)
                });
            },
            size: 15, speed: 0.5, shotInterval: 3
        },
        {
            name: 'Dual Shot',
            f: function (params) {
                var angle = Math.atan2(params.currentMouseY - params.playerY, params.currentMouseX - params.playerX);
                
                GLOBAL.playerBulletContainer.cloneObject({
                    player: { x: params.playerX, y: params.playerY },
                    bullet: { size: this.size, speed: this.speed },
                    angle: angle
                });
                
                GLOBAL.playerBulletContainer.cloneObject({
                    player: { x: params.playerX, y: params.playerY },
                    bullet: { size: this.size, speed: this.speed },
                    angle: angle - 0.1
                });
            },
            size: 5, speed: 3, shotInterval: 1
        },
        {
        name: 'Shotgun',
            f: function (params) {
                var angle = Math.atan2(params.currentMouseY - params.playerY, params.currentMouseX - params.playerX);
                
                GLOBAL.playerBulletContainer.cloneObject({
                    player: { x: params.playerX, y: params.playerY },
                    bullet: { size: this.size, speed: this.speed },
                    angle: angle
                });
                
                GLOBAL.playerBulletContainer.cloneObject({
                    player: { x: params.playerX, y: params.playerY },
                    bullet: { size: this.size, speed: this.speed },
                    angle: angle - 0.1
                });
                
                GLOBAL.playerBulletContainer.cloneObject({
                    player: { x: params.playerX, y: params.playerY },
                    bullet: { size: this.size, speed: this.speed },
                    angle: angle + 0.1
                });
            },
            size: 5, speed: 6, shotInterval: 1.5
        },
        {
            name: 'Machine Gun',
            f: function (params) {
                var angle = (Math.atan2(params.currentMouseY - params.playerY, params.currentMouseX - params.playerX)) + (Math.random() * 0.1);
                
                GLOBAL.playerBulletContainer.cloneObject({
                    player: { x: params.playerX, y: params.playerY },
                    bullet: { size: this.size, speed: this.speed },
                    angle: angle
                });
            },
            size: 2, speed: 5, shotInterval: 0.1
        }
    ]   
};