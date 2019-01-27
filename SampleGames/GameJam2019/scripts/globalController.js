var globalController = {
    id: "globalController",
    visible: false,
    
    init: function () {
        spaceshipDie = false;

        this.dieTimer = new jsGFwk.Timer({
			action: function () {
                asteroidContainer.clearAll();
                bulletContainer.clearAll();
                cloudsContainer.clearAll();
                angryAsteroid.reset();
                stats.reset();

                jsGFwk.Scenes.scenes.hud.enable();
			},
            tickTime: 3
		});
    },
    update: function (delta) {
        if (spaceshipDie) {
            this.dieTimer.tick(delta);
        }
    }
}