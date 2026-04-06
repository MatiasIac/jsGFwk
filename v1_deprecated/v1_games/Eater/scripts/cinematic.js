var Cinematic = {
    id: 'cinematic',
    visible: true,
    init: function init() {
        var self = this;
        
        jsGFwk.ResourceManager.sounds.music.audio.pause();
        jsGFwk.ResourceManager.sounds.cinematicMusic.audio.currentTime = 0;
        jsGFwk.ResourceManager.sounds.cinematicMusic.audio.play();
        
        gameConst.timer.context.clearRect(0, 0, 640, 150);
        
        this.playerX = -200;
        this.yetiX = 0;
        
        jsGFwk.Sprites.eater.reset();
        jsGFwk.Sprites.yeti.reset();
        
        this.walkingTimer = new jsGFwk.Timer({
			action: function () {
                jsGFwk.Sprites.eater.next();
                jsGFwk.Sprites.yeti.next();
                self.playerX += 12;
                self.yetiX += 10;
			},
            tickTime: 0.05
		});
    },
    update: function update(delta) {
        if (this.playerX >= 640) {
            gameConst.currentLevel++;
            gameConst.currentLevel = gameConst.currentLevel % levels.length;
            jsGFwk.ResourceManager.sounds.cinematicMusic.audio.pause();
            jsGFwk.Scenes.scenes.game.enable();
        }
        
        this.walkingTimer.tick(delta);
    },
    draw: function draw(ctx) {
        ctx.drawImage(jsGFwk.Sprites.eater.sprite.image, this.playerX, 300);
        ctx.drawImage(jsGFwk.Sprites.yeti.sprite.image, this.yetiX, 300);        
        
        ctx.save();
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.textAlign = 'center';
        ctx.font = '40pt gooddog';
        ctx.fillStyle = 'white';
        ctx.fillText('Following', 320, 180);
        ctx.fillText('the steps of', 320, 220);
        ctx.fillText('YongoYongo', 320, 260);
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