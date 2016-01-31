var hud = {
    id: 'hud',
    visible: true,
    init: function () {
        var self = this;
        GLOBAL.level = 0;
        GLOBAL.babys = 0;
        
        this.touchId = jsGFwk.IO.touch.registerTouch(function (coord) {
            jsGFwk.IO.touch.unregisterTouch(self.touchId);
            jsGFwk.IO.mouse.unregisterClick(self.clickId);
            jsGFwk.Scenes.scenes.game.enable();
            return;
        });
            
        this.clickId = jsGFwk.IO.mouse.registerClick(function (coord) {
            jsGFwk.IO.touch.unregisterTouch(self.touchId);
            jsGFwk.IO.mouse.unregisterClick(self.clickId);
            jsGFwk.Scenes.scenes.game.enable();
            return;
        });
    },
    update: function (delta) {
        
    },
    draw: function (context) {
        context.textAlign = 'center';
        context.font = '28pt zxBold';
        context.fillText('Ultra Witch Simulator HD 2000', jsGFwk.settings.width / 2, 50);
    }
};