var hud = {
    id: 'hud',
    visible: true,
    init: function () {
        
    },
    update: function (delta) {
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W] ||
            jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S] ||
            jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A] ||
            jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D] ||
            jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.M]) {
            jsGFwk.Scenes.scenes.game.enable();
        }
    },
    draw: function (context) {
        context.fillStyle = 'white';
        context.font = '90px zxBold';
        context.textAlign = 'center';
        context.fillText('Leo\'s Nightmare', 320, 190);
        
        context.font = '40px zxBold';
        context.fillText('A S D W and M', 320, 290);
    }
};