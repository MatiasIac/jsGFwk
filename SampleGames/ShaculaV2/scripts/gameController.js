var gameController = {
	id: 'gameController',
	visible: false,
	init: function () {
        this.createLevel();
	},
    createLevel: function () {
        var levelToCreate = Levels[GLOBAL.currentLevel];
        
        //Levers
        if (levelToCreate.levers) {
            for (var i = 0; i < levelToCreate.levers.length; i++) {
                GLOBAL.leverContainer.cloneObject(levelToCreate.levers[i]);
            }
        }
        
        //Spikes
        if (levelToCreate.spikes) {
            for (var i = 0; i < levelToCreate.spikes.length; i++) {
                GLOBAL.spikeContainer.cloneObject(levelToCreate.spikes[i]);
            }
        }
        
        //Blood
        if (levelToCreate.blood) {
            for (var i = 0; i < levelToCreate.blood.length; i++) {
                if (levelToCreate.blood[i].isActive) {
                    GLOBAL.bloodContainer.cloneObject({ blood: levelToCreate.blood[i], index: i });
                }
            }
        }
        
        //Bats
        if (levelToCreate.bats) {
            for (var i = 0; i < levelToCreate.bats.length; i++) {
                GLOBAL.batContainer.cloneObject(levelToCreate.bats[i]);
            }
        }
        
        //Exits
        for (var i = 0; i < levelToCreate.exit.length; i++) {
            GLOBAL.exitContainer.cloneObject(levelToCreate.exit[i]);
        }
        
        //Falling Walls
        if (levelToCreate.fallingWalls) {
            for (var i = 0; i < levelToCreate.fallingWalls.length; i++) {
                GLOBAL.fallingWallContainer.cloneObject(levelToCreate.fallingWalls[i]);
            }
        }
        
        //Moving Walls
        if (levelToCreate.movableWalls) {
            for (var i = 0; i < levelToCreate.movableWalls.length; i++) {
                GLOBAL.movableWallContainer.cloneObject(levelToCreate.movableWalls[i]);
            }
        }
        
        if (levelToCreate.saws) {
            for (var i = 0; i < levelToCreate.saws.length; i++) {
                GLOBAL.sawContainer.cloneObject(levelToCreate.saws[i]);
            }
        }
        
        if (levelToCreate.coffin === undefined) {
            Coffin.visible = false;
        }

        Portal.visible = levelToCreate.portal !== undefined;
        SkeletonDoor.visible = levelToCreate.skeletonDoor !== undefined;
        BatteryContainer.visible = levelToCreate.batteryContainer !== undefined;
        StakeDoor.visible = levelToCreate.stakeDoor !== undefined;
        InGameItem.visible = levelToCreate.item !== undefined;
    },
    exitFromLevel: function (data) {
        GLOBAL.spikeContainer.clearAll();
        GLOBAL.bloodContainer.clearAll();
        GLOBAL.batContainer.clearAll();
        GLOBAL.exitContainer.clearAll();
        GLOBAL.fallingWallContainer.clearAll();
        GLOBAL.leverContainer.clearAll();
        GLOBAL.movableWallContainer.clearAll();
        GLOBAL.sawContainer.clearAll();
        
        dracul.x = data.dracCoords.x;
        dracul.y = data.dracCoords.y;
        
        GLOBAL.currentLevel = data.level;

        Levels[GLOBAL.currentLevel].startingPoint = { x: data.dracCoords.x, y: data.dracCoords.y};

        this.createLevel();
    }
    
};