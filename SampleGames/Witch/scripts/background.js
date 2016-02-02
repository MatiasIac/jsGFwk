var background = {
    id: 'background', visible: true,
    foodBarMaxSize: 50, foodBarSize: 0,
    init: function () {
    },
    update: function (delta) {
        this.foodBarSize = (this.foodBarMaxSize * GLOBAL.witch.feed) / 100;
    },
    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.background.image, 0, 0);
        context.drawImage(jsGFwk.Sprites.caldero.image, 10, jsGFwk.settings.height - 8);
        
        context.font = '12pt zxBold';
        context.fillStyle = 'white';
        //context.fillText('Level ' + GLOBAL.level, 5, 10);
        context.fillText('Food', 5, 10);
        
        context.fillStyle = 'red';
        context.fillRect(5, 12, this.foodBarSize, 5);
    }
};