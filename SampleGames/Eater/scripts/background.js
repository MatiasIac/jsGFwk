var Background = {
    id: 'background',
    visible: true,
    update: function () {},
    draw: function (ctx) {
        levels[gameConst.currentLevel].drawEnvironment && levels[gameConst.currentLevel].drawEnvironment(ctx);
    }
};