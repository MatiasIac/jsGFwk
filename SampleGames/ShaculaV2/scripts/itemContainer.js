var ItemContainer = {
    id: 'itemContainer',
    visible: true,
    init: function () { },
    update: function (delta) { },
    draw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.itemContainer.image, 590, 120);
        ctx.drawImage(jsGFwk.Sprites.items.spriteBag[GLOBAL.item].image, 600, 123);
    }
};