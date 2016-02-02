var levelController = {
    id: 'levelController',
    visible: false,
    init: function () {
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
        enemyContainer.clearAll();
        bulletContainer.clearAll();
        houseContainer.clearAll();
        
        for (var i = 0; i < GLOBAL.level + 1; i++) {
            enemyContainer.cloneObject();
            houseContainer.cloneObject({ x: Math.random() * (jsGFwk.settings.width - 200) + 150})
        }
        GLOBAL.level++;
    }
};