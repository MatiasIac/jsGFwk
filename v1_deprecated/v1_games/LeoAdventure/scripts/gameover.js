var gameover = {
    id: 'gameover',
    visible: true,
    textVisible: true,
    init: function () {
        var self = this;
        
        this.textTimer = new jsGFwk.Timer({
            action: function () {
                self.textVisible = !self.textVisible;
            }, tickTime: 0.5
        });
        
        this.waitTimer = new jsGFwk.Timer({
            action: function () {
                jsGFwk.Scenes.scenes.hud.enable();
            }, tickTime: 5
        });
    },
    update: function (delta) {
        this.textTimer.tick(delta);
        this.waitTimer.tick(delta);
    },
    draw: function (context) {
        if (this.textVisible) {
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.font = '150px zxBold';
            context.fillText('GAME OVER', 320, 220);
        }
    }
};