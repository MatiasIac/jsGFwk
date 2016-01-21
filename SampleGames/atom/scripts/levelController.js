var levelController = {
    id: 'levelController',
    visible: false,
    init: function () {
        var self = this;
        this.particleTimer = new jsGFwk.Timer({
            action: function () {
                self.updatePointer = self.updateStep3;
            }, tickTime: 2
        });
        
        this.nextWaveTimer = new jsGFwk.Timer({
            action: function () {
                self.triggerWave();
            }, tickTime: 20
        });
        
        this.updatePointer = this.updateStep1;
    },
    triggerWave: function () {
        GLOBAL.currentLevel++;
        foreground.showMessage('Level ' + GLOBAL.currentLevel);
        this.appearPosition = { x: (Math.random() * jsGFwk.settings.width), y: (Math.random() * jsGFwk.settings.height) };
        this.particleTimer.reset();
        this.nextWaveTimer.reset();
        this.updatePointer = this.updateStep2;
    },
    updateStep1: function (delta) {
        this.nextWaveTimer.tick(delta);
        if (GLOBAL.enemyContainer.length() === 0) {
            this.triggerWave();
        }
    },
    updateStep2: function (delta) {
        this.particleTimer.tick(delta);
        GLOBAL.particlesContainer.cloneObject({
            x: this.appearPosition.x, 
            y: this.appearPosition.y,
            color: 50
        });
    },
    updateStep3: function (delta) {
        for (var i = 0; i < GLOBAL.currentLevel; i++) {
            var enemy = parseInt(Math.random() * enemyTypes.length),
                currentEnemy = enemyTypes[enemy];
            
            GLOBAL.enemyContainer.cloneObject({
                speed: (Math.random() * currentEnemy.maxSpeed) + currentEnemy.minSpeed,
                speed2: (Math.random() * currentEnemy.maxSpeed2) + currentEnemy.minSpeed2,
                size: (Math.random() * 10) + 10, 
                x: this.appearPosition.x, 
                y: this.appearPosition.y,
                type: currentEnemy.name,
                life: 5 * GLOBAL.currentLevel
            });
        }
        this.updatePointer = this.updateStep1;
    },
    update: function (delta) {
        this.updatePointer(delta);
    }
};