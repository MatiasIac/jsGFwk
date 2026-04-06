var end = {
    id: 'end', visible: true,
    init: function () {
        this.waitTimer = new jsGFwk.Timer({
            action: function () {
                jsGFwk.Scenes.scenes.hud.enable();
            },
            tickTime: 3
        });
    },
    update: function (delta) {
        this.waitTimer.tick(delta);
    },
    draw: function (context) {
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.font = '24pt zxBold';
        context.fillText('You ate just ' + GLOBAL.babys + ' babies!', jsGFwk.settings.width / 2, 50);
    }
};