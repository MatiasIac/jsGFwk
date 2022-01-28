var witch = {
    id: 'witch', visible: true,
    friction: 0.98, topSpeed: 5, speedX: 0, speedY: 0,
    playerSpeed: 0.5,
    shieldEnabled: false,
    weapon: [
        { 
            name: 'Firewall', enabled: true, babies: 0, action: function () {
                var totalFires = parseInt(GLOBAL.witch.energy / 25);
                if (totalFires > 0) {
                    GLOBAL.witch.energy -= totalFires * 25;
                    firewallContainer.cloneObject({x: witch.x, y: witch.y, power: totalFires});
                }
            }
        },
        { name: 'Shield', enabled: false, babies: 5, action: function () {
            witch.shieldEnabled = !witch.shieldEnabled;
        } },
        { name: 'Lightning', enabled: false, babies: 25, action: function () {} },
        { name: 'Earthquake', enabled: false, babies: 50, action: function () {} },
        { name: 'Satan', enabled: false, babies: 100, action: function () {} }
    ],
    currentWeapon: 0,
    init: function () {
        var self = this;
        this.x = 10;
        this.y = 75;
        this.width = 11;
        this.height = 11;
        this.payload = 0;
        this.currentWeapon = 0;
        this.calderoFake = {
            x: 10, y: jsGFwk.settings.height - 8,
            width: 12, height: 8
        };
        
        this.foodConsumptionTimer = new jsGFwk.Timer({
            action: function () {
                GLOBAL.witch.feed -= 0.5;
                if (GLOBAL.witch.feed <= 0) {
                    //DEAD
                    jsGFwk.IO.keyboard.unregisterKeypress(this.keyPressId);
                    jsGFwk.Scenes.scenes.end.enable();
                }
            },
            tickTime: 0.3
        });
        
        this.keyPressId = jsGFwk.IO.keyboard.registerKeypress(function (code) {
            if (code === jsGFwk.IO.keyboard.key.N) {
                var nextWeapon = (self.currentWeapon + 1) % self.weapon.length;
                if (self.weapon[nextWeapon].enabled) {
                    self.currentWeapon = ++self.currentWeapon % self.weapon.length;
                } else { self.currentWeapon = 0; }
            } else if (code === jsGFwk.IO.keyboard.key.M) {
                self.weapon[self.currentWeapon].action();
            }
        });
    },
    hit: function () {
        if (witch.shieldEnabled) {
            for(var i = 0; i < 10; i++) {
                particlesContainer.cloneObject({x: this.x + 5, y: this.y + 5});
            }
            return; 
        }
        
        if (this.payload > 0) {
            var babyYpos = (this.y + 11) + (5 * this.payload);
            for(var i = 0; i < 10; i++) {
                particlesContainer.cloneObject({x: this.x + 5, y: babyYpos});
            }
            this.payload--;
        } else {
            //DEAD
            jsGFwk.IO.keyboard.unregisterKeypress(this.keyPressId);
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
            if (this.payload > 0) {
                jsGFwk.ResourceManager.sounds.risabruja.audio.play();

                GLOBAL.witch.feed = Math.min(100, GLOBAL.witch.feed + (this.payload * 10));
                GLOBAL.witch.energy = Math.min(100, GLOBAL.witch.energy + (this.payload * 15));

                GLOBAL.babys += this.payload;
                
                for (var i = 0; i < this.weapon.length; i++) {
                    this.weapon[i].enabled = this.weapon[i].babies <= GLOBAL.babys || this.weapon[i].enabled;
                }
                
                this.payload = 0;
            }
            
            GLOBAL.witch.energy = Math.min(100, GLOBAL.witch.energy + 0.1);
        }
        
        this.foodConsumptionTimer.tick(delta);
        
        if (witch.shieldEnabled) {
            GLOBAL.witch.energy = Math.max(0, GLOBAL.witch.energy - 0.3);
        }
        
        if (GLOBAL.witch.energy === 0) { witch.shieldEnabled = false; }
    },
    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.player.image, this.x, this.y);
        
        for (var i = 0; i < this.payload; i++) {
            context.drawImage(jsGFwk.Sprites.baby.image, this.x + 5, (this.y + 11) + (5 * i));
        }
        
        if (this.shieldEnabled) {
            context.drawImage(jsGFwk.Sprites.shield.image, this.x - 2, this.y - 2);
        }
    }
};