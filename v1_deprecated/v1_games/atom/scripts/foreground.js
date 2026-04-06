var foreground = {
    id: 'foreground',
    visible: true,
    init: function () {
        var self = this;
        this.enabledMessage = false;
        this.message = '';
        this.messageTimer = new jsGFwk.Timer({
            action: function () {
                self.enabledMessage = false;
                self.message = '';
            }, tickTime: 2
        });
    },
    showMessage: function (message) {
        this.messageTimer.reset();
        this.message = message;
        this.enabledMessage = true;
    },
    update: function (delta) {
        if (this.enabledMessage) {
            this.messageTimer.tick(delta);
        }
    },
    draw: function (context) {
        context.fillStyle = 'gray';
        context.textAlign = 'center';
        context.font = '34pt roboto';
        context.fillText(this.message, jsGFwk.settings.width / 2, jsGFwk.settings.height / 2);
        
        context.font = '14pt roboto';
        context.textAlign = 'right';
        context.fillText(GLOBAL.points, jsGFwk.settings.width - 10, jsGFwk.settings.height - 10);
        
        context.font = '10pt roboto';
        context.textAlign = 'left';
        context.fillText(shots.getShotName() + ' - Damage ' + parseInt(shots.shots[shots.shotIndex].damage) + ' - Rate ' + parseInt(shots.shots[shots.shotIndex].shotInterval) + ' - Bullet Speed ' + parseInt(shots.shots[shots.shotIndex].speed),
                         10, jsGFwk.settings.height - 10);
    }
};