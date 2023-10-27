var Cinematic = {
    name: 'cinematic',

    isVisible: true,
    
    init: function init() {
        var self = this;
        
        resourceManager.SOUNDS.music.audio.pause();
        resourceManager.SOUNDS.cinematicMusic.audio.currentTime = 0;
        resourceManager.SOUNDS.cinematicMusic.audio.play();
        
        gameConst.timer.context.clearRect(0, 0, 640, 150);
        
        this.playerX = -200;
        this.yetiX = 0;
        
        sprites.SPRITES_BAG.eater.reset();
        sprites.SPRITES_BAG.yeti.reset();
        
        this.walkingTimer = new jsGFwk.Clock({
			action: function () {
                sprites.SPRITES_BAG.eater.moveNextSpite();
                sprites.SPRITES_BAG.yeti.moveNextSprit();
                self.playerX += 12;
                self.yetiX += 10;
			},
            triggerTime: 0.05
		});
    },

    update: function update(delta) {
        if (this.playerX >= 640) {
            gameConst.currentLevel++;
            gameConst.currentLevel = gameConst.currentLevel % levels.length;
            resourceManager.SOUNDS.cinematicMusic.audio.pause();
            scenesManager.SCENES.game.activate();
        }
        
        this.walkingTimer.tick(delta);
    },

    draw: function draw(ctx) {
        ctx.drawImage(sprites.SPRITES_BAG.eater.sprite.image, this.playerX, 300);
        ctx.drawImage(sprites.SPRITES_BAG.yeti.sprite.image, this.yetiX, 300);        
        
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
    }
};