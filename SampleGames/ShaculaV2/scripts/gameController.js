var gameController = {
	id: 'gameController',
	visible: false,
	init: function () {
        this.createLevel();
	},
    createLevel: function () {
        var levelToCreate = Levels[GLOBAL.currentLevel];
        
        for (var i = 0; i < levelToCreate.platforms.length; i++) {
            GLOBAL.platFormerConainer.cloneObject({
                x: levelToCreate.platforms[i].x,
                y: levelToCreate.platforms[i].y,
                width: levelToCreate.platforms[i].width,
                height: levelToCreate.platforms[i].height });
        }
    }
    
};