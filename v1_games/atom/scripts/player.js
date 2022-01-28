var player = {
    id: 'player', visible: true, mouseClickId: -1,
    playerSpeed: 0.5,
    playerX: 100, playerY: 100, //playerSize: 5,
    currentMouseX: 0, currentMouseY: 0,
    friction: 0.98, topSpeed: 5, speedX: 0, speedY: 0,
    shieldCounter: 0, gainShieldAt: 5,
    x: 0, y: 0, radius: 5, center: {x: 1, y: 1},
    
    keyboardHandler: function (delta) {
        var tempX = this.playerX,
            tempY = this.playerY;
        
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
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.C]) {
            this.changeWeaponTimer.tick(delta);
        }
        
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        tempX += this.speedX;
        tempY += this.speedY;
        
        if (tempX > 0 && tempX < jsGFwk.settings.width - this.radius) {
            this.playerX = tempX;
        }
        
        if (tempY > 0 && tempY < jsGFwk.settings.height - this.radius) {
            this.playerY = tempY;
        }
    },
    
    gamePadHandler: function (delta) {
        var self = this,
            axisX = 0, axisY = 0,
            axisX2 = 0, axisY2 = 0,
            tempX = this.playerX,
            tempY = this.playerY;
        
        if (jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0] !== undefined) {
            axisX = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].axes[0].toFixed(2);
            axisY = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].axes[1].toFixed(2);

            //Left stick
            if (axisY < 0) {
                if (this.speedY > -this.topSpeed) {
                    this.speedY -= this.playerSpeed;
                }
            }

            if (axisY > 0) {
                if (this.speedY < this.topSpeed) {
                    this.speedY += this.playerSpeed;
                }
            }

            if (axisX < 0) {
                if (this.speedX > -this.topSpeed) {
                    this.speedX -= this.playerSpeed;
                }
            }

            if (axisX > 0) {
                if (this.speedX < this.topSpeed) {
                    this.speedX += this.playerSpeed;
                }
            }
            //*****

            this.speedX *= this.friction;
            this.speedY *= this.friction;
            tempX += this.speedX;
            tempY += this.speedY;

            if (tempX > 0 && tempX < jsGFwk.settings.width - this.radius) {
                this.playerX = tempX;
            }

            if (tempY > 0 && tempY < jsGFwk.settings.height - this.radius) {
                this.playerY = tempY;
            }
            
            //self.currentMouseX = coord.x;
            //self.currentMouseY = coord.y;
        }
    },
    
    powerUp: function () {
        switch(parseInt(Math.random() * 4)) {
            case 0:
                shots.shots[shots.shotIndex].damage += 0.1;
                break;
            case 1:
                shots.shots[shots.shotIndex].shotInterval = Math.max(shots.shots[shots.shotIndex].shotInterval - 0.1, 0.1);
                break;
            case 3:
                shots.shots[shots.shotIndex].size += 0.1;
                break;
            default:
                shots.shots[shots.shotIndex].speed += 0.1;
                break;
        }
        this.shieldGained();        
        shots.reApply();
    },
    
    shieldGained: function () {
        this.shieldCounter++;
        if (this.shieldCounter === this.gainShieldAt) {
            this.radius++;
            this.shieldCounter = 0;
            GLOBAL.shieldContainer.cloneObject();
        }
    },
    
    hit: function () {
        if (GLOBAL.shieldContainer.length() > 0) {
            GLOBAL.shieldContainer.getClonedAt(1).destroyShield();
        } else {
            if ((this.radius - 1) === 2) {
                //end game
            } else {
                this.radius--;
            }            
        }
    },
    
    init: function () {
        var self = this;  
        this.mouseMoveId = jsGFwk.IO.mouse.registerMove(function (coord) {			
            self.currentMouseX = coord.x;
            self.currentMouseY = coord.y;
		});
        
        this.changeWeaponTimer = new jsGFwk.Timer({
            action: function () {
                shots.switchShot();
                foreground.showMessage(shots.getShotName());
            }, tickTime: 0.5
        });
    },
    update: function (delta) {
        this.keyboardHandler(delta);
        this.gamePadHandler(delta);
        this.x = this.playerX;
        this.y = this.playerY;
        shots.tick(delta);
        
    },
    draw: function (context) {
        context.beginPath();
        context.arc(this.playerX, this.playerY, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'gray';
        context.fill();
        context.closePath();
    }
};