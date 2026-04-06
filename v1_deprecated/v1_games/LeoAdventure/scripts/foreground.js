var foreground = {
    id: 'foreground',
    visible: true,
    init: function init() {
        
    },
    update: function update(delta) {
    },
    draw: function draw(ctx) {
        ctx.drawImage(jsGFwk.ResourceManager.graphics.scanLines.image, 0, 0);
    },
    postRender: function postRender(ctx) {
        //WebGL module
        gameConst.fx.glTexture.loadContentsOf(jsGFwk.FastAnimation._canvas);
        
        gameConst.fx.glCanvas.draw(gameConst.fx.glTexture)
            .bulgePinch(jsGFwk.settings.width / 2, jsGFwk.settings.height / 2,
                        jsGFwk.settings.width * 0.75, 0.12)
            .vignette(0.25, 0.74).update();
    }
};