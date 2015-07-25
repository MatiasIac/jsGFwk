/*globals jsGFwk */
var Enemy = (function () {
    "use strict";
    
    var enemy = function () {
    };
        
	enemy.prototype.x = 0;
    enemy.prototype.y = 0;
    enemy.prototype.targetX = 0;
    enemy.prototype.targetY = 0;
    enemy.prototype.enemySpeed = 50;
    enemy.prototype.width = 30;
    enemy.prototype.height = 30;
    enemy.prototype.isRectColliding = null;
    enemy.prototype.particles = null;
    enemy.prototype.speedTimer = null;
    enemy.prototype.backTimer = null;
    enemy.prototype.proximity = true;
    enemy.prototype.cos = 0;
    enemy.prototype.cosAcc = 0;
    enemy.prototype.reshrinkTimer = null;
    enemy.prototype.rotationAngle = 45;
    enemy.prototype.powerShadow = 0;
    enemy.prototype.powerShadowTimer = null;
    enemy.prototype.color = '';
    enemy.prototype.powerChargerSpeed = 0.5;
    enemy.prototype.massiveGunnerTimer = null;
	
    enemy.prototype.shrink = function () {
        var self = this;
        self.width -= 10;
        self.height -= 10;
        self.x += 5;
        self.y += 5;
        self.proximity = false;
        self.enemySpeed += 10;
    };
    
	enemy.prototype.onInit = function (parameters) {
        var self = this;
        
		this.x = parameters.x;
		this.y = parameters.y;
		this.enemySpeed = parameters.speed;
        this.color = parameters.color;

		this.targetX = jsGFwk.getGameObjects().alan.x;
		this.targetY = jsGFwk.getGameObjects().alan.y;
        this.isRectColliding = jsGFwk.Collisions._rectColliding;
        this.enemyType = parameters.enemyType;
        
        this.setEnemyType(parameters.enemyType);
        
        this.powerShadowTimer = new jsGFwk.Timer({
			action: function () {
                if (self.powerShadow < 50) {
                    self.powerShadow += 5;
                } else {
                    self.powerShadow = 0;
                    self.shot();
                }
			},
            tickTime: this.powerChargerSpeed
		});
        
        this.speedTimer = new jsGFwk.Timer({
			action: function () {
                if (self.enemySpeed > 5) {
                    self.enemySpeed -= 2.5;
                    self.powerChargerSpeed = Math.max(0.1, (self.powerChargerSpeed - 0.1));
                    self.powerShadowTimer.tickTime = self.powerChargerSpeed;
                }
			},
            tickTime: 0.5
		});
        
        this.massiveGunnerTimer = new jsGFwk.Timer({
			action: function () {
                if (self.width <= 60) {
                    self.width += 0.5;
                    self.height += 0.5;
                    self.x -= 0.5;
                    self.y -= 0.5;
                } else {
                    self.powerShadowTimer.tickTime = 0.1;
                }
			},
            tickTime: 0.1
		});
        
        this.randomerTimer = new jsGFwk.Timer({
			action: function () {
                self.targetX = (Math.random() * 600) + 20;
                self.targetY = (Math.random() * 440) + 20;
			},
            tickTime: 2
		});
        
        this.reshrinkTimer = new jsGFwk.Timer({
			action: function () {
                if (self.width < 50) {
                    self.width += 1;
                    self.height += 1;
                    self.x -= 0.5;
                    self.y -= 0.5;
                }
			},
            tickTime: 0.2
		});
        
        this.backTimer = new jsGFwk.Timer({
			action: function () {
                self.proximity = true;
			},
            tickTime: 0.7
		});
	};
    
    enemy.prototype.setEnemyType = function (type) {
        var self = this;//,
            //rndType = 2;//parseInt(Math.random() * 3);
        
        switch (type) {
            case 0:
                this.drawAction = this.triangleDrawer;
                this.updateAction = this.follower;
                break;
            case 1:
                this.drawAction = this.triangleDrawer;
                this.updateAction = this.randomer;
                break;
            case 2:
                this.width = 10;
                this.height = 10;
                this.x = (Math.random() * 600) + 20;
                this.y = (Math.random() * 440) + 20;
                this.drawAction = this.boxDrawer;
                this.updateAction = this.massiveGunner;
                break;
            default:
                this.updateAction = this.follower;
                break;
        }
    };
    
    enemy.prototype.shot = function () {
        var bulletParam = { x: this.x, y: this.y, color: this.color };
        
        switch (this.enemyType) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                bulletParam.bulletSpeed = ((75 - this.width) * 15) / 100;
                bulletParam.bulletSize = (this.width * 20) / 100;
                break;
        }
        
        bulletEnemyContainer.cloneObject(bulletParam);
        laserJuke.play();
    };
    
    enemy.prototype.updateAction = function () { };
    
    //Enemy types
    enemy.prototype.follower = function (delta) {
        this.targetX = jsGFwk.getGameObjects().alan.x - 5;
		this.targetY = jsGFwk.getGameObjects().alan.y - 5;
        
        this.speedTimer.tick(delta);
        this.powerShadowTimer.tick(delta);
        
        this.x += (this.targetX - this.x) / this.enemySpeed;
        this.y += (this.targetY - this.y) / this.enemySpeed;
    };
    
    enemy.prototype.randomer = function (delta) {
        this.randomerTimer.tick(delta);
        this.powerShadowTimer.tick(delta);
        this.x += (this.targetX - this.x) / this.enemySpeed;
        this.y += (this.targetY - this.y) / this.enemySpeed;
    };
    
    enemy.prototype.massiveGunner = function (delta) {
        this.massiveGunnerTimer.tick(delta);
        this.powerShadowTimer.tick(delta);
    };
    
    //End enemy types
    
	enemy.prototype.onUpdate = function (delta) {
        var self = this;
        
        if (self.isRectColliding(jsGFwk.getGameObjects().alan)) {
            jsGFwk.getGameObjects().alan.live -= 1;
            jsGFwk.getGameObjects().cameraHandler.shake();
        }
        
        this.rotationAngle += 0.001;
        
        if (!this.proximity) {
            this.backTimer.tick(delta);
        } else {
            this.updateAction(delta);
        }
        
        this.reshrinkTimer.tick(delta);
        
        this.cosAcc += 0.1;
        this.cos = 50 + parseInt(Math.cos(this.cosAcc) * 50);
	};
    
    //drawers
    enemy.prototype.triangleDrawer = function (ctx) {
        ctx.lineCap = "round";
        ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
		ctx.rotate(this.rotationAngle * (180/Math.PI));
		ctx.translate(-(this.x + (this.width / 2)), -(this.y + (this.height / 2)));
        
        ctx.strokeStyle = "rgb(" + this.cos + ", " + this.cos + ", " + this.cos + ")";
        ctx.fillStyle = this.color;
        ctx.lineWidth = 5;
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.powerShadow + cicleShadow;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.translate(this.x, this.y);
        var h = this.width * (Math.sqrt(3)/2);
        ctx.beginPath();
        ctx.moveTo(0, -h / 2);
        ctx.lineTo( -this.width / 2, h / 2);
        ctx.lineTo(this.width / 2, h / 2);
        ctx.lineTo(0, -h / 2);
        ctx.stroke();
        ctx.fill(); 
        ctx.closePath();
    };
    
    enemy.prototype.boxDrawer = function (ctx) {
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgb(" + this.cos + ", " + this.cos + ", " + this.cos + ")";
        ctx.fillStyle = this.color;
        ctx.lineWidth = 5;
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.powerShadow + cicleShadow;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    };
    //
    
    enemy.prototype.drawAction = function () { };
    
	enemy.prototype.onDraw = function (ctx) {
        ctx.save();
        this.drawAction(ctx);
        ctx.restore();
	};
    
    return enemy;
    
}());