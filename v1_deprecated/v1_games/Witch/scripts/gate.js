var gate = {
    id: 'gate',
    visible: true,
    width: 18, height: 21,
    x: 40, y: 129,
    init: function () {
    },
    update: function (delta) {
    },
    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.gate.image, this.x, this.y);
    }
};