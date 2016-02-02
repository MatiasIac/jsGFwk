var levelController = {
    id: 'levelController',
    visible: false,
    init: function () {
        GLOBAL.witch.feed = 100;
        enemyContainer.clearAll();
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
        houseContainer.clearAll();
        
        var houses = Math.min(GLOBAL.level + 1, 20);
        
        for (var i = 0; i < 2; i++) {
            enemyContainer.cloneObject({x: jsGFwk.settings.width});
        }
        
        for (var i = 0; i < houses; i++) {
            houseContainer.cloneObject({ x: Math.random() * (jsGFwk.settings.width - 200) + 200})
        }
        
        GLOBAL.level++;
    }
};