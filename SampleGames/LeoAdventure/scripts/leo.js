var leo = {
    id: 'leo',
    visible: true,
    
    friction: 0.96, topSpeed: 10, speedX: 0, speedY: 0,
    playerSpeed: 0.9,
    x: 0, y: 0,
    shots: 1,
    
    keyboardHandler: function (delta) {
        var tempX = this.x,
            tempY = this.y;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            if (this.speedY > -this.topSpeed) {
                this.speedY -= this.playerSpeed;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            if (this.speedY < this.topSpeed) {
                this.speedY += this.playerSpeed;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            if (this.speedX > -this.topSpeed) {
                this.speedX -= this.playerSpeed;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            if (this.speedX < this.topSpeed) {
                this.speedX += this.playerSpeed;
            }
        }
        
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        tempX += this.speedX;
        tempY += this.speedY;
        
        if (tempX > 0 && tempX < jsGFwk.settings.width - this.width) {
            this.x = tempX;
        }
        
        if (tempY > 0 && tempY < jsGFwk.settings.height - this.height) {
            this.y = tempY;
        }
    },
    
    hit: function () {
        leoEnergy--;
        
        if (leoEnergy === 0) {
            jsGFwk.Scenes.scenes.end.enable();
        }
    },
    
    powerUp: function () {
        this.shots++;
        this.shots = Math.min(this.shots, 4);
        
        if (this.shots === 4) {
            leoEnergy += 35;
        }
    },
    
    init: function () {
        var self = this;
        this.x = 10;
        this.y = 75;
        this.width = 69;
        this.height = 58;
        
        //Reset some variables
        leoEnergy = 100;
        points = 0;
        killedBears = 0;
        this.shots = 1;
        //
        
        jsGFwk.IO.keyboard.registerKeypress(function (code) {
            if (code === jsGFwk.IO.keyboard.key.M) {
                for (var i = 0; i < self.shots; i++) {
                    bulletContainer.cloneObject({x: self.x + self.width, y: self.y + (i * 10)});
                }
                laserJuke.play();
            }
        });
    },
    update: function (delta) {
        this.keyboardHandler(delta);
    },
    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.leo.image, this.x, this.y, this.width, this.height);
    }
};