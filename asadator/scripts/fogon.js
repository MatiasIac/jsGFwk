var fojon = {
    id: "fojon",
    visible: true,
    init: function () {

    },
    update: function (tick) {

    },
    draw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.background.image, 0, 0);
        ctx.drawImage(jsGFwk.Sprites.fogon.image, 80, 200);
    }
};