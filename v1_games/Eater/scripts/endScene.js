var EndScene = {
    id: 'credits',
    visible: true,
    init: function () {
        gameConst.timer.context.clearRect(0, 0, 640, 150);
        
        this.endingWaitTimer = new jsGFwk.Timer({
            action: function () {
                jsGFwk.Scenes.scenes.hud.enable();
            },
            tickTime: 10
        });
    },
    update: function (delta) {
        this.endingWaitTimer.tick(delta);
    },
    draw: function (ctx) {
        ctx.save();
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.textAlign = 'center';
        ctx.font = '40pt gooddog';
        ctx.fillStyle = 'white';
        ctx.fillText('You caught', 320, 180);
        ctx.fillText('YongoYongo', 320, 220);
        
        ctx.font = '24pt zxBold';
        ctx.fillText('Created by Matias Iacono - @matiasiacono', 320, 320);
        
        ctx.restore();
    },
    postRender: function postRender(ctx) {
        gameConst.fx.glTexture.loadContentsOf(jsGFwk.FastAnimation._canvas);
        gameConst.fx.glCanvas.draw(gameConst.fx.glTexture)
            .bulgePinch(gameConst.width / 2, gameConst.height / 2, gameConst.width * 0.75, 0.12)
            .vignette(0.25, 0.74)
            .update();
    }
};