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
            GLOBAL.bloodContainer.cloneObject(levelToCreate.blood[i]);
        }
        
        //Bats
        for (var i = 0; i < levelToCreate.bats.length; i++) {
            GLOBAL.batContainer.cloneObject(levelToCreate.bats[i]);
        }
        
        //Exits
        for (var i = 0; i < levelToCreate.exit.length; i++) {
            GLOBAL.exitContainer.cloneObject(levelToCreate.exit[i]);
        }
    },
    exitFromLevel: function (data) {
        GLOBAL.spikeContainer.clearAll();
        GLOBAL.bloodContainer.clearAll();
        GLOBAL.batContainer.clearAll();
        GLOBAL.exitContainer.clearAll();
        
        dracul.x = data.dracCoords.x;
        dracul.y = data.dracCoords.y;
        
        GLOBAL.currentLevel = data.level;
        this.createLevel();
    }
    
};