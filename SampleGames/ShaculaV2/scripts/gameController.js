var gameController = {
	id: 'gameController',
	visible: false,
	init: function () {
        this.createLevel();
	},
    createLevel: function () {
        var levelToCreate = Levels[GLOBAL.currentLevel];
        
        for (var i = 0; i < levelToCreate.spikes.length; i++) {
            GLOBAL.spikeContainer.cloneObject({
                x: levelToCreate.spikes[i].x,
                y: levelToCreate.spikes[i].y,
                delay: levelToCreate.spikes[i].delay 
            });
        }
    }
    
};