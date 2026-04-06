var Score = {
    id: 'score',
    visible: true,
    init: function () {
    },
    update: function (delta) {
        
    },
    draw: function (ctx) {
        ctx.fillStyle = "white";
        ctx.font = "36pt zxBold";
        ctx.fillText(currentScore, 10, 20);
        ctx.fillText("HI-" + hiScore, 300, 20);
    }
}