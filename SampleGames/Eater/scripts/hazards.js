var Hazards = {
    onInit: function onInit(param) {
        var self = this;
        this.x = param.x;
        this.y = param.y;
        this.width = 16;
        this.height = 12;
        
        this.onUpdate = this.normalUpdate;
        this.onDraw = this.hazzardDraw;
        
        if (param.move !== undefined) {
            this.speed = param.move.speed;
            this.moveAcc = 0;
            this.originalYPosition = param.y;
            this.originalXPosition = param.x;
            this.range = param.move.range;
            
            switch(param.move.style) {
                case 'upDown':
                    this.onUpdate = this.upDownUpdate;
                    break;
                case 'leftRight':
                    this.onUpdate = this.leftRightUpdate
                    break;
                case 'both':
                default:
                    this.onUpdate = this.bothUpdate
                    break;
            }
        } else if (param.crocodile !== undefined) {
            this.width = 33;
            this.height = 64;
            this.speed = param.crocodile.speed;
            this.originalYPosition = param.y;
            this.originalXPosition = param.x;
            this.crocodileSprite = jsGFwk.Sprites.crocodile.clone();
            this.crocodileSprite.reset();
            
            this.crocodileWalkingTimer = new jsGFwk.Timer({
                action: function () {
                    self.crocodileSprite.next();
                },
                tickTime: 0.2
            });
            
            this.onUpdate = this.crocodileUpdate;
            this.onDraw = this.crocodileDraw;
        } else if (param.rain) {
            this.rainAliveTimer = new jsGFwk.Timer({
                action: function () {
                    self.rainIsShown = false;
                }, tickTime: 0.3
            });
            
            this.rainShowTimer = new jsGFwk.Timer({
                action: function () {
                    if (parseInt(Math.random() * 10) === 5) {
                        self.rainIsShown = true;
                    }
                }, tickTime: 0.2
            });
            
            this.rainDropTimer = new jsGFwk.Timer({
                action: function () {
                    dropsContainer.cloneObject({
                        x: parseInt(Math.random() * 500) + 20,
                        y: parseInt(Math.random() * 430) + 20
                    });
                }, tickTime: 0.2
            });
            
            this.onUpdate = this.rainUpdate;
            this.onDraw = this.rainDraw;
        } else if (param.mud) {
            this.width = 19;
            this.height = 19;
            this.onUpdate = this.mudUpdate;
            this.onDraw = this.mudDraw;
        } else if (param.monkey !== undefined) {
            var self = this;
            this.width = 43;
            this.height = 38;
            this.speed = param.monkey.speed;
            this.targetX = Player.x;
            this.targetY = Player.y;
            
            this.monkeySprite = jsGFwk.Sprites.gorilla.clone();
            this.monkeySprite.reset();
            
            this.monkeyWalkingTimer = new jsGFwk.Timer({
                action: function () {
                    self.monkeySprite.next();
                },
                tickTime: 0.2
            });
            
            this.monkeyTargetingTimer = new jsGFwk.Timer({
                action: function () {
                    self.targetX = Player.x;
                    self.targetY = Player.y;
                },
                tickTime: param.monkey.movementSeed
            });
            
            this.onUpdate = this.monkeyUpdate;
            this.onDraw = this.monkeyDraw;
        } else if (param.yongo !== undefined) {
            this.yongoWalkingTimer = new jsGFwk.Timer({
                action: function () {
                    jsGFwk.Sprites.yeti.next();
                },
                tickTime: 0.2
            });
            
            this.width = 30;
            this.height = 30;
            this.speed = param.yongo.speed;
            
            switch (param.yongo.type) {
                case 'fake':
                    this.onUpdate = this.yongoFakeUpdate;
                    this.onDraw = this.yongoDraw;
                    break;
                default:
                    break;
            }
        }
    },
    
    /** Yongo **/
    yongoFakeUpdate: function (delta) {
        this.yongoWalkingTimer.tick(delta);
        this.y -= this.speed;
        
        if (this.y <= -30) { this.destroy(); }
    },
    
    yongoDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.yeti.sprite.image, this.x, this.y);
    },
    
    /** Gorilla **/
    monkeyUpdate: function (delta) {
        this.monkeyWalkingTimer.tick(delta);
        this.monkeyTargetingTimer.tick(delta);
        
        this.x += (this.targetX - this.x) / this.speed;
		this.y += (this.targetY - this.y) / this.speed;
        
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    monkeyDraw: function (ctx) {
        ctx.drawImage(this.monkeySprite.sprite.image, this.x, this.y);
    },
        
    /** Mud **/
    mudUpdate: function (delta) {
        this.isColliding = Player.isRectColliding(this);
    },
    
    mudDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.mud.image, this.x, this.y, 19, 19);
    },
    
    /** Rain **/
    
    rainUpdate: function (delta) {
        this.rainDropTimer.tick(delta);
        if (this.rainIsShown) {
            this.rainAliveTimer.tick(delta);
        } else {
            this.rainShowTimer.tick(delta);
        }
    },
    
    rainDraw: function (ctx) {
        if (this.rainIsShown) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 640, 480);
        }
    },
    
    /** Crocodile **/
    
    crocodileUpdate: function (delta) {
        this.crocodileWalkingTimer.tick(delta);
        this.y -= this.speed;
        
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
        
        if (this.y <= -64) { this.y = 480; }
    },
    
    crocodileDraw: function (ctx) {
        ctx.drawImage(this.crocodileSprite.sprite.image, this.x, this.y);
    },
    
    /***/
    
    /** Red hazards **/
    
    bothUpdate: function upDownUpdate(delta) {
        this.moveAcc += this.speed;
        this.x = (Math.sin(this.moveAcc) * this.range) + this.originalXPosition;
        this.y = (Math.cos(this.moveAcc) * this.range) + this.originalYPosition;
        
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    leftRightUpdate: function upDownUpdate(delta) {
        this.moveAcc += this.speed;
        this.x = (Math.sin(this.moveAcc) * this.range) + this.originalXPosition;
        
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    upDownUpdate: function upDownUpdate(delta) {
        this.moveAcc += this.speed;
        this.y = (Math.sin(this.moveAcc) * this.range) + this.originalYPosition;
        
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    normalUpdate: function normalUpdate(delta) {
        if (Player.isRectColliding(this)) {
            LevelController.killHero();
            this.destroy();
        }
    },
    
    hazzardDraw: function (ctx) {
        /*ctx.shadowColor = 'red';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;*/
        ctx.drawImage(jsGFwk.Sprites.traps.image, this.x, this.y);
    },
    
    /****/
    
    onUpdate: function onUpdate() { },
    onDraw: function onDraw(ctx) { }
};