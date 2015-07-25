var LevelController = {
    id: 'levelController',
    visible: false,
    init: function init() {
        this.deadTimer = new jsGFwk.Timer({
			action: function () {
                Player.visible = !Player.visible;
			},
            tickTime: 0.5
		});
        
        this.isDying = false;
        this.deadFlashAccumulator = 0;
        
        this.update = this.updateLevel;
        this.resetLevel();
    },
    
    /*Kill the hero*/
    killHero: function killHero () {
        this.isDying = true;
        Player.isBlocked = true;
        this.update = this.updateDying;
    },
    updateDying: function updateDying (delta) {
        this.deadTimer.tick(delta);
        this.deadFlashAccumulator += delta;
        if (this.deadFlashAccumulator > 2.5) {
            this.update = this.updateLevel;
            this.resetLevel();
        }
    },
    /******/
    
    updateLevel: function updateLevel (delta) {
        if (footsContainer.length() === 0) {
            gameConst.currentLevel++;
            gameConst.currentLevel = gameConst.currentLevel % levels.length;
            this.resetLevel();
        }
        
        Timing.currentTime = Math.round((Timing.currentTime + delta) * 100) / 100;
        
        if (levels[gameConst.currentLevel].parTime <= Timing.currentTime) {
            this.killHero();
        }
    },
    
    update: null,
    
    resetLevel: function resetLevel () {
        var currenLevel = levels[gameConst.currentLevel];

        this.deadFlashAccumulator = 0;
        this.isDying = false;
        Player.isBlocked = false;
        Player.visible = true;
        Player.x = currenLevel.playerInit.x;
        Player.y = currenLevel.playerInit.y;
        
        Timing.currentTime = 0;
        Timing.timerColor = 255;
        
        footsContainer.clearAll();
        hazardsContainer.clearAll();
        
        this.drawLevel();
    },
    drawLevel: function drawLevel() {
        var currenLevel = levels[gameConst.currentLevel];
        
        for (var i = 0; i < currenLevel.foots.length; i++) {
            footsContainer.cloneObject(currenLevel.foots[i]);
        }
        
        for (var i = 0; i < currenLevel.hazards.length; i++) {
            hazardsContainer.cloneObject(currenLevel.hazards[i]);
        }
    }
};