var spaceship = {
    id: 'spaceship',
    visible: true,
    gravity: 0.06,
    
    trusterUpPower: 0.1,
    topTrusterUpPower: 0.1,

    topSpeed: 5,
    downSpeed: 0,

    sideSpeed: 0,
    sideTilt: 0,
    topTilt: 0.04,

    rotationPoint: { x: 0, y: 0 },

    trustersOn: false,

    deltaAccumulator: 0,
    gasConsumption: 0.09,
    gasGain: -0.15,

    isHit: false,

    radius: 10,
    center: { x: 14, y: 20 },
    
    emitCloud: function () {
        var self = this;
        cloudsContainer.cloneObject({
            x: self.x,
            y: self.y + (self.height)
        });
        puffJuke.play();
    },

    die: function() {
        spaceshipDie = true;

        popJuke.play();
        for (var i = 0; i < 50; i++) {
            particlesContainer.cloneObject({ x: this.x, y: this.y });
        }

        this.sideSpeed = 0;
        this.sideTilt = 0;
        this.topTilt = 0.04;
        this.trusterUpPower = 0.1;
        this.topTrusterUpPower = 0.1;
        this.topSpeed = 5;
        this.downSpeed = 0;
    },

    hit: function() {
        this.isHit = true;
    },

    init: function () {
        var self = this;
        this.x = width / 2;
        this.y = height / 2;
        this.width = 29;
        this.height = 39;
        jsGFwk.Sprites.truster.reset();

        this.hitTimer = new jsGFwk.Timer({
			action: function () {
                self.isHit = false;
                self.width = 29;
                self.height = 39;
			},
            tickTime: 0.2
		});
    },
    update: function (delta) {
        if (spaceshipDie) { 
            return; 
        }

        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            if (stats.gas > 0) {
                if ((this.downSpeed * -1) < this.topSpeed) {
                    this.downSpeed -= this.trusterUpPower;
                }
                jsGFwk.Sprites.truster.next();
                this.trustersOn = true;
                trusterJuker.play();
            } else {
                this.trustersOn = false;
            }
            stats.updateGas(this.gasConsumption);
        } else {
            this.trustersOn = false;
            stats.updateGas(this.gasGain);
        }

        if (!this.trustersOn) {
            this.deltaAccumulator += delta;
            if (this.deltaAccumulator >= 0.3) {
                this.emitCloud();
                this.deltaAccumulator = 0;
            }
        }

        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] &&
            !jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] &&
            this.sideTilt > (this.topTilt * -1)) {
                this.sideTilt -= 0.001;
                this.sideSpeed -= 0.04;
        }

        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] &&
            !jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] &&
            this.sideTilt < this.topTilt) {
                this.sideTilt += 0.001;
                this.sideSpeed += 0.04;
        }

        this.trusterUpPower = this.topTrusterUpPower - Math.abs(this.sideTilt);

        if (this.downSpeed < this.topSpeed) {
            this.downSpeed += this.gravity;
        }

        this.y += this.downSpeed;
        this.x += this.sideSpeed;

        if (this.isHit) {
            this.width = 15 + (Math.random() * 35);
            this.height = 15 + (Math.random() * 45);
            this.hitTimer.tick(delta)
        }

        if (this.y < 0) { this.y = 0; }
        if (this.y > (height - 10)) { stats.updateLive(100); }
        if (this.x > width) { this.x = 0; }
        if (this.x < (this.width * -1)) { this.x = width; }

        if (this.isRadColliding(angryAsteroid)) {
            this.die();
        }
    },
    draw: function (context) {
        if (spaceshipDie) { 
            return;
        }

        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate((this.sideTilt * 700) * Math.PI / 180);

        if (this.trustersOn) {
            context.drawImage(jsGFwk.Sprites.truster.sprite.image, -(this.width - 20), -(this.height - 52));
        }

        context.drawImage(jsGFwk.Sprites.ship.image, -(this.width / 2), -(this.height / 2));
        context.restore();
    }
};