var endgame = {
    id: "endgame",
    visible: true,
    
    init: function () {
        this.timer = new jsGFwk.Timer({
			action: function () {
                jsGFwk.Scenes.scenes.hud.enable();
			},
            tickTime: 10
        });
    },
    update: function(delta) {
        this.timer.tick(delta);
    },
    draw: function(context) {
        context.drawImage(jsGFwk.Sprites.endtitle.image, 10, 10);
    }
};