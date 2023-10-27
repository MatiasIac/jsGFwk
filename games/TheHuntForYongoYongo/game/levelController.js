var LevelController = {
    name: 'levelController',
    isVisible: false,
    
    init: function() {
        this.deadTimer = new jsGFwk.Clock({
			action: function () {
                Player.isVisible = !Player.isVisible;
			},
            triggerTime: 0.5
		});
        
        this.isDying = false;
        this.deadFlashAccumulator = 0;
        
        this.update = this.updateLevel;
        this.resetLevel();
        
        resourceManager.SOUNDS.music.audio.play();
    },
    
    /*Kill the hero*/
    killHero: function () {
        dropsContainer.clearAll();
        hazardsContainer.clearAll();
        this.isDying = true;
        Player.isBlocked = true;
        this.update = this.updateDying;
        gameConst.lives--;
    },
    updateDying: function (delta) {
        this.deadTimer.tick(delta);
        this.deadFlashAccumulator += delta;
        if (this.deadFlashAccumulator > 2.5) {
            this.update = this.updateLevel;
            this.resetLevel();
        }
    },
    /******/
    
    updateLevel: function (delta) {
        if (footsContainer.length() === 0) {
            gameConst.lives++;
            scenesManager.cinematic.activate();
            return;
        }
        
        if (gameConst.lives === 0) {
            if (gameConst.maxLevelReach < gameConst.currentLevel) {
                gameConst.maxLevelReach = gameConst.currentLevel;
                webStorage.setData({ maxLevel: gameConst.currentLevel }, "yongoyongo_stored_game", jsGFwk.WebStorage.STORAGE_TYPES.JSON);
            }
            
            scenesManager.hud.activate();
            return;
        }
        
        Timing.currentTime = Math.round((Timing.currentTime + delta) * 100) / 100;
        
        if (levels[gameConst.currentLevel].parTime <= Timing.currentTime) {
            this.killHero();
            return;
        }
        
        var mudCollide = false;
        hazardsContainer.eachCloned(function (element, e) { 
            if (element.isColliding === true) {
                mudCollide = true;
                e.cancel = true;
            }
        });
        (mudCollide) ? Player.slow() : Player.normal();
    },
    
    update: null,
    
    resetLevel: function () {
        var currenLevel = levels[gameConst.currentLevel];

        this.deadFlashAccumulator = 0;
        this.isDying = false;
        Player.isBlocked = false;
        Player.visible = true;
        Player.x = currenLevel.playerInit.x;
        Player.y = currenLevel.playerInit.y;
        Player.speedX = 0;
        Player.speedY = 0;
        mousePointer.x = currenLevel.playerInit.x;
        mousePointer.y = currenLevel.playerInit.y;
        mousePointer.angle = 0;
        
        Timing.currentTime = 0;
        Timing.timerColor = 255;
        
        footsContainer.clearAll();
        hazardsContainer.clearAll();
        dropsContainer.clearAll();
        
        resourceManager.SOUNDS.pickTrack.audio.playbackRate = 1;
        
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