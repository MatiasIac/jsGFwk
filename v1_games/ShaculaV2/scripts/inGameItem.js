var InGameItem = {
    id: 'inGameItem',
    visible: true,
    currentItemToShow: null,
    init: function () { 

    },
    update: function (delta) { 
        this.currentItemToShow = Levels[GLOBAL.currentLevel].item || {};
    },
    draw: function (ctx) {
        if (this.currentItemToShow.item - 1 >= 0) {
            ctx.drawImage(jsGFwk.Sprites.inGameItems.spriteBag[this.currentItemToShow.item - 1].image, 
                this.currentItemToShow.x,
                this.currentItemToShow.y);
        }
    }
};