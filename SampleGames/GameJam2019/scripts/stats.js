var stats = {
    id: "stats",
    visible: true,
    y: 0,

    max: 72,

    energy: 72,
    gas: 72,
    live: 72,

    reset: function() {
        this.energy = this.max;
        this.gas = this.max;
        this.live = this.max;
    },

    updateGas: function(value) {
        this.gas -= value;
        this.gas = Math.max(0, this.gas);
        this.gas = Math.min(this.max, this.gas);
    },

    updateLive: function(value) {
        this.live -= value;
        this.live = Math.max(0, this.live);
        this.live = Math.min(this.max, this.live);
        spaceship.hit();

        if (this.live <= 0) {
            spaceship.die();
        }
    },

    updateEnergy: function(value) {
        this.energy -= value;
        this.energy = Math.max(0, this.energy);
        this.energy = Math.min(this.max, this.energy);
    },

    init: function () {
        this.y = height - 30;
    },

    draw: function(context) {
        context.drawImage(jsGFwk.Sprites.lightning.image, 10, this.y);
        context.drawImage(jsGFwk.Sprites.yellowBar.image, 25, this.y, this.energy, 15);

        context.drawImage(jsGFwk.Sprites.gas.image, 105, this.y);
        context.drawImage(jsGFwk.Sprites.blueBar.image, 120, this.y, this.gas, 15);

        context.drawImage(jsGFwk.Sprites.redBar.image, 210, this.y, this.live, 15);
    }
};