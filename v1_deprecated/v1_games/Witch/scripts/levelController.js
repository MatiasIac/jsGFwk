var levelController = {
    id: 'levelController',
    visible: false,
    init: function () {
        GLOBAL.witch.feed = 100;
        GLOBAL.witch.energy = 100;
        enemyContainer.clearAll();
        houseContainer.clearAll();
        this.createLevel();
    },
    update: function (delta) {
        var areBabies = false;
        houseContainer.eachCloned(function (item, event) {
            if (item.hasBaby) {
                areBabies = true;
                event.cancel = true;
            }
        });
        
        if (!areBabies && witch.payload === 0) {
            this.createLevel();
        }
    },
    createLevel: function () {
        bulletContainer.clearAll();
        
        //var houses = Math.min(GLOBAL.level + 1, 20);
        
        houseContainer.eachCloned(function (item, event) {
            item.hasBaby = true;
        });
        
        for (var i = 0; i < 2; i++) {
            enemyContainer.cloneObject({x: jsGFwk.settings.width});
        }
        
        //for (var i = 0; i < houses; i++) {
        houseContainer.cloneObject({ x: Math.random() * (jsGFwk.settings.width - 250) + 200})
        //}
        
        GLOBAL.level++;
    }
};