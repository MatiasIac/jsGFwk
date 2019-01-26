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
    
    emitCloud: function () {
        var self = this;
        cloudsContainer.cloneObject({
            x: self.x,
            y: self.y + (self.height)
        });
    },

    init: function () {
        this.x = 0;
        this.y = 0;
        this.width = 29;
        this.height = 39;
        jsGFwk.Sprites.truster.reset();
    },
    update: function (delta) {
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W] &&
            stats.gas > 0) {
            if ((this.downSpeed * -1) < this.topSpeed) {
                this.downSpeed -= this.trusterUpPower;
            }
            jsGFwk.Sprites.truster.next();

            stats.updateGas(this.gasConsumption);

            this.trustersOn = true;
        } else {
            this.trustersOn = false;
            this.deltaAccumulator += delta;
            stats.updateGas(this.gasGain);

            if (this.deltaAccumulator >= 0.2) {
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

        if (this.y < 0) { this.y = 0; }
        if (this.y > (height - this.height)) { this.y = (height - this.height); }
        if (this.x > width) { this.x = 0; }
        if (this.x < (this.width * -1)) { this.x = width; }
    },
    draw: function (context) {
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