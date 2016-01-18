var player = {
    id: 'mainGame', visible: true, mouseClickId: -1,
    playerSpeed: 10,
    playerX: 100, playerY: 100, playerSize: 5,
    currentMouseX: 0, currentMouseY: 0,
    
    keyboardHandler: function () {
        var tempX = this.playerX,
            tempY = this.playerY;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            tempY -= this.playerSpeed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            tempY += this.playerSpeed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            tempX -= this.playerSpeed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            tempX += this.playerSpeed;
        }
        
        if (tempX > 0 && tempX < jsGFwk.settings.width - this.playerSize) {
            this.playerX = tempX;
        }
        
        if (tempY > 0 && tempY < jsGFwk.settings.height - this.playerSize) {
            this.playerY = tempY;
        }
    },
    
    init: function () {
        var self = this;  
        this.mouseMoveId = jsGFwk.IO.mouse.registerMove(function (coord) {			
            self.currentMouseX = coord.x;
            self.currentMouseY = coord.y;
		});
        
        this.bulletTimer = new jsGFwk.Timer({
            action: function () {
                GLOBAL.playerBulletContainer.cloneObject({
                    player: {x: self.playerX, y: self.playerY},
                    mouse: {x: self.currentMouseX, y: self.currentMouseY}
                });
            }, tickTime: 1
        });
    },
    update: function (delta) {
        this.keyboardHandler();
        this.bulletTimer.tick(delta);
    },
    draw: function (context) {    
        context.beginPath();
        context.arc(this.playerX, this.playerY, this.playerSize, 0, 2 * Math.PI, false);
        context.fillStyle = 'gray';
        context.fill();
        context.closePath();
    }
};