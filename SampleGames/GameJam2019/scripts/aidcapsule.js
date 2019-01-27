var aidcapsule = {
    id: "aid",
    visible: true,
    x: 20,
    y: 0,
    width: 21,
    height: 20,
    isAlive: true,
    movementAccumulator: 0,
    deltaAccumulator: 0,

    life: 50,
    isHit: false,

    hit: function () {
        this.life -= 1;
        this.isHit = true;

        if (this.life <= 0) {
            this.isAlive = false;
            dropPowerUp({ x: this.x, y: this.y });
        }
    },

    init: function () {
        var self = this;
        this.y = height/2;
        
        this.endStretchingTimer = new jsGFwk.Timer({
			action: function () {
                self.isHit = false;
                self.width = 21;
                self.height = 20;
			},
            tickTime: 0.2
        });
        
        this.dropMissilesTimer = new jsGFwk.Timer({
			action: function () {
                for (var i = 0; i < 5; i++) {
                    bulletContainer.cloneObject({
                        x: self.x + 22,
                        y: self.y + 5,
                        targetX: (Math.random() * width) + 40,
                        targetY: (Math.random() * height)
                    });                    
                }
			},
            tickTime: 6
		});
    },

    update: function (delta) {
        if (this.isAlive) {
            this.y = (Math.sin(this.movementAccumulator) * (height / 2)) + (height - 200);
            this.movementAccumulator += 0.003;

            if (this.isHit) {
                this.width = 15 + (Math.random() * 25);
                this.height = 15 + (Math.random() * 20);
                this.endStretchingTimer.tick(delta);
            }

            this.dropMissilesTimer.tick(delta);
        } else {
            this.deltaAccumulator += delta;
            if (this.deltaAccumulator > 20) {
                this.deltaAccumulator = 0;
                this.life = 100;
                this.movementAccumulator = 0;
                this.isAlive = true;
            }
        }
    },

    draw: function (context) {
        if (this.isAlive) {
            context.drawImage(jsGFwk.Sprites.aid.image, this.x, this.y, this.width, this.height);
        }
    }
};