var background = {
    id: 'background', visible: true,
    init: function () {
    },
    update: function (delta) {
    },
    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.background.image, 0, 0);
        context.drawImage(jsGFwk.Sprites.caldero.image, 10, jsGFwk.settings.height - 8);
        
        context.font = '14pt zxBold';
        context.fillStyle = 'white';
        context.fillText('Level ' + GLOBAL.level, 5, 10);
        context.fillText('Sacrificed Babies ' + GLOBAL.babys, 5, 25);
    }
};