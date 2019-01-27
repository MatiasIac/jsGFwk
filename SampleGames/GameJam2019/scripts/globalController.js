var globalController = {
    id: "globalController",
    visible: false,

    init: function () {
        spaceshipDie = false;
        endGame = false;

        this.dieTimer = new jsGFwk.Timer({
			action: function () {
                asteroidContainer.clearAll();
                bulletContainer.clearAll();
                cloudsContainer.clearAll();
                powerUpContainer.clearAll();
                angryAsteroid.reset();
                stats.reset();
                endGame = false;

                jsGFwk.Scenes.scenes.hud.enable();
			},
            tickTime: 3
        });
        
        this.endGameTimer = new jsGFwk.Timer({
			action: function () {
                asteroidContainer.clearAll();
                bulletContainer.clearAll();
                cloudsContainer.clearAll();
                powerUpContainer.clearAll();
                angryAsteroid.reset();
                stats.reset();
                endGame = false;

                jsGFwk.Scenes.scenes.endgame.enable();
			},
            tickTime: 3
		});
    },
    update: function (delta) {
        if (spaceshipDie) {
            this.dieTimer.tick(delta);
        }

        if (endGame) {
            this.endGameTimer.tick(delta);
        }
    }
}