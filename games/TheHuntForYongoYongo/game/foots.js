var Foots = {
    init: function(param) {
        this.x = param.x;
        this.y = param.y;
        this.width = 13;
        this.height = 12;
    },
    update: function(delta) {
        if (Player.isRectColliding(this)) {
            resourceManager.SOUNDS.pickTrack.audio.pause();
            resourceManager.SOUNDS.pickTrack.audio.currentTime = 0;
            resourceManager.SOUNDS.pickTrack.audio.playbackRate += 0.2;
            resourceManager.SOUNDS.pickTrack.audio.play();
            this.destroy();
        }
    },
    draw: function(ctx) {
        ctx.drawImage(sprites.SPRITES_BAG.foots.graphic, this.x, this.y);
    }
};