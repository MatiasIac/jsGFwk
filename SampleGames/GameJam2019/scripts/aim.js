var aim = {
    id: "aim",
    visible: true,

    x: 0,
    y: 0,
    width: 40,
    height: 41,

    mouseMoveId: 0,
    mouseDownId: 0,
    mouseUpId: 0,

    isFiring: false,
    firingRatio: 0.1,

    deltaAccumulator: 0,

    firingDrainEnergy: 0.9,
    energyRecovery: -0.1,

    reset: function () {
        jsGFwk.IO.mouse.unregisterMove(this.mouseMoveId);
        jsGFwk.IO.mouse.unregisterDown(this.mouseDownId);
        jsGFwk.IO.mouse.unregisterClick(this.mouseUpId);
    },

    emitBullet: function () {
        var coord = jsGFwk.IO.mouse._lastMoveCoords;

        bulletContainer.cloneObject({
            x: spaceship.x + 22,
            y: spaceship.y + 5,
            targetX: coord.x,
            targetY: coord.y
        });

        stats.updateEnergy(this.firingDrainEnergy);
        fireJuke.play();
    },

    init: function () {
        var self = this;

        this.mouseMoveId = jsGFwk.IO.mouse.registerMove(function (coord) {
            aim.x = coord.x - (aim.width / 2);
            aim.y = coord.y - (aim.height / 2);
        });

        this.mouseDownId = jsGFwk.IO.mouse.registerDown(function () {
            self.isFiring = true;
        });

        this.mouseUpId = jsGFwk.IO.mouse.registerClick(function() {
            self.isFiring = false;
        });
    },
    update: function (delta) {
        if (this.isFiring && stats.energy > 5) {
            this.deltaAccumulator += delta;

            if (this.deltaAccumulator >= this.firingRatio) {
                this.deltaAccumulator = 0;
                this.emitBullet();
            }
        } else {
            stats.updateEnergy(this.energyRecovery);
        }
    },
    draw: function(context) {
        context.drawImage(jsGFwk.Sprites.aim.image, this.x, this.y);
    }
};