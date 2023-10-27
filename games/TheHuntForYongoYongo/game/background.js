const Background = {
    name: 'background',

    isVisible: true,
    
    draw: function (ctx) {
        if (levels[gameConst.currentLevel].ambient !== undefined) {
            ctx.fillStyle = 'cyan';
            ctx.fillRect(0, 0, 640, 480);
        }

        levels[gameConst.currentLevel].drawEnvironment && levels[gameConst.currentLevel].drawEnvironment(ctx);
    }
};