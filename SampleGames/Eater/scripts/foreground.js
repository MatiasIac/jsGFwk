var Foreground = {
    id: 'foreground',
    visible: true,
    init: function init() { 
        this.scanLineVisible = true;
    },
    update: function update(delta) {
        this.scanLineVisible = !this.scanLineVisible;
    },
    draw: function draw(ctx) {
        this.scanLineVisible && ctx.drawImage(jsGFwk.ResourceManager.graphics.scanLines.image, 0, 0);
    },
    postRender: function postRender(ctx) {
        //WebGL module
        gameConst.fx.glTexture.loadContentsOf(jsGFwk.FastAnimation._canvas);
        
        levels[gameConst.currentLevel]
            .trapParser(gameConst.fx.glCanvas.draw(gameConst.fx.glTexture))
            .bulgePinch(gameConst.width / 2, gameConst.height / 2, gameConst.width * 0.75, 0.12)
            .vignette(0.25, 0.74)
            .update();
    }
};