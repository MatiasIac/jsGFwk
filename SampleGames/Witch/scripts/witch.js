var witch = {
    id: 'witch', visible: true,
    friction: 0.98, topSpeed: 5, speedX: 0, speedY: 0,
    playerSpeed: 0.5,
    init: function () {
        this.x = 10;
        this.y = 75;
        this.width = 11;
        this.height = 11;
        this.payload = 0;
        this.calderoFake = {
            x: 10, y: jsGFwk.settings.height - 8,
            width: 12, height: 8
        };
        
        this.foodConsumptionTimer = new jsGFwk.Timer({
            action: function () {
                GLOBAL.witch.feed--;
                if (GLOBAL.witch <= 0) {
                    //DEAD
                    jsGFwk.Scenes.scenes.end.enable();
                }
            },
            tickTime: 0.3
        });
    },
    hit: function () {
        if (this.payload > 0) {
            var babyYpos = (this.y + 11) + (5 * this.payload);
            for(var i = 0; i < 10; i++) {
                particlesContainer.cloneObject({x: this.x + 5, y: babyYpos});
            }
            this.payload--;
        } else {
            //DEAD
            jsGFwk.Scenes.scenes.end.enable();
        }
    },
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
        
        if (tempX > 0 && tempX < jsGFwk.settings.width - 11) {
            this.x = tempX;
        }
        
        if (tempY > 0 && tempY < jsGFwk.settings.height - 11) {
            this.y = tempY;
        }
    },
    update: function (delta) {
        this.keyboardHandler(delta);
        
        if (jsGFwk.Collisions.areCollidingBy(this, this.calderoFake, 
            jsGFwk.Collisions.collidingModes.RECTANGLE)) {
            
            GLOBAL.witch.feed = Math.min(100, GLOBAL.witch.feed + (this.payload * 5));
            
            GLOBAL.babys += this.payload;
            this.payload = 0;
        }
        
        this.foodConsumptionTimer.tick(delta);
    },
    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.player.image, this.x, this.y);
        
        for (var i = 0; i < this.payload; i++) {
            context.drawImage(jsGFwk.Sprites.baby.image, this.x + 5, (this.y + 11) + (5 * i));
        }
    }
};