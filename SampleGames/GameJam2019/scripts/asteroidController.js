var asteroidController = {
    id: "asteroidController",
    visible: false,

    init: function () {
        var self = this;

        this.wave = 0;
        this.maxWaves = 20;
        this.asteroidsByWave = 2;

        this.waveTimer = new jsGFwk.Timer({
			action: function () {
                self.wave++;

                if (self.wave <= self.maxWaves) {
                    var asteroids = self.wave * self.asteroidsByWave;
                    while (asteroids > 0) {
                        asteroids--;
                        asteroidContainer.cloneObject({ });
                    }
                }
			},
            tickTime: 10
		});
    },

    update: function (delta) {
        this.waveTimer.tick(delta);
    }
};