var gameController = {
	id: 'gameController',
	visible: false,
	init: function () {
        this.createLevel();
	},
    createLevel: function () {
        var levelToCreate = Levels[GLOBAL.currentLevel];
        
        //Spikes
        for (var i = 0; i < levelToCreate.spikes.length; i++) {
            GLOBAL.spikeContainer.cloneObject({
                x: levelToCreate.spikes[i].x,
                y: levelToCreate.spikes[i].y,
                delay: levelToCreate.spikes[i].delay 
            });
        }
        
        //Blood
        for (var i = 0; i < levelToCreate.blood.length; i++) {
            if (levelToCreate.blood[i].isActive) {
                GLOBAL.bloodContainer.cloneObject({ blood: levelToCreate.blood[i], index: i });
            }
        }
        
        //Bats
        for (var i = 0; i < levelToCreate.bats.length; i++) {
            GLOBAL.batContainer.cloneObject(levelToCreate.bats[i]);
        }
        
        //Exits
        for (var i = 0; i < levelToCreate.exit.length; i++) {
            GLOBAL.exitContainer.cloneObject(levelToCreate.exit[i]);
        }
        
        //Falling Walls
        for (var i = 0; i < levelToCreate.fallingWalls.length; i++) {
            GLOBAL.fallingWallContainer.cloneObject(levelToCreate.fallingWalls[i]);
        }
        
        if (levelToCreate.coffin === undefined) {
            Coffin.visible = false;
        }
    },
    exitFromLevel: function (data) {
        GLOBAL.spikeContainer.clearAll();
        GLOBAL.bloodContainer.clearAll();
        GLOBAL.batContainer.clearAll();
        GLOBAL.exitContainer.clearAll();
        GLOBAL.fallingWallContainer.clearAll();
        
        dracul.x = data.dracCoords.x;
        dracul.y = data.dracCoords.y;
        
        GLOBAL.currentLevel = data.level;
        this.createLevel();
    }
    
};