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
            GLOBAL.bloodContainer.cloneObject({
                x: levelToCreate.blood[i].x,
                y: levelToCreate.blood[i].y
            });
        }
    }
    
};